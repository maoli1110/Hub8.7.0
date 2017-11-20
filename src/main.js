import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'
import axios from 'axios';
import ElementUI from 'element-ui';
import directive from 'utils/directive.js';
import $ from 'jquery';
// import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/zTree/js/jquery.ztree.all.min.js'
import "babel-polyfill";
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
