<template >
  <div class="flex justify-center  w-screen  h-s">
    <!-- block image to search and can edit , delete  -->
    <div class="h-screen md:w-5/6 bg-white bg-opacity-50 items-center md:mx-auto rounded-xl  lg:md-20">
      <div class="mt-3 text-center">
        <!-- Search -->
         <div >
          <input class="input-text" type="text" v-model="inputSearch" placeholder="Enter your search terms" />
        </div>
      <!-- <div v-for="c in filteredData" :key="c.name">
              <a v-bind:href="proCase.productid"> Price: {{ proCase.casePrice }}</a>
              <h2>{{proCase.caseName}} <span class="bg-pink-300">Total: {{proCase.total}}</span></h2>
            </div> -->
        
      

        <!-- <slides></slides> -->
        <showcase  @edit-click="openEditModal" @send-data="editCase"></showcase>
      </div>
    </div>
  </div>
  <!-- <inputdata v-if="addClicked"  @close="changeAddItemClicked" formLabel="Add New Case"></inputdata> -->
  <inputdata v-if="editClicked" :product="editProducts" @close="changeEditItemClicked" formLabel="Edit Case"></inputdata>

</template>

<script>
import axios from 'axios'
import showcase from "../components/ShowCase";
import inputdata from "./AddandEditProduct.vue";
// import slides from "../components/Caseslideshow.vue";
export default {
  emits: ["close-add-modal"],
  props: ["addClicked",],
  components: {
    inputdata,
    showcase,
    // slides
  },
 data() {
    return {
      
      editClicked: false,
      inputSearch: "",
      notFound: false,
      editProducts: [],
      slides:false,
      ShowCase:[],
      proCase:[],
    };
  },
  methods: {
    changeAddItemClicked(value) {
      this.$emit("close-add-modal", value);
    }, 
    changeEditItemClicked(value) {
      this.editClicked = value;
    },
    closeCase() {
      this.caseNow = false;
    },
    openEditModal(value){
        console.log("MK"+value)
        this.editClicked = value;
        console.log(value)
        
    },
    editCase(editingCase){
        this.editProducts=editingCase;        
    },
    showProduct() {
        axios.get(`${process.env.VUE_APP_ROOT_API}test/products`).then((response) => {
          this.ShowCase = response.data;
          console.log("product : "+this.ShowCase)
        }).then(function(){
            console.log('SUCCESS products')
          })
          .catch(function(){
            console.log('FAILURE  products')
          });               
    },
    async deleteCase(id){
      await axios.delete(`${process.env.VUE_APP_ROOT_API}test/products/${id}`)
      for(let i = 0; i< this.ShowCase.length;i++ ){
        if(this.ShowCase[i].caseId == id){
          this.ShowCase.splice(i,1)
        }
      }
    },
    editClick(proCase) {
      
      this.$emit("edit-click", true);
      this.$emit("send-data", proCase);

    }, async created() {
    await this.showProduct();
  }
  },
  computed:{
    filteredData: function () {
            var search_array = this.proCase,
                inputSearch = this.inputSearch;

            if(!inputSearch){
                return search_array;
            }

            inputSearch = inputSearch.trim().toLowerCase();

            search_array = search_array.filter(item => {
                if(item.name.toLowerCase().indexOf(inputSearch) !== -1){
                    return item;
                }
            })

            // Return an array with the filtered data.
            return search_array;
        }

  }
};
</script>