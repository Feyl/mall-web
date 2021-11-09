const getters = {
    name: state => state.user.name,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    roles: state => state.user.roles,
    permissions:state =>state.user.permissions
  }
  export default getters
  