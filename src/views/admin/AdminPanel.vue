<template>
    <div class=" bg-header min-h-screen  ">
        <div class="mt-3 text-center md:w-5/6 items-center md:mx-auto  bg-white lg:md-20">
            <div class="">
                <div class="default-large-header-box">
                    Admin control panel
                    <marquee class="text-base"> Welcome , {{admininformation.userName}} </marquee>
                </div>
            </div>
            <div class="default-medium-header-box my-5 flex sm:flex-row justify-center  flex-wrap items-center">
                <button type="button" @click="changePanelMode('user')" class="default-page-navigation-buttons">Users
                    Management</button>
                <button type="button" @click="changePanelMode('order')" class="default-page-navigation-buttons">Order
                    Management</button>
                <button type="button" @click="changePanelMode('product')"
                    class="default-page-navigation-buttons">Product Management</button>
            </div>
            <AdminOrderManagement v-if="panelMode=='order'"></AdminOrderManagement>
            <UserListerManager v-if="panelMode=='user'"></UserListerManager>
            <AdminProductManagement v-if="panelMode=='product'"></AdminProductManagement>
            <br>
        </div>
    </div>



</template>

<script>
    import store from '@/store'
    import UserListerManager from '@/components/admins/UserListerManager.vue'
    import AdminOrderManagement from '@/components/admins/AdminOrderManagement.vue'
    import AdminProductManagement from '@/components/admins/AdminProductManagement.vue'
    export default {
        components: {
            UserListerManager,
            AdminOrderManagement,
            AdminProductManagement
        },
        data() {
            return {
                admininformation: {},
                panelMode: "user"
            }
        },
        methods: {
            changePanelMode(mode) {
                this.panelMode = mode;
            },
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