<template>
  <div>
    <el-breadcrumb separator="/" style="font-size: large">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/nav'}">导航</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="24" style="margin-top:15px">
      <el-col :span="4">
        <select_dept @deptid="set_deptid"></select_dept>
      </el-col>
      <el-col :span="4">
        <select_position @positionid="set_positionid"></select_position>
      </el-col>
      <el-col :span="4">
      <el-select v-model="select_empstatus" clearable placeholder="请选择">
        <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" v-on:click="search">查询</el-button>
      </el-col>
    </el-row>
    <el-table style="width: 100%" :data="tableData">
      <el-table-column label="序号" width="180" prop="empid"/>
      <el-table-column label="姓名" prop="ename"></el-table-column>
      <el-table-column label="登录名" prop="logname"></el-table-column>
      <el-table-column label="部门" prop="dept.deptname"></el-table-column>
      <el-table-column label="职位" prop="position.pname"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template scope="scope">
          <p v-if="scope.row.status==0">禁用</p>
          <p v-if="scope.row.status==1">启用</p>
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="电子邮箱" prop="email"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[5,10,20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getEmpList()
  },
  name: "account",
  data() {
    return {
      current: 1,
      size: 5,
      tableData: [],
      statusOptions:[
        {value:1,label:'启用'},
        {value:0,label:'禁用'}
      ],
      pages: 0,
      total: 0,
      select_deptid:'',
      select_positionid:'',
      select_empstatus:''
    }
  },
  components:{
    select_dept: () => import("@/components/select/dept"),
    select_position: () => import("@/components/select/position")
  },
  methods: {
    getEmpList(deptid,positionid,empstatus) {
        this.$axios.get('sys/account/empVoList', {
          params: {current: this.current, size: this.size,deptid:deptid,positionid:positionid,empstatus:empstatus}
        }).then(response => {
          if (response.status === 200){
            if (response.data){
              let data = response.data
              this.tableData = response.data.records
              this.total = data.total
              this.pages = data.pages
            }
          }
        }).catch(error => {
          console.log(error)
        })
    },
    handleSizeChange(val) {
      this.size = val
      this.getEmpList(this.select_deptid,this.select_positionid,this.select_empstatus)
    },
    handleCurrentChange(val) {
      this.current = val
      this.getEmpList(this.select_deptid,this.select_positionid,this.select_empstatus)
    },
    set_deptid(e){
      this.select_deptid = e
    },
    set_positionid(e){
      this.select_positionid = e
    },
    search(){
      this.getEmpList(this.select_deptid,this.select_positionid,this.select_empstatus)
    }
  }
}
</script>

<style scoped>

</style>