import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Axios from "axios"; //引入axios

var app = createApp(App);
app.config.globalProperties.Axios = Axios; //全局配置axios
app.config.globalProperties.getToken = function () {
  const token = localStorage.getItem("token");
  if (token === "" || token == null) {
    this.$message({
      showClose: true,
      message: "请先登录",
      type: "error",
      duration: "600",
    });
    this.$router.push({ path: "/" });
  }
  return token;
};
app.config.globalProperties.setToken = function (token) {
  localStorage.setItem("token", token);
};

app.use(store).use(router).use(ElementPlus).mount("#app");
