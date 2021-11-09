import { createStore } from 'vuex'
import user from './modules/user'
import getters from './getters'

export default createStore({
  //准备state对象——保存具体的数据
  state: {
  },
 //准备mutations对象——修改state中的数据
  mutations: {
  },
  //准备actions对象——响应组件中用户的动作
  actions: {
  },

  //模块化+命名空间
  modules: {
    user,
  },
  getters
})
