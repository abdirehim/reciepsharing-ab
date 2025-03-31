// plugins/initAuth.js
import { useAuth } from '~/composables/useAuth'
import { defineNuxtPlugin } from '#app'
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const { token, fetchUser,loading } = useAuth()

  if (process.client && token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    fetchUser()

  }
  loading.value = false;
})

// plugins/initAuth.js
// import { useAuth } from '~/composables/useAuth'
// import axios from 'axios'

// export default async ({  }) => {
//   const { fetchUser, token } = useAuth()

//   if (process.client && token.value) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//     await fetchUser()
//   }
// }

// plugins/initAuth.js
// import { useAuth } from '~/composables/useAuth'

// export default async () => {
//   const { fetchUser, isLoggedIn } = useAuth()

//   if (process.client && isLoggedIn.value) {
//     await fetchUser()
//   }
// }
// import { defineNuxtPlugin } from '#app'
// import { useAuth } from '~/composables/useAuth'

// export default defineNuxtPlugin(nuxtApp => {
//   nuxtApp.hook('app:mounted', () => {
//     const { fetchUser } = useAuth()
//     if (process.client) {
//       fetchUser()
//     }
//   })
// })

// import { defineNuxtPlugin } from '#app'
// import { useAuth } from '~/composables/useAuth'
// import axios from 'axios'

// import { defineNuxtPlugin } from '#app'
// // import { useAuth } from '~/composables/useAuth'
// import axios from 'axios'

// import { useAuth } from '~/composables/useAuth';

// export default defineNuxtPlugin(nuxtApp => {
//   nuxtApp.hook('app:mounted', async () => {
//     const { token, user, loading, fetchUser } = useAuth();
//     if (process.client) {
//       const storedToken = localStorage.getItem('token');
//       const storedUser = localStorage.getItem('user');
//       if (storedToken) {
//         token.value = storedToken;
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
//       }
//       if (storedUser) {
//         user.value = JSON.parse(storedUser);
//       }
//       await fetchUser();
//     }
//     loading.value = false;
//   });
// });



// export default defineNuxtPlugin(nuxtApp => {
//   nuxtApp.hook('app:mounted', async () => {
//     const { token, user, loading } = useAuth();
//     if (process.client) {
//       const storedToken = localStorage.getItem('token');
//       const storedUser = localStorage.getItem('user');
//       if (storedToken) {
//         token.value = storedToken;
//         nuxtApp.$axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
//       }
//       if (storedUser) {
//         user.value = JSON.parse(storedUser);
//       }
//       // Skip fetchUser as there is no /user endpoint
//       // await fetchUser();
//     }
//     loading.value = false;
//   });
// });
