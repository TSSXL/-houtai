import Vue from 'vue'
import VueRouter from 'vue-router'
// import Cookies from 'js-cookie'

import Login from '@/page/login'
import Index from '../page/index.vue'
import Home from '../page/home.vue'
import Exhibits from '../page/exhibits.vue'
import User from '../page/user.vue'
import Pics from '../page/pics.vue'
import Protype from '../page/protype.vue'
import Product from '../page/product.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/login',
        component: Login
    }, {
        path: '/index',
        component: Index,
        redirect: '/home',
        children: [{
            path: '/home',
            component: Home
        }, {
            path: '/exhibits',
            component: Exhibits
        },
            {
                path: '/user',
                component: User
            },
            {
                path: '/pics',
                component: Pics
            },
            {
                path: '/protype',
                component: Protype
            },{
                path: '/product',
                component: Product
            }
        ]
    },
    {
        path: '/',
        redirect: '/login'
    },
]

const router = new VueRouter({
    routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// router.beforeEach((to, from, next) => {
//     if (to.path === '/login' || to.path === '/login-phone') return next()
//     const mId = Cookies.get('mId')
//     if (!mId) return next('/')
//     next()
// })

export default router
