<template>  
  <div class="fixed  inset-0 bg-blue-200   transition-opacity  w-4/12 ">
    <div class="flex justify-end items-end m-6">
      <button @click="closeCurrentModal" class="flex justify-center items-center sm:h-10 bg-white rounded-lg " ><i class="material-icons w-16  text-center">keyboard_backspace</i></button>
    </div>
    <div class="container sm:my-6  sm:items-center " style="font-family: 'Muli', sans-serif;">
      <div  class="flex sm:mx-4  mx-4 justify-center items-center">
          
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  emits: ["close"],
  props: [
     "product",
  ],
  components: {

  },
 data() {
    return {
      detail:[]
    };
  },
  methods: {
   closeCurrentModal() {
     this.$emit("close", true);
    },
  },
  computed:{
  },
   async created() {
    if(this.product!=undefined){
      this.enterEditMode==true;
      this.products = this.product;
      this.products.color = this.products.color.map(c=>c={codeColor: c.codeColor,
        caseColor: c.caseColor,checked:true})
        console.log(this.ShowColor)
    for(let i=0;i<this.ShowColor.length;i++){
      if(this.products.color.map(c=>c.codeColor).includes(this.ShowColor[i].codeColor) ){
        this.ShowColor[i]=this.products.color.filter(c=>c.codeColor==this.ShowColor[i].codeColor)[0]  
      }
    }
    console.log(this.ShowColor)
    console.log(this.products.color)
    }
   }
};
</script>
