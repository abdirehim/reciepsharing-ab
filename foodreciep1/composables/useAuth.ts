// import { ref, computed } from 'vue'
// import axios from 'axios'
// import { useRouter } from 'vue-router'

// export const useAuth = () => {
//   const token = useState<string | null>('token', () => null)
//   const user = useState<any>('user', () => null)
//   const loading = useState<boolean>('loading', () => true)

//   const isLoggedIn = computed(() => !!token.value)

//   const login = async (username: string, password: string) => {
//     const response = await axios.post('http://localhost:8081/login', { username, password })
//     token.value = response.data.token
//     user.value = response.data.user
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//     if (process.client) {
//       localStorage.setItem('token', token.value || '')
//       localStorage.setItem('user', JSON.stringify(user.value))
//     }
//   }

//   const signup = async (username: string, email: string, password: string) => {
//     await axios.post('http://localhost:8081/signup', { username, email, password })
//   }

//   const router = useRouter()
//   const logout = () => {
//     token.value = null
//     user.value = null
//     delete axios.defaults.headers.common['Authorization']
//     if (process.client) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//     }
//     router.push('/login')
//   }

//   const fetchUser = async () => {
//     // Skip the fetch user part as you don't have a /user endpoint
//     // if (token.value) {
//     //   try {
//     //     const response = await axios.get('http://localhost:8081/user')
//     //     user.value = response.data
//     //     if (process.client) {
//     //       localStorage.setItem('user', JSON.stringify(user.value))
//     //     }
//     //   } catch (error: unknown) {
//     //     console.error('Failed to fetch user:', error)
//     //     if ((error as any)?.response?.status === 404) {
//     //       console.warn('User endpoint not found')
//     //     }
//     //   }
//     // }
//     loading.value = false
//   }

//   return {
//     token,
//     user,
//     loading,
//     isLoggedIn,
//     login,
//     signup,
//     logout,
//     fetchUser,
//   }
// }





// import { ref, computed } from 'vue'
// import axios from 'axios'
// import { useRouter } from 'vue-router'

// export const useAuth = () => {
//   const token = useState<string | null>('token', () => null)
//   const user = useState<any>('user', () => null)
//   const loading = useState<boolean>('loading', () => true)

//   const isLoggedIn = computed(() => !!token.value)

//   const login = async (username: string, password: string) => {
//     const response = await axios.post('http://localhost:8081/login', { username, password })
//     token.value = response.data.token
//     user.value = response.data.user
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//     if (process.client) {
//       localStorage.setItem('token', token.value || '')
//       localStorage.setItem('user', JSON.stringify(user.value))
//     }
//   }

//   const signup = async (username: string, email: string, password: string) => {
//     await axios.post('http://localhost:8081/signup', { username, email, password })
//   }

//   const router = useRouter()
//   const logout = () => {
//     token.value = null
//     user.value = null
//     delete axios.defaults.headers.common['Authorization']
//     if (process.client) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//     }
//     router.push('/login')
//   }

//   const fetchUser = async () => {
//     if (token.value) {
//       try {
//         const response = await axios.get('http://localhost:8081/user')
//         user.value = response.data
//         if (process.client) {
//           localStorage.setItem('user', JSON.stringify(user.value))
//         }
//       } catch (error: unknown) {
//         console.error('Failed to fetch user:', error)
//         if ((error as any)?.response?.status === 404) {
//           console.warn('User endpoint not found')
//         }
//       }
//     }
//     loading.value = false
//   }

//   return {
//     token,
//     user,
//     loading,
//     isLoggedIn,
//     login,
//     signup,
//     logout,
//     fetchUser,
//   }
// }



// composables/useAuth.ts
// import { ref, computed } from 'vue'
// import axios from 'axios'
// import { useRouter } from 'vue-router'

// const token = ref<string | null>(process.client ? localStorage.getItem('token') : null)
// const user = ref<Record<string, any> | null>(process.client ? JSON.parse(localStorage.getItem('user') || 'null') : null)

// export const useAuth = () => {
//   const isLoggedIn = computed(() => !!token.value)

//   const login = async (username: string, password: string) => {
//     const response = await axios.post('http://localhost:8081/login', { username, password })
//     token.value = response.data.token
//     user.value = response.data.user
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//     if (process.client) {
//       localStorage.setItem('token', token.value || '')
//       localStorage.setItem('user', JSON.stringify(user.value))
//     }
//   }

