<template>
<div class="bg-pink-100  min-h-screen">

<p class="flex justify-center items-center text-8xl pt-6 ">SHOP</p>
<ul class="flex flex-wrap justify-center space-x-6  text-2xl border-gray-900 ">
  <li v-on:click="filter=false">All</li>
  <li v-on:click="filter='IPHONE'">IPHONE</li>
  <li v-on:click="filter='SAMSUNG'">SAMSUNG</li>   
</ul>
  <div class="flex items-center " style="font-family: 'Muli', sans-serif;">
    
    <div  class="flex  flex-wrap justify-center  space-x-2 gap-1  pl-5 pr-5 my-5 lg:pl-2 lg:pr-2 ">
      <div v-for="(p,index) in ShowCase.content" :key="index" :value="p" class="bg-white  w-72  mb-3 rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
        <figure class="mb-2">
          <img src="https://cdn-image02.casetify.com/usr/17130/1187130/~v87/4974841x2_iphone11_16002941.png.1000x1000-w.m80.jpg" alt="" class="h-64 ml-auto mr-auto" />
        </figure>
        <div class="rounded-lg p-3 bg-purple-400 flex flex-col h-32 ">
          <div>
            <h5 class="text-white text-lg  font-bold leading-none">
              {{ p.caseName }}
            </h5>
            <span class="text-xs text-white leading-none">{{ p.caseName }}</span>
          </div>
          <div class="flex items-center">
            <div class="text-lg text-white font-light">
              {{ p.casePrice + ".-" }}
            </div>
          </div>
            <form @submit.prevent="addToCart(p)">
            <button Type="submit"  class="rounded-full -mt-4  bg-purple-900 text-white hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none w-10 h-10 flex ml-auto transition duration-300">
              <i class="material-icons stroke-current m-auto">add_circle</i>
            </button>
        </form>
          <div class="flex flex-row  space-x-0.5  ">
             <label  v-for=" (c,index) in p.colors" :key="index" class=" bg-black h-2 w-5 shadow-inner" 
                    :class="c.caseColor ? 'bg-caseCol-' + c.caseColor.toLowerCase(): '' "> </label>           
            </div>
        </div>
      
      </div>
    </div>  
  </div>
</div>
        <!-- <div class="ml-auto my-2">
            <button class="bg-pink-300 py-2 px-3"  @click="editClick(proCase)">
                <i class="fas fa-pen"></i>
            </button>
            <button class="bg-purple-300 py-2 px-3 mx-2" @click="deleteCase(proCase.caseId)">
                <i class="fas fa-trash"></i>
            </button>
        </div> -->
     
  <!-- </div> -->

</template>
<script>
import axios from 'axios'

export default {
 emits: ['edit-click','send-data'],
 
  components: {
    
  },
  data() {
    return {
      ShowCase:[],
      cart: [],
      click: true,
      filter: false,
    };
  },
  methods:{
    showProduct() {
        axios.get(`${process.env.VUE_APP_ROOT_API}public/products`).then((response) => {
          this.ShowCase = response.data;
          console.log("product : "+this.ShowCase)
        }).then(function(){
            console.log('SUCCESS products')
          })
          .catch(function(){
            console.log('FAILURE  products')
          });               
    },
    async addToCart(p){
      let formData = new FormData()
            let caseJson = JSON.stringify(p);
                //add image to formdata            
            formData.append('body',caseJson)
            console.log(formData.getAll("addproduct"))
                //post to backend by multipart
            axios.post(`${process.env.VUE_APP_ROOT_API}user/addOrder`, formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',                   
              }
              }).then(function(){
                  console.log('SUCCESS')
                })
              .catch(function(){
                  console.log('FAILURE add to card')
              })
                  console.log(caseJson)          
    },
    // async deleteCase(id){
    //   await axios.delete(`${process.env.VUE_APP_ROOT_API}test/products/${id}`)
    //   for(let i = 0; i< this.ShowCase.length;i++ ){
    //     if(this.ShowCase[i].caseId == id){
    //       this.ShowCase.splice(i,1)
    //     }
    //   }
    // },
    // editClick(proCase) {
      
    //   this.$emit("edit-click", true);
    //   this.$emit("send-data", proCase);

    // }
 
  },
  async created() {
    await this.showProduct();
    
  }
}
</script>
