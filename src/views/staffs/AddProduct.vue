<template>
  <div class=" mt-3 text-center md:w-5/6 items-center md:mx-auto  bg-white lg:md-20 ">
    <div class="sm:p-5 p-5">
      <div class="bg-blue-200 rounded-full border-1  hover:bg-blue-300  border-blue-600">
        <div class="text-4xl font-semibold m-5 p-3  ">Add Product</div>
      </div>
      <div v-show="!invalid.validationPassed" class="default-error-notification-window">
        <p v-show="invalid.caseName">♦ Please fill in the product name.</p>
        <p v-show="invalid.casePrice">
          ♦ No negative number on caseprice or you don't have case price.
        </p>
        <p v-show="invalid.modals">♦ At least 1 model is required.</p>
        <p v-show="invalid.productColor">♦ At least 1 color is required.</p>
      </div>
      <div class=" flex justify-center item-center bg-purple-300 p-5 rounded-xl">
        <!----
        Style file in a ton of files.
        The first place of the style name tells where the style is kept.
        -->

        <form @submit.prevent="formValidate">
          <div class="flex  rounded-xl sm:m-2 p-5 sm:flex-row flex-col justify-center items-center ">
            <div class="w-2/6 flex justify-center items-center">
              <div class="sm:w-3/5 w-full flex flex-col relative overflow-hidden   ">
                <img v-show="imageholderEnable" :src="productImage" class="" />
                <button type="button">uploadPhoto</button>
                <input id="imageHolderDiv" type="file" @change="createNewProductImage" class="text-center" />
              </div>
            </div>
            <div class="w-4/6">
              <i class="text-sm text-red-500" v-if="this.invalid.caseName">
                Invalid validate Image!
              </i>
              <i class="text-sm text-red-500" v-if="this.invalid.casePrice">
                Invalid validate Image!
              </i>
              <div class="flex  sm:flex-row flex-col ">
                <div class="flex-1 border-2 rounded-xl m-2">

                  <label for="CaseName" class="text-lg font-semibold">Case Name</label>
                  <input type="text" id="CaseName" v-model="newProduct.caseName" name="CaseName"
                    class="defaultinput-light-input" placeholder="Your new product name." />
                </div>
                <div class="flex-1 border-2 rounded-xl m-2">
                  <label for="caseDescription" class="text-lg font-semibold">caseDescription</label>
                  <textarea rows="50" type="text" id="caseDescription" v-model="newProduct.caseDescription"
                    name="caseDescription" class="defaultinput-light-input"
                    placeholder="A description in brief for this product." />
                </div>
              </div>
            <div class="border-2 rounded-xl m-2">
              <label for="casePrice" class="text-lg font-semibold">casePrice</label>
              <input type="number" id="casePrice" v-model="newProduct.casePrice" name="casePrice" class="defaultinput-light-input" placeholder="How mush is this?"/>
            </div>
            <div  class="default-error-notification-window" v-if="newProduct.caseName == '' || newProduct.casePrice == ''">
              Give your product a name, and set a price too.
            </div>
            <div class="border-2 rounded-xl m-2">
              <label for="Brand and Model" class="text-lg font-semibold ">Brand and Model</label>
                <div class="overflow-y-scroll h-44">
                  <div v-for="(item, index) in modelList" :key="index">
                    <div class="flex align-middle justify-start items-center border-2 rounded mb-2">
                      <input type="checkbox" class="text-lg  " :value="item" v-model="newProduct.models"/>
                      <div class="text-sm m-1 ">
                        <p class="text-center">{{ item.brand.caseBrand }} : {{ item.modelName }}</p> 
                      </div>
                    </div>
                  </div>
                </div>
                
              <div v-for="(item, index) in newProduct.models" :key="index"> {{ item.brand.caseBrand }} : {{ item.modelName }}</div>
              <div  class="default-error-notification-window" v-if="newProduct.models.length == 0">
                Select at least one compatible model.
              </div>
            </div>  
            


            <div class="border-2 rounded-xl m-2">
              <label for="Colors" class="text-lg font-semibold">Colors</label>
              <div class=" overflow-y-scroll h-44 grid grid-cols-4 sm:grid-cols-6">
                <div v-for="color in colorList" :key="color.codeColor" class="p-2">
                  <input type="checkbox" :id="color.caseColor" :value="{ color: color, imageCase: null, quantity: 0 }"  v-model="newProduct.productColor"/>
                  <label @click="color.selected = !color.selected"  :class=" color.caseColor ? 'colorpick-' + color.caseColor.toLowerCase(): ''"></label>
                </div>
              </div>
              <div
                class="default-error-notification-window"
                v-if="newProduct.productColor.length == 0"
              >
                Select at least one color.
              </div>
              <div class=" border-2 rounded-xl m-2">
              <label for="Quantity" class="text-lg font-semibold">Quantity</label>
                <div v-for="(color, index) in newProduct.productColor" :key="index">
                  <div class="flex items-center mx-1 mb-5">
                  
                  <div :class=" 'colorpick-bg-' + color.color.caseColor.toLowerCase() + ' flex justify-start items-center '">
                    <button  type="button" class="defaultinput-pick-model-button " @click="color.quantity = this.decreaseStock(color.quantity)">
                      -
                    </button>
                    <input  class="defaultinput-light-input-number" type="number" placeholder="Quantity" v-model="newProduct.productColor[index].quantity"/>
                    <button type="button" class="defaultinput-pick-model-button "  @click="color.quantity = this.increaseStock(color.quantity)">
                      +
                    </button>
                    <div class="text-gray-600">Quantity : {{ color.quantity }}</div>
                  </div>  
                  </div>
                </div>
              </div>
          </div>
          </div>
          
        </div>
        <!-- <div class="flex justify-center items-center" v-if="!modelActive">
          <button @click="(modelActive = true),  (emptyFields = false)" class="cancle-button" >Choose Model and Colors</button>
        </div>
        <div v-else class="flex" > -->
          <!-- <input type="text" placeholder="" v-model="modelSearchName">
          <button type="button" @click="getModels" class="defaultinput-page-default-button">
            Search
          </button> -->
          
          
        <!-- <a href="#" @click="  (modelActive = !modelActive),  (emptyFields = false)" class=" w-16 h-16  mx-6 tracking-wide font-semibold bg-purple-500 text-gray-100   rounded-lg hover:bg-purple-700 transition-all duration-300  flex items-center justify-center ease-in-out focus:outline-none "> <h3 class="">choose</h3></a> -->
        <!-- </div> -->
        <div class="flex justify-center items-center">
        <button type="submit" v-show="addSuccess && !nameExists &&!responseNoError" class="defaultinput-page-default-button-two">Submit</button>
        <div class="p-3 default-inprogress-notification-window" v-show="!addSuccess && !nameExists">
          Saving your new amazing product!
        </div>
        <div class="p-3 default-error-notification-window" v-show="nameExists">
          This product name is taken by another products.
        </div>
        <div class="default-success-notification-window" v-show="responseNoError">
          Product added! Redirecting to the home page of a store.
        </div>
        </div>
      </form>
    </div>
    
  </div>
