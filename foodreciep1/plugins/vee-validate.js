import { defineNuxtPlugin } from '#app'
import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import { defineRule } from 'vee-validate'
import * as rules from '@vee-validate/rules'

// Define all rules from @vee-validate/rules
Object.keys(rules).forEach(rule => {
  if (typeof rules[rule] === 'function') {
    defineRule(rule, rules[rule])
  }
})

export default defineNuxtPlugin(nuxtApp => {
  configure({
    generateMessage: localize('en', {
      messages: {
        required: 'This field is required',
        // Add more custom messages as needed
      },
    }),
  })
})
