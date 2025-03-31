package main

import (
	// "bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"mime"
	"strings"

	"log"
	"strconv"

	"net/http"
	"os"
	"path/filepath"
	"time"

	// "github.com/google/uuid"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/hasura/go-graphql-client"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey []byte
var graphqlClient *graphql.Client

type Credentials struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	UserID   int `json:"user_id"`
	Username string `json:"username"`
	jwt.StandardClaims
}

type Recipe struct {
	Title           string       `json:"title"`
	Description     string       `json:"description"`
	PreparationTime int          `json:"preparationTime"`
	CategoryID      int          `json:"categoryId"`
	CreatorID       int          `json:"creatorId"`
	Ingredients     []Ingredient `json:"ingredients"`
	Steps           []Step       `json:"steps"`
	Images          []Image      `json:"images"`
}

type Ingredient struct {
	Name     string `json:"name"`
	Quantity string `json:"quantity"`
	Unit     string `json:"unit"`
}

type Step struct {
	
	StepNumber int  `json:"stepnumber"`
    Description string `json:"description"`
}

type Image struct {
	URL        string `json:"url"`
	IsFeatured bool   `json:"is_featured"`
}

type CreateRecipeResponse struct {
	Data struct {
		InsertRecipe struct {
			ID             int       `json:"id"`
			Title          string    `json:"title"`
			Description    string    `json:"description"`
			PreparationTime int      `json:"preparation_time"`
			CreatedAt      time.Time `json:"created_at"`
			UpdatedAt      time.Time `json:"updated_at"`
		} `json:"insert_recipes_one"`
	} `json:"data"`
}

// Define a struct to represent category data
type Category struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}


const uploadPath = "./uploads"
const avatarUploadPath = "./avatars" // Define the path for storing avatars





func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	jwtKey = []byte(os.Getenv("JWT_SECRET"))
	graphqlClient = graphql.NewClient(os.Getenv("HASURA_GRAPHQL_ENDPOINT"), nil)

	r := mux.NewRouter()

	fs := http.FileServer(http.Dir(uploadPath))
	r.PathPrefix("/uploads/").Handler(http.StripPrefix("/uploads", fs))


	r.PathPrefix("/avatars/").Handler(http.StripPrefix("/avatars", fs))

	// Use corsMiddleware for all routes
	r.Use(corsMiddleware)

	r.HandleFunc("/", rootHandler).Methods("GET", "OPTIONS")
	r.HandleFunc("/signup", signup).Methods("POST", "OPTIONS")
	r.HandleFunc("/login", login).Methods("POST", "OPTIONS")
	r.HandleFunc("/welcome", authMiddleware(welcome)).Methods("GET", "OPTIONS")
	r.HandleFunc("/upload", handleFileUpload).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/categories", getCategoryHandler).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/recipes", authMiddleware(createRecipe)).Methods("POST", "OPTIONS")
	r.HandleFunc( "/upload-avatar",handleAvatarUpload).Methods("PUT", "OPTIONS")

	fmt.Println("Server starting on port 8081")
	http.ListenAndServe(":8081", r)
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	http.Error(w, "Not Found", http.StatusNotFound)
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		setupResponse(&w, r)
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}


