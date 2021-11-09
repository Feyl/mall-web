<template>
  <el-row>
    <el-col :span="6" :offset="8">
      <el-card class="box-card" shadow="always">
        <el-icon :size="55" color="#0d84ff">
          <shop />
        </el-icon>
        <p class="title">后台管理系统</p>
        <el-divider></el-divider>
        <div class="demo-input-suffix">
          <el-input
            v-model="loginInfo.username"
            placeholder="请输入用户名"
            :prefix-icon="Search"
          />
          <el-input
            v-model="loginInfo.password"
            placeholder="请输入密码"
            show-password
          />
        </div>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button class="button" type="text" @click="toRegister"
          >用户注册</el-button
        >
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ref, reactive } from "vue";
import router from "@/router/index.js";
import { Shop } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import user from "@/api/user";
export default {
  name: "Login",
  components: {
    Shop,
  },
  setup() {
    let loginInfo = reactive({
      username: "",
      password: "",
    });

    function toRegister() {
      router.push("/register");
    }

    function login() {
      user.login(loginInfo).then( res => {
        ElMessage("登录成功");
        router.push("/product/manage");
      });
    }
    return {
      /* 变量 */
      loginInfo,

      /* 函数 */
      toRegister,
      login,
    };
  },
};
</script>

<style lang="less" scoped>
.el-icon {
  margin-left: 150px;
}
.title {
  color: #0d84ff;
  margin-top: 0px;
  text-align: center;
  font-size: 24px;
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
  margin-top: 35%;
  width: 400px;
  .el-input {
    margin: 12px 0;
  }
  .el-button {
    margin: 10px 0 0 60px;
    width: 240px;
  }
  .button {
    display: block;
    margin-left: 210px;
  }
}
</style>
