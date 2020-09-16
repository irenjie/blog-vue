import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info:JSON.parse(localStorage.getItem("info"))
  },
  mutations: {
    setInfo:(info)=>{
      state.info=info
      localStorage.setItem("info",JSON.stringify(info))
    }
  },
  getters:{
    getInfo: state => {
      return state.info
    }
  },
  actions: {
  },
  modules: {
  }
})
