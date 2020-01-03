import Vue from 'vue'
import AwesomeSelect from './components/AwesomeSelect.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(AwesomeSelect)
}).$mount('#app')
