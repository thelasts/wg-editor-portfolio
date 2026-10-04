import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import ui from '@nuxt/ui/vue-plugin'

import App from './App.vue'
import csJSON from './locales/cs.json'
import enJSON from './locales/en.json'
import reveal from './directives/reveal'
import './style.css'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    cs: csJSON,
    en: enJSON,
  },
})

createApp(App).use(i18n).use(ui).directive('reveal', reveal).mount('#app')
