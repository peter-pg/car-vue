<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="身份证">
      <el-input v-model="form.id_card" />
    </el-form-item>
    
    <el-form-item label="电话">
      <el-input v-model="form.phone" />
    </el-form-item>

    <el-form-item label="地址">
      <el-input v-model="form.address" />
    </el-form-item>
    
    <el-form-item label="性别">
      <el-select v-model="form.gender" placeholder="please select your sex">
        <el-option label="男" value="男" />
        <el-option label="女" value="女" />
      </el-select>
    </el-form-item>

    <el-form-item label="生日">
      <el-input v-model="form.birthday" />
    </el-form-item>

    

  
    
    <el-form-item label="是否部长">
       <el-radio v-model="form.is_head" label="是" size="large">是</el-radio>
    <el-radio v-model="form.is_head" label="否" size="large">否</el-radio>
    </el-form-item>

    <el-form-item label="部门">
      <el-radio-group v-model="form.department">
        <el-radio label="机修部" />
        <el-radio label="美容部" />
        <el-radio label="保养部" />
        <el-radio label="运营部" />
      </el-radio-group>
    </el-form-item>

    <el-form-item label="薪水">
      <el-input v-model="form.salary" />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import * as API from '../api/employee/';


export default {
  name: 'postEmployee',
  data() {
    return {
      form: {
        name: '小明',
        gender: '',
        id_card: '123456789123456789',
        birthday: '2000.04.16',
        phone: '13392949899',
        address: '广州大学',
        is_head: '',
        department: '',
        salary: '0',
      },
    };
  },
  methods: {
    onSubmit() {
      API.postEmployee(this.form).then((res) => {
        if (res.Code > 0 ) {
          this.$notify.error({
            title: '上传失败',
            message: res.msg,
          });
        } else {
          this.$notify({
            title: '上传成功',
            message: `您上传的ID为${res.data.id}`,
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
  },
  components: {
  },
};


</script>
