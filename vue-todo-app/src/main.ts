import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import custom styles
import './styles/variables.scss'
import './styles/animations.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  config: {
    brand: {
      primary: '#7C806F',    // MOSS
      secondary: '#A78C79',  // CLAY
      accent: '#2D2C2A',     // SLATE
      dark: '#2D2C2A',       // SLATE
      positive: '#7C806F',   // MOSS
      negative: '#A78C79',   // CLAY
      info: '#C7C2BC',       // STONE
      warning: '#A78C79'     // CLAY
    }
  }
})

app.mount('#app')
