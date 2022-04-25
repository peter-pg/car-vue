<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="配件名字">
      <el-input v-model="form.material_name" />
    </el-form-item>
    
    <el-form-item label="厂家">
      <el-input v-model="form.manufacturer" />
    </el-form-item>
    
    <el-form-item label="单价">
      <el-input v-model="form.unit_price" />
    </el-form-item>

    <el-form-item label="数量">
      <el-input v-model="form.number" />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import * as API from '../api/employee/';


export default {
  name: 'postStore',
  data() {
    return {
      form: {
        material_name: '',
        manufacturer: '',
        unit_price: '',
        number: '',
      },
    };
  },
  methods: {
    onSubmit() {
      API.postStore(this.form).then((res) => {
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
