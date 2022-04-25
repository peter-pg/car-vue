<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="Id" prop="id" />
    <el-table-column label="用户名字" prop="user_name" />
    <el-table-column label="用户电话" prop="user_phone" />
    <el-table-column label="车牌号" prop="car_license" />
    <el-table-column label="品牌" prop="car_brand" />
    <el-table-column label="服务次数" prop="service_nums" />
    <el-table-column label="总消费" prop="consumption" />
    <el-table-column label="会员" prop="is_vip" />
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
      <el-form-item label="用户电话" prop="user_phone">
        <el-input v-model="ruleForm.user_phone"></el-input>
      </el-form-item>
      <el-form-item label="是否会员">
       <el-radio v-model="ruleForm.is_vip" label="是" size="large">是</el-radio>
    <el-radio v-model="ruleForm.is_vip" label="否" size="large">否</el-radio>
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
        user_phone: "",
        is_vip: "",
      },
    };
  },  
  
  created() {
    this.getAllGuests()
  },
  methods: {
    update(){
    this.$router.go(0)
    },

    getAllGuests() {
      API.getGuests().then((res) =>{
        this.tableData = res.data.data.items;
      })
    },

    handleDelete(index,row) {
    axios.delete('http://localhost:3000/api/v1/guest/'+row.id).then((res) => {
      this.$notify({
        title: '删除成功',
        message: "delete success",
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
        user_phone: this.ruleForm.user_phone,
        is_vip:this.ruleForm.is_vip,
      }
      axios.put('http://localhost:3000/api/v1/guest/'+id, params).then((res) => {
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