//   const signup = async (username: string, email: string, password: string) => {
//     await axios.post('http://localhost:8081/signup', { username, email, password })
//   }

//   const router = useRouter()
//   const logout = () => {
//     token.value = null
//     user.value = null
//     delete axios.defaults.headers.common['Authorization']
//     if (process.client) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//     }
//     router.push('/login')
//   }

//   const fetchUser = async () => {
//     try {
//       if (token.value) {
//         const response = await axios.get('http://localhost:8081/user')
//         user.value = response.data
//         if (process.client) {
//           localStorage.setItem('user', JSON.stringify(user.value))
//         }
//       }
//     } catch (error) {
//       console.error("Failed to fetch user:", error)
//       user.value = null
//       if (process.client) {
//         localStorage.removeItem('user')
//       }
//     }
//   }

//   return {
//     token,
//     user,
//     isLoggedIn,
//     login,
//     signup,
//     logout,
//     fetchUser,
//   }
// }



// composables/useAuth.js (or useAuth.ts)
// composables/useAuth.ts
// import { ref, computed } from 'vue'
// import axios, { AxiosError } from 'axios'
// import { useRouter } from 'vue-router'

// const token = ref<string | null>(process.client ? localStorage.getItem('token') : null)
// const user = ref<any>(process.client ? JSON.parse(localStorage.getItem('user') || 'null') : null)
// const isLoading = ref<boolean>(true)  // Add a loading state

// export const useAuth = () => {
//   const isLoggedIn = computed(() => !!token.value)

//   const login = async (username: string, password: string) => {
//     const response = await axios.post('http://localhost:8081/login', { username, password })
//     token.value = response.data.token
//     user.value = response.data.user
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//     if (process.client) {
//       localStorage.setItem('token', token.value || '')
//       localStorage.setItem('user', JSON.stringify(user.value))
//     }
//   }

//   const signup = async (username: string, email: string, password: string) => {
//     await axios.post('http://localhost:8081/signup', { username, email, password })
//   }

//   const router = useRouter()
//   const logout = () => {
//     token.value = null
//     user.value = null
//     delete axios.defaults.headers.common['Authorization']
//     if (process.client) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//     }
//     router.push('/login')
//   }

//   const fetchUser = async (retryCount: number = 3) => {
//     if (token.value) {
//       try {
//         isLoading.value = true
//         const response = await axios.get('http://localhost:8081/user')
//         user.value = response.data
//         if (process.client) {
//           localStorage.setItem('user', JSON.stringify(user.value))
//         }
//       } catch (error: unknown) {
//         if (axios.isAxiosError(error)) {
//           if (error.response && error.response.status === 404) {
//             console.warn('User endpoint not found')
//           } else {
//             console.error('Error fetching user:', error)
//             // Retry logic
//             if (retryCount > 0) {
//               console.log(`Retrying... (${retryCount} attempts left)`)
//               await fetchUser(retryCount - 1)
//             }
//           }
//         } else {
//           console.error('Unknown error:', error)
//         }
//         // Clear user data if fetching user fails
//         user.value = null
//         if (process.client) {
//           localStorage.removeItem('user')
//         }
//       } finally {
//         isLoading.value = false
//       }
//     }
//   }

//   return {
//     token,
//     user,
//     isLoggedIn,
//     isLoading,
//     login,
//     signup,
//     logout,
//     fetchUser,
//   }
// }


// composables/useAuth.js
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const token = ref(process.client ? localStorage.getItem('token') || null : null)
const storedUser = process.client ? localStorage.getItem('user') : null
const user = ref(storedUser ? (storedUser !== 'undefined' ? JSON.parse(storedUser) : null) : null)


