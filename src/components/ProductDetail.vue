<template>
<div class="fixed    inset-0 bg-blue-200 sm:w-4/12">
  <div class="my-10">
    <div class="flex justify-end items-end mr-8 my-3 ">
      <button @click="closeCurrentModal" class="flex justify-center items-center sm:h-10  bg-white rounded-lg ">
        <i class="material-icons w-16  text-center">keyboard_backspace</i>
      </button>
    </div>

    <div class=" flex justify-center item-center w-full    " style="font-family: 'Muli', sans-serif;">
      <div  class="w-10/12  ">
        <div class="card-two flex justify-center item-center ">
          <form @submit.prevent="addtocard">
            <div class="flex justify-end items-end absolute ">
              <h2 class="text-lg text-gray-400 font-light  mx-3   "> {{ product.caseDate }}</h2>
            </div>
            <div class=" flex justify-center items-center ">
            <img :src="'https://naturegecko.com/backend/public/productImage/'+product.productImage" alt="" class=" sm:h-96 h-52 " />
            </div>
            <div class="flex justify-center items-center  p-2 sm:p-4 rounded-lg sm:h-96 md:h-80 h-80 border-2 m-2 border-gray-700 flex-col ">
              <div class="flex">
                <h5 class="text-black sm:text-2xl text-md font-bold ">
                  {{ product.caseName }}
                </h5>
              </div>
              <div class="flex ">
                <p class="text-xl text-black font-semibold text-center"> ฿{{ product.casePrice + ".-" }} baht.</p>
              </div>

              <div class="flex flex-row">
                <p class="text-lg text-gray font-light ">Description </p> 
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
                  <p class="text-lg text-black font-light ">Quantity</p>


                  <!-- <div  :class="'colorpick-bg-' + c.color.caseColor.toLowerCase() +' flex justify-start items-center'">
                        <button type="button" class="defaultinput-pick-model-button" @click="c.quantity = this.decreaseStock(c.quantity)"> - </button>
                        
                        <button type="button" class="defaultinput-pick-model-button" @click="c.quantity = this.increaseStock(c.quantity)"> + </button>
                      </div> -->

                  <!-- </div> -->
                  <input type="number" placeholder="Quantity" min="1" step="1" max="" v-model="productCart.quantity"
                    class="bg-gray-100 rounded py-2 mb-4 w-full h-10 flex  items-center text-center " />
                </div>

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
            <div v-show="this.orderNotification.errorMessage != ''" class="mx-2 default-error-notification-window">
              {{this.orderNotification.errorMessage}}
            </div>
            <div v-show="this.orderNotification.successOrder" class="mx-2 default-success-notification-window flex content-center justify-center">
              <div class="">successfully ordered!.<br/>Check it out at your profile!</div>
              <button class="defaultinput-button-small-green" @click="closeOrderSuccessNotification">OK</button>
            </div>
          </form>



        </div>

      </div>
    </div>
    
  </div>  
 </div>
</template>
<script>
  import axios from "axios"
  export default {
    emits: ["close"],
    props: [ "product",],
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
        await axios.post(`${process.env.VUE_APP_ROOT_API}user/purchase`, formData).then((respones) => {
            errorCode = 0;
            console.log(respones)
          })
          .catch(error => {
            errorCode = error.response.data.exceptionCode;
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
            case 6005:
              this.orderNotification.errorMessage = "You cannot buy your own product.";
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