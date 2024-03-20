import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo, loginForXcx } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const baseUrl = config.baseUrl

const user = {
  state: {
    token: getToken(),
    name: storage.get(constant.name),
    nickname: storage.get(constant.nickname),
    avatar: storage.get(constant.avatar),
    roles: storage.get(constant.roles),
    permissions: storage.get(constant.permissions),
    deptId: storage.get(constant.deptId)
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
      storage.set(constant.name, name)
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
      storage.set(constant.nickname, nickname)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      storage.set(constant.avatar, avatar)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      storage.set(constant.roles, roles)
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
      storage.set(constant.permissions, permissions)
    },
	SET_DEPT_ID: (state, deptId) => {
	  state.deptId = deptId
	  storage.set(constant.deptId, deptId)
	}
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const nickname = userInfo.nickname.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          setToken(res.data.token)
          commit('SET_TOKEN', res.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
	
    // xcx登录
    LoginForXcx({ commit }, code) {
      return new Promise((resolve, reject) => {
        loginForXcx(code).then(res => {
          setToken(res.data.token)
          commit('SET_TOKEN', res.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
	
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.data.user
          const avatar = (user == null || user.avatar == "" || user.avatar == null) ? require("@/static/images/无头像.png") : user.avatar
          const username = (user == null || user.userName == "" || user.userName == null) ? "" : user.userName
          const nickName = (user == null || user.nickName == "" || user.nickName == null) ? "" : user.nickName
          const deptId = (user == null || user.deptId == "" || user.deptId == null) ? "" : user.deptId
          if (res.data.roles && res.data.roles.length > 0) {
            commit('SET_ROLES', res.data.roles)
            commit('SET_PERMISSIONS', res.data.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)
          commit('SET_NICKNAME', nickName)
          commit('SET_DEPT_ID', deptId)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          storage.clean()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
