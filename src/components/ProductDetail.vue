<template>  
  <div class="fixed  inset-0 bg-blue-200 sm:w-4/12 ">
    <div class="flex justify-end items-end mx-6 my-3">
      <button @click="closeCurrentModal" class="flex justify-center items-center sm:h-10  bg-white rounded-lg " >
        <i class="material-icons w-16  text-center">keyboard_backspace</i>
      </button>
    </div>
    <div class="  flex justify-center item-center sm:w-full " style="font-family: 'Muli', sans-serif;">
      <div  class="w-10/12 ">
        <div class="card-two ">
          
          <form @submit.prevent="addtocard">
          <div class="flex justify-end items-end absolute ">
            <h2 class="text-lg text-gray-400 font-light  mx-3   "> {{ product.caseDate }}</h2>
          </div>

          <img src="https://cdn-image02.casetify.com/usr/17130/1187130/~v87/4974841x2_iphone11_16002941.png.1000x1000-w.m80.jpg" class=" sm:h-72 h-56 flex justify-center item-center mx-auto " />
          
          <div class="flex justify-center items-center  p-2 sm:p-4 rounded-lg sm:h-80 md:h-80 border-2 m-2 border-gray-700 h-72 flex-col ">
            <div class="flex">
              <h5 class="text-black sm:text-2xl text-md font-bold ">
                {{ product.caseName }}
              </h5>
            </div>
            <div class="flex ">
              <p class="text-xl text-black font-semibold text-center"> ฿{{ product.casePrice + ".-" }} baht.</p>
            </div>
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
              </div>
              <div  class="flex-1">
                
              </div>
            </div>

            <div class="flex ">
              <button type="submit" class="font-semibold bg-blue-400 text-white  p-4 rounded-lg hover:bg-purple-500 transition-all duration-300 ease-in-out focus:outline-none">Add to cart</button>
            </div>
          </div>
          </form>
        </div>
          {{productCart}}

      </div>
    </div>
    
  </div>  
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
      detail:[],
      productCart:{
        productColorId:"",
        quantityOrder:"",
      }
    };
  },
  methods: {
   closeCurrentModal() {
     this.$emit("close", true);
    },
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
            errorCode = 0;
            console.log(formData)
            alert("Yes")
          })
          .catch(error => {
            errorCode = error.response.data.exceptionCode;
            console.log(error.response)
            alert("No")
          })
          console.log(addproJson)
          console.log(errorCode);
    

    }
  },
  computed:{
  },
   async created() {
    
   }
};
</script>