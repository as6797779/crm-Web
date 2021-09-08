import Vue from 'vue'
import VueRouter from 'vue-router'
import loginApp from '../components/loginApp.vue'
import Home from '@/views/Home.vue'
import nav from '@/views/NavMenu'
import store from '@/store/index'


Vue.use(VueRouter)

const newRouter = () => new VueRouter({
    routes: [{
        path: '/login',
        name: 'login',
        component: loginApp
    },
        {
            path: '/home',
            name: 'home',
            component: Home,
            redirect: '/home/nav',
            children: [
                {
                    path: 'nav',
                    name: 'navmenu',
                    component: nav
                }
            ]
        }],
    mode: 'history'
})
const router = newRouter()

let first = true
// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}


router.beforeResolve((to, from, next) => {

    if (to.path === '/login') {
        return next()
    } //登录不做任何判断
    const token = window.sessionStorage.getItem('token')
    if (to.path === '/'){
        if (store.state.logname && token){
            return next('/home')
        }else {
            return next('/login')
        }
    }

    if (first){
        first = false //确保不会重复进入
        store.commit('renderRouters',router)
        return next(to.path)
    }
    if (to.matched.length ===0) {  //如果未匹配到路由
        from.path? next({ path:from.path}) : next('/');   //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
    }
    // next()
    next()
})

export function resetRouter() {
    const newrouter = newRouter()
    router.matcher = newrouter.matcher
}

export default router
