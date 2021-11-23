<template>
  <div class="bg-pink-100 min-h-screen">
    <p class="flex justify-center items-center text-8xl pt-6">Profile</p>

    <div class="flex items-center" style="font-family: 'Muli', sans-serif">
      <div
        class="
          flex flex-wrap
          justify-center
          space-x-2
          gap-1
          pl-5
          pr-5
          my-5
          lg:pl-2 lg:pr-2
        "
      >
        <div v-for="profile in showProfile" :key="profile" :value="profile" class=" bg-white w-72 mb-3 rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
          
          <div class="rounded-lg p-3 bg-purple-400 flex flex-col h-32">
            <div>
              
              <span class="text-xs text-white leading-none">
                {{ profile.userName}}</span>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      showProfile: [],
    };
  },
  methods: {
    getProfile() {
      axios
        .get(`${process.env.VUE_APP_ROOT_API}user/myprofile`)
        .then((response) => {
          this.showProfile = response.data;
          console.log("Profile : " + this.showProfile);
        })
        .then(function () {
          console.log("SUCCESS Profile");
        })
        .catch(function () {
          console.log("FAILURE  Profile");
        });
    },
  },
  async created() {
    await this.getProfile();
  },
};
</script>
