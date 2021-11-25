<template>
  <div class="  min-h-screen">
    <p class="flex justify-center items-center sm:text-8xl text-4xl font-bold pt-6 ">SHOP</p>
    <div class="flex  justify-center items-center flex-col md:flex-row " >
      <input type="text" class="bg-pink-200 border-2 border-pink-500 hover:bg-pink-300 duration-100 my-5 md:w-4/6 px-8 py-4 rounded-lg font-medium " 
      placeholder="Search Case name" v-model="searchName">
      <button class="default-page-search-button my-5 " v-on:click.prevent="showProduct()">Search</button>
    </div>
    <div class="default-error-box" v-show="gui.errorWindow">
        {{exception.message}}
    </div>
    <!-- <ul class="flex flex-wrap justify-center space-x-6  text-2xl border-gray-900 ">
      <li v-on:click="filter=false">All</li>
      <li v-on:click="filter='IPHONE'">IPHONE</li>
      <li v-on:click="filter='SAMSUNG'">SAMSUNG</li>   
    </ul> -->
    
    <div class="container sm:my-12  sm:items-center " style="font-family: 'Muli', sans-serif;">
      <div  class="flex flex-wrap -mx-1 sm:-mx-4   justify-center">
        <div v-for="(p,index) in ShowCase" :key="index" :value="p" class="card-first">
        <div class="card-two ">
          <img src="https://cdn-image02.casetify.com/usr/17130/1187130/~v87/4974841x2_iphone11_16002941.png.1000x1000-w.m80.jpg" alt="" class="block rounded-full" />
          <div class="flex items-center p-2 sm:p-4 rounded-lg h-28 bg-purple-400  flex-col ">
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
              <!-- <button href="javascript:;" class="buttun-addpro ">
                <i class="material-icons stroke-current m-auto">add_circle</i>
              </button> -->
            </div>
            <div class="flex flex-row  space-x-0.5  ">
              <label  v-for=" (c,index) in p.productColor" :key="index" class=" bg-black h-2 w-5 shadow-inner" 
                      :class="c.color.caseColor ? 'bg-caseCol-' + c.color.caseColor.toLowerCase(): '' "> </label>           
              </div>
          </div>
        </div>
        </div>
      </div>  
    </div>
    <div class="flex align-middle justify-center items-center sm:flex-row flex-col mr-2 ">
      <div class="">
        <button class="flex default-page-button " style="width: 150px;" v-on:click="changePage(1)" v-if="paging.currentPage != 1">
          First Page
        </button>
        <button class="flex default-page-button-current" style="width: 150px;" v-on:click="changePage(1)" v-else>
          First Page
        </button>
      </div>
      <div class="flex flex-row">
        <div class="">
          <button class="flex default-page-button " style="width: 30px;" v-on:click="changePage(paging.currentPage - 1)" v-if="paging.currentPage != 1">
          <i class="material-icons"> keyboard_arrow_left </i>
          </button>
          <button class="flex default-page-button-current " style="width: 30px;" v-else>
            <i class="material-icons"> keyboard_arrow_left </i>
          </button>
        </div>
        <div v-for="index in this.paging.arrayofCurrentSetofPage" :key="index" class="">
          <button class="flex default-page-button" v-on:click="changePage(index)" v-if="index != paging.currentPage">
            {{index}}
          </button>
          <button class="flex default-page-button-current" v-on:click="changePage(index)" v-else>
            {{index}}
          </button>
        </div>
        <div>
        <button class="flex default-page-button " style="width: 30px;" v-on:click="changePage(paging.currentPage + 1)" v-if="paging.currentPage != paging.numberOfPage">
          <i class="material-icons"> keyboard_arrow_right </i>
        </button>
        <button class="flex default-page-button-current " style="width: 30px;" v-else>
          <i class="material-icons"> keyboard_arrow_right </i>
        </button>
        </div>
    </div>
    <div class="">
      <button class="flex default-page-button " style="width: 150px;" v-on:click="changePage(paging.numberOfPage)" v-if="paging.numberOfPage != paging.currentPage">
        Last Page
      </button>
      <button class="flex default-page-button-current" style="width: 150px;" v-on:click="changePage(paging.numberOfPage)" v-else>
        Last Page
      </button>
    </div>
  </div>
</div>


</template>
<script>
import axios from 'axios'

export default {
 emits: ['edit-click','send-data'],
 
  components: {
    
  },
  data() {
    return {
      paging: {
        currentPage: 1,
        numberOfPage: 0,
        lowestMove: 7,
        highestMove: 0,
        arrayofCurrentSetofPage: []
      },
      totalElements: 0,
      searchName: "",
      ShowCase:[],
      gui: {
        edittingWindow: false,
        errorWindow: false,

      },
      exception: {
        message: ""
      }
    };
  },
  methods:{
    async showProduct() {
      let errorcode = 0;
      let response = await axios.get(`${process.env.VUE_APP_ROOT_API}public/products`, {
        params: { 
          page: this.paging.currentPage - 1,
          size: 6, 
          searchname: this.searchName
        }
      }).catch(error => {
        errorcode = error.response.data.exceptionCode;
      })
      if (errorcode == 0) {
        
        this.gui.errorWindow = false;
        this.ShowCase = response.data.content;
        this.paging.numberOfPage = response.data.totalPages;
        this.totalElements = response.data.totalElements;
        this.createPagingBar(this.paging.currentPage);
        
        //alert(this.searchName)
      } else {
        this.exception.message = "[ Not found ] "
        this.gui.errorWindow = true;
      }               
    },
    async changePage(pageNumber) {
      this.paging.currentPage = pageNumber;
      this.createPagingBar(pageNumber);
      await this.showProduct();
    },
    createPagingBar(pageNumber) {
      if (this.paging.numberOfPage >= 11) {
        this.paging.highestMove = this.paging.numberOfPage - 5;
        if (this.paging.highestMove <= pageNumber) {
          for (let index = 0; index < 11; index++) {
            this.paging.arrayofCurrentSetofPage[index] = this.paging.highestMove - 5 + index;
          }
        } else if (this.paging.lowestMove <= pageNumber) {
            for (let index = 0; index < 11; index++) {
              this.paging.arrayofCurrentSetofPage[index] = pageNumber - 5 + index;
            }
          } else {
            for (let index = 0; index < 11; index++) {
              this.paging.arrayofCurrentSetofPage[index] = index + 1;
            }
          }
      } else {
          this.paging.arrayofCurrentSetofPage = [];
            for (let index = 1; index <= this.paging.numberOfPage; index++) {
              this.paging.arrayofCurrentSetofPage.push(index);
            }
        }
    },
    
  },
  async created() {
    await this.showProduct();
    this.createPagingBar(1);
  }
}
</script>
