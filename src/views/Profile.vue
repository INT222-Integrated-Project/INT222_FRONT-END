<template>  
  <div class="bg-header size-card-main-profile  ">
    <div class=" flex flex-col sm:flex-row  ">
    <!-- Profile information -->
      <div class="size-card flex sm:w-2/6 sm:m-6 p-3 bg-white ">
        <div class="size-card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtzCieUrB9F073CA4Yo903Lq5TokRS-53Jhm8NFhvPSS6YV4n853Pbhl6aqWXUp9gvj4E&usqp=CAU"
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
            <p class="flex justify-center items-center text-3xl text-center   font-semibold">Profile</p>
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

<!-- My Product Management -->
      <div  class="container  sm:m-6 p-3  sm:w-4/6    bg-blue-300 sm:items-center  " style="font-family: 'Muli', sans-serif;">
          <p class="text-4xl text-center my-5  text-white font-semibold">My Product</p>
          <div v-if="!editproductActive" class="flex flex-wrap  sm:mx-2  mx-4 justify-center ">
            <div  v-for="(myProduct,index) in ShowProductByuser" :key="index" :value="myProduct" class="m-2 w-5/6 flex justify-center items-center bg-black sm:w-1/3 md:w-2/6 sm:my-4  rounded-lg   hover:shadow-xl  ">
            <div class="card-two ">
              <img src="https://cdn-image02.casetify.com/usr/17130/1187130/~v87/4974841x2_iphone11_16002941.png.1000x1000-w.m80.jpg" alt="" class="block rounded-full" />
              <div class="flex items-center p-2 sm:p-4 rounded-lg sm:h-36 md:h-28 bg-purple-400 h-24 flex-col ">
                <div class="">
                  <h5 class="text-white sm:text-lg  md:text-sm text-center  font-bold leading-none">
                    {{ myProduct.caseName }}
                  </h5>
                </div>
                <div class="flex flex-row ">
                  <button @click="(editproductActive = true),  (emptyFieldsproduct = false)"  class="sm:w-16 w-16 sm:h-10 h-10 m-2 tracking-wide font-semibold bg-pink-500 text-gray-100  rounded-lg hover:bg-pink-700 transition-all duration-300  flex items-center justify-center ease-in-out  focus:outline-none">Edit</button>
                  <button @click="deleteCase(myProduct.caseId)" class="sm:w-16 w-16 sm:h-10 h-10 m-2 tracking-wide font-semibold bg-purple-500 text-gray-100   rounded-lg hover:bg-purple-700 transition-all duration-300  flex items-center justify-center ease-in-out focus:outline-none ">
                        Delete
                  </button>  
                </div>
              </div>
            </div>
            </div>
          </div>

          <div v-else class="flex flex-wrap  sm:mx-2  mx-4 justify-center bg-blue-500 " >
            <a href="#" @click="  (editproductActive = !editproductActive),  (emptyFieldsproduct = false)"
                    class=" w-16 h-16  mx-6 tracking-wide font-semibold bg-purple-500 text-gray-100   rounded-lg hover:bg-purple-700 transition-all duration-300  flex items-center justify-center ease-in-out focus:outline-none ">
                    <h3 class="">cancel</h3>
                  </a>
          </div>
          <!-- Paging -->
            <div class="flex align-middle justify-center items-center sm:flex-row flex-col  ">
              <div class="flex flex-row">
                <div class="">
                  <button class="flex default-page-button-show " style="width: 30px;" v-on:click="changePage(paging.currentPage - 1)" v-if="paging.currentPage != 1">
                  <i class="material-icons"> keyboard_arrow_left </i>
                  </button>
                  <button class="flex default-page-button-current-show " style="width: 30px;" v-else>
                    <i class="material-icons"> keyboard_arrow_left </i>
                  </button>
                </div>
                <div v-for="index in this.paging.arrayofCurrentSetofPage" :key="index" class="">
                  <button class="flex default-page-button-show" v-on:click="changePage(index)" v-if="index != paging.currentPage">
                    {{index}}
                  </button>
                  <button class="flex default-page-button-current-show" v-on:click="changePage(index)" v-else>
                    {{index}}
                  </button>
                </div>
                <div >
                <button class="flex default-page-button-show " style="width: 30px;" v-on:click="changePage(paging.currentPage + 1)" v-if="paging.currentPage != paging.numberOfPage">
                  <i class="material-icons"> keyboard_arrow_right </i>
                </button>
                <button class="flex default-page-button-current-show " style="width: 30px;" v-else>
                  <i class="material-icons"> keyboard_arrow_right </i>
                </button>
                </div>
            </div>
          </div> 
        </div>
      
<!--  -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
    data() {
      return {
        // profile information
        showProfile: {
          role: {}
        },
        editActive: false,
        emptyFields: false,
        editproductActive: false,
        emptyFieldsproduct: false,
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
        },
        // Flow list Product and page
        ShowProductByuser:{},
        paging: {
          currentPage: 1,
          numberOfPage: 0,

          arrayofCurrentSetofPage: []
        },
        totalElements: 0,
        gui: {
        edittingWindow: false,
        errorWindow: false,
        },
        exception: {
          message: ""
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
      },
      async getProductUser() {
        let errorcode = 0;
        let response = await axios.get(`${process.env.VUE_APP_ROOT_API}staff/myshop`, {
          params: { 
            page: this.paging.currentPage - 1,
            size: 3, 
          }
        }).catch(error => {
          errorcode = error.response.data.exceptionCode;
        })
        if (errorcode == 0) {
          this.gui.errorWindow = false;
          this.ShowProductByuser = response.data.content;
          this.paging.numberOfPage = response.data.totalPages;
          this.totalElements = response.data.totalElements;
          this.createPagingBar(this.paging.currentPage);
        } else {
          this.exception.message = "[ Not found ] "
          this.gui.errorWindow = true;
        }   
      },
      async deleteCase(id){
      await axios.delete(`${process.env.VUE_APP_ROOT_API}api/products/${id}`)
      for(let i = 0; i< this.ShowProductByuser.length;i++ ){
        if(this.ShowProductByuser[i].caseId == id){
          this.ShowProductByuser.splice(i,1)
        }
      }
    },
      async changePage(pageNumber) {
        this.paging.currentPage = pageNumber;
        this.createPagingBar(pageNumber);
        await this.getProductUser();
      },
      createPagingBar(pageNumber) {
        if (this.paging.numberOfPage >= 11) {
          this.paging.highestMove = this.paging.numberOfPage - 5;
          if (this.paging.highestMove <= pageNumber) {
            for (let index = 0; index < 11; index++) {
              this.paging.arrayofCurrentSetofPage[index] = this.paging.highestMove - 5 + index;
            }
          } else if (this.paging.lowestMove <= pageNumber) {
              for (let index = 0; index < 11; index++) {
                this.paging.arrayofCurrentSetofPage[index] = pageNumber - 5 + index;
              }
            } else {
              for (let index = 0; index < 11; index++) {
                this.paging.arrayofCurrentSetofPage[index] = index + 1;
              }
            }
        }else {
            this.paging.arrayofCurrentSetofPage = [];
              for (let index = 1; index <= this.paging.numberOfPage; index++) {
                this.paging.arrayofCurrentSetofPage.push(index);
              }
        }
      },      
    },
    async created() {
      await this.getProfile();
      await this.getProductUser();
      this.createPagingBar(1);
    },
  };
</script>