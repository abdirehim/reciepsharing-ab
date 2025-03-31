// <!-- <template>
// <div class="bg-blue-200 h-screen flex flex-col justify-center items-center">
// <div class="bg-blue-500 min-h-60  flex flex-col justify-center items-center w-80 h-80">
//   <h2>Login</h2>
//   <form  class="flex flex-col m-4" @submit.prevent="login">
//     <input class="m-6" v-model="email" type="email" placeholder="Email" required />
//     <input class="m-6" v-model="password" type="password" placeholder="Password" required />
//     <button  class="bg-blue-800  text-white" type="submit">Login</button>
//     <p>if you are not register register here!</p><NuxtLink to="/register" class="text-red-600">register</NuxtLink>
  
// </form>
// </div>
// </div>
// </template>-->





// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     updated_at TIMESTAMPTZ DEFAULT NOW()
// );

// CREATE TABLE categories (
//     id SERIAL PRIMARY KEY,
//     category_name VARCHAR(100) NOT NULL,
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     updated_at TIMESTAMPTZ DEFAULT NOW()
// );

// CREATE TABLE recipes (
//     id SERIAL PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     description TEXT NOT NULL,
//     preparation_time INT NOT NULL,
//     category_id INT REFERENCES categories(id),
//     creator_id INT REFERENCES users(id),
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     updated_at TIMESTAMPTZ DEFAULT NOW()
// );
// CREATE TABLE ingredients (
//     id SERIAL PRIMARY KEY,
//     recipe_id INT REFERENCES recipes(id),
//     ingredient_name VARCHAR(100) NOT NULL,
//     quantity VARCHAR(50) NOT NULL,
//     unit VARCHAR(50) NOT NULL,
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     updated_at TIMESTAMPTZ DEFAULT NOW()
// );

// CREATE TABLE steps (
//     id SERIAL PRIMARY KEY,
//     recipe_id INT REFERENCES recipes(id),
//     step_number INT NOT NULL,
//     step_description TEXT NOT NULL,
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     updated_at TIMESTAMPTZ DEFAULT NOW()
// );

// CREATE TABLE likes (
//     id SERIAL PRIMARY KEY,
//     user_id INT REFERENCES users(id),
//     recipe_id INT REFERENCES recipes(id),
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     UNIQUE (user_id, recipe_id)
// );
// CREATE TABLE bookmarks (
//     id SERIAL PRIMARY KEY,
//     user_id INT REFERENCES users(id),
//     recipe_id INT REFERENCES recipes(id),
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     UNIQUE (user_id, recipe_id)
// );

// CREATE TABLE comments (
//     id SERIAL PRIMARY KEY,
//     user_id INT REFERENCES users(id),
//     recipe_id INT REFERENCES recipes(id),
//     comment TEXT NOT NULL,
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     updated_at TIMESTAMPTZ DEFAULT NOW()
// );

// CREATE TABLE ratings (
//     id SERIAL PRIMARY KEY,
//     user_id INT REFERENCES users(id),
//     recipe_id INT REFERENCES recipes(id),
//     rating INT CHECK (rating >= 1 AND rating <= 5),
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     updated_at TIMESTAMPTZ DEFAULT NOW(),
//     UNIQUE (user_id, recipe_id)
// );
// CREATE TABLE recipe_images (
//     id SERIAL PRIMARY KEY,
//     recipe_id INT REFERENCES recipes(id),
//     image_data BYTEA NOT NULL,
//     is_featured BOOLEAN DEFAULT FALSE
// );
