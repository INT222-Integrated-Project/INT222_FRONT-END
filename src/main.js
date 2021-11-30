import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './.styles/tailwind.css'
import './.styles/navebar.css'
import './.styles/default.css'
import './.styles/AdminPanel.css'
import './.styles/DefaultNotification.css'
import './.styles/DefaultInput.css'
import './.styles/BodyStyle.css'
import './.styles/ColorPick.css'

require('@/store/subscriber')

store.dispatch('authentication/attempt',localStorage.getItem('accesstoken')).then(() =>{
    createApp(App).use(store).use(router).mount('#app')
})


