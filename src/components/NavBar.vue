<template>
  <div class="bg-black ">
    <div class="flex items-center  flex-wrap p-3 w-screen ">
        <div class="hidden mx-auto sm:flex  items-center ">
          <div class="hidden sm:flex justify-start items-center  sm:text-lg  "> 
            <img src="../assets/icon.png" alt="icon" class="w-14 h-14 flex justify-start ">
            <h1 class="text-home">
              <router-link to="/">Sweet Sweeties</router-link>
            </h1>
          </div>
        </div>
        <div class=" block sm:hidden mx-auto flex justify-center items-center ">
          <img src="../assets/icon.png" alt="icon" class="w-14 h-14  ">
          <h1 class="text-2xl md:text-4xl text-pink-500">
            <router-link to="/">Sweet Sweeties</router-link>
          </h1>
        </div>
      
        <template class="mx-auto" v-if="authenticated" >
          <div class="block sm:hidden mx-auto ">
            <button @click="dropdownOpen = !dropdownOpen" class="berger">
              <svg class="fill-current h-3 w-3   " viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div class="hidden mx-auto sm:flex justify-center items-center sm:text-lg ">
            <div class="flex justify-center items-center mx-auto">
              <div v-if="roleName=='admin'"  class=" mx-2 md:w-40  flex items-center">
                <router-link to="/adminPanel" class=" ">
                  <button class="set-center button-nav-show-staff "><i class="material-icons mr-5 text-3xl">settings</i>Dashboard</button>
                </router-link>
              </div>
              <div v-if="roleName=='admin'||roleName=='staff'"  class="md:w-52 p-1 mx-2 flex items-center">
                <router-link to="/AddEdit" >
                  <button class="set-center button-nav-show-staff"><i class="material-icons mr-5 text-3xl">add_circle</i>Add Product</button>
                </router-link>
              </div>
              <div class="sm:w-28 flex items-center mx-2 ">
              <router-link to="/shipping" >
                <button class="set-center button-nav-show-staff "><i class="material-icons mr-5 text-3xl">shopping_cart</i>Card</button>
              </router-link>
              </div>
              <div class="md:w-28  flex items-center mx-2">
              <router-link to="/Profile">
                <button class="set-center button-nav-show-staff"><i class="material-icons mr-5 text-3xl">contact_mail</i>Profile</button>
              </router-link>
              </div>
              <div class="sm:w-16  mx-2 flex items-center">
                <a hraf="#" @click.prevent="signOut" class="button-sing-out text-white mx-5 "><i class="material-icons mr-4  text-3xl">logout</i></a>
              </div>
            </div>
          </div>
          <div v-show="dropdownOpen" class=" show-dropdown ">
            <div class="w-full mt-3 mx-16">
              <div v-if="roleName=='admin'">
                <router-link to="/adminPanel" class=" ">
                  <button class="flex items-center button-nav-show-staff-dropdown"><i class="material-icons mx-5 text-3xl  ">settings</i>Dashboard</button>
                </router-link>
              </div>
              <div v-if="roleName=='admin'||roleName=='staff'">
                <router-link to="/AddEdit" class=" ">
                  <button class="flex items-center button-nav-show-staff-dropdown"><i class="material-icons mx-5 text-3xl  ">add_circle</i>Add New Case</button>
                </router-link>
              </div>
              <router-link to="/shipping" class="">
                <button class="flex items-center button-nav-show-staff-dropdown"><i class="material-icons mx-5 text-3xl  ">shopping_cart</i>Cart</button>
              </router-link>
              <router-link to="/Profile" class=" ">
                <button class=" flex items-center button-nav-show-staff-dropdown"><i class="material-icons mx-5 text-3xl  ">contact_mail</i>Account</button>
              </router-link>
              <div class="button-nav-show-staff ">
                <a hraf="#" @click.prevent="signOut" class="flex items-center "><i class="material-icons mx-4 text-3xl">logout</i>Sign Out</a>
              </div>
            </div>
          </div>
        </template>

        <template v-else class="hidden  mx-auto sm:text-lg">
          <div class="hidden  md:flex justify-center w-3/6">
            <div class="mx-2 md:w-44  flex items-center">
              <router-link to="/contact" class="button-nav-show-staff">
                <button class="flex items-center"><i class="material-icons mr-5 text-3xl">forum</i>Contact Us</button>
              </router-link>
            </div>
            <div class="mx-2 md:w-40  flex items-center">
              <router-link to="/login" class="button-nav-show-staff">
                <button class="flex items-center"><i class="material-icons mr-5 text-3xl">account_circle</i>Sign In</button>
              </router-link>
            </div>
          </div>
           <div class=" block md:hidden flex ">
            <div class="mx-2  ">
              <router-link to="/contact" class="button-nav-show-staff">
                <button class="flex items-center"><i class="material-icons mr-5 text-3xl">forum</i></button>
              </router-link>
            </div>
            <div class="mx-2 md:w-40  flex items-center">
              <router-link to="/login" class="button-nav-show-staff">
                <button class="flex items-center"><i class="material-icons mr-5 text-3xl">account_circle</i></button>
              </router-link>
            </div>
          </div>
        </template>
      </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {

    props: ["fixedNav", ],
    data() {
      return {
        dropdownOpen: false,
        enableNaveBar: {
          enableVisitor: false,
          enableUser: false,
          enableStaff: false,
          enableAdmn: false
        }
      };
    },
    computed: {
      ...mapGetters({
        authenticated: 'authentication/authenticated',
        user: 'authentication/user',
        roleName: 'authentication/roleName'
      })

    },
    watch: {
      enableRoleNaveBar() {
        if (localStorage.getItem.username == null) {
          this.enableNaveBar.enableVisitor = true;
        } else {
          this.enableNaveBar.enableVisitor = false;
        }
      }
    },
    methods: {
      ...mapActions({
        signOutAction: 'authentication/singOut'
      }),

      signOut(){
        this.signOutAction().then(() => {
          this.$router.replace({
            name:'Home'
          })
        })
      }
    }
  };
</script>