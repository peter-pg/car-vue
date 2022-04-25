<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="Id" prop="id" />
    <el-table-column label="用户名字" prop="user_name" />
    <el-table-column label="用户电话" prop="user_phone" />
    <el-table-column label="车牌号" prop="car_license" />
    <el-table-column label="品牌" prop="car_brand" />
    <el-table-column label="服务项目" prop="service_item" />
    <el-table-column label="配件" prop="material" />
    <el-table-column label="金额" prop="cost" />
    <el-table-column label="施工人" prop="employee" />
    <el-table-column label="操作人" prop="operator" />
    <el-table-column align="right">
      <template #default="scope">
        <el-button size="small" @click="handleCreate(scope.$index, scope.row)"
          >支出</el-button
        >
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
      <el-form-item label="服务项目" prop="service_item">
        <el-input v-model="ruleForm.service_item"></el-input>
      </el-form-item>
      <el-form-item label="配件" prop="material">
        <el-input v-model="ruleForm.material"></el-input>
      </el-form-item>

    </el-form>
     <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisibleConfirm">确 定</el-button>

  </el-dialog>

  <!-- 新增编辑弹框 -->
  <el-dialog
    :title="addtitle"
    :visible.sync="dialogVisible2"
    width="40%"
    :before-close="handleClose">
    <el-form
      :model="ruleForm2"
      :rules="rules"
      ref="refRuleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
  
      <el-form-item label="车牌" prop="car_license">
        <el-input v-model="ruleForm2.car_license"></el-input>
      </el-form-item>
      <el-form-item label="服务项目" prop="service_item">
        <el-input v-model="ruleForm2.service_item"></el-input>
      </el-form-item>
      <el-form-item label="配件" prop="material">
        <el-input v-model="ruleForm2.material"></el-input>
      </el-form-item>
      <el-form-item label="成本" prop="material_cost">
        <el-input v-model="ruleForm2.material_cost"></el-input>
      </el-form-item>


    </el-form>
     <el-button @click="dialogVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisibleConfirm2">确 定</el-button>

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
      dialogVisible2: false,
      addtitle: "成本信息",
      ruleForm: {
        service_item: "",
        material: "",
      },
      ruleForm2: {
        car_license: "",
        service_item: "",
        material: "",
        material_cost: "",
      },
    };
  },  
  
  created() {
    this.getAllOrders()
  },
  methods: {
    update(){
    this.$router.go(0)
    },

    getAllOrders() {
      API.getOrders().then((res) =>{
        this.tableData = res.data.data.items;
      })
    },
    handleDelete(index,row) {
      axios.delete('http://localhost:3000/api/v1/order/'+row.id).then((res) => {
        this.$notify({
          title: '删除成功',
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
        service_item: this.ruleForm.service_item,
        material:this.ruleForm.material,
      }
      axios.put('http://localhost:3000/api/v1/order/'+id, params).then((res) => {
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
    },

    handleCreate(index, row) {
        console.log(index, row.id);
        this.dialogVisible2 = true;   //显示弹框
        this.ruleForm2 = row;         //row当前行数据，把当前行的数据赋值给 表单
        this.allid = row.id;         //把id存全局
    },

    dialogVisibleConfirm2(){
       // 修改接口
      let id = this.allid
      let params = {
        id : this.allid,
        car_license: this.ruleForm2.car_license,
        service_item: this.ruleForm2.service_item,
        material:this.ruleForm2.material,
        material_cost:this.ruleForm2.material_cost,
        created_at:this.ruleForm2.created_at,
      }
      axios.post('http://localhost:3000/api/v1/service/cost', params).then((res) => {
        if (res.Code>0) {
          this.$notify.error({
            title: '创建失败',
            message: res.msg,
          });
        } else {
    
          this.$notify({
            title: '创建成功',
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
