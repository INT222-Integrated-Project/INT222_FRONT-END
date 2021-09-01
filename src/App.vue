<template>
  <div > 
    <nav-bar v-if="$route.path === '/'" fixedNav="fixed"></nav-bar>
    <nav-bar v-else bgColor="bg-black" fixedNav="fixed" @add-clicked="addButtonClicked"></nav-bar>

    <router-view :addClicked="addItemClicked" @close-add-modal="closeAddModal" />
    
  </div>
  
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playball&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gotu&family=Playball&display=swap');
#icon {
  font-family: "Playball", sans-serif;
}
#app {

  font-family: "Gotu", sans-serif;

}
</style>
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
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