export const useAuth = () => {
  const isLoggedIn = computed(() => !!token.value)
  const loading = ref(false)
  const router = useRouter()

  const login = async (username: any, password: any) => {
    try {
      loading.value = true
      const response = await axios.post('http://localhost:8081/login', { username, password })
      token.value = response.data.token
      user.value = response.data.user
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      if (process.client) {
        localStorage.setItem('token', token.value || '')
        localStorage.setItem('user', JSON.stringify(user.value))
      }
      router.push('/')  // Redirect to home page
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      loading.value = false
    }
  }

  const signup = async (username: any, email: any, password: any) => {
    try {
      loading.value = true
      const response = await axios.post('http://localhost:8081/signup', { username, email, password })
      console.log('Signup response:', response.data)
      token.value = response.data.token
      user.value = response.data.user
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      if (process.client) {
        localStorage.setItem('token', token.value || '')
        localStorage.setItem('user', JSON.stringify(user.value))
      }
      router.push('/')  // Redirect to home page
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data || 'Signup failed';
          alert(`Error: ${errorMessage}`);
      } else {
          console.error('Signup failed:', error);
          alert('An unexpected error occurred');
      }
    }
  }
  
  const logout = () => {
    token.value = null
    user.value = null
    delete axios.defaults.headers.common['Authorization']
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    router.push('/login')
  }
  const fetchUser = async () => {
          loading.value = true
        if (token.value) {
          const response = await axios.get('http://localhost:8081/user')
          user.value = response.data
          if (process.client) {
            localStorage.setItem('user', JSON.stringify(user.value))
          }
        }
      }

  return {
    token,
    user,
    isLoggedIn,
    loading,
    login,
    signup,
    logout,
    fetchUser
  }
}




// composables/useAuth.js
// import { ref, computed } from 'vue'
// import axios from 'axios'
// import { useRouter } from 'vue-router'

// const token = ref(process.client ? localStorage.getItem('token') || null : null)

// // Only attempt to parse if the value is a non-empty string
// const storedUser = process.client ? localStorage.getItem('user') : null
// const user = ref(storedUser ? (storedUser !== 'undefined' ? JSON.parse(storedUser) : null) : null)

// export const useAuth = () => {
//   const isLoggedIn = computed(() => !!token.value)
//   const loading = ref(false)

//   const router = useRouter()

//   const login = async (username: any, password: any) => {
//     try {
//       loading.value = true
//       const response = await axios.post('http://localhost:8081/login', { username, password })
//       token.value = response.data.token
//       user.value = response.data.user
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//       if (process.client) {
//         localStorage.setItem('token', token.value || '')
//         localStorage.setItem('user', JSON.stringify(user.value))
//       }
//       router.push('/')  // Redirect to home page
//     } catch (error) {
//       console.error('Login failed:', error)
//     } finally {
//       loading.value = false
//     }
//   }

//   const signup = async (username: any, email: any, password: any) => {
//     try {
//       loading.value = true
//       const response = await axios.post('http://localhost:8081/signup', { username, email, password })
//       token.value = response.data.token
//       user.value = response.data.user
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//       if (process.client) {
//         localStorage.setItem('token', token.value || '')
//         localStorage.setItem('user', JSON.stringify(user.value))
//       }
//       router.push('/')  // Redirect to home page
//     } catch (error) {
//       console.error('Signup failed:', error)
//     } finally {
//       loading.value = false
//     }
//   }
  
//   const logout = () => {
//     token.value = null
//     user.value = null
//     delete axios.defaults.headers.common['Authorization']
//     if (process.client) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//     }
//     router.push('/login')
//   }

//   return {
//     token,
//     user,
//     isLoggedIn,
//     loading,
//     login,
//     signup,
//     logout,
//   }
// }



// composables/useAuth.js
// import { ref, computed } from 'vue'
// import axios from 'axios'
// import { useRouter } from 'vue-router'

// const token = ref(process.client ? localStorage.getItem('token') || null : null)

// // Only attempt to parse if the value is a non-empty string
// const storedUser = process.client ? localStorage.getItem('user') : null
// const user = ref(storedUser ? (storedUser !== 'undefined' ? JSON.parse(storedUser) : null) : null)

// export const useAuth = () => {
//   const isLoggedIn = computed(() => !!token.value)

//   const login = async (username: any, password: any) => {
//     try {
//       const response = await axios.post('http://localhost:8081/login', { username, password })
//       token.value = response.data.token
//       user.value = response.data.user
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//       if (process.client) {
//         localStorage.setItem('token', token.value || '')
//         localStorage.setItem('user', JSON.stringify(user.value))
//       }
//     } catch (error) {
//       console.error('Login failed:', error)
//     }
//   }

//   const signup = async (username: any, email: any, password: any) => {
//     try {
//       const response = await axios.post('http://localhost:8081/signup', { username, email, password })
//       token.value = response.data.token
//       user.value = response.data.user
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//       if (process.client) {
//         localStorage.setItem('token', token.value || '')
//         localStorage.setItem('user', JSON.stringify(user.value))
//       }
//     } catch (error) {
//       console.error('Signup failed:', error)
//     }
//   }
  
