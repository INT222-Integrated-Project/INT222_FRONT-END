<template>
  <div class="bodystyle-addproduct-page">
    <div>
      <div>Add product</div>
    </div>
    <div v-show="!invalid.validationPassed" class="default-error-notification-window">
      <p v-show="invalid.caseName">♦ Please fill in the product name.</p>
      <p v-show="invalid.casePrice">
        ♦ No negative number on caseprice or you don't have case price.
      </p>
      <p v-show="invalid.modals">♦ At least 1 model is required.</p>
      <p v-show="invalid.productColor">♦ At least 1 color is required.</p>
    </div>
    <div class="p-5">
      <!----
        Style file in a ton of files.
        The first place of the style name tells where the style is kept.
        -->

      <form @submit.prevent="formValidate">
        <div class="bodystyle-addproduct-form">
          <h2>Step 1 : General information</h2>
          <div>Add new products</div>

          <div class="flex flex-col justify-center w-1/12">
            <div>
              <img v-show="imageholderEnable" :src="productImage" class="input-image-get" />
              <button type="button">uploadPhoto</button>
              <input id="imageHolderDiv" type="file" @change="createNewProductImage" class="" />
            </div>
          </div>

          <div>
            <div>
              <label for="CaseName" class="text-lg font-medium">Case Name</label>
              <input type="text" id="CaseName" v-model="newProduct.caseName" name="CaseName"
                class="defaultinput-light-input" placeholder="Your new product name." />
            </div>
            <div>
              <label for="caseDescription" class="text-lg font-medium">caseDescription</label>
              <textarea rows="50" type="text" id="caseDescription" v-model="newProduct.caseDescription"
                name="caseDescription" class="defaultinput-light-input"
                placeholder="A description in brief for this product." />
              </div>
            <div>
              <label for="casePrice" class="text-lg font-medium"
                >casePrice</label
              >
              <input
                type="text"
                id="casePrice"
                v-model="newProduct.casePrice"
                name="casePrice"
                class="defaultinput-light-input"
                placeholder="How mush is this?"
              />
            </div>
            <div
              class="default-error-notification-window"
              v-if="newProduct.caseName == '' || newProduct.casePrice == ''"
            >
              Give your product a name, and set a price too.
            </div>
          </div>
        </div>
        <div class="bodystyle-addproduct-form">
          <h2>Step 2 : Pick models.</h2>
          <div>Pick at least 1 models that fit to this product.</div>

          <input type="text" placeholder="" v-model="modelSearchName">
          <button type="button" @click="getModels" class="defaultinput-page-default-button">
            Search
          </button>

          <div v-for="(item, index) in modelList" :key="index">
            <div class="flex align-middle justify-start items-center">
              <input type="checkbox" class="defaultinput-pick-model-button" :value="item" v-model="newProduct.models"/>
              <div>{{ item.brand.caseBrand }} : {{ item.modelName }}</div>
            </div>
          </div>

          <div>
              <!--PLEASE COMPLETE THE CSS-->
            <h2 class="bg-red-400">
              Your product will be available for the following models.
            </h2>
          </div>
          <div v-for="(item, index) in newProduct.models" :key="index">
            {{ item.brand.caseBrand }} : {{ item.modelName }}
          </div>
          <div
            class="default-error-notification-window"
            v-if="newProduct.models.length == 0"
          >
            Select at least one compatible model.
          </div>
        </div>

        <div class="bodystyle-addproduct-form">
          <h2>Step 3 : Pick colors.</h2>
          <div>Pick at least 1 color that fit to this product.</div>
          
          <div class="flex justify-between">
            <div v-for="color in colorList" :key="color.codeColor">
              <input
                type="checkbox"
                :id="color.caseColor"
                :value="{ color: color, imageCase: null, quantity: 0 }"
                v-model="newProduct.productColor"
              />
              <label
                @click="color.selected = !color.selected"
                :for="color.caseColor"
                :class="
                  color.caseColor
                    ? 'colorpick-' + color.caseColor.toLowerCase()
                    : ''
                "
              >
              </label>
              <div class="flex align-middle justify-start items-center">
                <div
                  :class="'colorpick-' + color.caseColor.toLowerCase()"
                ></div>
              </div>
            </div>
          </div>

          <div
            class="default-error-notification-window"
            v-if="newProduct.productColor.length == 0"
          >
            Select at least one color.
          </div>

          <div v-for="(color, index) in newProduct.productColor" :key="index">
            <div
              :class="
                'colorpick-bg-' +
                color.color.caseColor.toLowerCase() +
                ' flex justify-start items-center'
              "
            >
              <button
                type="button"
                class="defaultinput-pick-model-button"
                @click="color.quantity = this.decreaseStock(color.quantity)"
              >
                -
              </button>
              <input
                class="defaultinput-light-input-number"
                type="number"
                placeholder="Quantity"
                v-model="newProduct.productColor[index].quantity"
              />
              <button
                type="button"
                class="defaultinput-pick-model-button"
                @click="color.quantity = this.increaseStock(color.quantity)"
              >
                +
              </button>
              <div>Quantity : {{ color.quantity }}</div>
            </div>
          </div>
        </div>

        <div class="bodystyle-addproduct-form">
          <h2>Step 4 : Place product..</h2>
          <div>Please accept our term and aggrement.</div>
          <button type="submit" class="defaultinput-page-default-button">
            GO
          </button>
        </div>
      </form>
    </div>
    <div></div>
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