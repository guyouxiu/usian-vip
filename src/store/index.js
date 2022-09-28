import Vue from 'vue'
import Vuex from 'vuex'
import { login, getUserInfo, Logout } from '../api/user'
import { setToken, getToken, setuserinfo, getuserinfo } from '../utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() || '',
    UserInfo: getuserinfo() || ''
  },
  getters: {
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    USERINFO(state, UserInfo) {
      state.UserInfo = UserInfo
      setuserinfo(UserInfo)
    }
  },
  actions: {
    // 登录接口设置token
    async gologin({ commit }, form) {
      try {
        const resdate = await login(form)
        commit('SET_TOKEN', resdate.token)
        return resdate.token
      } catch (error) {

      }
    },
    // 登录时获取用户信息用户名
    async UserInfos({ commit }) {
      try {
        const resdata = await getUserInfo()
        // console.log(resdata, '6666');
        commit('USERINFO', resdata)
        return resdata
      } catch (error) {

      }
    },

    //退出登录
    async handleLogout({ commit }) {
      const response = await Logout()
      commit('SET_TOKEN', '')
      commit('USERINFO', '')
      return response
    }
  },
  modules: {
  }
})
