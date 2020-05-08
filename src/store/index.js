import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    product_names:[],
    // username:sessionStorage.getItem("username") || ''
    username:''
  },
  mutations: {
    changePn(state,newVal){
      state.product_names=newVal; 
    },
    //获取当前用户名 显示
    setUser(state,newVal){
      state.username=newVal;
      //这里不要写其他东西
      // sessionStorage.setItem("username",newval);
    }
  },
  actions: {
  },
  modules: {  
  }
})
