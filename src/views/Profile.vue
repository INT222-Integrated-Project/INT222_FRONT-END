<template>
  <div class="font-sans leading-tight min-h-screen bg-grey-lighter p-8">
    <div class="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <div class="flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtzCieUrB9F073CA4Yo903Lq5TokRS-53Jhm8NFhvPSS6YV4n853Pbhl6aqWXUp9gvj4E&usqp=CAU"
            class="sm:w-full w-full mx-auto" />
          <div>
            <p class="font-bold text-lg">
              {{ showProfile.role.roleName}}</p>
          </div>
        </div>
        <div v-if="!editActive" class="flex items-center flex-col  ">
          <div class="default-error-box" v-show="error.showWindow">
            <p>{{error.message}}</p>
          </div>
          <div>
            <p class="flex justify-center items-center text-5xl pt-6">Profile</p>
          </div>
          <div class="flex  justify-center flex-col items-center">
            <div>
              <p class="font-bold text-xl my-2">USERNAME :
                {{ this.showProfile.userName}}</p>
            </div>
            <div>
              <p class="text-grey-darker my-2">FIRSTNAME :
                {{ this.showProfile.firstName}}</p>
            </div>
            <div>
              <p class="text-grey-darker my-2">LASTNAME :
                {{ this.showProfile.lastName}}</p>
            </div>
            <div>
              <p class="text-grey-darker my-2">EMAIL :
                {{ this.showProfile.email}}</p>
            </div>
            <div>
              <p class="text-grey-darker my-2">PHONE :
                {{ this.showProfile.phoneNumber}}</p>
            </div>
            <div>
              <p class="text-grey-darker my-2">ADDRESS :
                {{ this.showProfile.address}}</p>
            </div>
          </div>
          <button @click="(editActive = true),  (emptyFields = false)" class="input-sign-in m-3">edit</button>
        </div>
        <div v-else class="flex items-center flex-col" v-bind:class="{ error: emptyFields }">
          <div>
            <p class="flex justify-center items-center text-5xl pt-6">Profile</p>
          </div>
          <div class="flex  justify-center flex-col items-center">
            <div>
              <p class="font-bold text-xl my-2">USERNAME :
                {{ this.showProfile.userName}}</p>
            </div>
          </div>
          <div>
            <div class="flex  justify-center flex-col items-center">
              <form @submit.prevent="editProfile" class=" flex flex-col justify-center items-center ">
                <p class="text-gray-500 m-1 text-sm"> Last Update : {{ this.showProfile.firstName}}</p>
                <input v-model="editFrom.firstName" name="Firstname" placeholder="Firstname" required
                  class="input-text w-3/5" />
                <p class="text-gray-500 m-1 text-sm"> Last Update : {{ this.showProfile.lastName}}</p>
                <input v-model="editFrom.lastName" name="lastName" placeholder="LastName" required class="input-text" />
                <p class="text-gray-500 m-1 text-sm"> Last Update : {{ this.showProfile.email}}</p>
                <input v-model="editFrom.email" name="email" placeholder="Email" required class="input-text" />
                <p class="text-gray-500 m-1 text-sm"> Last Update : {{ this.showProfile.phoneNumber}}</p>
                <input v-model="editFrom.phoneNumber" name="phone" placeholder="Phone" required class="input-text" />
                <p class="text-gray-500 m-1 text-sm"> Last Update : {{ this.showProfile.address}}</p>
                <input v-model="editFrom.address" name="address" placeholder="Address" required class="input-text" />
                <div class="flex flex-row m-2  ">
                  <a href="#" @click="  (editActive = !editActive),  (emptyFields = false)"
                    class=" w-16 h-16  mx-6 tracking-wide font-semibold bg-purple-500 text-gray-100   rounded-lg hover:bg-purple-700 transition-all duration-300  flex items-center justify-center ease-in-out focus:outline-none ">
                    <h3 class="">cancel</h3>
                  </a>
                  <input type="submit"
                    class="w-16 h-16 mx-6 tracking-wide font-semibold bg-pink-500 text-gray-100  rounded-lg hover:bg-pink-700 transition-all duration-300  flex items-center justify-center ease-in-out  focus:outline-none ">
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
        showProfile: {
          role: {}
        },
        editActive: false,
        emptyFields: false,
        editFrom: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          email: "",
        },
        invalid: {
          invalidfirstName: false,
          invalidlastName: false,
          invalidphone: false,
          invalidaddress: false,
          invalidemail: false,
        },
        error: {
          message: "",
          showWindow: ""
        }
      };
    },
    methods: {
      async getProfile() {
        await axios.get(`${process.env.VUE_APP_ROOT_API}user/myprofile`)
          .then((response) => {
            this.showProfile = response.data;
            this.editFrom.firstName = response.data.firstName;
            this.editFrom.lastName = response.data.lastName;
            this.editFrom.phoneNumber = response.data.phoneNumber;
            this.editFrom.address = response.data.address;
            this.editFrom.email = response.data.email;
          })
      },
      async editProfile() {
        this.invalid.invalidfirstName = this.editFrom.firstName === "" ? true : false || this.editFrom.firstName
          .length > 50 ? true : false;
        this.invalid.invalidlastName = this.editFrom.lastName === "" ? true : false || this.editFrom.lastName.length >
          50 ? true : false;
        this.invalid.invalidphone = this.editFrom.phoneNumber.length < 8 ? true : false || this.editFrom.phoneNumber
          .length >
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
        } else {
          await this.sentedit();

        }

      },
      async sentedit() {
        this.editActive = false;
        let formData = new FormData()
        let editJson = JSON.stringify(this.editFrom);

        const formDataBlob = new Blob([editJson], {
          type: 'application/json'
        })

        formData.append('newProfileInfo', formDataBlob)
        let errorCode = 0;
        let response = await axios.put(`${process.env.VUE_APP_ROOT_API}user/editMyprofile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).catch(error => {
          errorCode = error.response.data.exceptionCode;
        })

        console.log(response)


        if (errorCode == 0) {
          this.error.showWindow = false;
          this.editActive = false;
          this.showProfile = response.data;
        } else {
          this.error.showWindow = true;
          switch (errorCode) {
            case 3002:
              this.error.message = "This email is taken by another user."
              this.editFrom.email = ""
              break;
            case 3004:
              this.error.message = "This phone is taken by another user."
              this.editFrom.phoneNumber = ""
              break;
            default:
              this.error.message = "There is an unknown error occures."
              break;
          }
        }





      }

    },
    async created() {
      await this.getProfile();
    },
  };
</script>