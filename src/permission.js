import router, { resetRouter } from './router'
import store from './store'
import createRoutes from '@/utils/createRoutes'
// // 是否有菜单数据
router.beforeEach(async(to, from, next) => {

    const role = sessionStorage.getItem('role')
    const token = sessionStorage.getItem('token')
    if (role && token) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (!store.state.menuList.length) {
                // 通过role生成路由
                const routes = createRoutes(role)
                    //重置路由
                resetRouter()
                    // 动态添加路由
                router.addRoutes(routes)
                next({...to, replace: true })
            }
            next()
        }
    } else {
        if (to.path === '/login') {
            next()
        } else if (to.path === '/register') {
            next()
        } else {
            next('/login')
        }
    }
})