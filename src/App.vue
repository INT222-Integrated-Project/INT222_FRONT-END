<template>
  <div > 
    <nav-bar v-if="$route.path === '/'"   fixedNav="fixed"></nav-bar>
    <nav-bar v-else   fixedNav="fixed" @add-clicked="addButtonClicked"></nav-bar>

    <router-view :addClicked="addItemClicked" @close-add-modal="closeAddModal" />
    <v-footer class="bg-black w-screen">
      
      <div class="flex justify-center items-center bg-black text-gray-200 w-full p-2 ">
        <div class="flex  justify-center">
          <div class="flex-col">
        <p class="flex justify-center">Sweet Sweeties Co., Ltd</p>
       
        <p class="flex justify-center">School of information technology King Mongkut's University of Technology Thonburi.</p>
        </div>
        <p></p>
        </div>
      </div>
     
      </v-footer>
  </div>
  
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: {
  NavBar
  },
  data() {
    return {
      addItemClicked: false,
      
    };
  },
  methods: {
    addButtonClicked(value) {
      this.addItemClicked = value;
      
    },
    closeAddModal(value) {
      this.addItemClicked = !value;
    }
  }
};
</script>

