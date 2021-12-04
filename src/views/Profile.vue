<template>
  <div class="bg-header  h-screen flex justify-center items-center  ">
    <div class=" ">
      <!-- Profile information -->
      <div class="flex  sm:m-6 p-3 bg-white ">
        <div class="size-card">
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
                  <a href="#" @click="  (editActive = !editActive), imageholderEnable=false, (emptyFields = false)"
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
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import {
    mapGetters
  } from 'vuex';

  import {
    prodcutControllerServices
  } from "@/.services/ProductsControllerServices.js";
  export default {
    mixins: [prodcutControllerServices],
    components: {
      
    },
    data() {
      return {
        // profile information
        modelSearchName: "",
        productImage: null,
        editProduct: {
          caseName: "",
          caseDescription: "",
          casePrice: "",
          productColor: [],
          models: [],
        },
        modelList: [],
        colorList: [],
        showProfile: {
          role: {}
        },
        imageholderEnable: false,
        modelActive:false,
        editActive: false,
        colorActive:  false,
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
          validationPassed: false,
          invalidfirstName: false,
          invalidlastName: false,
          invalidphone: false,
          invalidaddress: false,
          invalidemail: false,
          models: false,
          productColor: false,
          casePrice: false,
          caseName: false,
          enableProductSubmitButton: true
        },
        error: {
          message: "",
          showWindow: ""
        },
        // Flow list Product and page
        ShowProductByuser: [],
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
      async formValidate() {
        this.invalid.caseName = this.editProduct.caseName === "" || this.editProduct.caseName.length > 25 ? true :
          false;
        //this.invalid.caseDescription = this.newProduct.caseDescription === "" ? true : false;
        this.invalid.casePrice = this.editProduct.casePrice < 0 ? true : false;
        this.invalid.productColor = this.editProduct.productColor === "" ? true : false;
        this.invalid.models = this.editProduct.models === "" ? true : false;
        if (
          this.invalid.caseName ||
          this.invalid.casePrice ||
          this.invalid.productColor ||
          this.invalid.models
        ) {
          this.invalid.validationPassed = false;
        } else {
          this.invalid.validationPassed = true;
          this.invalid.enableProductSubmitButton = false;
          this.error.showWindow = "Saving..."
          let response = await this.editSelectedProduct(this.editProduct, document.getElementById('imageHolderDiv')
            .files[0]);
          if (response.exceptionCode) {
            switch (response.exceptionCode) {
              case 2006:
                this.error.showWindow = "This product name is already taken by someone.";
                break;
              default:
                this.error.showWindow = "This is not an error from the API,"
                break;
            }
            setTimeout(() => {
              this.invalid.enableProductSubmitButton = true;
              this.invalid.validationPassed = false;
            }, 5000);
          } else {
            this.error.showWindow = "Product is sucessfully updated"
            console.log(response);
            setTimeout(() => {
              this.editproductActive = false;
              this.invalid.enableProductSubmitButton = true;
              this.invalid.validationPassed = false;
            }, 2000);
            console.log(this.ShowProductByuser);
            for (let index = 0; index < this.ShowProductByuser.length; index++) {
              if (response.caseID == this.ShowProductByuser[index].caseID) {
                this.ShowProductByuser[index] = response;
                break;
              }
            }
          }
        }
      },
      async getModelList() {
        this.modelList = await this.getAllAvailableModels(this.modelSearchName)
      },
      async getColorList() {
        this.colorList = await this.getAllAvailableColors();
      },
      async createNewProductImage(event) {
        this.imageholderEnable = false;
        const file = event.target;
        const reader = new FileReader();
        reader.onload = (event) => {
          this.productImage = event.target.result;
          this.imageholderEnable = true;
        };
        reader.readAsDataURL(file.files[0]);
      },
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
      async deleteCase(id) {
        await axios.delete(`${process.env.VUE_APP_ROOT_API}api/products/${id}`)
        for (let i = 0; i < this.ShowProductByuser.length; i++) {
          if (this.ShowProductByuser[i].caseId == id) {
            this.ShowProductByuser.splice(i, 1)
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
        } else {
          this.paging.arrayofCurrentSetofPage = [];
          for (let index = 1; index <= this.paging.numberOfPage; index++) {
            this.paging.arrayofCurrentSetofPage.push(index);
          }
        }
      },
    },
    computed: {
      ...mapGetters({
        authenticated: 'authentication/authenticated',
        user: 'authentication/user',
        roleName: 'authentication/roleName'
      })
    },
    async created() {
      await this.getProfile();
      await this.getProductUser();
      await this.getModelList();
      await this.getColorList();

      this.createPagingBar(1);
    },
  };
</script>