<template>
<div class=" bg-header  ">
    <div class="mt-3 text-center md:w-5/6 items-center md:mx-auto  bg-white lg:md-20">
        <div class="">
            <div class="default-large-header-box">
                Admin control panel
                <marquee class="text-base"> Welcome , {{admininformation.userName}} </marquee>
            </div>
        </div>
        <div class="default-medium-header-box my-5 flex sm:flex-row justify-center  flex-wrap items-center">
            <div class="default-page-navigation-buttons">
                Users Management
            </div>
            <div class="default-page-navigation-buttons">
                Order Management
            </div>
            <div class="default-page-navigation-buttons">
                Product Management
            </div>
        </div>
        <UserListerManager v-show="true"></UserListerManager>
        
    </div>
</div>

    

</template>

<script>
    import store from '@/store'
    import UserListerManager from '@/components/admins/UserListerManager.vue'
    export default {
        data() {
            return {
                admininformation: {}
                
            }
        },
        components:{
            UserListerManager
        },
        methods: {
            async userLister() {

            },
            async getAdminProfile() {
                this.admininformation = store.getters['authentication/user']
            }
        },
        computed: {

        },
        created() {
            this.getAdminProfile()
        }
    }
</script>