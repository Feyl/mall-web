<template>
  <el-row>
    <el-col :span="6" :offset="8">
      <el-card class="box-card" shadow="always">
        <p class="title">用户注册</p>
        <el-divider></el-divider>
        <el-input v-model="registerInfo.username" placeholder="请输入用户名" />
        <el-input v-model="registerInfo.password" placeholder="请输入密码" show-password />
        <el-input v-model="confirmPass" placeholder="确认密码" show-password />
        <el-select v-model="role" placeholder="请选择用户角色">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input v-model="registerInfo.name" placeholder="请输入姓名" />
        <el-input v-model="registerInfo.telephone" placeholder="请输入电话号码" />
        <el-button type="primary" @click="register">确认</el-button>
        <el-button class="button" type="text" @click="toLogin"
          >用户登录</el-button
        >
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { reactive, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import router from "@/router/index.js";
import user from '@/api/user';

export default {
  name: "Register",
  setup() {
    const registerInfo = reactive({
      username: '',
      password: '',
      name: '',
      telephone: '',
    })
    
    let confirmPass = ref("");
    let role = ref();
    let roles= ref([
      {
          value: 1,
          label: '商品管理员',
        },
        {
          value: 2,
          label: '零售商',
        },
        {
          value: 0,
          label: '超级管理员',
        },
    ])

    function toLogin() {
      router.push("/login");
    }

    function register(){
      user.register(registerInfo,role.value).then(res =>{
        ElMessage('注册成功');
        toLogin();
      })
    }

    return {
      registerInfo,
      confirmPass,
      role,
      roles,

      /* 函数 */
      toLogin,
      register,
    };
  },
};
</script>
<style lang="less" scoped>
.title {
  color: #0d84ff;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.box-card {
  margin-top: 16%;
  width: 400px;
  .el-input {
    margin: 10px 0;
  }
  .el-button {
    margin: 20px 60px 0;
    width: 240px;
  }
  .button {
    display: block;
    margin: 0 0 0 210px;
  }
}
</style>
