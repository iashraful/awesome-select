import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

new Vue({
  useEslint: false,
  render: h => h(App)
}).$mount('#app')
