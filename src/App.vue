<template>
  <div > 
    <nav-bar   fixedNav="fixed"></nav-bar>
      <router-view :addClicked="addItemClicked" @close-modal="closeAddModal" />
      <fooTer class="relative"></fooTer>
  </div>
  
</template>

<script>
import NavBar from "./components/NavBar";
import fooTer from "./components/Footer.vue";
export default {
  components: {
  NavBar,fooTer
  
  },
  data() {
    return {
      addItemClicked: false,
      fooTer:false,
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
