<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="Id" prop="id" />
    <el-table-column label="配件" prop="material_name" />
    <el-table-column label="厂家" prop="manufacturer" />
    <el-table-column label="单价" prop="unit_price" /> 
    <el-table-column label="数量" prop="number" />
    <el-table-column label="总价" prop="total_price" />
    <el-table-column label="创建时间" prop="created_at" />
    <el-table-column align="right">
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
    this.getAllStores()
  },
  methods: {
    getAllStores() {
      API.getStore().then((res) =>{
        this.tableData = res.data.data.items;
      })
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
