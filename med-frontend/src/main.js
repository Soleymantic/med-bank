 import "bootstrap/dist/css/bootstrap.css"
import Vue from 'vue'
import App from './App.vue'
import router from './router';
import VueResource from 'vue-resource';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faPills, faSuitcase, faCopy, faCalendar,faHeartbeat, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPills,faHeartbeat,faMapMarkerAlt)
library.add(faSuitcase)
library.add(faCopy)
library.add(faCalendar)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueResource);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

import "bootstrap/dist/js/bootstrap.js"
