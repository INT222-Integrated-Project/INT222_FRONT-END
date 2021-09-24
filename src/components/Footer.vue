<template>
   <footer class="bg-black w-screen " :class="[fixedFoo]">
      <div class="flex justify-center items-center bg-black text-gray-200 w-full p-2 ">
        <div class="flex  justify-center">
          <div class="flex-col">
        <p class="flex justify-center">Sweet Sweeties Co., Ltd</p>
       
        <p class="flex justify-center">School of information technology King Mongkut's University of Technology Thonburi.</p>
        </div>
        <p></p>
        </div>
      </div>
    </footer>
</template>

<script>
export default {
  props: ["fixedFoo",]
}
</script>