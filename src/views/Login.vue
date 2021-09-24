<template>
  <div class="fixed z-10 inset-0 overflow-y-auto  ">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-3/12">
          <div class="container ">    
            <div   class="col-lg-4 col-md-6 col-sm-8 mx-auto ">
                <div class="bg-black w-full text-white  flex justify-end ">
                  <router-link to="/" >
                    <button ><span class="material-icons  px-2 pt-2">close</span></button>
                  </router-link>   
                </div>
              <div v-if="!registerActive" key="" class="" v-bind:class="{ error: emptyFields }">
                <div class=" bg-black rounded -my-5  ">
                  <div class="flex mx-5 p-5 items-start text-white ">
                    <span class="material-icons">lock</span>
                    <h1 class="ml-2">Sign In</h1>
                  </div>
                </div> 
                <form @submit.prevent="doLogin" class="flex flex-col text-gray-400 m-5 rounded-xl">
                  <div class="m-1 mt-2">
                    <p class="flex items-start">Username</p>
                    <input v-model="userLogin" type="text" name="username"  class=" w-full bg-gray-300 h-8" placeholder="" required/>
                  </div>
                  <div class="m-1 mt-2  ">
                    <p class="flex items-start">Password</p>
                    <input  v-model="passwordLogin"  type="password" name="password" class="w-full  bg-gray-300 h-8"  placeholder=""  required/>
                  </div>
                  <div class="m-1 ">
                    <input type="submit" class="bg-pink-500  p-2 text-white "  @click="doLogin" />
                  </div>
                    <p class="flex flex-col">  Don't have an account? <a  href="#"  @click="  (registerActive = !registerActive),  (emptyFields = false) " class="text-red-600 underline">Create one now </a></p>
                </form>
              </div>

              <div  v-else class=""  v-bind:class="{ error: emptyFields }">
                <div class=" bg-black rounded -my-5  ">
                  <div class="flex mx-5 p-5 items-start text-white ">
                    <button ><span class="material-icons">lock</span></button>
                    <h1 class="ml-2">Sign Up</h1>
                  </div>
                </div> 

                <form class="flex flex-col text-gray-400 m-5   rounded-xl">
                   <div class="m-1 mt-2">
                    <p class="flex items-start">Firstname</p>
                    <input  v-model="fnameReg" type="fname" class=" w-full bg-gray-300 h-8" placeholder="" required  />
                  </div>
                  <div class="m-1 mt-2  ">
                    <p class="flex items-start">Lastname</p>
                    <input  v-model="lnameReg"
                        type="lname"  class="w-full  bg-gray-300 h-8"  placeholder=""  required/>
                  </div>
                  <div class="m-1 mt-2">
                    <p class="flex items-start">Username</p>
                    <input  v-model="userReg" type="email" class=" w-full bg-gray-300 h-8" placeholder="" required  />
                  </div>
                  <div class="m-1 mt-2  ">
                    <p class="flex items-start">Password</p>
                    <input  v-model="passwordReg"
                        type="email"  class="w-full  bg-gray-300 h-8"  placeholder=""  required/>
                  </div>
                  <div class="m-1 mt-2  ">
                    <p class="flex items-start">Phone</p>
                    <input  v-model="phoneReg"
                        type="phone"  class="w-full  bg-gray-300 h-8"  placeholder=""  required/>
                  </div>   
                  <div class="m-1 ">
                    <input type="submit" class="bg-pink-500  p-2 text-white "   @click="doRegister" />
                  </div>
                    <p class="flex flex-col">  Already have an account? <a href="#" @click="  (registerActive = !registerActive),  (emptyFields = false)"  class="text-red-600 underline">Sign in here </a></p>     
                    <p></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {

emits: [],
props: [],
  data() {
    return {
      registerActive: false,
      logform:{
        userLogin: "",
        passwordLogin: "",
      },
      regisform:{
        fnameReg:"",
        lnameReg:"",
        userReg: "",
        passwordReg: "",
        phoneReg:"",
      },
      emptyFields: false, 
      account:[],
      
    };
  },
  methods: {
   ...mapActions({SignIn:'auth/SignIn'}),
    doLogin() {
      this.SignIn(this.logform)
      // let response = axios.post(`${process.env.VUE_APP_ROOT_API}auth/users/`, this.logform)
      
      //   console.log(response.data)
      //   alert("You are now logged in");
        // if (this.userLogin === "" || this.passwordLogin === "") {
      //   this.emptyFields = true;
      // } else {
        //alert("You are now logged in");
      // }
    },
    doRegister() {
      if (
        this.fnameReg === "" ||
        this.lnameReg === "" ||
        this.userReg === "" ||
        this.passwordReg === "" ||
        this.phoneReg === "" 
      ) {
        this.emptyFields = true;
      } else {
        alert("You are now registered");
      }
    },
  },
};
</script>
