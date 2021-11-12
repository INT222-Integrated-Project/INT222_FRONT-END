import { createStore } from 'vuex'
import auth from './auth'


export default createStore({
  state: {
    cart :[]
  },
  getters:{
    productQuantity: state => product =>{
      const item = state.cart.find(i => i.id === product.id)
      if(item) return item.quantity 
      else return null
    }
  },
  mutations: {
      addToCart(state,product){
        let item = state.cart.find(i => i.id === product.id)
      if(item){
        item.quantity++
      } 
      else {
        state.cart.push({...product,quantity:1})
      }
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
