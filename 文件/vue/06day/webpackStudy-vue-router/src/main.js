import Vue from 'vue';
import app from './app.vue';

// 导入 vue-router包
import VueRouter from 'vue-router';

// 手动安装 vue-router
Vue.use(VueRouter);

import router from './router.js'

const vm = new Vue({
    el: '#app',
    render: c => c(app),
    // 因为 render函数 会把页面中的全部内容覆盖，所以我们需要把组件挂载到 app.vue上去
    router: router
})