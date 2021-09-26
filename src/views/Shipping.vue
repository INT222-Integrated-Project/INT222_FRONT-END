<template>
  <div class="sm:w-3/4 w-screen mx-auto mt-10">
    <div class="flex shadow-md my-10">
      <div class="w-screen bg-white px-10 py-10">
        <div class="flex justify-between  pb-8">
          <h1 class="font-semibold sm:text-6xl text-3xl text-pink-400">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl">{{ itemCount }} Items</h2>
        </div>
        <div class="flex mt-10 mb-5 py-2 justify-center border-b-2 border-gray-300">
          <h3 class=" font-semibold text-gray-600  uppercase w-2/5">Product Details</h3>
          <h3 class="flex justify-center font-semibold  text-gray-600  uppercase w-1/5">Quantity</h3>
          <h3 class="flex justify-center font-semibold text-gray-600  uppercase w-1/5">Price</h3>
          <h3 class="flex justify-center font-semibold text-gray-600  uppercase w-1/5">Total</h3>
        </div>

        <div class="" v-if="products.length > 0" >
          <div class="flex justify-center w-full  border-gray-100  " v-for="product in products" :key="product.name">
            <div class=" font-semibold text-gray-600  uppercase w-2/5  ">
              <div class="flex justify-start items-center flex-row">
                <img :src="product.image" :alt="product.name" class="h-36  " />
                <div class="flex flex-col">
                  <h2 class="font-bold ">{{ product.name }}</h2>
                  <h2 class="text-red-500 ">{{ product.description }}</h2>
                  <a @click="removeItem(index)"  href="#" class="font-semibold hover:text-red-500 text-gray-500 ">Remove</a>
                </div>
              </div>
            </div>
            <div class=" flex justify-center font-semibold  text-gray-600  uppercase w-1/5">
              <input type="number" class="border text-center h-10 w-10 " step="1" :value="product.quantity" @input="updateQuantity(index, $event)" @blur="checkQuantity(index, $event)" />
            </div>
            <div class="flex justify-center font-semibold text-gray-600  uppercase w-1/5"> <h2 >{{ product.price }}THB</h2></div>
            <div class="flex justify-center font-semibold text-gray-600 uppercase w-1/5"> <h2 >{{ product.price * product.quantity }}THB</h2></div>
          </div>
          <router-link to="/" class="flex font-semibold text-indigo-600 text-sm py-10 border-b-2 border-gray-300">
          <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/>
          </svg>
          Continue Shopping
        </router-link>

        <div class="m-3">
        <label class="text-xl">Have A Promo Code?</label>
        <div>
          <input type="text" class="border-4 border-pink-400 rounded-3xl h-12 w-56 text-center" v-model="promoCode" /> 
          <button type="button" class="ml-3 rounded-3xl h-12 w-36 text-white bg-pink-400 absolute " @click="checkPromoCode">checkPromoCode</button>
        </div>
      </div>
      <div class=" flex justify-end mt-5">
        <ul class=" text-xl font-bold ">
          <li>Subtotal <span class="ml-32">{{ subTotal  }} THB </span></li>
          <li v-if="discount > 0">Discount <span  class="ml-28">{{ discountPrice }} THB </span></li>
          <li> Tax <span class="ml-60">{{ tax  }} % </span></li>
          <li class="">Total <span class="ml-40">{{ totalPrice.toFixed(2)  }} THB </span></li>
        </ul>
      </div>
      <div class=" flex justify-end   text-white m-5 ">
        <button type="button" class="text-center bg-blue-300 rounded-3xl text-2xl p-5 h-16 w-42">Check Out</button>
      </div>
        </div>
        
        <div v-else class="flex flex-col">
          <h3 class=" p-3 text-3xl text-center">There are no products in your cart.</h3>
          <router-link to="/" class="flex justify-center">
            <button class=" bg-purple-400 rounded-3xl p-3 text-xl text-white mx-6 w-56  ">Shopping now</button>
            </router-link>
         </div>
      </div>
    </div>
    <!-- <section class="flex justify-center flex-col " v-if="products.length > 0">
      
    </section> -->
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [
        // {
        //   image: "https://cdn-image02.casetify.com/usr/14396/4304396/~v72/7057674_iphone11__color_white_16000089.png.350x350-w.m80.jpg",
        //   name: "Buttercake case",
        //   description: "Sumsung",
        //   price: 1750,
        //   quantity: 2,
        // },
        // {
        //   image: "https://cdn-image02.casetify.com/usr/3640/933640/~v34/2188915_iphone7-plus_298704.png.560x560-w.m80.jpg",
        //   name: "Icecramcake case",
        //   description: "Iphone",
        //   price: 2000,
        //   quantity: 1,
        // },
      ],
      tax: 7,
      promotions: [
        {
          code: "SUMMER",
          discount: "50%",
        },
        {
          code: "AUTUMN",
          discount: "40%",
        },
        {
          code: "WINTER",
          discount: "30%",
        },
      ],
      promoCode: "",
      discount: 0,
    };
  },
  computed: {
    itemCount: function() {
      var count = 0;

      for (var i = 0; i < this.products.length; i++) {
        count += parseInt(this.products[i].quantity) || 0;
      }

      return count;
    },
    subTotal: function() {
      var subTotal = 0;
      for (var i = 0; i < this.products.length; i++) {
        subTotal += this.products[i].quantity * this.products[i].price;
      }
      return subTotal;
    },
    discountPrice: function() {
      return this.subTotal * this.discount / 100;
    },
    totalPrice: function() {
      return this.subTotal - this.discountPrice + 100/this.tax;
    },
     
  },
  methods: {
    updateQuantity: function(index, event) {
      var product = this.products[index];
      var value = event.target.value;
      var valueInt = parseInt(value);

      // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
      if (value === "") {
        product.quantity = value;
      } else if (valueInt > 0 && valueInt < 100) {
        product.quantity = valueInt;
      }

      this.$set(this.products, index, product);
    },
    checkQuantity: function(index, event) {
      // Update quantity to 1 if it is empty
      if (event.target.value === "") {
        var product = this.products[index];
        product.quantity = 1;
        this.$set(this.products, index, product);
      }
    },
    removeItem: function(index) {
      this.products.splice(index, 1);
    },
    checkPromoCode: function() {
      for (var i = 0; i < this.promotions.length; i++) {
        if (this.promoCode === this.promotions[i].code) {
          this.discount = parseFloat(
            this.promotions[i].discount.replace("%", "")
          );
          return;
        }
      }
      alert("Sorry, the Promotional code you entered is not valid!");
    }
  }
};
</script>