<template>
  <div class="w-screen bg-black z-50 " :class="[fixedNav]">
    <div class="hidden container mx-auto md:flex items-center py-2 md:justify-between md:relative">
      <h1 id="icon" class="text-2xl text-pink-500 font-medium pl-44">
        <router-link to="/">Sweet Sweeties</router-link>
      </h1>
      <div class="flex justify-center items-center text-center flex-col w-3/12">
          <input v-model="inputSearch" placeholder="What are you finding?" class="p-1 bg-white w-full rounded border"/>
          <!-- if notfound Show ... -->
          <p v-if="notFound" class="text-center text-xl mt-4"> We can't find the Case</p>
      </div>
      <div class="pr-44 md:block">
        <base-button buttonLabel="+ New Case" textColor="text-white" borderColor="border-transparent" v-if="$route.path === '/products'" @click="changeAddItemClicked"/>
        <router-link to="/products" v-else>
          <base-button  buttonLabel="Case" textColor="text-white" borderColor="border-transparent"/>
        </router-link>
        <router-link to="/about">
          <base-button buttonLabel="Member" textColor="text-white" borderColor="border-transparent"/>
        </router-link>
        <router-link to="/login">
          <base-button buttonLabel="Login" textColor="text-white" borderColor="border-transparent"/>
        </router-link>
      </div>
    </div>

    <div class="flex items-center pl-3 w-screen  h-14 bg-black md:hidden">
      <h1 class="block px-4 py-2 text-md capitalize text-white font-medium">
        <router-link to="/">Sweet Sweeties</router-link>
      </h1>
      <div class="flex flex-grow justify-end pr-5">
        <button @click="dropdownOpen = !dropdownOpen" class="rounded-md focus:outline-none">
          <span class="material-icons font-medium text-white mr-5">menu</span>
        </button>
      </div>

      <div v-show="dropdownOpen" class="absolute  right-0  mt-40   py-1 w-full bg-black shadow-md">
        <div class="flex justify-center">
          <base-button buttonLabel="+ New Case" textColor="text-white" borderColor="border-transparent" v-if="$route.path === '/products'" @click="changeAddItemClicked"/>
          <router-link to="/products" v-else>
            <base-button buttonLabel="Case" textColor="text-white" borderColor="border-transparent"/>
          </router-link>
        </div>
        <div class="flex justify-center ">
          <router-link to="/about">
            <base-button buttonLabel="Member" textColor="text-white " borderColor="border-transparent"/>
          </router-link>
          </div>
          <div class="flex justify-center ">
           <router-link to="/login">
          <base-button buttonLabel="Login" textColor="text-white" borderColor="border-transparent"/>
        </router-link>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  props: ["fixedNav",],
  emits: ["add-clicked","login-clicked"],
  data() {
    return {
      addItemClicked: false,
      dropdownOpen: false,
      loginClicked:false,
    };
  },
  methods: {
    changeAddItemClicked() {
      this.addItemClicked = true;
      this.$emit("add-clicked", this.addItemClicked);
      this.addItemClicked = false;
    },
    
  },
};
</script>