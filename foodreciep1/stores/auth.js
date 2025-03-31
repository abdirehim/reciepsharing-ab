// // stores/auth.js
// import { defineStore } from 'pinia'
// import axios from 'axios'

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     token: process.client ? localStorage.getItem('token') : null,
//     user: process.client ? JSON.parse(localStorage.getItem('user') || 'null') : null,
//   }),
//   actions: {
//     async login(username, password) {
//       const response = await axios.post('http://localhost:8081/login', { username, password })
//       this.token = response.data.token
//       this.user = response.data.user
//       this.setAxiosHeader()
//       if (process.client) {
//         localStorage.setItem('token', this.token)
//         localStorage.setItem('user', JSON.stringify(this.user))
//       }
//     },
//     async signup(username, email, password) {
//       await axios.post('http://localhost:8081/signup', { username, email, password })
//     },
//     logout() {
//       this.token = null
//       this.user = null
//       delete axios.defaults.headers.common['Authorization']
//       if (process.client) {
//         localStorage.removeItem('token')
//         localStorage.removeItem('user')
//       }
//     },
//     async fetchUser() {
//       if (this.token) {
//         const response = await axios.get('http://localhost:8081/user')
//         this.user = response.data
//         if (process.client) {
//           localStorage.setItem('user', JSON.stringify(this.user))
//         }
//       }
//     },
//     setAxiosHeader() {
//       if (this.token) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
//       }
//     }
//   }
// })
