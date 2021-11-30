<template>
    <div class="w-screen bg-black mx-auto flex">
        s
        <video class="items-center justify-center bg-black"
            style="position: absolute;top: 0%;left: 0%;width: 100%;height: 100%; z-index: 900;" autoplay loop muted>
            <source src="@/assets/forbiddensection.mp4" type="video/mp4">
        </video>
    </div>

</template>

<script>
    export default {
        methods: {
            async checkAuthority() {
                await setTimeout(() => {
                    this.$router.replace({
                        name: 'Home'
                    })
                }, 4000);

            }
        },
        async created() {
            await this.checkAuthority();
        }
    }
</script>