<template>

    <div class="default-user-list">
        <h2 class="default-user-list-username">Statistic</h2>
        <p>
            <span class="default-user-list-header">Number of users in our shop : </span>
            <span class="default-user-list-user-name">{{totalElements}}</span>
        </p>
    </div>

    <div class="default-error-box" v-show="gui.errorWindow">
        {{exception.message}}
    </div>
    <div class="flex align-middle justify-center flex-row mr-2">
        <div class="" >
            <button class="flex default-page-button " style="width: 150px;" v-on:click="changePage(1)" v-if="currentPage != 1">
                First Page
            </button>
            <button class="flex default-page-button-current" style="width: 150px;" v-on:click="changePage(1)" v-else>
                First Page
            </button>
        </div>

        <div>
            <button class="flex default-page-button " style="width: 30px;" v-on:click="changePage(currentPage - 1)" v-if="currentPage != 1">
                ←
            </button>
        </div>

        <div v-for="index in 10" :key="index" class="">
            <button class="flex default-page-button" v-on:click="changePage(index)" v-if="index != currentPage">
                {{index}}
            </button>
            <button class="flex default-page-button-current" v-on:click="changePage(index)" v-else>
                {{index}}
            </button>
        </div>

          <div>
            <button class="flex default-page-button " style="width: 30px;" v-on:click="changePage(currentPage + 1)" v-if="currentPage != numberOfPage">
                →
            </button>
        </div>

        <div class="">
            <button class="flex default-page-button " style="width: 150px;" v-on:click="changePage(numberOfPage)"
                v-if="numberOfPage != currentPage">
                Last Page
            </button>
            <button class="flex default-page-button-current" style="width: 150px;" v-on:click="changePage(numberOfPage)"
                v-else>
                Last Page
            </button>
        </div>

    </div>

    <div v-for="user in this.usersList" :key="user.userNameID">

        <div class="default-user-list flex">
            <img class="defalut-user-profile-image" src="@/assets/UserImageNotFound.png">
            <!--WIP : If an image is null, get a default one. If not, display it from the user.-->
            <div class="defalut-userlist-block">
                <h3 class="default-user-list-username">{{user.userName}}</h3>
                <p>
                    <span class="default-user-list-header">First name : </span>
                    <span class="default-user-list-user-name">{{user.firstName}}</span>
                </p>
                <p>
                    <span class="default-user-list-header">Last name : </span>
                    <span class="default-user-list-user-name">{{user.lastName}}</span>
                </p>
            </div>
            <div class="defalut-userlist-block">
                <p>
                    <span class="default-user-list-header">Email : </span>
                    <span class="default-user-list-user-name" v-if="user.email == null">This user has no email</span>
                    <span class="default-user-list-user-name" v-else>{{user.email}}</span>
                </p>
                <p>
                    <span class="default-user-list-header">Phone : </span>
                    <span class="default-user-list-user-name">{{user.phoneNumber}}</span>
                </p>
                <p>
                    <span class="default-user-list-header">Role : </span>
                    <span class="default-user-list-user-name">{{user.role.roleName}}</span>
                </p>
            </div>
            <div class="defalut-userlist-block">
                <p>
                    <span class="default-user-list-header">Address : </span>
                    <span class="default-user-list-user-name" v-if="user.address == null">This user has no address
                        information.</span>
                    <span class="default-user-list-user-name" v-else>{{user.address}}</span>
                </p>
            </div>
            <!--Rearrange CSS-->
            <div
                class="defalut-userlist-block text-red-900 no-underline block mt-4  sm:mt-0 text-teal-lighter hover:text-pink-400 mr-4">
                <button class="flex items-center"><i class="material-icons mr-3 text-3xl">settings</i></button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        emits: ['edit-click', 'send-data'],

        components: {

        },
        data() {
            return {
                usersList: [],
                currentPage: 1,
                numberOfPage: 0,
                totalElements: 0,
                searchContent: "",
                gui: {
                    edittingWindow: false,
                    errorWindow: false
                },
                exception: {
                    message: ""
                }
            };
        },
        methods: {
            async getUserList() {
                let errorcode = 0;
                let response = await axios.get(`${process.env.VUE_APP_ROOT_API}admin/listUser`, {
                    params: {
                        page: this.currentPage - 1,
                        size: 1,
                        searchContent: this.searchContent
                    }
                }).catch(error => {
                    errorcode = error.response.data.exceptionCode;
                })

                if (errorcode == 0) {
                    this.gui.errorWindow = false;
                    this.usersList = response.data.content;
                    this.numberOfPage = response.data.totalPages;
                    this.totalElements = response.data.totalElements;
                } else {
                    this.exception.message = "[ Not found ] The user with this username or email never exist."
                    this.gui.errorWindow = true;
                }
            },
            async changePage(pageNumber) {
                this.currentPage = pageNumber;
                await this.getUserList();
            }
        },
        async created() {
            await this.getUserList();
        }
    }
</script>