<template>


<div class="bg-black sm:p-3" >
  <div class="flex items-center justify-between flex-wrap bg-teal  ">
    <div class="flex items-center flex-no-shrink text-white">
      <img src="../assets/icon.png" alt="icon" class="w-14 h-14 m-2" >
      <h1  class="text-pink-500   tracking-tight text-2xl md:text-4xl">
        <router-link to="/">Sweet Sweeties</router-link>
      </h1>
      
    </div>
    <div class="block sm:hidden">
      <button @click="dropdownOpen = !dropdownOpen" class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>

    <div  class="hidden w-full  justify-end sm:flex sm:items-center sm:w-auto"> 
      <div class="sm:flex-grow text-white text-xl">
        <router-link to="/AddEdit" class=" text-white no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-pink-400 mr-4">
          <button class="flex items-center"><i class="material-icons mr-3 text-3xl">add_circle</i></button>
        </router-link>
        <router-link to="/shipping" class="text-white no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-pink-400 mr-4">
          <button class="flex items-center"><i class="material-icons mr-3 text-3xl">shopping_cart</i></button> 
        </router-link>
        <router-link to="/Profile" class=" text-white no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-pink-400 mr-4">
          <button class="flex items-center"><i class="material-icons mr-3 text-3xl">contact_mail</i></button>
        </router-link>
        <router-link to="/login" class="text-white  no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-pink-400 mr-4">
          <button class="flex items-center"><i class="material-icons mr-3 text-3xl">account_circle</i></button>
        </router-link>
      </div> 
    </div>

    <div v-show="dropdownOpen" class=" w-screen flex justify-start items-center sm:hidden"> 
      <div class=" text-left  text-white text-xl">
        <router-link to="/shipping" class="text-white no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-pink-400 mr-4">
          <button class="flex items-center"><i class="material-icons mr-5 text-3xl">shopping_cart</i>Cart</button> 
        </router-link>
        <router-link to="/contact" class=" text-white no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-pink-400 mr-4">
          <button class="flex items-center"><i class="material-icons mr-5 text-3xl">perm_contact_calendar</i>contact</button>
        </router-link>
        <router-link to="/AddEdit" class=" text-white no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-pink-400 mr-4">
          <button class="flex items-center"><i class="material-icons mr-5 text-3xl">add_circle</i>Add New Case</button>
        </router-link>
        <router-link to="/login" class="text-white  no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-pink-400 mr-4">
          <button class="flex items-center"><i class="material-icons mr-5 text-3xl">account_circle</i>Login</button>
        </router-link>
      </div> 
    </div>

  </div>
</div>

</template>
<script>
import { mapGetters } from 'vuex'

export default {
  components: {  },
  props: ["fixedNav",],
  emits: [],
  computed:{
    computed:{
      ...mapGetters({
        authenticated:'auth/authenticated',
        user:'auth/user',


      })

    },
  },
  data() {
    return {
      dropdownOpen: false, 
    };
  },
  methods: {
    opennav(){
      this.open !=this.open
    }
  }
};
</script>