// // store/index.js
// import Vuex from 'vuex'
// import axios from 'axios'

// const createStore = () => {
//   return new Vuex.Store({
//     state: {
//       token: null,
//       user: null,
//     },
//     mutations: {
//       setToken(state, token) {
//         state.token = token
//       },
//       setUser(state, user) {
//         state.user = user
//       },
//       clearAuthData(state) {
//         state.token = null
//         state.user = null
//       },
//     },
//     actions: {
//       async login({ commit }, authData) {
//         const response = await axios.post('http://localhost:8081/login', {
//           username: authData.username,
//           password: authData.password,
//         })
//         commit('setToken', response.data.token)
//         commit('setUser', response.data.user)
//         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
//         localStorage.setItem('token', response.data.token)
//         localStorage.setItem('user', JSON.stringify(response.data.user))
//       },
//       async signup({ commit }, authData) {
//         await axios.post('http://localhost:8081/signup', {
//           username: authData.username,
//           email: authData.email,
//           password: authData.password,
//         })
//       },
//       logout({ commit }) {
//         commit('clearAuthData')
//         delete axios.defaults.headers.common['Authorization']
//         localStorage.removeItem('token')
//         localStorage.removeItem('user')
//       },
//       async fetchUser({ commit, state }) {
//         if (state.token) {
//           const response = await axios.get('http://localhost:8081/user')
//           commit('setUser', response.data)
//           localStorage.setItem('user', JSON.stringify(response.data))
//         }
//       },
//       initAuth({ commit }) {
//         const token = localStorage.getItem('token')
//         if (token) {
//           const user = JSON.parse(localStorage.getItem('user'))
//           commit('setToken', token)
//           commit('setUser', user)
//           axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//         }
//       },
//     },
//     getters: {
//       isAuthenticated(state) {
//         return state.token != null
//       },
//       getUser(state) {
//         return state.user
//       },
//     },
//   })
// }

// export default createStore
