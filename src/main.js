import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './plugins/element'
import './assets/font/iconfont.css'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
axios.defaults.baseURL = 'https://cn-flt.com/';
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