func signup(w http.ResponseWriter, r *http.Request) {
    var creds Credentials
    err := json.NewDecoder(r.Body).Decode(&creds)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Check if username already exists
	query := struct {
        User []struct {
            Username string `graphql:"username"`
            Email    string `graphql:"email"`
        } `graphql:"users(where: { _or: [{username: {_eq: $username}}, {email: {_eq: $email}}]})"`
    }{}


    variables := map[string]interface{}{
        "username": graphql.String(creds.Username),
		 "email":    graphql.String(creds.Email),
    }

    err = graphqlClient.Query(context.Background(), &query, variables)
    if err != nil {
        http.Error(w, "Internal server error", http.StatusInternalServerError)
        return
    }
	for _, user := range query.User {
        if user.Username == creds.Username {
            http.Error(w, "Username already exists", http.StatusBadRequest)
            return
        }
        if user.Email == creds.Email {
            http.Error(w, "Email already exists", http.StatusBadRequest)
            return
        }
    }

    // if len(query.User) > 0 {
    //     http.Error(w, "Username already exists", http.StatusBadRequest)
    //     return
    // }
	// if user.Email == creds.Email {
	// 	http.Error(w, "Email already exists", http.StatusBadRequest)
	// 	return
	// }

    // Hash the password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)
    if err != nil {
        http.Error(w, "Internal server error", http.StatusInternalServerError)
        return
    }

    // Insert new user
    mutation := struct {
        InsertUsers struct {
            Returning []struct {
                ID       int    `json:"id"`
                Username string `json:"username"`
                Email    string `json:"email"`
            } `json:"returning"`
        } `graphql:"insert_users(objects: {username: $username, email: $email, password: $password})"`
    }{}

    variables = map[string]interface{}{
        "username": graphql.String(creds.Username),
        "email":    graphql.String(creds.Email),
        "password": graphql.String(string(hashedPassword)),
    }

    err = graphqlClient.Mutate(context.Background(), &mutation, variables)
    if err != nil {
        http.Error(w, "Failed to create user: "+err.Error(), http.StatusInternalServerError)
        return
    }

    user := mutation.InsertUsers.Returning[0]

    // Generate JWT
    expirationTime := time.Now().Add(100 * time.Minute)
    claims := &Claims{
        UserID:   user.ID,
        Username: user.Username,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: expirationTime.Unix(),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        http.Error(w, "Could not generate token", http.StatusInternalServerError)
        return
    }

    response := map[string]interface{}{
        "token": tokenString,
        "user": map[string]interface{}{
            "id":       strconv.Itoa(user.ID),
            "username": user.Username,
            "email":    user.Email,
        },
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}


func login(w http.ResponseWriter, r *http.Request) {
    var creds Credentials
    err := json.NewDecoder(r.Body).Decode(&creds)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    query := struct {
        User []struct {
            ID       int    `graphql:"id"`
            Username string `graphql:"username"`
            Password string `graphql:"password"`
            Email    string `graphql:"email"`
        } `graphql:"users(where: {username: {_eq: $username}})"`
    }{}

    variables := map[string]interface{}{
        "username": graphql.String(creds.Username),
    }

    err = graphqlClient.Query(context.Background(), &query, variables)
    if err != nil || len(query.User) == 0 {
        http.Error(w, "User not found or Hasura is down: "+err.Error(), http.StatusUnauthorized)
        return
    }

    user := query.User[0]
    err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password))
    if err != nil {
        http.Error(w, "Invalid credentials", http.StatusUnauthorized)
        return
    }

    // Generate JWT
    expirationTime := time.Now().Add(100 * time.Minute)
    claims := &Claims{
        UserID:   user.ID,
        Username: user.Username,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: expirationTime.Unix(),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        http.Error(w, "Could not generate token", http.StatusInternalServerError)
        return
    }

    response := map[string]interface{}{
        "token": tokenString,
        "user": map[string]interface{}{
            "id":       strconv.Itoa(user.ID),
            "username": user.Username,
            "email":    user.Email,
        },
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}





func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Unauthorized: No token provided", http.StatusUnauthorized)
			return
		}

		tokenStr := authHeader[len("Bearer "):]
		claims := &Claims{}
		tkn, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})
		if err != nil || !tkn.Valid {
			fmt.Println("Invalid token or error:", err)
			http.Error(w, "Unauthorized: Invalid token", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), "username", claims.Username)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

func welcome(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome!"))
}


