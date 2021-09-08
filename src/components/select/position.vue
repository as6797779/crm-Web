<template>
  <el-select v-model="value" clearable placeholder="请选择" @change="click">
    <el-option
        v-for="item in options"
        :key="item.positionid"
        :label="item.pname"
        :value="item.positionid">
    </el-option>
  </el-select>
</template>

<script>
export default {
  created() {
    let getDeptList = async () => {
      this.$axios.get('select/position/list',{headers:{token:window.sessionStorage.getItem('token')}})
          .then(response =>{
            if (response.status ===200 && response.data){
              this.options = response.data
            }
          }).catch(error=>{
        console.log(error)})
    }
    getDeptList()
  },
  name:'select_dept',
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods:{
    click(e){
      this.$emit('positionid',e)
    }
  }
}
</script>