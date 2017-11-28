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
import VueScrollbar from'../static/scroll/vue-scrollbar.vue'
import "babel-polyfill";
import '../static/js/jbase64';
Vue.use(ElementUI);
Vue.component('vue-scrollbar', VueScrollbar)
Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
