import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');

/**
 * http拦截器
 * Add a request interceptor
 */
// 请求
axios.interceptors.request.use(function (config) {
	// Do something before request is sent
	return config;
}, function (error) {
// Do something with request error
//    console.log(error.request.data.message,'2223');
	return Promise.reject(error);
});
// 响应
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log(response)
    return response;
}, function (error) {
	// Do something with response error
    console.log(error.response);
    if(error.response.data.infoCode==1002){
        window.location.href="/enterprise/loginOutPDS.htm"
    }else{

    }
    return Promise.reject(error);

});
