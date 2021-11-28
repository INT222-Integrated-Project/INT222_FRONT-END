<template>  
  <div class="fixed  inset-0 bg-blue-200 sm:w-4/12 ">
    <div class="flex justify-end items-end mx-6 my-3">
      <button @click="closeCurrentModal" class="flex justify-center items-center sm:h-10  bg-white rounded-lg " >
        <i class="material-icons w-16  text-center">keyboard_backspace</i>
      </button>
    </div>
    <div class="container sm:my-3  sm:items-center " style="font-family: 'Muli', sans-serif;">
      <div  class="flex sm:mx-a16  mx-4 ">
        <div class="card-two ">
          <div class="flex justify-end items-end absolute ">
            <h2 class="text-lg text-gray-400 font-light  mx-3   "> {{ product.caseDate }}</h2>
          </div>
          <img src="https://cdn-image02.casetify.com/usr/17130/1187130/~v87/4974841x2_iphone11_16002941.png.1000x1000-w.m80.jpg" class=" sm:h-72 h-56 flex justify-center item-center mx-auto " />
          
          <div class="flex  p-2 sm:p-4 rounded-lg sm:h-80 md:h-80 bg-pink-400 h-72 flex-col ">
            <div class="">
              <h5 class="text-white sm:text-2xl text-md font-bold ">
                {{ product.caseName }}
              </h5>
              <div class="flex ">
                <p class="text-xl text-white font-semibold text-center"> ฿{{ product.casePrice + ".-" }} baht.</p>
              </div>
            </div>
            <div class="flex">
              <div class="flex-1 flex-col">
                <p class="text-lg text-white font-light flex-1">Brand : {{product.models[0].brand.caseBrand}}</p>
                <p class="text-lg text-white font-light flex-1">Case type : {{ product.caseDescription }}</p>
                
              </div>
              <div class="flex-1 ">
                  <p  class="text-lg text-white font-light  ">Color</p>
                  <div class="flex flex-row items-center justify-center space-x-3   ">
                    <div  v-for=" (c,index) in product.productColor"  :key="index" > 
                      <input type="checkbox" :id="c.color.caseColor " :value="c" class="hidden"/>
                        <label @click="c.checked = !c.checked" :for="c.color.caseColor"
                            class="flex rounded-full bg-black h-8 w-8 shadow-inner " :class=" c.color.caseColor ? 'bg-caseCol-' + c.color.caseColor.toLowerCase(): '' ">
                          <span v-show="c.checked" class="flex mx-auto items-center material-icons text-white">done</span>
                        </label>
                    </div>                
                  </div>
                </div>
            </div>
            
            <div class="flex flex-row">
              <div class="flex-1">
                <p  class="text-lg text-white font-light ">Model</p>
                <select  class="bg-gray-100 rounded py-2 mb-4 w-40 h-10" id="caseBrand" placeholder="Model" name="caseBrand" v-model="productCart.model"> 
                  <option value="Model" disabled >models</option>
                  <option v-for=" (m,index) in product.models"  :key="index" >{{m.modelName}}</option>
                </select>
              </div>
              <div class="flex-1">
                <p  class="text-lg text-white font-light ">Quantity</p>
                <input type="number" placeholder="Quantity" class="bg-gray-100 rounded py-2 mb-4 w-full h-10 flex  items-center text-center " min="1" step="1" :value="productCart.quantity" @input="updateQuantity(index, $event)" @blur="checkQuantity(index, $event)" />
              </div>
            </div>
            
            <div class="flex justify-center items-center">
              <button  class="font-semibold bg-blue-400 text-white w-2/4 py-4 rounded-lg hover:bg-purple-500 transition-all duration-300 ease-in-out focus:outline-none">Add to cart</button>
            </div>
          </div>
        </div>
          

      </div>
    </div>
  </div>  
</template>
<script>
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
          model:"",
          quantity:"",
color:"",
      }
    };
  },
  methods: {
   closeCurrentModal() {
     this.$emit("close", true);
    },
  },
  computed:{
  },
   async created() {
    
   }
};
</script>
