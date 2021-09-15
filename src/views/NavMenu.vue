<template>
  <div id='NavMenu' style="height: 100%">
    <el-row class="tac" style="height: 100%">
      <el-col :span="3" style="height: 100%">
        <el-menu default-active="2" class="el-menu-vertical-demo"
                 background-color="#ffffff" style="height: 100%">
          <el-menu-item-group v-for="(parentmodule,i) in parentModules" :key="i" v-bind:title="parentmodule.name"
                              v-show="parentmodule.enable === 1">
            <span v-for="(module,j) in parentmodule.modules" :key="j">
            <el-menu-item v-if="module.enable === 1" :tabindex="module.id"
                          @click="moduleClick($event)">{{ module.name }}</el-menu-item>
            <el-menu-item v-else :tabindex="module.id" disabled>{{ module.name }}</el-menu-item>
            </span>
          </el-menu-item-group>
        </el-menu>
      </el-col>
      <el-col :span="21" style="padding: 15px">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  created() {
    this.$axios.get('menu', {
      params: {logname: this.$store.state.logname},
    }).then(response => {
      this.renderMenu(response)
    }).catch((error) => {
      console.log(error)
    })
  },
  data() {
    return {
      parentModules: []
    }
  },
  methods: {

    // 渲染菜单
    renderMenu(response) {
      if (response.data) {
        this.parentModules = []
        //先载入顶级模块
        if (response.status === 200) {
          for (let module of response.data) {
            //如果没有top,则表示该模块是顶级模块
            if (!module.top) {
              this.parentModules.push({
                name: module.modulename, id: module.moduleid, url: module.url, enable: module.enable, modules: []
              })
            }
          }
          for (let module of response.data) {
            for (let parentModule of this.parentModules) {
              if (module.top === parentModule.id) {
                parentModule.modules.push({
                  name: module.modulename,
                  id: module.moduleid,
                  url: module.url,
                  enable: module.enable,
                  modules: []
                })
                if (module.enable === 1) {
                  let moduleCom = {
                    path: module.url.slice(1),
                    name: 'module' + module.moduleid,
                    parentName: 'navmenu'
                  }
                  this.$store.commit('pushRoute', moduleCom)
                }
              }
            }
          }
        }
      }
    },
    moduleClick(e) {
      let name = 'module' + e.$el.getAttribute('tabindex')
      this.$store.commit('renderRouters', this.$router)
      this.$router.push({
        name: name
      })
    }

  }
}
</script>

<style>

</style>
