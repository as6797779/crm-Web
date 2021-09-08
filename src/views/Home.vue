<template>
  <div id="home" style="height: 100%">
    <el-container style="height: 100%">
      <el-header style="padding: 0">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                 background-color="#545c64">
          <el-menu-item index="1">主页导航</el-menu-item>
          <el-menu-item index="2">我的工作台</el-menu-item>
          <el-menu-item index="3">消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">饿了么点餐</a></el-menu-item>
          <span class="block" style="position: absolute; right: 80px; text-align: right;line-height: 10px;font-size: x-large;padding-top:5px" ><el-avatar :size="50" :src="circleUrl"></el-avatar></span>
          <span style="position: absolute; right: 20px; text-align: right;line-height: 55px;font-size: x-large">{{logname}}</span>
        </el-menu>
      </el-header>
      <el-main style="padding: 0">
        <div id='nav' style="height: 100%">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
  },
  name: 'Home',
  components: {},
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      logname:this.$store.state.logname,
      circleUrl :"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath); //key = index的值
      console.log(this)
    }
  }
}
</script>

<style scoped>
.el-container {
  width: 100%;
  padding: 0;
}

</style>
