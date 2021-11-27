<template >
  <div class=" bg-header  ">
    <div class="mt-3 text-center md:w-5/6 items-center md:mx-auto  bg-white lg:md-20 ">
      <slides ></slides>
      <showcase @detail-click="opendetail" @send-data="detailCase"></showcase>
       <productDetail  :product="product" v-if="detailCase" @close="changeShowItemClicked" />
    </div>
   <!--  v-for="(product,index) in ShowCase" :key="index" :value="product"
        :product="product" -->
   
  </div> 
  
</template>

<script>
// import axios from 'axios'
import showcase from "../components/ShowCase";
import productDetail from "../components/ProductDetail";
import slides from "../components/Caseslideshow.vue";
export default {
   props: ["", ],
  components: {
    showcase,
    slides,
    productDetail
    
    
  },
 data() {
    return {
      slides:false,
      ShowCase:[],
      detailCase:false,
      showProducts: []
    };
  },
  methods: {
    changeShowItemClicked(value) {
      this.detailCase = !value;
    },
    opendetail(value){
        console.log("xx"+value)
        this.detailCase = value;
        console.log(value)     
    },
    // showProduct() {
    //     axios.get(`${process.env.VUE_APP_ROOT_API}test/products`).then((response) => {
    //       this.ShowCase = response.data;
    //       console.log("product : "+this.ShowCase)
    //     }).then(function(){
    //         console.log('SUCCESS products')
    //       })
    //       .catch(function(){
    //         console.log('FAILURE  products')
    //       });               
    // },
    
    async created() {
    // await this.showProduct();
    }
  },
  computed:{
  }
};
</script>