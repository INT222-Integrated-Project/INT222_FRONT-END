<template>
  <div class="md:p-5 p-1 ">
    <div class="size-search ">
      <input type="text" class="insearch-box  " placeholder="Search Case name " v-model="searchName">

      <button class="search-box text-white text-xl p-3" v-on:click.prevent="showProduct()">Search</button>

    </div>
    <div class="default-error-box" v-show="gui.errorWindow">
      {{exception.message}}
    </div>

    <div class="container sm:my-2  sm:items-center  " style="font-family: 'Muli', sans-serif;">
      <div class="flex flex-wrap justify-center ">
        <div v-for="(product,index) in ShowCase" :key="index" :value="product" :product="product"
          class="flex justify-center items-center md:w-1/4 md:m-3 m-1 rounded-lg hover:shadow-xl  ">
          <div class="card-two m-2">
            <img :src="'https://naturegecko.com/backend/public/productImage/'+product.productImage" alt=""
              class="block rounded-lg md:h-80 md:w-80 " />
            <div class="flex items-center p-2 sm:p-4 rounded-lg sm:h-36 md:h-52 bg-pink-300 h-44 flex-col ">
              <div class="flex flex-row  space-x-1  ">
                <label v-for=" (c,index) in product.productColor" :product="product" :key="index"
                  class=" bg-black h-5 w-5 rounded-full"
                  :class="c.color.caseColor ? 'bg-caseCol-' + c.color.caseColor.toLowerCase(): '' "> </label>
              </div>
              <div>
                <h5 class="text-white sm:text-lg text-md  font-bold leading-none">
                  {{ product.caseName }}
                </h5>
                <p class="text-lg text-white font-light">{{ product.caseDescription }}</p>
              </div>
              <div class="flex items-center">
                <div class="text-lg text-white font-light">
                  {{ product.casePrice + ".-" }}
                </div>

              </div>
              <button @click="detailClick(product)"
                class="sm:w-16 w-16 sm:h-10 h-10 m-2 tracking-wide font-semibold bg-pink-400 text-gray-100  rounded-lg hover:bg-pink-600 transition-all duration-300  flex items-center justify-center ease-in-out  focus:outline-none">VIEW</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex align-middle justify-center items-center sm:flex-row flex-col mr-2 ">
      <div class="hidden sm:flex flex-row sm:items-center sm:w-auto ">
        <button class="flex default-page-button-show " style="width: 150px;" v-on:click="changePage(1)"
          v-if="paging.currentPage != 1">
          First Page
        </button>
        <button class="flex default-page-button-current-show" style="width: 150px;" v-on:click="changePage(1)" v-else>
          First Page
        </button>
      </div>
      <div class="flex flex-row">
        <div class="">
          <button class="flex default-page-button-show " style="width: 30px;"
            v-on:click="changePage(paging.currentPage - 1)" v-if="paging.currentPage != 1">
            <i class="material-icons"> keyboard_arrow_left </i>
          </button>
          <button class="flex default-page-button-current-show " style="width: 30px;" v-else>
            <i class="material-icons"> keyboard_arrow_left </i>
          </button>
        </div>
        <div v-for="index in this.paging.arrayofCurrentSetofPage" :key="index" class="">
          <button class="flex default-page-button-show" v-on:click="changePage(index)"
            v-if="index != paging.currentPage">
            {{index}}
          </button>
          <button class="flex default-page-button-current-show" v-on:click="changePage(index)" v-else>
            {{index}}
          </button>
        </div>
        <div>
          <button class="flex default-page-button-show " style="width: 30px;"
            v-on:click="changePage(paging.currentPage + 1)" v-if="paging.currentPage != paging.numberOfPage">
            <i class="material-icons"> keyboard_arrow_right </i>
          </button>
          <button class="flex default-page-button-current-show " style="width: 30px;" v-else>
            <i class="material-icons"> keyboard_arrow_right </i>
          </button>
        </div>
      </div>
      <div class="hidden sm:flex flex-row sm:items-center sm:w-auto  ">
        <button class="flex default-page-button-show " style="width: 150px;"
          v-on:click="changePage(paging.numberOfPage)" v-if="paging.numberOfPage != paging.currentPage">
          Last Page
        </button>
        <button class="flex default-page-button-current-show" style="width: 150px;"
          v-on:click="changePage(paging.numberOfPage)" v-else>
          Last Page
        </button>
      </div>
    </div>
  </div>


</template>
<script>
  import axios from 'axios'
  import caseNotFoundImage from '@/assets/imageNotFound.png'

  export default {
    emits: ['send-data', 'detail-click'],

    components: {

    },
    data() {
      return {
        caseNotFoundImage: caseNotFoundImage,
        paging: {
          currentPage: 1,
          numberOfPage: 0,
          lowestMove: 7,
          highestMove: 0,
          arrayofCurrentSetofPage: []
        },
        totalElements: 0,
        searchName: "",
        ShowCase: [],
        gui: {
          edittingWindow: false,
          errorWindow: false,

        },
        exception: {
          message: ""
        }
      };
    },
    methods: {
      detailClick(product) {
        this.$emit("detail-click", true);
        this.$emit("send-data", product);
      },
      replaceErrorImage(e) {
        e.target.src = caseNotFoundImage
      },
      async showProduct() {
        let errorcode = 0;
        let response = await axios.get(`${process.env.VUE_APP_ROOT_API}public/products`, {
            params: {
              page: this.paging.currentPage - 1,
              size: 6,
              searchname: this.searchName
            }
          })
          .catch(error => {
            errorcode = error.response.data.exceptionCode;
          })
        if (errorcode == 0) {
          this.gui.errorWindow = false;
          this.ShowCase = response.data.content;
          this.paging.numberOfPage = response.data.totalPages;
          this.totalElements = response.data.totalElements;
          this.createPagingBar(this.paging.currentPage);
          console.log(this.ShowCase)
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