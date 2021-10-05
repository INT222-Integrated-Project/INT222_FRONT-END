<template >
    <div class="min-h-screen bg-black text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div class="lg:w-1/2 xl:w-5/12 p-3 sm:p-12">
        <div>
          <img src="https://www.pngkey.com/png/full/83-837247_quick-view-sweet-word.png" class="sm:w-32 w-32 mx-auto"/>
        </div>
        <div v-if="!registerActive" key=""  v-bind:class="{ error: emptyFields }" class="mt-12 flex flex-col items-center">
          <h1 class="text-2xl xl:text-3xl font-extrabold">
            Sign In
          </h1>
            <form @submit.prevent="doLogin" class="w-full flex-1 mt-3"> 
                <div class="mx-auto max-w-xs">
                    <input v-model="logform.userName" type="text" name="userName" placeholder="userName" required class="input-text"/>
                      <i class="text-center text-sm text-red-500" v-if="this.invalid.invaliduserName">  please username must be greater than 4 charator </i>
                    <input v-model="logform.userPassword"  type="password" name="password" placeholder="Password"  required class="input-text"/>
                      <i class="text-center text-sm text-red-500" v-if="this.invalid.invaliduserPassword">  please Password must be greater than 4 charator </i>
                    <div class="m-1 ">
                        <input type="submit" class="input-sign-in"  />
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
            <form @submit.prevent="doRegister" class="flex flex-col text-gray-400 m-5   rounded-xl">
                <input v-model="regisform.firstName" name="Firstname" placeholder="Firstname" required class="input-text"/>
                <input v-model="regisform.lastName"   name="Lastname" placeholder="Lastname"  required class="input-text"/>
                <input v-model="regisform.userName"  name="Username" placeholder="Username" required class="input-text"/>
                 <i class="text-center text-sm text-red-500" v-if="this.invalid.invaliduserName">  Please username must be greater than 4 charator </i>
                <input v-model="regisform.userPassword"  type="password" name="Password" placeholder="Password"  required class="input-text"/>
                <i class="text-center text-sm text-red-500" v-if="this.invalid.invaliduserPassword">  Please Password must be greater than 4 charator </i>
                <input v-model="regisform.phone" type="phone" name="phone" placeholder="phone" required class="input-text"/> 
                <i class="text-center text-sm text-red-500" v-if="this.invalid.invalidphone"> Please phone must be equal or greater than 8 charator or less 10 charator </i>
                <div class="m-1 ">
                    <input type="submit" class="input-sign-in" > 
                </div>
                <p class="items-center mt-5 text-center"> Already have an account? </p>  
                <a href="#" @click="  (registerActive = !registerActive),  (emptyFields = false)"  class="input-sign-up">
                    <i class="material-icons items-center">person</i>  
                        <h3 class="ml-3"> Sign In</h3>
                </a>    
            </form>
        </div>
        <div class="flex justify-center items-center ">
            <a href="#" class="border-b border-gray-500 border-dotted">Terms of Service</a>
            <p class="sm:mx-2">and its</p>
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
import axios from "axios"
export default {

  data() {
    return {
      registerActive: false,
      logform:{
        userName: "",
        userPassword: "",
      },
      regisform:{
        userName: "",
        userPassword: "",
        firstName:"",
        lastName:"",
        phone:"",
      },
      emptyFields: false, 
      account:[],
      invalid: {
        invaliduserName: false,
        invaliduserPassword: false,
        invalidfirstName: false,
        invalidlastName: false,
        invalidphone: false,
      },
      
    };
  },
  methods: {
    ...mapActions({SignIn:'auth/SignIn'}),

    doLogin() {
      console.log(this.logform)
      this.SignIn(this.logform).then(()=>{
        this.$router.replace({
          name:'Home'
        })
        

      })
    
    },
    doRegister() {
      this.invalid.invaliduserName = this.regisform.userName === "" || this.regisform.userName.length > 20 ? true : false || this.regisform.userName.length < 4 ? true : false;
        this.invalid.invaliduserPassword = this.regisform.userPassword === "" ? true : false || this.regisform.userPassword.length > 32 ? true : false || this.regisform.userPassword.length < 4 ? true : false;
        this.invalid.invalidfirstName = this.regisform.firstName === "" ? true : false || this.regisform.firstName.length > 50 ? true : false ;
        this.invalid.invalidlastName = this.regisform.lastName === "" ? true : false || this.regisform.lastName.length > 50 ? true : false ;
        this.invalid.invalidphone = this.regisform.phone.length < 8  ? true : false || this.regisform.lastName.length > 10 ? true : false ;
      if(
        this.invalid.invaliduserName ||
        this.invalid.invaliduserPassword ||
        this.invalid.invalidfirstName ||
        this.invalid.invalidlastName ||
        this.invalid.invalidphone === true
        ){console.log("false")
      }
      else {
        this.sentRegis();
      }
       
    },sentRegis(){
      let formData = new FormData()
        let regisJson = JSON.stringify(this.regisform);
               
        const regisBlob = new Blob([regisJson],{
            type: 'application/json'
        })
        formData.append('newUser',regisBlob)
        // console.log(formData.getAll("newUser"))
                //post to backend by multipart
         axios.post(`${process.env.VUE_APP_ROOT_API}public/auth/register`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',                   
            }
          }).then(function(){
            console.log('SUCCESS')
          })
          .catch(function(){
            console.log('FAILURE')
          })
            console.log(regisJson) 
  }
  }
};
</script>
