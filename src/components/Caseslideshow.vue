<template>

  <div class="">
    <div class="carousel-inner items-center overflow-hidden w-full">
      <div v-for="(img, i) in images" :id="`slide-${i}`" :key="i" :class="`${active === i ? 'active' : 'left-full'}`" class="carousel-item w-full  h-72 transform transition-all duration-500 ease-in-out">
        <img class="block w-full " :src="img"  />
      </div>
    </div>
  </div>

</template>
<script>
   export default {
  
  data() {
    return {
       images: [
      "https://cdn-stamplib.casetify.com/cms/image/d361b908005e4a73d0d1b4cc6b200f92.jpg.webp",
      "https://cdn-stamplib.casetify.com/cms/image/a78521bf46aa47eb64f20de2d980de19.jpg",
      "https://cdn-stamplib.casetify.com/cms/image/4e18e814236075b9bd6db36462420b75.jpg",
      "https://cdn-stamplib.casetify.com/cms/image/55130692d5cef380c30186fc8d039c5d.jpg",
      
    ],
    active: 0
    };
  },
 mounted() {
    let i = 0;
    setInterval(() => {
      if (i > this.images.length - 1) {
        i = 0;
      }
      this.active = i;
      i++;
    }, 3000);
  }
  }
</script>
<style>
.left-full {
  left: -100%;
}
.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}
.carousel-item.active {
  left: 0;
}
</style>
