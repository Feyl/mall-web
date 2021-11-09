<template>
  <el-container>
    <el-affix :offset="8">
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" @click="productManage">
            <el-icon :size="24"><home-filled /></el-icon>
            <span>首页</span>
          </el-menu-item>

          <el-sub-menu index="2">
            <template #title>
              <el-icon :size="22"><goods-filled /></el-icon>
              <span>商品</span>
            </template>
            <el-menu-item index="2-1" @click="productManage">商品列表</el-menu-item>
            <el-menu-item index="2-2">商品分类</el-menu-item>
            <el-menu-item index="2-3" @click="productAdd">添加商品</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon :size="22"><user-filled /></el-icon>
              <span>零售商</span>
            </template>
            <el-menu-item index="3-1"  @click="retailerManage">零售商列表</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon :size="22"><tickets /></el-icon>
              <span>购销合同</span>
            </template>
            <el-menu-item index="4-1"  @click="contractManage">合同列表</el-menu-item>
            <el-menu-item index="4-2"  @click="contractAdd">添加合同</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="5">
            <template #title>
              <el-icon :size="22"><lock /></el-icon>
              <span>权限</span>
            </template>
            <el-menu-item index="5-1">用户列表</el-menu-item>
            <el-menu-item index="5-2">角色列表</el-menu-item>
            <el-menu-item index="5-3">菜单列表</el-menu-item>
            <el-menu-item index="5-4">资源列表</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
    </el-affix>

    <el-container>
      <el-header>
        <header-nav />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import router from "@/router/index.js";
import HeaderNav from "../../components/HeaderNav.vue";
import { defineComponent } from "vue";
import {
  /* el */
  HomeFilled,
  GoodsFilled,
  UserFilled,
  Tickets,
  Lock,
} from "@element-plus/icons";

export default defineComponent({
  name: "Home",
  components: {
    HeaderNav,
    /* el */
    HomeFilled,
    GoodsFilled,
    UserFilled,
    Tickets,
    Lock,
  },
  setup() {
    /* 跳转页面 */
    function retailerManage(){
      router.push("/retailer/manage");
    }
    function productManage(){
      router.push("/product/manage");
    }
    function productAdd(){
      router.push("/product/add");
    }
    function contractManage(){
      router.push("/contract/manage");
    }
    function contractAdd(){
      router.push("/contract/add");
    }




    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      /* 跳转页面 */
      retailerManage,
      productManage,
      productAdd,
      contractManage,
      contractAdd,

      handleOpen,
      handleClose,
    };
  },
});
</script>

<style lang="less" scoped>
.el-menu {
  width: 200px;
  position: relative;
  left: -8px;
  top: -8px;
  .el-icon {
    margin-right: 20px;
  }
}
.el-header {
  padding: 0 10px;
}
</style>
