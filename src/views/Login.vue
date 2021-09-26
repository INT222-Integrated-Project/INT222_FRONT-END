<template >
    <div class="min-h-screen bg-black text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div class="lg:w-1/2 xl:w-5/12 p-3 sm:p-12">
        <div>
          <img src="https://www.pngkey.com/png/full/83-837247_quick-view-sweet-word.png" class="w-32 mx-auto"/>
        </div>
        <div v-if="!registerActive" key=""  v-bind:class="{ error: emptyFields }" class="mt-12 flex flex-col items-center">
          <h1 class="text-2xl xl:text-3xl font-extrabold">
            Sign In
          </h1>
            <form @submit.prevent="doLogin" class="w-full flex-1 mt-3"> 
                <div class="mx-auto max-w-xs">
                    <input v-model="userLogin" type="text" name="username" placeholder="Username" required class="input-text"/>
                    <input v-model="passwordLogin"  type="password" name="password" placeholder="Password"  required class="input-text"/>
                    <div class="m-1 ">
                        <input type="submit" class="input-sign-in"  @click="doLogin" />
                    </div>
                    <div class=" m-2">  
                        <p class="items-center mt-5 text-center">Don't have an account? </p>
                    <a  href="#"  @click="  (registerActive = !registerActive),  (emptyFields = false) " class="input-sign-up ">
                        <i class="material-icons items-center">person_add_alt_1</i>  
                        <h3 class="ml-3"> Sign Up</h3> 
                    </a>   
                    </div>
                </div>
            </form> 
        </div>
        <div  v-else  class="mt-12 flex flex-col items-center"  v-bind:class="{ error: emptyFields }">
            <h1 class="text-2xl xl:text-3xl font-extrabold">
                Sign Up
            </h1> 
            <form class="flex flex-col text-gray-400 m-5   rounded-xl">
                <input v-model="fnameReg" type="fname" name="Firstname" placeholder="Firstname" required class="input-text"/>
                <input v-model="lnameReg"  type="lname" name="Lastname" placeholder="Lastname"  required class="input-text"/>
                <input v-model="userReg" type="userReg" name="Username" placeholder="Username" required class="input-text"/>
                <input v-model="passwordReg"  type="password" name="Password" placeholder="Password"  required class="input-text"/>
                <input v-model="phoneReg" type="phoneReg" name="Phone" placeholder="Phone" required class="input-text"/> 
                <div class="m-1 ">
                    <input type="submit" class="input-sign-in"  @click="doRegister" />
                </div>
                <p class="items-center mt-5 text-center"> Already have an account? </p>  
                <a href="#" @click="  (registerActive = !registerActive),  (emptyFields = false)"  class="input-sign-up">
                    <i class="material-icons items-center">person</i>  
                        <h3 class="ml-3"> Sign In</h3>
                </a>    
                </form>
              </div>
        <div class="flex justify-center items-center">
            <a href="#" class="border-b border-gray-500 border-dotted">Terms of Service</a>
            <p class="mx-2">and its</p>
            <a href="#" class="border-b border-gray-500 border-dotted">Privacy Policy</a>
        </div>
      </div>
      <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div
          class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style="background-image: url('https://cdn140.picsart.com/260643629026212.png?type=webp&to=min&r=640');"
        ></div>
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
        this.SentRegis();
       
      }
    },
  },
};
</script>
