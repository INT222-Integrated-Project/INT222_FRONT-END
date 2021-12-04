<template>
  <div class="sm:w-3/4 h-screen mx-auto mt-10">
    <div class="flex shadow-md my-10">
      <div class="bg-white w-full px-10 py-10  ">
        <div class="flex justify-between  pb-3">
          <h1 class="font-semibold sm:text-6xl text-3xl text-pink-400">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl"> Items</h2>
        </div>
        <div class="flex mt-10 mb-5 py-2 justify-center border-b-2 border-gray-300">
          <h3 class=" font-semibold text-gray-600  uppercase w-2/5">Product Details</h3>
          <h3 class="flex justify-center font-semibold  text-gray-600  uppercase w-1/5">Quantity</h3>
          <h3 class="flex justify-center font-semibold text-gray-600  uppercase w-1/5">Price</h3>
          <h3 class="flex justify-center font-semibold text-gray-600  uppercase w-1/5">Total</h3>
        </div>
        <div v-if="productCart.length> 0">
          <div class="overflow-scroll h-72">
            <div class="flex justify-center w-full  border-gray-100  " v-for="product in productCart" :key="product">
              <div class=" font-semibold text-gray-600  uppercase w-2/5 " v-for="pro in product.orderDetails"
                :key="pro">
                <div class="flex justify-start items-center flex-row">
                  <img
                    src="https://cdn-image02.casetify.com/usr/17130/1187130/~v87/4974841x2_iphone11_16002941.png.1000x1000-w.m80.jpg"
                    alt="" class="h-16" />
                  <!-- <img :src=" 'https://naturegecko.com/public/productImage/' + pro.productColorToProducts.productImage" alt="" class="block rounded-full"/> -->
                  <div class="flex flex-col">
                    <h2 class="font-bold ">{{pro.productColorToProducts.products.caseName}}</h2>
                    <h2 class="text-red-500 ">{{ pro.productColorToProducts.products.description }}</h2>
                    <a @click="deleteCase(pro.productColorToProducts.products.caseID)" href="#"
                      class="font-semibold hover:text-red-500 text-gray-500 ">Remove</a>
                  </div>
                </div>
              </div>
              <div class=" flex justify-center font-semibold  text-gray-600  uppercase w-1/5">
                1
              </div>
              <div class="flex justify-center font-semibold text-gray-600  uppercase w-1/5">
                <h2>1550THB</h2>
              </div>
              <div class="flex justify-center font-semibold text-gray-600 uppercase w-1/5">
                <h2>1550THB</h2>
              </div>
            </div>

            <div class=" flex justify-end mr-20 ">
              <button type="button"
                class="text-center uppercase font-semibold rounded-3xl text-2xl p-5 h-16 w-42">3100THB</button>
            </div>

            <!-- <div class="m-3">
              <label class="text-xl">Have A Promo Code?</label>
              <div>
                <input type="text" class="border-4 border-pink-400 rounded-3xl h-12 w-56 text-center" v-model="promoCode" /> 
                <button type="button" class="ml-3 rounded-3xl h-12 w-36 text-white bg-pink-400 absolute " @click="checkPromoCode">checkPromoCode</button>
              </div>
            </div> -->
            <!-- <div class=" flex justify-end mt-5">
              <ul class=" text-xl font-bold ">
                <li>Subtotal <span class="ml-32">{{ subTotal  }} THB </span></li>
                <li v-if="discount > 0">Discount <span  class="ml-28">{{ discountPrice }} THB </span></li>
                <li> Tax <span class="ml-60">{{ tax  }} % </span></li>
                <li class="">Total <span class="ml-40">{{ totalPrice.toFixed(2)  }} THB </span></li>
              </ul>
            </div> -->

          </div>
          <router-link to="/" class="flex font-semibold text-indigo-600 text-sm py-10 border-b-2 border-gray-300">
            <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path
                d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </router-link>
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
  import {
    prodcutControllerServices
  } from "@/.services/ProductsControllerServices.js";
  export default {
    mixins: [prodcutControllerServices],
    data() {
      return {
        productCart: {},
      };
    },
    computed: {


    },
    methods: {
      async getCartList() {
        this.productCart = await this.getProductInCart();

      },
      async deleteCase(id) {
        let response = await this.permanentlyRemoveProduct(id);
        this.getProductUser();

        console.log(response)

        if (!response.success) {
          this.deleteError.hasException = true;
          switch (response.exceptionCode) {
            case 2008:
              this.deleteError.message = "This product has at least one orders coming."
              break;
            default:
              this.deleteError.message = "Some error occures"
              break;
          }
          setTimeout(() => {
            this.deleteError.hasException = false;
          }, 5000);
        } else {
          this.deleteError.issuccess == true;
          this.deleteError.message = "Product is deleted.";
          setTimeout(() => {
            this.deleteError.issuccess = false;
          }, 5000);
        }
      },
    },
    async created() {
      await this.getCartList();
    },
  };
</script>