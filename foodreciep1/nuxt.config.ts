import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  alias: {
    assets: '/<rootDir>/assets',
  },

  css: ['~/assets/main.scss'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxtjs/apollo', ],

  plugins: [
    '~/plugins/apollo-client.js',
    '~/plugins/initAuth.js',
    '~/plugins/axios.js',
    '~/plugins/vee-validate.js',
    '~/plugins/toast.js',
  ],

  runtimeConfig: {
    public: {
      hasuraAdminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:8080/v1/graphql',
        httpLinkOptions: {
          headers: {
            Authorization: `Bearer ${process.server ? process.env.HASURA_GRAPHQL_JWT_SECRET : ''}`,
          },
        },
      },
    },
  },

 
  compatibilityDate: '2024-07-15',
});







// import { defineNuxtConfig } from "nuxt/config";


// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   devtools: { enabled: true },

//   alias:{
//     assets:"/<rootDir>/assets",
//   },

//   css: ['~/assets/main.scss'],

//   postcss: {
//     plugins: {
//       tailwindcss: {},
//       autoprefixer: {},
//     },
//   },

//   modules: ['@nuxtjs/apollo'],

//   plugins: [
//     '~/plugins/apollo-client.js',
//     '~/plugins/initAuth.js',
//     // '@/plugins/vee-validate.js',
    
//   ],

//   runtimeConfig: {
//     public: {
//       hasuraAdminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET
//     }
//   },

//   // apollo: {
//   //   clients: {
//   //     default: {
//   //       httpEndpoint: 'http://localhost:8080/v1/graphql',
//   //       httpLinkOptions: {
//   //         headers: {
//   //           'Authorization': `Bearer ${process.server ? process.env.HASURA_GRAPHQL_JWT_SECRET : ''}`
//   //         }
//   //       }
//   //     }
//   //   }
//   // }


//   apollo: {
//     clients: {
//       default: {
//          httpEndpoint: 'http://localhost:8080/v1/graphql',
//          httpLinkOptions: {
//                   headers: {
//                     'Authorization': `Bearer ${process.server ? process.env.HASURA_GRAPHQL_JWT_SECRET : ''}`
//                   }
//                 }
        
//       }
//     }
//   },

//   compatibilityDate: '2024-07-15'
// })