import Vue from 'vue'
import Vuex from 'vuex'
import { login, getUserInfo, } from '../api/user'
import { setToken, getToken,setuserinfo,getuserinfo } from '../utils/localStorage'

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
    async gologin({ commit }, form) {
      try {
        const resdate = await login(form)
        commit('SET_TOKEN', resdate.token)
        return resdate.token
      } catch (error) {

      }
    },
    async UserInfo({ commit }) {
      try {
        const resdata = await getUserInfo()
        console.log(resdata, '6666');
        commit('USERINFO', resdata)
        return resdata
      } catch (error) {

      }
    }

  },
  modules: {
  }
})
