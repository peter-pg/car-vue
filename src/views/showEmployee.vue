<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="Id" prop="id" />
    <el-table-column label="姓名" prop="name" />
    <el-table-column label="性别" prop="gender" />
    <el-table-column label="身份证" prop="id_card" />
    <el-table-column label="出生日期" prop="birthday" />
    <el-table-column label="电话号码" prop="phone" />
    <el-table-column label="地址" prop="address" />
    <el-table-column label="是否部长" prop="is_head" />
    <el-table-column label="部门" prop="department" />
    <el-table-column label="薪水" prop="salary" />
    <el-table-column align="right">
      <template #default="scope">

        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button
        >
         <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

   <!-- 新增编辑弹框 -->
  <el-dialog
    :title="addtitle"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="refRuleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
     <el-form-item label="是否部长">
       <el-radio v-model="ruleForm.is_head" label="是" size="large">是</el-radio>
    <el-radio v-model="ruleForm.is_head" label="否" size="large">否</el-radio>
    </el-form-item>
      <el-form-item label="部门">
      <el-radio-group v-model="ruleForm.department">
        <el-radio label="机修部" />
        <el-radio label="美容部" />
        <el-radio label="保养部" />
        <el-radio label="运营部" />
      </el-radio-group>
    </el-form-item>
        <el-form-item label="薪水" prop="salary">
        <el-input v-model="ruleForm.salary"></el-input>
      </el-form-item>
    </el-form>

      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisibleConfirm">确 定</el-button>

  </el-dialog>
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
      dialogVisible: false,
      addtitle: "修改信息",
      ruleForm: {
        name: "",
        gender: "",
        id_card: "",
        birthday: "",
        phone: "",
        address:"",
        is_head:"",
        department:  "",
        salary:"",
      },
    };
    
  },  
  
  created() {
    this.getAllEmployees()

  },
  methods: {
    update(){
    this.$router.go(0)
    },


    getAllEmployees() {
      API.getEmployees().then((res) =>{
        this.tableData = res.data.data.items;
      })
    },

    handleDelete(index,row) {
      axios.delete('http://localhost:3000/api/v1/employee/'+row.id).then((res) => {
        this.$notify.error({
          title: '删除失败',
          message: "delete succes",
        }),
        this.update()
      });
    },
     handleEdit(index, row) {
        console.log(index, row.id);
        this.dialogVisible = true;   //显示弹框
        this.ruleForm = row;         //row当前行数据，把当前行的数据赋值给 表单
        this.allid = row.id;         //把id存全局
    },
     dialogVisibleConfirm(){
       // 修改接口
      let id = this.allid
      let params = {
        phone: this.ruleForm.phone,
        address:this.ruleForm.address,
        is_head:this.ruleForm.is_head,
        department:  this.ruleForm.department,
        salary:this.ruleForm.salary,
      }
      axios.put('http://localhost:3000/api/v1/employee/'+id, params).then((res) => {
        if (res.Code>0) {
          this.$notify.error({
            title: '修改失败',
            message: res.msg,
          });
        } else {
    
          this.$notify({
            title: '修改成功',
            message: `您修改的Id${id}`,
            type: 'success',
          });
        }
      }).catch((error) => {
        this.$notify.error({
          title: '网路错误，或者服务器宕机',
          message: error,
        });
      });
    }
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