func handleFileUpload(w http.ResponseWriter, r *http.Request) {
    err := r.ParseMultipartForm(10 << 20) // Limit file size to 10 MB
    if err != nil {
        http.Error(w, "Unable to parse form", http.StatusBadRequest)
        return
    }

    file, handler, err := r.FormFile("file")
    if err != nil {
        http.Error(w, "Error retrieving file from form-data", http.StatusBadRequest)
        return
    }
    defer file.Close()

    // Check the file type
    buffer := make([]byte, 512)
    if _, err := file.Read(buffer); err != nil {
        http.Error(w, "Unable to read file", http.StatusInternalServerError)
        return
    }
    fileType := http.DetectContentType(buffer)
    if !strings.HasPrefix(fileType, "image/") {
        http.Error(w, "Invalid file type", http.StatusBadRequest)
        return
    }

    // Seek back to the beginning of the file
    file.Seek(0, io.SeekStart)

    // Get the file extension based on the detected file type
    extensions, err := mime.ExtensionsByType(fileType)
    if err != nil || len(extensions) == 0 {
        http.Error(w, "Unable to determine file extension", http.StatusInternalServerError)
        return
    }
    fileExt := extensions[0]

    // Create a unique file name
    fileName := fmt.Sprintf("%s%s", filepath.Base(handler.Filename), fileExt)
    filePath := filepath.Join(uploadPath, fileName)

    // Save the file
    out, err := os.Create(filePath)
    if err != nil {
        http.Error(w, "Unable to create file", http.StatusInternalServerError)
        return
    }
    defer out.Close()

    if _, err := io.Copy(out, file); err != nil {
        http.Error(w, "Unable to save file", http.StatusInternalServerError)
        return
    }

    // Return the file URL
    fileURL := fmt.Sprintf("http://localhost:8081/uploads/%s", fileName)
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    w.Write([]byte(fmt.Sprintf(`{"url":"%s"}`, fileURL)))
}










func createRecipe(w http.ResponseWriter, r *http.Request) {
	var recipe Recipe
	err := json.NewDecoder(r.Body).Decode(&recipe)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Print the creator_id to check its validity
	log.Printf("Received recipe with creator_id: %d\n", recipe.CreatorID)

	// Verify the creator_id exists in the users table
	var userQuery struct {
		User []struct {
			ID int `graphql:"id"`
		} `graphql:"users(where: {id: {_eq: $creatorId}})"`
	}
	userVariables := map[string]interface{}{
		"creatorId": graphql.Int(recipe.CreatorID),
	}
	err = graphqlClient.Query(context.Background(), &userQuery, userVariables)
	if err != nil || len(userQuery.User) == 0 {
		http.Error(w, "Invalid creator_id: does not exist", http.StatusBadRequest)
		return
	}

	mutation := struct {
		InsertRecipes struct {
			Returning []struct {
				ID int `graphql:"id"`
			} `graphql:"returning"`
		} `graphql:"insert_recipes(objects: {title: $title, description: $description, preparation_time: $preparationTime, category_id: $categoryId, creator_id: $creatorId})"`
	}{}

	variables := map[string]interface{}{
		"title":           graphql.String(recipe.Title),
		"description":     graphql.String(recipe.Description),
		"preparationTime": graphql.Int(recipe.PreparationTime),
		"categoryId":      graphql.Int(recipe.CategoryID),
		"creatorId":       graphql.Int(recipe.CreatorID),
	}

	err = graphqlClient.Mutate(context.Background(), &mutation, variables)
	if err != nil || len(mutation.InsertRecipes.Returning) == 0 {
		http.Error(w, "Failed to create recipe: "+err.Error(), http.StatusInternalServerError)
		return
	}

	recipeID := mutation.InsertRecipes.Returning[0].ID

	// Insert ingredients
	for _, ingredient := range recipe.Ingredients {
		ingredientMutation := struct {
			InsertRecipeIngredients struct {
				Returning []struct {
					ID int `graphql:"id"`
				} `graphql:"returning"`
			} `graphql:"insert_ingredients(objects: {recipe_id: $recipeId, ingredient_name: $name, quantity: $quantity, unit: $unit})"`
		}{}

		ingredientVars := map[string]interface{}{
			"recipeId": graphql.Int(recipeID),
			"name":     graphql.String(ingredient.Name),
			"quantity": graphql.String(ingredient.Quantity),
			"unit":     graphql.String(ingredient.Unit),
		}

		err := graphqlClient.Mutate(context.Background(), &ingredientMutation, ingredientVars)
		if err != nil {
			http.Error(w, "Failed to create recipe ingredient: "+err.Error(), http.StatusInternalServerError)
			return
		}
	}

	// Insert steps
	for _, step := range recipe.Steps {
		stepMutation := struct {
			InsertRecipeSteps struct {
				Returning []struct {
					ID int `graphql:"id"`
				} `graphql:"returning"`
			} `graphql:"insert_steps(objects: {recipe_id: $recipeId, step_number: $stepNumber, step_description: $description})"`
		}{}

		stepVars := map[string]interface{}{
			"recipeId":   graphql.Int(recipeID),
			"stepNumber": graphql.Int(step.StepNumber), // Assuming step.StepNumber is set correctly
			"description": graphql.String(step.Description),
		}

		err := graphqlClient.Mutate(context.Background(), &stepMutation, stepVars)
		if err != nil {
			http.Error(w, "Failed to create recipe step: "+err.Error(), http.StatusInternalServerError)
			return
		}
    //insert images
		for _, image := range recipe.Images {
			imageMutation := struct {
				InsertRecipeImages struct {
					Returning []struct {
						ID int `graphql:"id"`
					} `graphql:"returning"`
				} `graphql:"insert_images(objects: {recipe_id: $recipeId, url: $url, is_featured: $isFeatured})"`
			}{}
	
			imageVars := map[string]interface{}{
				"recipeId":   graphql.Int(recipeID),
				"url":        graphql.String(image.URL),
				"isFeatured": graphql.Boolean(image.IsFeatured),
			}
	
			err := graphqlClient.Mutate(context.Background(), &imageMutation, imageVars)
			if err != nil {
				http.Error(w, "Failed to create recipe image: "+err.Error(), http.StatusInternalServerError)
				return
			}
		}
	}
	w.Write([]byte(`{"status":"Recipe created successfully"}`))
}