</div>
</template>



<script>
import axios from "axios";
import ProductImage from "@/assets/placeholder.png";
import { paginationServices } from "@/.services/PaginationServices.js";
import { prodcutControllerServices } from "@/.services/ProductsControllerServices.js";

export default {
  mixins: [paginationServices, prodcutControllerServices],
  data() {
    return {
      test: 0,
      modelSearchName: "",
      searchModelName: "Galaxy",
      colorList: [],
      brandList: [],
      modelList: [],
      newProduct: {
        caseName: "",
        caseDescription: "",
        casePrice: "",
        productColor: [],
        models: [],
      },
      imageholderEnable: true,
      productImage: ProductImage,
      modelActive: false,
      emptyFields: false,
      choosemodelActive: false,
      error: {
        pageError: false,
      },
      invalid: {
        validationPassed: true,
        caseName: false,
        caseDescription: false,
        casePrice: false,
        productColor: false,
        models: false,
      },
      addSuccess: true,
      responseNoError: false,
      nameExists: false,
    };
  },
  methods: {
    //----------createNewProductImage---------
    async getModels(){
      let response = await this.getAllAvailableModels(this.modelSearchName);
      this.modelList = response
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
    //---------------FORM VALID---------------
    async formValidate() {
      this.addSuccess = false;
      this.invalid.caseName =this.newProduct.caseName === "" || this.newProduct.caseName.length > 25? true: false;
      //this.invalid.caseDescription = this.newProduct.caseDescription === "" ? true : false;
      this.invalid.casePrice = this.newProduct.casePrice < 0 ? true : false;
      this.invalid.productColor =this.newProduct.productColor === "" ? true : false;
      this.invalid.models = this.newProduct.models === "" ? true : false;
      if (
        this.invalid.caseName ||
        this.invalid.casePrice ||
        this.invalid.productColor ||
        this.invalid.models ||
        this.newProduct.models.length == 0 ||
        this.newProduct.productColor.length == 0
      ) {
        this.invalid.validationPassed = false;
        this.addSuccess = true;
        

      } else {
        let result;
        result = await this.addProduct(this.newProduct, document.getElementById('imageHolderDiv').files[0]);
        console.log(result)
         this.$router.replace({
            name: 'Home'
          })

        if(result.status == 400){
          alert("Please select an image for your product.")
          this.addSuccess = true;
        } else if(result.exceptionCode == 2006){
          this.addSuccess= true;
          this.nameExists = true;
          setTimeout(()=>{
          this.nameExists = false;
        },5000)
        } else {
          this.invalid.validationPassed = true;
        this.addSuccess = true;
        this.responseNoError = true;
        setTimeout(()=>{
          this.$router.replace({
                        name: 'Home'
                    });
          this.responseNoError = false;
        },2000)
        }       
      }
    },

    async getBrands() {
      await axios
        .get(`${process.env.VUE_APP_ROOT_API}public/brands`)
        .then((response) => {
          this.brandList = response.data;
        })
        .catch((error) => {
          this.error.pageError = error.response.data.message;
        });
    },
    async getColors() {
      await axios
        .get(`${process.env.VUE_APP_ROOT_API}public/colors`)
        .then((response) => {
          this.colorList = response.data;
        })
        .catch((error) => {
          this.error.pageError = error.response.data.message;
        });
    },
  },
  async created() {
    await this.getColors();
    await this.getModels();
    await this.getBrands();

    await axios
      .get(`${process.env.VUE_APP_ROOT_API}staff/myshop`)
      .then((response) => {
        console.log(response.data);
      });
  },
};
</script>