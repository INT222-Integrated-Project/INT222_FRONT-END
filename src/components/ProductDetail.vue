<template>
  <div class="fixed  inset-0 bg-blue-200 sm:w-4/12 ">
    <div class="flex justify-end items-end mx-6 my-3">
      <button @click="closeCurrentModal" class="flex justify-center items-center sm:h-10  bg-white rounded-lg ">
        <i class="material-icons w-16  text-center">keyboard_backspace</i>
      </button>
    </div>
<<<<<<< HEAD
    <div class="  flex justify-center item-center sm:w-full " style="font-family: 'Muli', sans-serif;">
      <div  class="w-10/12 ">
=======
    <div class=" sm:m-  flex justify-center item-center sm:w-11/12 " style="font-family: 'Muli', sans-serif;">
      <div class="flex sm:mx-a16  mx-4 ">
>>>>>>> 6251e7ffbf215e5711e2fdfaa5b9aa93e8ed8d9d
        <div class="card-two ">

          <form @submit.prevent="addtocard">
            <div class="flex justify-end items-end absolute ">
              <h2 class="text-lg text-gray-400 font-light  mx-3   "> {{ product.caseDate }}</h2>
            </div>
<<<<<<< HEAD
            <div class="flex flex-row">
              <div>
                <p class="text-lg text-gray font-light ">Description </p> 
              </div>
              <div>
                <p class="text-lg text-gray font-light ml-3">{{ product.caseDescription }}</p>
              </div>
                
              </div>
            
            <div class="flex flex-row">
              <div class="flex-1  ">
                <p  class="text-lg text-black font-light  ">Color</p>
                <div class="flex flex-row items-center justify-center    ">
                  <select  :value="c" id="productColor" name="productColor" v-model="productCart.productColorId" class="bg-gray-100 rounded py-2 mb-4 w-full h-10 flex mx-2 items-center text-center ">
                    <option disabled value="Colors" >Colors</option>
                    <option v-for="c in product.productColor"  :key="c" selected 
                        :class=" c.color.caseColor ? 'bg-caseCol-' + c.color.caseColor.toLowerCase(): '' ? 'text-caseCol-'+ c.color.caseColor.toLowerCase(): ''  "   > {{c.productcolorID}}</option>
                  </select>
                </div>
              </div>
              <div class="flex-1">
                <p  class="text-lg text-black font-light ">Quantity</p>
                  <input type="number" placeholder="Quantity" min="1" step="1" max="" v-model="productCart.quantityOrder" class="bg-gray-100 rounded py-2 mb-4 w-full h-10 flex mx-2 items-center text-center "/>                
              </div>
            </div>
            
            
            <div class="flex flex-row">
              <div class="flex-1">
                <!-- <p  class="text-lg text-black font-light ">Model {{product.models[0].brand.caseBrand}}</p> -->
                <select  class="bg-gray-100 rounded py-2 mb-4 w-40 h-10" id="caseBrand" placeholder="Model" name="caseBrand" > 
                  <option value="Model" disabled >models</option>
                  <option v-for=" (m,index) in product.models"  :key="index" >{{m.modelName}}</option>
                </select>
=======

            <img
              src="https://cdn-image02.casetify.com/usr/17130/1187130/~v87/4974841x2_iphone11_16002941.png.1000x1000-w.m80.jpg"
              class=" sm:h-72 h-56 flex justify-center item-center mx-auto " />

            <div
              class="flex justify-center items-center  p-2 sm:p-4 rounded-lg sm:h-80 md:h-80 border-2 m-2 border-gray-700 h-72 flex-col ">
              <div class="flex">
                <h5 class="text-black sm:text-2xl text-md font-bold ">
                  {{ product.caseName }}
                </h5>
              </div>
              <div class="flex ">
                <p class="text-xl text-black font-semibold text-center"> ฿{{ product.casePrice + ".-" }} baht.</p>
              </div>

              <div class="flex flex-row">
                <div class="flex-1 flex-col">
                  <p class="text-lg text-gray font-light ">Description </p>
                  <div class="text-lg text-black border-2 border-gray-800 w-full">
                    <p class="text-lg text-gray font-light flex-1">{{ product.caseDescription }}</p>
                  </div>
                </div>
                <div class="flex-1  ">
                  <p class="text-lg text-black font-light  ">Color</p>
                  <div class="flex flex-row items-center justify-center space-x-3   ">
                    <select :value="c" id="productColor" name="productColor" v-model="productCart.productColorId">
                      <option disabled value="Colors">Colors</option>
                      <option v-for="c in product.productColor" :key="c" selected> {{c.productcolorID}}</option>
                      <!-- class="flex rounded-full bg-black h-8 w-8 shadow-inner " :class=" c.color.caseColor ? 'bg-caseCol-' + c.color.caseColor.toLowerCase(): '' "> -->
                      <!-- @click="c.checked = !c.checked" :for="c.color.caseColor"
                            <span v-show="c.checked" class="flex mx-auto items-center material-icons text-black">done</span> -->

                    </select>
                  </div>

                </div>
                <div class="flex-1">
                  <p class="text-lg text-black font-light ">Quantity</p>


                  <!-- <div  :class="'colorpick-bg-' + c.color.caseColor.toLowerCase() +' flex justify-start items-center'">
                        <button type="button" class="defaultinput-pick-model-button" @click="c.quantity = this.decreaseStock(c.quantity)"> - </button>
                        
                        <button type="button" class="defaultinput-pick-model-button" @click="c.quantity = this.increaseStock(c.quantity)"> + </button>
                      </div> -->

                  <!-- </div> -->
                  <input type="number" placeholder="Quantity" min="1" step="1" max="" v-model="productCart.quantity"
                    class="bg-gray-100 rounded py-2 mb-4 w-full h-10 flex  items-center text-center " />
                </div>
