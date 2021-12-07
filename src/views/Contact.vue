<template >
  <div class="mx-auto sm:h-screen    bg-pink-100">
    <div class=" flex justify-center item-center ">
      <h1 class=" mt-24 mb-10 sm:text-9xl text-5xl font-bold text-blue-300 ">
        Team Member
      </h1>
    </div>

      <div class="w-full p-3 flex sm:flex-row flex-col justify-center items-center transform transition duration-500 hover:scale-105">
        <div v-for="member in members" :key="member.name" class="">
        <div class="mx-6" >
          <img class="sm:w-72 sm:h-72 w-44 h-44  mt-2 mx-auto rounded-full p-3 bg-white " :src="require(`../assets/${member.image}`)"></div>
            <div class="flex justify-center items-center flex-col m-3 text-blue-400">
              <p>{{ member.studentId }}</p>
              <p>{{ member.name }}</p>
              <p>{{ member.role }}</p>
            </div>
       </div>
      </div>

   </div>
  

</template>
<script>
export default {
components: {

},  
data() {
    return {
        
        members: [
        {
            image: "1.png",
            name : "Thanaphat Dararat",
            role : "Back-End and Front-End",
            studentId : "62130500032",
        },
        {
            image: "2.jpg",
            name : "Paweena Thongyan",
            role : "Front-End and DevOps ",
            studentId : "62130500053",
        }, 
        {
            image: "3.png",
            name : "Anuttree Tipmom",
            role : "Database ",
            studentId : "62130500101",
        }
        ]
    }
},
}
</script>