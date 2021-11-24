<template>
    <div class="default-admin-page-background">
        <div class="">
            <div class="default-large-header-box">
                Admin control panel
                <marquee class="text-lg"> Welcome , {{admininformation.userName}} </marquee>
            </div>
        </div>
    
        <div class="default-admin-profile">
            <div class="">
            wda
            </div>
            <div class="">
            wda
            </div>
        </div>

        <div class="flex flex-wrap items-center">
            <div class="default-admin-main-href">
                Users Management
            </div>
            <div class="default-admin-main-href">
                Order Management
            </div>
            <div class="default-admin-main-href">
                Product Management
            </div>
        </div>

        <userLister v-show="true"></userLister>
    </div>

</template>

<script>
    import store from '@/store'
    import userLister from '@/components/admins/UserLister.vue'
    export default {
        data() {
            return {
                admininformation: {}
            }
        },
        components:{
            userLister
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