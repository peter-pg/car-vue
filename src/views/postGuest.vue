<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="客户姓名">
      <el-input v-model="form.user_name" />
    </el-form-item>
    
    <el-form-item label="电话">
      <el-input v-model="form.user_phone" />
    </el-form-item>

    <el-form-item label="车牌号">
      <el-input v-model="form.car_license" />
    </el-form-item>

       <el-form-item label="品牌">
      <el-input v-model="form.car_brand" />
    </el-form-item>

    <el-form-item label="是否会员">
       <el-radio v-model="form.is_vip" label="是" size="large">是</el-radio>
    <el-radio v-model="form.is_vip" label="否" size="large">否</el-radio>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import * as API from '../api/employee/';


export default {
  name: 'postGuest',
  data() {
    return {
      form: {
        user_name: '小明',
        user_phone: '13392949899',
        car_license: '粤A8888',
        car_brand: '宝马',
        is_vip: '',
      },
    };
  },
  methods: {
    onSubmit() {
      API.postGuest(this.form).then((res) => {
        if (res.Code > 0) {
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
