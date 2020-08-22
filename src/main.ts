import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {Timeline, TimelineItem, Card, Col, Row, Button, Drawer, Divider} from 'element-ui'
import './registerServiceWorker';
import './assets/css/index.scss'

Vue.config.productionTip = false;

Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Drawer)
Vue.use(Divider)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
