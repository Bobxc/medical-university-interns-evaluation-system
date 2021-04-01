import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/login/index'),
        meta: {
            hidden: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('@/views/register/index'),
        meta: {
            hidden: true
        }
    }
]


//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new VueRouter({
    base: process.env.BASE_URL,
    routes
})
const locateRouter = createRouter()
export const resetRouter = () => {
    const newRouter = new createRouter()
    locateRouter.matcher = newRouter.matcher
}

export default locateRouter