>>>>>>> 6251e7ffbf215e5711e2fdfaa5b9aa93e8ed8d9d
              </div>


              <div class="flex flex-row">
                <div class="flex-1">
                  <p class="text-lg text-black font-light ">Model {{product.models[0].brand.caseBrand}}</p>
                  <select class="bg-gray-100 rounded py-2 mb-4 w-40 h-10" id="caseBrand" placeholder="Model"
                    name="caseBrand">
                    <option value="Model" disabled>models</option>
                    <option v-for=" (m,index) in product.models" :key="index">{{m.modelName}}</option>
                  </select>
                </div>
                <div class="flex-1">

                </div>
              </div>

              <div class="flex ">
                <button type="submit" v-show="!orderNotification.successOrder"
                  class="font-semibold bg-blue-400 text-white  p-4 rounded-lg hover:bg-purple-500 transition-all duration-300 ease-in-out focus:outline-none">Add
                  to cart</button>
              </div>
            </div>
          </form>

          <div v-show="this.orderNotification.errorMessage != ''" class="default-error-notification-window">
            {{this.orderNotification.errorMessage}}
          </div>
          <div v-show="this.orderNotification.successOrder" class="default-success-notification-window flex">
            <div class="w-4/5">successfully ordered! You can check your order in your profile.</div>
            <button class="defaultinput-button-small-green" @click="closeOrderSuccessNotification">OK</button>
          </div>

        </div>
<<<<<<< HEAD
          {{productCart}}

      </div>
    </div>
    
  </div>  
=======


      </div>
    </div>
  </div>

>>>>>>> 6251e7ffbf215e5711e2fdfaa5b9aa93e8ed8d9d
</template>
<script>
  import axios from "axios"
  export default {
    emits: ["close"],
    props: [
      "product",
    ],
    components: {

    },
    data() {
      return {
        detail: [],
        productCart: {
          productColorId: "",
          quantity: "",
        },
        orderNotification: {
          successOrder: false,
          errorMessage: ""
        }
      };
    },
<<<<<<< HEAD
    async addtocard(){
      let formData = new FormData();
       let addproJson = JSON.stringify(this.productCart);
        
        const addjsonBlob = new Blob([addproJson], {
          type: 'application/json'
        })
      formData.append('newOrders', addjsonBlob)
      
      console.log(addproJson)
      let errorCode = 0;
      await axios.post(`${process.env.VUE_APP_ROOT_API}user/addOrder`, formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }).then(function () {
=======
    methods: {
      closeCurrentModal() {
        this.$emit("close", true);
      },
      closeOrderSuccessNotification() {
        this.orderNotification.successOrder = false;
      },
      async addtocard() {
        let errorCode = 0;
        let formData = new FormData()
        formData.append('productColorId', this.productCart.productColorId);
        formData.append('quantity', this.productCart.quantity);
        await axios.post(`${process.env.VUE_APP_ROOT_API}user/purchase`, formData).then(function () {
>>>>>>> 6251e7ffbf215e5711e2fdfaa5b9aa93e8ed8d9d
            errorCode = 0;
            alert("Succesfully ordered!")
          })
          .catch(error => {
            errorCode = error.response.data.exceptionCode;
<<<<<<< HEAD
            console.log(error.response)
            alert("No")
=======
>>>>>>> 6251e7ffbf215e5711e2fdfaa5b9aa93e8ed8d9d
          })

        if (errorCode == 0) {
          this.orderNotification.successOrder = true;
          this.orderNotification.errorMessage = "";
        } else {
          console.log(errorCode)
          switch (errorCode) {
            case 1001:
              this.orderNotification.errorMessage = "Not found";
              break;
            case 6002:
              this.orderNotification.errorMessage = "Not enough good for sell.";
              break;
            default:
              this.orderNotification.errorMessage = "An error occured at the API.";
              break;

          }
          this.orderNotification.successOrder = false;
        }


      }
    },
    computed: {},
    async created() {
      //await this.addtocard();
    }
  };
</script>