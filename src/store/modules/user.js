import user from "@/api/user";
import {getToken, setToken, removeToken} from '@/utils/auth'


const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSIONS:(state,permissions)=>{
    state.permissions = permissions
  }
}

const actions = {
  // user login
  login({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      user.login(userInfo).then(response => {
        const {data} = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        localStorage.setItem("token", data.token);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
   getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      user.getInfo().then(response => {
        const userInfo = response.data
        console.log(userInfo)

        commit('SET_NAME', userInfo.name)
        commit('SET_AVATAR', userInfo.avatar)
        commit('SET_PERMISSIONS',userInfo.permissionValueList)
        commit('SET_ROLES', userInfo.roles)
        sessionStorage.setItem('userId',userInfo.id);
        sessionStorage.setItem('roleName',userInfo.roles[0])

        if (userInfo.roles.length>1){
          sessionStorage.setItem('superRole',userInfo.roles[1])
        }


        resolve(userInfo)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      user.logout().then(() => {
        removeToken() // must remove  token  first
        commit('RESET_STATE')

        localStorage.removeItem("token")
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('roleName')
        sessionStorage.removeItem("superRole")
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      localStorage.removeItem("token")
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('roleName')
      sessionStorage.removeItem("superRole")
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