//   const router = useRouter()
//   const logout = () => {
//     token.value = null
//     user.value = null
//     delete axios.defaults.headers.common['Authorization']
//     if (process.client) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//     }
//     router.push('/login')
//   }

//   return {
//     token,
//     user,
//     isLoggedIn,
//     login,
//     signup,
//     logout,
//   }
// }


// composables/useAuth.js
// import { ref, computed } from 'vue'
// import axios from 'axios'
// import { useRouter } from 'vue-router'

// const token = ref(process.client ? localStorage.getItem('token') || null : null)
// const storedUser = process.client ? localStorage.getItem('user') : null
// const user = ref(storedUser ? JSON.parse(storedUser) : null)

// export const useAuth = () => {
//   const isLoggedIn = computed(() => !!token.value)

//   const login = async (username: string, password: string) => {
//     try {
//       const response = await axios.post('http://localhost:8081/login', { username, password })
//       token.value = response.data.token
//       user.value = response.data.user
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//       if (process.client) {
//         localStorage.setItem('token', token.value || '')
//         localStorage.setItem('user', JSON.stringify(user.value))
//       }
//     } catch (error) {
//       console.error('Login failed:', error)
//     }
//   }

//   const signup = async (username: string, email: string, password: string) => {
//     try {
//       const response = await axios.post('http://localhost:8081/signup', { username, email, password })
//       token.value = response.data.token
//       user.value = response.data.user
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//       if (process.client) {
//         localStorage.setItem('token', token.value || '')
//         localStorage.setItem('user', JSON.stringify(user.value))
//       }
//     } catch (error) {
//       console.error('Signup failed:', error)
//     }
//   }
  
//   const router = useRouter()
//   const logout = () => {
//     token.value = null
//     user.value = null
//     delete axios.defaults.headers.common['Authorization']
//     if (process.client) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//     }
//     router.push('/login')
//   }

//   return {
//     token,
//     user,
//     isLoggedIn,
//     login,
//     signup,
//     logout,
//   }
// }



// composables/useAuth.js
// import { ref, computed } from 'vue'
// import axios from 'axios'
// import { useRouter } from 'vue-router'

// const token = ref(process.client ? localStorage.getItem('token') || null : null)
// const user = ref(process.client ? JSON.parse(localStorage.getItem('user') || 'null') || null : null)

// export const useAuth = () => {
//   const isLoggedIn = computed(() => !!token.value)

//   const login = async (username: string, password: string) => {
//     try {
//       const response = await axios.post('http://localhost:8081/login', { username, password })
//       token.value = response.data.token
//       user.value = response.data.user
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//       if (process.client) {
//         localStorage.setItem('token', token.value || '')
//         localStorage.setItem('user', JSON.stringify(user.value))
//       }
//     } catch (error) {
//       console.error('Login failed:', error)
//     }
//   }

//   const signup = async (username: string, email: string, password: string) => {
//     try {
//       const response = await axios.post('http://localhost:8081/signup', { username, email, password })
//       token.value = response.data.token
//       user.value = response.data.user
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//       if (process.client) {
//         localStorage.setItem('token', token.value || '')
//         localStorage.setItem('user', JSON.stringify(user.value))
//       }
//     } catch (error) {
//       console.error('Signup failed:', error)
//     }
//   }
  
//   const router = useRouter()
//   const logout = () => {
//     token.value = null
//     user.value = null
//     delete axios.defaults.headers.common['Authorization']
//     if (process.client) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//     }
//     router.push('/login')
//   }

//   return {
//     token,
//     user,
//     isLoggedIn,
//     login,
//     signup,
//     logout,
//   }
// }




// composables/useAuth.js
// import { ref, computed } from 'vue'
// import axios from 'axios'
// import { useRouter } from 'vue-router'

// const token = ref(process.client ? localStorage.getItem('token') || null : null)
// const user = ref(process.client ? JSON.parse(localStorage.getItem('user') || 'null') || null : null)


// export const useAuth = () => {
//   const isLoggedIn = computed(() => !!token.value)

//   const login = async (username: string, password: string) => {
//     try {
//       const response = await axios.post('http://localhost:8081/login', { username, password })
//       token.value = response.data.token
//       user.value = response.data.user
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//       if (process.client) {
//         localStorage.setItem('token', token.value || '')
//         localStorage.setItem('user', JSON.stringify(user.value))
//       }
//     } catch (error) {
//       console.error('Login failed:', error)
//     }
//   }

