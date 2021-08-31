<template>
    <button class="ml-4 py-2 px-4 font-medium rounded-md transition ease-in duration-100  hover:bg-pink-200 hover:text-white hover:border hover:border-black" :class="[buttonColor, textColor, borderColor]" :type="buttonType"> {{ buttonLabel }}</button>
</template>
<script>
export default {
    props: ['buttonLabel','buttonColor','textColor','borderColor','buttonType',],
}
</script>