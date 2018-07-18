import VueRouter from 'vue-router';

// 导入组件
import Account from './template/Account.vue';
import goodList from './template/goodList.vue';

// 导入 子组件
import login from './template/children/login.vue'
import register from './template/children/register.vue'

export default new VueRouter({
    routes: [{
            path: '/Account',
            component: Account,
            children: [{
                    path: 'login',
                    component: login
                },
                {
                    path: 'register',
                    component: register
                }
            ]
        },
        {
            path: '/goodList',
            component: goodList
        }
    ]
})