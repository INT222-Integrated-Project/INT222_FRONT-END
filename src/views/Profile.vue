<template>
  <div class="size-card-main-profile">
    <div class="size-card-main-profile-layer-2  leading-tight ">
      <div class="size-card">
        <div class="size-card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtzCieUrB9F073CA4Yo903Lq5TokRS-53Jhm8NFhvPSS6YV4n853Pbhl6aqWXUp9gvj4E&usqp=CAU" class="sm:w-auto w-3/4 m-auto" />
          <div>
            <p class="header-topic">
                {{ this.showProfile.role.roleName}}</p>
          </div>
        </div>
        <div v-if="!editActive" class="size-card  ">
            <div class="size-card">
              <div>
                <p class="header-topic-two">USERNAME :
                <span class="content-text">{{ this.showProfile.userName}}</span></p>
              </div>
              <div class="size-card">
                <p class="header-topic-two">FIRSTNAME</p>
                <span class="content-text-false" v-if="this.showProfile.firstName == null">This user has no firstName</span>
                <span class="content-text" v-else>{{this.showProfile.firstName}}</span>
              </div> 
              <div class="size-card">
                <p class="header-topic-two">LASTNAME</p>
                <span class="content-text-false" v-if="this.showProfile.lastName == null">This user has no lastName</span>
                <span class="content-text" v-else>{{this.showProfile.lastName}}</span>
              </div> 
              <div class="size-card">
                <p class="header-topic-two">EMAIL</p>
                <span class="content-text-false" v-if="this.showProfile.email == null">This user has no email</span>
                <span class="content-text" v-else>{{this.showProfile.email}}</span>
              </div> 
              <div class="size-card">
                <p class="header-topic-two">PHONE</p>
                <span class="ccontent-text-false" v-if="this.showProfile.phoneNumber == null">This user has no phone</span>
                <span class="content-text" v-else>{{this.showProfile.phoneNumber}}</span>
              </div> 
              <div class="size-card">
                <p class="header-topic-two">ADDRESS</p>
                <span class="content-text-false" v-if="this.showProfile.address == null">This user has no address</span>
                <span class="content-text" v-else>{{this.showProfile.address}}</span>
              </div>  
            </div>
            <button @click="(editActive = !editActive),  (emptyFields = false)" class="input-sign-in m-3" >edit</button>
        </div>
        <div v-else class="size-card" v-bind:class="{ error: emptyFields }">
          <div class="">
            <div>
              <p class="header-topic-two">USERNAME :
                {{ this.showProfile.userName}}</p>
            </div>
          </div>
          <div>
          <div class="">
            <form @submit.prevent="editProfile" class=" size-card ">
                <p class="header-form">  Last Update : {{ this.showProfile.firstName}}</p>
                <input v-model="editFrom.firstName" name="Firstname" placeholder="Firstname" required class="input-text " />
                <p class="header-form">  Last Update : {{ this.showProfile.lastName}}</p>
                <input v-model="editFrom.lastName" name="lastName" placeholder="LastName" required class="input-text" />
                <p class="header-form">  Last Update : {{ this.showProfile.email}}</p>
                <input v-model="editFrom.email" name="email" placeholder="Email" required class="input-text" />
                <p class="header-form">  Last Update : {{ this.showProfile.phoneNumber}}</p>
                <input v-model="editFrom.phone" name="phone" placeholder="Phone" required class="input-text" />
                <p class="header-form">  Last Update : {{ this.showProfile.address}}</p>
                <input v-model="editFrom.address" name="address" placeholder="Address" required class="input-text" />
                <div class="flex flex-row m-2  ">
                  <a href="#" @click="  (editActive = !editActive),  (emptyFields = false)" class=" cancle-button ">
                    <h3 class="">cancel</h3>
                  </a>
                  <input type="submit" class="summit-button">
                </div>
            </form>
           </div>
        </div>
      </div>
    </div>
    </div>
  </div>
         
      

</template>
<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      showProfile: [],
      editActive: false,
      emptyFields: false,
      editFrom:{
          firstName: "",
          lastName: "",
          phone: "",
          address:"",
          email:"",
      },
      invalid: { 
          invalidfirstName: false,
          invalidlastName: false,
          invalidphone: false,
          invalidaddress: false,
          invalidemail: false,
        }
    };
  },
  methods: {
    getProfile() {
      axios
        .get(`${process.env.VUE_APP_ROOT_API}user/myprofile`)
        .then((response) => {
          this.showProfile = response.data;
          console.log("Profile : " + this.showProfile);
        })
        .then(function () {
          console.log("SUCCESS Profile");
        })
        .catch(function () {
          console.log("FAILURE  Profile");
        });
    },
     editProfile() {
        this.invalid.invalidfirstName = this.editFrom.firstName === "" ? true : false || this.editFrom.firstName
          .length > 50 ? true : false;
        this.invalid.invalidlastName = this.editFrom.lastName === "" ? true : false || this.editFrom.lastName.length >
          50 ? true : false;
        this.invalid.invalidphone = this.editFrom.phone.length < 8 ? true : false || this.editFrom.phone.length >
          10 ? true : false;
        this.invalid.invalidaddress = this.editFrom.address.length === "" ? true : false || this.editFrom.address
          .length > 80 ? true : false;
           this.invalid.invalidemail = this.editFrom.email.length === "" ? true : false || this.editFrom.email
          .length > 50 ? true : false;
        if (
          this.invalid.invalidemail ||
          this.invalid.invalidaddress ||
          this.invalid.invalidfirstName ||
          this.invalid.invalidlastName ||
          this.invalid.invalidphone === true
        ) {
          console.log("false")
          alert("False")
        } else {
          this.sentedit();

        }

     },
     sentedit(){
      let formData = new FormData()
      let editJson = JSON.stringify(this.editFrom);
      const caseBlob = new Blob([editJson],{
          type: 'application/json'
      })
        formData.append('newProfileInfo', caseBlob)
        axios.put(`${process.env.VUE_APP_ROOT_API}user/editMyprofile`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }).then(function () {
            console.log('SUCCESS')
            alert("SUCCESS")
          })
          .catch(function () {
            console.log('FAILURE')
            alert("FAILURE")
          })
        console.log(editJson)
        
        this.$router.replace({
            name: 'Profile'
          })
     }

  },
  async created() {
    await this.getProfile();
  },
};
</script>