//   const signup = async (username: string, email: string, password: string) => {
//     try {
//       const response = await axios.post('http://localhost:8081/signup', { username, email, password })
//       token.value = response.data.token
//       user.value = response.data.user
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//       if (process.client) {
//         localStorage.setItem('token', token.value || '')
//         localStorage.setItem('user', JSON.stringify(user.value))
//       }
//     } catch (error) {
//       console.error('Signup failed:', error)
//     }
//   }
  
//   const router = useRouter()
//   const logout = () => {
//     token.value = null
//     user.value = null
//     delete axios.defaults.headers.common['Authorization']
//     if (process.client) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//     }
//     router.push('/login')
//   }

//   return {
//     token,
//     user,
//     isLoggedIn,
//     login,
//     signup,
//     logout,
//   }
// }











// composables/useAuth.js
// import { ref, computed } from 'vue'
// import axios from 'axios'
// import { useRouter } from 'vue-router'



// const token = ref(process.client ? localStorage.getItem('token') : null)
// const user = ref(process.client ? JSON.parse(localStorage.getItem('user') || 'null') : null)

// export const useAuth = () => {
//   const isLoggedIn = computed(() => !!token.value)

//   const login = async (username: string, password: string) => {
//     const response = await axios.post('http://localhost:8081/login', { username, password })
//     token.value = response.data.token
//     user.value = response.data.user
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//     if (process.client) {
//       localStorage.setItem('token', token.value||'')
//       localStorage.setItem('user', JSON.stringify(user.value))
//     }
//   }

//   const signup = async (username: string, email: string, password: string) => {
//     const response =await axios.post('http://localhost:8081/signup', { username, email, password })
//     token.value = response.data.token
//     user.value = response.data.user
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//     if (process.client) {
//       localStorage.setItem('token', token.value||'')
//       localStorage.setItem('user', JSON.stringify(user.value))
//     }
//   }
  
//   const router = useRouter()
//   const logout = () => {
//     token.value = null
//     user.value = null
//     delete axios.defaults.headers.common['Authorization']
//     if (process.client) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//     }
//     router.push('/login')
//   }


//   // const fetchUser = async () => {
//   //   if (token.value) {
//   //     const response = await axios.get('http://localhost:8081/user')
//   //     user.value = response.data
//   //     if (process.client) {
//   //       localStorage.setItem('user', JSON.stringify(user.value))
//   //     }
//   //   }
//   // }

//   return {
//     token,
//     user,
//     isLoggedIn,
//     login,
//     signup,
//     logout,
   
// }
// }





// import { ref, watch } from 'vue'
// import axios from 'axios'

// const token = ref<string | null>(null)
// const user = ref<any | null>(null)

// Check if localStorage is available (browser environment)
// if (typeof window !== 'undefined') {
//   token.value = localStorage.getItem('token')
//   user.value = JSON.parse(localStorage.getItem('user') || 'null')
  
//   if (token.value) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//   }
//   if (savedUser) {
//     user.value = JSON.parse(savedUser)
//   }
// }
// if (typeof window !== 'undefined') {
//   const savedToken = localStorage.getItem('token')
//   const savedUser = localStorage.getItem('user')
  
//   if (savedToken) {
//     token.value = savedToken
//     axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
//   }
  
//   if (savedUser) {
//     user.value = JSON.parse(savedUser)
//   }
// }

// export const useAuth = () => {
//   const login = async (username: string, password: string) => {
//     const response = await axios.post('http://localhost:8081/login', { username, password })
//     token.value = response.data.token
//     user.value = response.data.user // Assuming the user info is returned from the server
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('token', token.value || '')
//       localStorage.setItem('user', JSON.stringify(user.value))
//     }
//   }

//   const signup = async (username: string, email: string, password: string) => {
//     await axios.post('http://localhost:8081/signup', { username, email, password })
//   }

//   const logout = () => {
//     token.value = null
//     user.value = null
//     delete axios.defaults.headers.common['Authorization']
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//     }
//   }

//   const getUser = () => {
//     return user.value
//   }

//   watch([token, user], () => {
//     if (token.value) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//     } else {
//       delete axios.defaults.headers.common['Authorization']
//     }
//   })

//   return { token, user, login, signup, logout, getUser }
// }
