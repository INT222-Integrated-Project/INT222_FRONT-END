import axios from 'axios'

export default ({
  namespaced : true,

  state: {
    token:null,
    user:null,
    
  },
  getters:{
    authenticated (state){
      return state.token && state.user
    },
    user(state){
      return state.user
    }
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token
    },
    SET_USER(state,data){
      state.user = data
    }
  },
  actions: {
    async SignIn ({ dispatch }, Credentials) {
        let response = await axios.post(`${process.env.VUE_APP_ROOT_API}public/auth/login`, Credentials)
        // console.log(response.data)
        return dispatch('attempt',response.data.acceessToken)
    },

    async attempt ({ commit }, token){
      commit('SET_TOKEN',token)

      try{
        let response = await axios.get(`${process.env.VUE_APP_ROOT_API}user/myprofile`)
        console.log("user :" +response.data.userName)
        commit('SET_USER',response.data.userName)

      }catch(e){
      commit('SET_TOKEN',null)
      commit('SET_USER',null)
      }                                                                                                                                                                                                                                                                  
    },
    signOut({commit}){
      return axios.post('auth/signout').then(() => {
        commit('SET_TOKEN',null)
        commit('SET_USER',null)

      })
    }
  },
  modules: {
  }
})

