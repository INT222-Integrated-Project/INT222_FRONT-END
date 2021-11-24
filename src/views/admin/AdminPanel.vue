<template>
    <div class="default-admin-page-background">
        <div class="">
            <div class="default-large-header-box">
                Admin control panel
                <marquee class="text-lg"> Welcome , {{admininformation.userName}} </marquee>
            </div>
        </div>

        <div class="default-medium-header-box my-5 flex flex-wrap items-center">
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

        <div class="py-2">--</div>
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