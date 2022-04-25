<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="订单Id" prop="id" />
    <el-table-column label="车牌" prop="car_license" />
    <el-table-column label="服务项目" prop="service_item" />
    <el-table-column label="配件" prop="material" />
    <el-table-column label="成本" prop="material_cost" />
    <el-table-column label="创建时间" prop="created_at" />
    <el-table-column align="right">

        <template #default="scope">
         <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
import { computed, ref } from 'vue'
import * as API from '../api/employee/';
import axios from 'axios';


export default {
  components: {},
  data() {
    return { 
      tableData: [],
      start: 0,
      limit: 20,
      total: 0,
    };
    
  },  
  
  created() {
    this.getAllServiceCosts()
  },
  methods: {
    update(){
    this.$router.go(0)
    },

    getAllServiceCosts() {
      API.getServiceCosts().then((res) =>{
        this.tableData = res.data.data.items;
      })
    },

    handleDelete(index,row) {
      axios.delete('http://localhost:3000/api/v1/service/cost/'+row.id).then((res) => {
        this.$notify({
          title: '删除成功',
          message: "delete succes",
        }),
        this.update()
      });
    },
    },
}


// const handleEdit = (index: number, row: User) => {
//   console.log(index, row)
// }
// const handleDelete = (index: number, row: User) => {
//   console.log(index, row)
// }

</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  overflow: auto;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
/* .tb-edit .el-input {
  display: none;
} */
.tb-edit .current-row .el-input {
  /* display: block; */
}
.tb-edit .current-row .el-input + span {
  /* display: none; */
}
</style>
