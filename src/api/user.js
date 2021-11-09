import request from '../utils/request'

const front = '/admin/user'

export default {
  login(data) {
    return request({
      url: `/user/login`,
      method: 'post',
      data
    })
  },

  register(data, type) {
    return request({
      url: `${front}/register/${type}`,
      method: 'post',
      data
    })
  },


  getInfo() {
    return request({
      url: `${front}/getInfo`,
      method: 'get',
    })
  },

  logout() {
    return request({
      url: `/user/logout`,
      method: 'post'
    })
  },

// 获取菜单权限数据
  getPermissionsByUserId(userId) {
    return request({
      url: '/admin/permission/getPermissionsByUserId',
      method: 'get'
    })
  }
}