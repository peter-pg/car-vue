<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="Id" prop="id" />
    <el-table-column label="姓名" prop="name" />
    <el-table-column label="服务项目" prop="service_item" />
    <el-table-column label="奖金" prop="performance" />
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
    this.ShowEmployeePerformance()
  },
  methods: {
    ShowEmployeePerformance() {
      API.getEmployeePerformance().then((res) =>{
        this.tableData = res.data.data.items;
      })
    },
    // handleDelete() {
    //   API.deleteEmployee().then((res) =>{
    //     scope
    //   })
    // },
  },
}


// const handleEdit = (index: number, row: User) => {
//   console.log(index, row)
// }
// const handleDelete = (index: number, row: User) => {
//   console.log(index, row)
// }

</script>
