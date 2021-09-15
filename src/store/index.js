import Vue from 'vue'
import Vuex from 'vuex'
import {resetRouter} from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logname: sessionStorage.getItem('state')?(JSON.parse(sessionStorage.getItem('state')).logname)?
        JSON.parse(sessionStorage.getItem('state')).logname:'':'',
    routes: sessionStorage.getItem('state')?(JSON.parse(sessionStorage.getItem('state')).routes)?
        JSON.parse(sessionStorage.getItem('state')).routes:[]:[]
  },
  getters:{
  },
  mutations: {
    setLogname(state,logname){
      state.logname = logname
      sessionStorage.setItem('state',JSON.stringify(state))
    },
    pushRoute(state,rout){
      const routes = state.routes
      let flag = true
      for (let route of routes){
        if (route.name === rout.name){
          flag = false
        }
      }
      if (flag){
        state.routes.push(rout)
        sessionStorage.setItem('state',JSON.stringify(state))
      }
    },
    renderRouters(state,router) {
      resetRouter()
      for (let route of state.routes) {
        let newRoute={
          path: route.path,
          name: route.name,
          parentName: route.parentName,
          component: () => import('@/views/' + route.path + '.vue')
        }
        if (newRoute.parentName) {
          router.addRoute(route.parentName, newRoute)
        } else {
          router.addRoute(newRoute)
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
