import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './plugins/element'
import './assets/font/iconfont.css'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { webUrl } from '../public/baseUrl'
Vue.use(mavonEditor);

Vue.use(ElementUI);
axios.defaults.baseURL = webUrl;
Vue.prototype.$axios = axios;
Vue.prototype.$webUrl = webUrl;

Vue.config.productionTip = false;
Vue.config.silent = true;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
