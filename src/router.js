import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import Director from './views/Director.vue'
import Operator from './views/Operator.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/director',
            name: 'director',
            component: Director
        },
        {
            path: '/operator',
            name: 'operator',
            component: Operator
        },
    ]
})
