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
    SET_TOKEN(state,data){
      state.user = data

    }
  },
  actions: {
    async SignIn({dispatch},Credentials) {
        let response = await axios.post(`${process.env.VUE_APP_ROOT_API}auth/users/`, Credentials)
        dispatch('attempt',response.data.token)
    },
    async attempt ({ commit },token){
      commit('SET_TOKEN',token)

      try{
        let response = await axios.get('auth/me' ,{
          headers: {
            'Authorization': 'Bearer' + token
          }
        })
        commit('SET_USER',response.data)

      }catch(e){
        console.log('failed')
      }
                                                                                                                                                                                                                                                                    
    }
  },
  modules: {

  }
})
