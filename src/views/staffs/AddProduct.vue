<template>
  <div class=" mt-3 text-center md:w-5/6 items-center md:mx-auto  bg-white lg:md-20 ">
    <div class="sm:p-5 p-5">
    <div class="bg-pink-200 rounded-full">
      <div class="text-4xl font-semibold m-5 p-3 ">Add Product</div>
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
        <div class="flex border-2 rounded-xl m-2 p-5 "  >
          <div class="w-2/6 flex justify-center items-center">
            <div class="w-3/5 flex flex-col relative overflow-hidden   ">
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
            <div class="flex">
              <div class="flex-1">

              <label for="CaseName" class="text-lg font-medium">Case Name</label>
              <input type="text" id="CaseName" v-model="newProduct.caseName" name="CaseName" class="defaultinput-light-input" placeholder="Your new product name." />
              </div>
              <div class="flex-1">
              <label for="caseDescription" class="text-lg font-medium">caseDescription</label>
              <textarea rows="50" type="text" id="caseDescription" v-model="newProduct.caseDescription"  name="caseDescription" class="defaultinput-light-input" placeholder="A description in brief for this product." />
              </div>
            </div>
            <div>
              <label for="casePrice" class="text-lg font-medium">casePrice</label>
              <input type="number" id="casePrice"  min="1" step="100" v-model="newProduct.casePrice" name="casePrice" class="defaultinput-light-input" placeholder="How mush is this?"/>
            </div>
            <!-- <div  class="default-error-notification-window" v-if="newProduct.caseName == '' || newProduct.casePrice == ''">
              Give your product a name, and set a price too.
            </div> -->
          </div>
          
        </div>
        <div class="flex justify-center items-center" v-if="!modelActive">
          <button @click="(modelActive = true),  (emptyFields = false)" class="cancle-button" >Choose Model and Colors</button>
        </div>
        <div v-else class="flex" >
          <!-- <input type="text" placeholder="" v-model="modelSearchName">
          <button type="button" @click="getModels" class="defaultinput-page-default-button">
            Search
          </button> -->
          
          <div class="flex w-2/3 justify-center md:mx-auto">
            <div class="w-2/6  sm:px-10 py-3  border-2 rounded-xl m-2">
            <label for="Brand and Model" class="text-lg font-medium">Brand and Model</label>
              <div v-for="(item, index) in modelList" :key="index">
                <div class="flex align-middle justify-start items-center border-2 rounded mb-2">
                  <input type="checkbox" class="text-lg  " :value="item" v-model="newProduct.models"/>
                  <div class="text-sm m-1 ">
                    <p class="text-center">{{ item.brand.caseBrand }} : {{ item.modelName }}</p> 
                  </div>
                </div>
              </div>
              <!-- <div>
                <h2 class="bg-red-400"> Your product will be available for the following models.</h2>
              </div>
              <div v-for="(item, index) in newProduct.models" :key="index"> {{ item.brand.caseBrand }} : {{ item.modelName }}</div>
              <div  class="default-error-notification-window" v-if="newProduct.models.length == 0">
                Select at least one compatible model.
              </div> -->
            </div>  
            <div class="flex w-4/6 flex-row">
              <div class="w-2/4 py-3 border-2 rounded-xl m-2">
              <label for="Colors" class="text-lg font-medium">Colors</label>
                <div v-for="color in colorList" :key="color.codeColor" class="flex flex-row items-center mx-5 mb-5">
                  <input type="checkbox" :id="color.caseColor" :value="{ color: color, imageCase: null, quantity: 0 }"  v-model="newProduct.productColor"/>
                  <label @click="color.selected = !color.selected" :for="color.caseColor" :class=" color.caseColor ? 'colorpick-' + color.caseColor.toLowerCase(): ''">{{color.caseColor}}</label>
                  <!-- <div class="">
                    <div :class="'colorpick-' + color.caseColor.toLowerCase() "></div>
                  </div> -->
                </div>
              </div>
              <!-- <div
                class="default-error-notification-window"
                v-if="newProduct.productColor.length == 0"
              >
                Select at least one color.
              </div> -->
              <div class="w-2/4 py-3 border-2 rounded-xl m-2">
              <label for="Quantity" class="text-lg font-medium">Quantity</label>
                <div v-for="(color, index) in newProduct.productColor" :key="index">
                  <div class="flex items-center mx-1 mb-5">
                  <div :class=" 'colorpick-bg-' + color.color.caseColor.toLowerCase() + ' flex justify-start items-center '">
                    <button  type="button" class="defaultinput-pick-model-button " @click="color.quantity = this.decreaseStock(color.quantity)">
                      -
                    </button>
                    <input  class="defaultinput-light-input-number" type="number" placeholder="Quantity" v-model="newProduct.productColor[index].quantity"/>
                    <button type="button" class="defaultinput-pick-model-button " @click="color.quantity = this.increaseStock(color.quantity)">
                      +
                    </button>
                    <div>Quantity : {{ color.quantity }}</div>
                  </div>  
                  </div>
                </div>
              </div>
            </div>
          </div>
        <!-- <a href="#" @click="  (modelActive = !modelActive),  (emptyFields = false)" class=" w-16 h-16  mx-6 tracking-wide font-semibold bg-purple-500 text-gray-100   rounded-lg hover:bg-purple-700 transition-all duration-300  flex items-center justify-center ease-in-out focus:outline-none "> <h3 class="">choose</h3></a> -->
        </div>
        <div class="flex justify-center items-center">
        <button type="submit" class="summit-button  ">Summit</button>
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
    formValidate() {
      this.invalid.caseName =this.newProduct.caseName === "" || this.newProduct.caseName.length > 25? true: false;
      //this.invalid.caseDescription = this.newProduct.caseDescription === "" ? true : false;
      this.invalid.casePrice = this.newProduct.casePrice < 0 ? true : false;
      this.invalid.productColor =this.newProduct.productColor === "" ? true : false;
      this.invalid.models = this.newProduct.models === "" ? true : false;
      if (
        this.invalid.caseName ||
        this.invalid.casePrice ||
        this.invalid.productColor ||
        this.invalid.models
      ) {
        this.invalid.validationPassed = false;
      } else {
        let response = this.addProduct(this.newProduct, document.getElementById('imageHolderDiv').files[0]);
        this.invalid.validationPassed = true;
        console.log(JSON.stringify(response));
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