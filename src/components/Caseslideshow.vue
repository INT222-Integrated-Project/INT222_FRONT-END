<template>

  <div class="">
    <div class="carousel-inner items-center overflow-hidden w-full">
      <div v-for="(img, i) in images" :id="`slide-${i}`" :key="i" :class="`${active === i ? 'active' : 'left-full'}`" class="carousel-item  w-full  h-64 transform transition-all duration-500 ease-in-out">
        <img class="block w-full" :src="img"  />
      </div>
    </div>
  </div>

</template>
<script>
   export default {
  
  data() {
    return {
       images: [
      "https://scontent.fkkc2-1.fna.fbcdn.net/v/t1.6435-9/155577354_3910328102395199_7221905302430882364_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=e3f864&_nc_ohc=PCvSzfKnbKkAX9nU8yc&_nc_ht=scontent.fkkc2-1.fna&oh=46b7cdd3124fdea9c9cc8dab761decbb&oe=6152E95E",
      "https://scontent.fkkc2-1.fna.fbcdn.net/v/t1.6435-9/69461594_2540650162696340_2761427129651429376_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=e3f864&_nc_ohc=eAEdRfxu__IAX_hMeIg&_nc_ht=scontent.fkkc2-1.fna&oh=89e4ab1968882ec6f2650ca535daab41&oe=6155D0C8",
      "https://scontent.fkkc2-1.fna.fbcdn.net/v/t1.6435-9/183168849_4112566485504692_485691738233370393_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=e3f864&_nc_ohc=i2Y8VUjbGGAAX-Sd-hl&_nc_ht=scontent.fkkc2-1.fna&oh=5e87a7e96d274f33a19f64f4cbfd9041&oe=61541C84",
      "https://scontent.fkkc2-1.fna.fbcdn.net/v/t1.6435-9/41667450_2004068606354501_6114656755046678528_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=e3f864&_nc_ohc=5Eo4wTfTJeAAX-at6YD&tn=Cn9DYfi0Qqrw2RxC&_nc_ht=scontent.fkkc2-1.fna&oh=b4cff583d890d0c2537f91471b406647&oe=6155B9CF"
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
