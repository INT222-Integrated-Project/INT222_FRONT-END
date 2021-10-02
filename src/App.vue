<template>
  <div > 
    <nav-bar   fixedNav="fixed"></nav-bar>
       <router-view :addClicked="addItemClicked" @close-add-modal="closeAddModal" />
    
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