func getCategoryHandler(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var query struct {
		Categories []struct {
			ID           int    `graphql:"id"`
			CategoryName string `graphql:"category_name"`
		} `graphql:"categories"`
	}

	err := graphqlClient.Query(context.Background(), &query, nil)
	if err != nil {
		log.Printf("Failed to fetch categories from Hasura: %v", err)
		http.Error(w, "Failed to fetch categories", http.StatusInternalServerError)
		return
	}

	response := make([]Category, len(query.Categories))
	for i, c := range query.Categories {
		response[i] = Category{
			ID:   c.ID,
			Name: c.CategoryName,
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func handleAvatarUpload(w http.ResponseWriter, r *http.Request) {
    err := r.ParseMultipartForm(10 << 20) // Limit file size to 10 MB
    if err != nil {
        http.Error(w, "Unable to parse form", http.StatusBadRequest)
        return
    }

    file, handler, err := r.FormFile("file")
    if err != nil {
        http.Error(w, "Error retrieving file from form-data", http.StatusBadRequest)
        return
    }
    defer file.Close()

    // Check the file type
    buffer := make([]byte, 512)
    if _, err := file.Read(buffer); err != nil {
        http.Error(w, "Unable to read file", http.StatusInternalServerError)
        return
    }
    fileType := http.DetectContentType(buffer)
    if !strings.HasPrefix(fileType, "image/") {
        http.Error(w, "Invalid file type", http.StatusBadRequest)
        return
    }

    // Seek back to the beginning of the file
    file.Seek(0, io.SeekStart)

    // Get the file extension based on the detected file type
    extensions, err := mime.ExtensionsByType(fileType)
    if err != nil || len(extensions) == 0 {
        http.Error(w, "Unable to determine file extension", http.StatusInternalServerError)
        return
    }
    fileExt := extensions[0]

    // Create a unique file name
    fileName := fmt.Sprintf("%s%s", filepath.Base(handler.Filename), fileExt)
    filePath := filepath.Join(avatarUploadPath, fileName)

    // Save the file
    out, err := os.Create(filePath)
    if err != nil {
        http.Error(w, "Unable to create file", http.StatusInternalServerError)
        return
    }
    defer out.Close()

    if _, err := io.Copy(out, file); err != nil {
        http.Error(w, "Unable to save file", http.StatusInternalServerError)
        return
    }

    // Return the file URL
    fileURL := fmt.Sprintf("http://localhost:8081/avatars/%s", fileName)
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    w.Write([]byte(fmt.Sprintf(`{"url":"%s"}`, fileURL)))
}

