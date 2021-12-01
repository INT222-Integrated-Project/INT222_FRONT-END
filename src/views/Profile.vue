<template>
  <div class="bg-header size-card-main-profile  ">
    <div class=" flex flex-col sm:flex-row  ">
      <!-- Profile information -->
      <div class="size-card flex sm:w-2/6 sm:m-6 p-3 bg-white ">
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
      <div class="container  sm:m-6 p-3  sm:w-4/6    bg-blue-300 sm:items-center  "
        style="font-family: 'Muli', sans-serif;">
        <p class="text-4xl text-center my-5  text-white font-semibold">My Product</p>
        <div v-if="!editproductActive" class="flex flex-wrap  sm:mx-2  mx-4 justify-center ">
          <div v-for="(myProduct,index) in ShowProductByuser" :key="index" :value="myProduct"
            class="m-2 w-5/6 flex justify-center items-center bg-black sm:w-1/3 md:w-2/6 sm:my-4  rounded-lg   hover:shadow-xl  ">
            <div class="card-two ">
              <img
                src="https://cdn-image02.casetify.com/usr/17130/1187130/~v87/4974841x2_iphone11_16002941.png.1000x1000-w.m80.jpg"
                alt="" class="block rounded-full" />
              <div class="flex items-center p-2 sm:p-4 rounded-lg sm:h-36 md:h-28 bg-purple-400 h-24 flex-col ">
                <div class="">
                  <h5 class="text-white sm:text-lg  md:text-sm text-center  font-bold leading-none">
                    {{ myProduct.caseName }}
                  </h5>
                </div>
                <div class="flex flex-row ">

                  <button @click="(editproductActive = true,editProduct = myProduct), (emptyFieldsproduct = false)"
                    class="sm:w-16 w-16 sm:h-10 h-10 m-2 tracking-wide font-semibold bg-pink-500 text-gray-100  rounded-lg hover:bg-pink-700 transition-all duration-300  flex items-center justify-center ease-in-out  focus:outline-none">Edit</button>

                  <button @click="deleteCase(myProduct.caseId)"
                    class="sm:w-16 w-16 sm:h-10 h-10 m-2 tracking-wide font-semibold bg-purple-500 text-gray-100   rounded-lg hover:bg-purple-700 transition-all duration-300  flex items-center justify-center ease-in-out focus:outline-none ">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-wrap  sm:mx-2  mx-4 justify-center bg-blue-500 ">
          <div>Edit your product : {{editProduct.caseName}}</div>
          <a href="#"
            @click="  (editproductActive = !editproductActive), imageholderEnable=false, (emptyFieldsproduct = false)"
            class=" w-16 h-16  mx-6 tracking-wide font-semibold bg-purple-500 text-gray-100   rounded-lg hover:bg-purple-700 transition-all duration-300  flex items-center justify-center ease-in-out focus:outline-none ">
            <h3 class="">cancel</h3>
          </a>
          <img v-show="!imageholderEnable" :src="`public/productImage/${editProduct.productImage}`"
            class="input-image-get" />
          <img v-show="imageholderEnable" :src="productImage" class="input-image-get" />
        </div>
        <!-- Paging -->
        <div v-show="!editproductActive" class="flex align-middle justify-center items-center sm:flex-row flex-col  ">
          <div class="flex flex-row">
            <div class="">
              <button class="flex default-page-button-show " style="width: 30px;"
                v-on:click="changePage(paging.currentPage - 1)" v-if="paging.currentPage != 1">
                <i class="material-icons"> keyboard_arrow_left </i>
              </button>
              <button class="flex default-page-button-current-show " style="width: 30px;" v-else>
                <i class="material-icons"> keyboard_arrow_left </i>
              </button>
            </div>
            <div v-for="index in this.paging.arrayofCurrentSetofPage" :key="index" class="">
              <button class="flex default-page-button-show" v-on:click="changePage(index)"
                v-if="index != paging.currentPage">
                {{index}}
              </button>
              <button class="flex default-page-button-current-show" v-on:click="changePage(index)" v-else>
                {{index}}
              </button>
            </div>
            <div>
              <button class="flex default-page-button-show " style="width: 30px;"
                v-on:click="changePage(paging.currentPage + 1)" v-if="paging.currentPage != paging.numberOfPage">
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
    <div class="bg-blue-300" v-show="editproductActive">
      <div>Edit your product : {{editProduct.caseName}}</div>
      <div>
        <p>{{editProduct}}</p>
      </div>

      <form @submit.prevent="formValidate">
        <div class="bodystyle-addproduct-form">

          <h2>Step 1 : Edit General information</h2>

          <div class="flex flex-col justify-center w-1/12">
            <div>
              <button type="button">uploadPhoto</button>
              <input id="imageHolderDiv" type="file" @change="createNewProductImage" class="" />
            </div>
          </div>
          <div class="flex flex-wrap items-center">
            <div class="defaultinput-box-edit-text-input flex flex-col">
              <h3> New Case Name </h3><br>
              <input class="defaultinput-light-input" id="caseName" type="text" placeholder="Product New Name"
                v-model="editProduct.caseName">

            </div>

            <div class="defaultinput-box-edit-text-input flex flex-col">
              <label for="caseDescription"> New Case Descrpition </label>
              <textarea class="defaultinput-light-input" id="caseDescription" placeholder="Product Description"
                v-model="editProduct.caseDescription"></textarea>

            </div>
            <div class="defaultinput-box-edit-text-input flex flex-col">
              <label for="casePrice"> New Case Price </label>
              <input class="defaultinput-light-input" id="casePrice" type="number" placeholder="New Price"
                v-model="editProduct.casePrice">
            </div>
          </div>
        </div>

        <div class="bodystyle-addproduct-form">
          <h2>Step 2 : Pick models.</h2>
          <input type="text" placeholder="" v-model="modelSearchName">
          <button type="button" @click="getModelList" class="defaultinput-page-default-button">
            Search
          </button>

          <div v-for="(item, index) in modelList" :key="index">
            <div class="flex align-middle justify-start items-center">
              <input type="checkbox" class="defaultinput-pick-model-button" :value="item"
                v-model="editProduct.models" />
              <div>{{ item.brand.caseBrand }} : {{ item.modelName }}</div>
            </div>
          </div>

          <div>
            <!--PLEASE COMPLETE THE CSS-->
            <h2 class="bg-red-400">
              Your product will be available for the following models.
            </h2>
          </div>
          <div v-for="(item, index) in editProduct.models" :key="index">
            {{ item.brand.caseBrand }} : {{ item.modelName }}
          </div>
          <div class="default-error-notification-window" v-if="editProduct.models.length == 0">
            Select at least one compatible model.
          </div>


        </div>

        <div class="bodystyle-addproduct-form">
          <h2>Step 3 : Pick colors.</h2>
          <div class="flex justify-between">

            <div v-for="color in colorList" :key="color.codeColor">
              <input type="checkbox" :id="color.caseColor" :value="{ color: color, imageCase: null, quantity: 0 }"
                v-model="editProduct.productColor" />
              <label @click="color.selected = !color.selected" :for="color.caseColor" :class="
                  color.caseColor
                    ? 'colorpick-' + color.caseColor.toLowerCase()
                    : ''
                ">
              </label>
              <div class="flex align-middle justify-start items-center">
                <div :class="'colorpick-' + color.caseColor.toLowerCase()"></div>
              </div>

              <div class="default-error-notification-window" v-if="editProduct.productColor.length == 0">
                Select at least one color.
              </div>
            </div>
          </div>
          <div v-for="(color, index) in editProduct.productColor" :key="index">
            <div :class="
                'colorpick-bg-' +
                color.color.caseColor.toLowerCase() +
                ' flex justify-start items-center'
              ">
              <button type="button" class="defaultinput-pick-model-button"
                @click="color.quantity = this.decreaseStock(color.quantity)">
                -
              </button>
              <input class="defaultinput-light-input-number" type="number" placeholder="Quantity"
                v-model="editProduct.productColor[index].quantity" />
              <button type="button" class="defaultinput-pick-model-button"
                @click="color.quantity = this.increaseStock(color.quantity)">
                +
              </button>
              <div>Quantity : {{ color.quantity }}</div>
            </div>
          </div>
        </div>


        <div class="bodystyle-addproduct-form">
          <h2>Step 4 : Revive And Save.</h2>
          <button v-show="!invalid.validationPassed" type="submit" class="defaultinput-page-default-button">
            GO
          </button>
          <div v-show="invalid.validationPassed"
            :class="error.showWindow=='Saving...'?'default-inprogress-notification-window':'Product is sucessfully updated'?'default-success-notification-window':'default-error-notification-window'">
            {{error.showWindow}}
          </div>
        </div>
        <br>

      </form>
    </div>
    <div v-show="false">

      <StaffOrderList></StaffOrderList>
      <StaffProductList></StaffProductList>

    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import {
    mapGetters
  } from 'vuex';
  import StaffProductList from '@/components/staffs/StaffProductList.vue'
  import StaffOrderList from '@/components/staffs/StaffOrderList.vue'
  import {
    prodcutControllerServices
  } from "@/.services/ProductsControllerServices.js";
  export default {
    mixins: [prodcutControllerServices],
    components: {
      StaffProductList,
      StaffOrderList
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