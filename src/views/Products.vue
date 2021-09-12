<template>
  <div class="flex justify-center items-center bg-cover bg-center w-screen min-h-screen">
    <!-- block image to search and can edit , delete  -->
    <div class="h-screen md:w-4/6 bg-white bg-opacity-50 items-center md:mx-auto rounded-xl mt-16 lg:md-20">
      <div class="mt-3 text-center">
        <!-- Search -->
        
        <slides></slides>
        
        <showcase  @edit-click="openEditModal" @send-data="editCase"></showcase>
      </div>
    </div>
  </div>
  

  <inputdata v-if="addClicked"  @close="changeAddItemClicked" formLabel="Add New Case"></inputdata>
  <inputdata v-if="editClicked" :product="editProducts" @close="changeEditItemClicked" formLabel="Edit Case"></inputdata>

</template>

<script>
import showcase from "../components/ShowCase";
import inputdata from "../components/AddandEditProduct.vue";
import slides from "../components/Caseslideshow.vue";

export default {
  emits: ["close-add-modal"],
  props: ["addClicked",],
  components: {
    inputdata,
    showcase,slides
  },
 data() {
    return {
      addProd: false,
      showC:false,
      editClicked: false,
      inputSearch: "",
      notFound: false,
      editProducts: [],
      slides:false,
      
    };
  },
  methods: {
    changeAddItemClicked(value) {
      this.$emit("close-add-modal", value);
    }, 
    changeEditItemClicked(value) {
      this.editClicked = !value;
    },
    changeNotFound(value) {
      this.notFound = value;
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
  }
};
</script>