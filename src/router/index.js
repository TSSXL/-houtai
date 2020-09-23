import Vue from 'vue'
import VueRouter from 'vue-router'
// import Cookies from 'js-cookie'

import Login from '@/page/login'
import Index from '../page/index.vue'
import Home from '../page/home.vue'
import User from '../page/user.vue'
import Protype from '../page/protype.vue'
import Product from '../page/product.vue'
import Order from '../page/order.vue'
import Lsdots from '../page/lsDots.vue'
import Message from '../page/message.vue'
import People from '../page/people.vue'
import Books from '../page/books.vue'
import Himg from '../page/hImg.vue'


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
        },
            {
                path: '/user',
                component: User
            },
            {
                path: '/protype',
                component: Protype
            },{
                path: '/product',
                component: Product
            },
            {
                path: '/order',
                component: Order
            },
            {
                path: '/lsdots',
                component: Lsdots
            },
            {
                path: '/message',
                component: Message
            },
            {
                path: '/people',
                component: People
            },
            {
                path: '/books',
                component: Books
            },
            {
                path: '/hImg',
                component: Himg
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
