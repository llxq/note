// 入口文件
// console.log('ok');


// 在webpack中使用 Vue
import Vue from 'vue';
// import Vue from '../node_modules/vue/dist/vue.js'

// 导入 login 组件
import login from './login.vue'

const vm = new Vue({
    el: '#app',
    data: {
        msg: 520
    },
    // render: function (createElement) {
    //     // 在 webpack 中，如果想要通过 vue，把一个组件放到页面中去展示，只能使用 render 函数去渲染
    //     return createElement(login)
    // }
    
    // 简写
    render: c => c(login)
})