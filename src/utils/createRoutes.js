import { asyncRoutes } from '@/router'
import store from '@/store'
export default function createRoutes(role) {
    const routes = [];
    const asyncRoutes = generateRoutesByRule(role)
    store.commit('SAVE_MENU_LIST', asyncRoutes)
    const HomeRoute = {
        path: '/home',
        name: 'Home',
        redirect: asyncRoutes[0] && asyncRoutes[0].path,
        component: () =>
            import ('@/views/home/index'),
        children: asyncRoutes
    }
    routes.push(HomeRoute)
        // 最后添加404页面 否则会在登陆成功后跳到404页面
    routes.push({ path: '*', redirect: '/404' }, )

    return routes
}

function generateRoutesByRule(role) {
    switch (role) {
        case '1':
            return require('@/router/studentAsyncRouter')
        case '2':
            return require('@/router/teacherAsyncRouter')
        default:
            return require('@/router/adminAsyncRouter')
    }
}