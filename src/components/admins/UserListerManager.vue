<template>
    <div class="white-user-list">
        <h2 class="default-user-list-username">Search</h2>
        <div class="flex" v-if="!gui.switchSeatchType == true">
            <input type="text" class="default-search-input" placeholder="Search With email or username."
                v-model="searchContent">
            <button class="default-page-search-button" v-on:click.prevent="getUserList()">Search</button>
            <button class="light-page-search-button"
                v-on:click.prevent="gui.switchSeatchType = !gui.switchSeatchType, searchContent=''">Search by phone
                number.</button>
        </div>
        <div class="flex" v-else>
            <input type="text" class="default-search-input" placeholder="Search With phone number."
                v-model="searchContent">
            <button class="default-page-search-button" v-on:click.prevent="searchByPhoneNumber()">Search</button>
            <button class="light-page-search-button"
                v-on:click.prevent="gui.switchSeatchType = !gui.switchSeatchType, searchContent=''">Search by username
                or email.</button>
        </div>
    </div>

    <div class="default-error-box" v-show="gui.errorWindow">
        {{exception.message}}
    </div>
    <div class="flex align-middle justify-center flex-row mr-2">
        <div class="">
            <button class="flex default-page-button " style="width: 150px;" v-on:click="changePage(1)"
                v-if="paging.currentPage != 1">
                First Page
            </button>
            <button class="flex default-page-button-current" style="width: 150px;" v-on:click="changePage(1)" v-else>
                First Page
            </button>
        </div>

        <div>
            <button class="flex default-page-button " style="width: 30px;"
                v-on:click="changePage(paging.currentPage - 1)" v-if="paging.currentPage != 1">
                ←
            </button>
            <button class="flex default-page-button-current " style="width: 30px;" v-else>
                ←
            </button>
        </div>

        <div v-for="index in this.paging.arrayofCurrentSetofPage" :key="index" class="">
            <button class="flex default-page-button" v-on:click="changePage(index)" v-if="index != paging.currentPage">
                {{index}}
            </button>
            <button class="flex default-page-button-current" v-on:click="changePage(index)" v-else>
                {{index}}
            </button>
        </div>

        <div>
            <button class="flex default-page-button " style="width: 30px;"
                v-on:click="changePage(paging.currentPage + 1)" v-if="paging.currentPage != paging.numberOfPage">
                →
            </button>
            <button class="flex default-page-button-current " style="width: 30px;" v-else>
                →
            </button>
        </div>

        <div class="">
            <button class="flex default-page-button " style="width: 150px;" v-on:click="changePage(paging.numberOfPage)"
                v-if="paging.numberOfPage != paging.currentPage">
                Last Page
            </button>
            <button class="flex default-page-button-current" style="width: 150px;"
                v-on:click="changePage(paging.numberOfPage)" v-else>
                Last Page
            </button>
        </div>

    </div>

    <div v-for="(user, index) in this.usersList" :key="index">
        <div>
            <div class="white-user-list flex">
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
                        <span class="default-user-list-user-name" v-if="user.email == null">This user has no
                            email</span>
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
                <div>
                    <button v-on:click="promoteUser(user)" class="default-assignrole-promote"
                        :disabled="user.role.roleName == 'admin' || user.role.roleName=='suspended'"> Promote</button>
                    <button v-on:click="demoteUser(user)" class="default-assignrole-demote"
                        :disabled="user.role.roleName == 'customer' || user.role.roleName=='suspended'">Demote</button>

                    <button v-if="user.role.roleName=='suspended'" v-on:click="banOrUnbanUser(user)"
                        class="default-assignrole-promote">Un-suspend</button>
                    <button v-else v-on:click="banOrUnbanUser(user)" class="default-assignrole-ban"
                        :disabled="user.role.roleName == 'admin'">Suspend</button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import store from '@/store'
    //import AdminUserManager from './AdminUserManager.vue'

    export default {
        emits: ['edit-click', 'send-data'],

        components: {
            //AdminUserManager
        },
        data() {
            return {
                usersList: [],
                paging: {
                    currentPage: 1,
                    numberOfPage: 0,
                    lowestMove: 7,
                    highestMove: 0,
                    arrayofCurrentSetofPage: []
                },
                totalElements: 0,
                searchContent: "",
                gui: {
                    edittingWindow: false,
                    errorWindow: false,
                    switchSeatchType: false
                },
                exception: {
                    message: ""
                }
            };
        },
        methods: {
            async changePage(pageNumber) {
                this.paging.currentPage = pageNumber;
                this.createPagingBar(pageNumber);
                await this.getUserList();
            },
            async getUserList() {
                let errorcode = 0;
                let response = await axios.get(`${process.env.VUE_APP_ROOT_API}admin/listUser`, {
                    params: {
                        page: this.paging.currentPage - 1,
                        size: 20,
                        searchContent: this.searchContent
                    }
                }).catch(error => {
                    errorcode = error.response.data.exceptionCode;
                })

                if (errorcode == 0) {
                    this.gui.errorWindow = false;
                    this.usersList = response.data.content;
                    this.paging.numberOfPage = response.data.totalPages;
                    this.totalElements = response.data.totalElements;
                    this.createPagingBar(this.paging.currentPage);
                } else {
                    this.exception.message = "[ Not found ] The user with this username or email never exist."
                    this.gui.errorWindow = true;
                }
            },
            async searchByPhoneNumber() {
                let errorcode = 0;
                let response = await axios.get(
                    `${process.env.VUE_APP_ROOT_API}admin/listUser/searchByPhone`, {
                        params: {
                            phoneNumber: this.searchContent
                        }
                    }).catch(error => {
                    errorcode = error.response.data.exceptionCode;
                })
                if (errorcode == 0) {
                    this.gui.errorWindow = false;
                    this.usersList = response.data.content;
                    this.paging.numberOfPage = 1;
                    this.totalElements = response.data.totalElements;
                    this.createPagingBar(this.paging.currentPage);
                } else {
                    this.exception.message = "[ Not found ] The user with this phone number never exist."
                    this.gui.errorWindow = true;
                }
            },
            async demoteUser(user) {
                if (user.userName == store.getters['authentication/user'].userName) {
                    this.exception.message = "[ NOT ALLOWED ] As an admin, you are not allowed to demote yourself."
                    this.gui.errorWindow = true;
                } else {
                    let roleId = 0;
                    switch (user.role.roleName) {
                        case "admin":
                            roleId = 4
                            break;
                        case "staff":
                            roleId = 1
                            break;
                        default:
                            roleId = 1;
                    }
                    await this.permitRoleUpdate(user, roleId);
                }
            },
            async promoteUser(user) {
                let roleId = 0;
                switch (user.role.roleName) {
                    case "customer":
                        roleId = 4
                        break;
                    case "staff":
                        roleId = 2
                        break;
                    default:
                        roleId = 1;
                }
                await this.permitRoleUpdate(user, roleId);
            },
            async permitRoleUpdate(user, roleId) {

                let assignForm = new FormData;
                assignForm.append('userNameID', user.userNameID);
                assignForm.append('roleID', roleId);

                await axios.put(`${process.env.VUE_APP_ROOT_API}admin/assignRole`, assignForm).catch(error => {
                    console.log(error.response.data)
                    this.exception.message =
                        "[ NOT ALLOWED ] As an admin, you are not allowed to demote yourself."
                    this.gui.errorWindow = true;
                })
                await this.getUserByUsername(user)

            },
            async banOrUnbanUser(user) {
                let roleId = 0;
                switch (user.role.roleName) {
                    case "suspended":
                        roleId = 1
                        break;
                    default:
                        roleId = 3;
                }
                await this.permitRoleUpdate(user, roleId);
            },
            async getUserByUsername(user) {
                let response = await axios.get(`${process.env.VUE_APP_ROOT_API}admin/listUser`, {
                    params: {
                        searchContent: user.userName
                    }
                })

                for (let index = 0; index < this.usersList.length; index++) {
                    if (this.usersList[index].userNameID == user.userNameID) {
                        this.usersList[index] = response.data.content[0]
                        break;
                    }
                }

            },
            createPagingBar(pageNumber) {
                if (this.paging.numberOfPage >= 11) {
                    this.paging.highestMove = this.paging.numberOfPage - 5;
                    if (this.paging.highestMove <= pageNumber) {
                        for (let index = 0; index < 11; index++) {
                            this.paging.arrayofCurrentSetofPage[index] = this.paging.highestMove - 5 +
                                index;
                        }
                    } else if (this.paging.lowestMove <= pageNumber) {
                        for (let index = 0; index < 11; index++) {
                            this.paging.arrayofCurrentSetofPage[index] = pageNumber - 5 + index;
                        }
                    } else {
                        for (let index = 0; index < 11; index++) {
                            this.paging.arrayofCurrentSetofPage[index] = index + 1;
                        }
                    }


                } else {
                    this.paging.arrayofCurrentSetofPage = [];
                    for (let index = 1; index <= this.paging.numberOfPage; index++) {

                        this.paging.arrayofCurrentSetofPage.push(index);
                    }
                }
            }
        },
        async created() {
            await this.getUserList();
            this.createPagingBar(1);
        }
    }
</script>