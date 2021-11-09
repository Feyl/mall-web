<template>
  <el-row :gutter="20" class="demo-border">
    <el-col :span="10" class="nav">
      <el-icon :size="24"><fold /></el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">商品</a></el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="2" :offset="12">
        <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar :size="46" :src="avaterUrl"><img src="../assets/image/avater.png" alt="avater"></el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="nav-dropdown-menu">
            <el-dropdown-item>修改个人信息</el-dropdown-item>
            <el-dropdown-item>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      </el-col>
  </el-row>
</template>

<script>
import { Fold } from "@element-plus/icons";
import { ref } from "@vue/reactivity";
export default {
  name: "HeaderNav",
  components: {
    Fold,
  },
  setup() {
    let avaterUrl = ref("../assets/image/avater.png");
    return {
      avaterUrl,
    };
  },
};
</script>

<style lang="less" scoped>
.demo-border{
  border-bottom: 1px solid var(--el-border-color-base);
}
.el-row {
  .nav {
    margin-top: 1.5%;
    display: flex;
    .el-icon {
      margin-right: 12px;
      position: relative;
      bottom: 4px;
      right: 6px;
    }
  }
  .el-avatar{
      margin: 2px;
  }
}
.nav-dropdown-menu li{
  text-align: center;
}
  
</style>
