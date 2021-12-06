<template>
<div class="my-5 ">
    <div class="default-medium-header-box my-5 flex sm:flex-row justify-center  flex-wrap items-center ">
        <!-- <div class="prodmanage-admin-main-href">Product Management</div> -->
        <div class="flex justify-center items-center m-2  w-5/6 sm:flex-row flex-col">
            <input class="default-search-input " type="text" placeholder="Search orders by username"
                v-model="searchContent.searchProductName">
            <button class="default-page-search-button" type="button" @click="getProductList">Search</button>
        </div>
    </div>
    <div v-show="!notification.sucessfullyLoaded" class="mx-4 text-2xl default-inprogress-notification-window">
        Loading...
    </div>
    <div v-show="notification.searchnotfound" class="mx-4 text-2xl default-inprogress-notification-window">
        Seems like you don't have any order, need something?
    </div>
    <div v-show="notification.sucessfullyLoaded" class="flex justify-center items-center bg-blue-200 rounded-2xl m-4 flex-col ">
        <div v-for="(item,index) in productList" :key="index" class="my-3 bg-white rounded-xl w-3/6 ">
            <div @click="item.showMoreDetails = !item.showMoreDetails" class="flex justify-center items-center mx-4  p-2 sm:flex-row flex-col"
                :class="item.isOnStore?'prodmanage-admin-head-list':'prodmanage-admin-head-list-notonsale'">
                <div class="sm:w-1/3">
                    <img :src="'https://naturegecko.com/backend/public/productImage/'+item.productImage"
                        @error="replaceErrorImage" class="h-32 rounded-full" />
                </div>
                <div class="sm:w-1/3" >
                    <div>
                        <p class="font-semibold">caseName </p>
                    </div>
                    <div>
                        <p> {{item.caseName}}</p>
                    </div> 
                </div>
                <div class="flex sm:flex-row flex-col ">
                    <button class="prodmanage-page-delete-button" @click="deletProd(item.caseID)">Delete</button>
                    <button v-show="item.isOnStore" @click="toggleProduct(item.caseID)"
                        class="prodmanage-page-hide-button">Hide</button>
                    <button v-show="!item.isOnStore" @click="toggleProduct(item.caseID)"
                        class="prodmanage-page-unhide-button">Show</button>
                </div>
            </div>
            <div v-show="item.showMoreDetails" class="mx-3">
                <div class="flex sm:flex-row flex-col justify-center items-center ">
                    <div class="flex w-3/4 ">
                        <!-- <div>
                            <img :src="'https://naturegecko.com/backend/public/productImage/'+item.productImage"
                                @error="replaceErrorImage" class="h-32 rounded-full" />
                        </div> -->
                        <div class="flex flex-col">
                            <div class="flex mx-1">
                                <div class="flex">
                                    <!-- <p>Product name : </p> -->
                                    <p class="font-semibold">Product price :</p>
                                    <p>{{item.casePrice}}</p>
                                </div>
                                <div class="flex mx-1">
                                    <!-- <p>{{item.caseName}}</p> -->
                                    <p class="font-semibold">Product descrpition :</p>
                                    <p>{{item.caseDescription}}</p>
                                </div>
                            </div>
                            <div class="text-left">
                                <h2 class="text-pink-700 font-bold">Available models</h2>
                                <div v-for="(model,index) in item.models" :key="index">{{model.modelName}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="mx-5 w-1/4 ">
                        <h2>Available colors</h2>
                        <div v-for="vari in item.productColor" :key="vari" class="flex flex-col border-2 border-black rounded-2xl m-1">
                            <div :class="'colorpick-bg-'+vari.color.caseColor.toLowerCase()">
                                {{vari.color.caseColor}}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
    import {
        prodcutControllerServices
    } from "@/.services/ProductsControllerServices.js";
    import caseNotFoundImage from '@/assets/imageNotFound.png'

    export default {
        mixins: [prodcutControllerServices],
        data() {
            return {
                caseNotFoundImage: caseNotFoundImage,
                productList: [],
                notification: {
                    searchnotfound: false,
                    sucessfullyLoaded: false,
                    assignOrderStatusValid: true
                },
                searchContent: {
                    searchUserName: "",
                    searchStatus: "",
                    searchProductName: ""
                }
            }
        },
        methods: {
            replaceErrorImage(e) {
                e.target.src = caseNotFoundImage
            },
            async deletProd(prodId) {
                let response;
                response = await this.permanentlyRemoveProduct(prodId);
                if (response.exceptionCode) {
                    alert("You can't delete a product with at least 1 order.")
                } else {
                    this.productList = await this.getListOfProductAdmin();
                    alert("This product is deleted.")
                }
            },
            async toggleProduct(prodId) {
                let response;
                response = await this.toggleProductShowStatus(prodId);
                for (let index = 0; index < this.productList.length; index++) {
                    if (response.caseID == this.productList[index].caseID) {
                        response.showMoreDetails = true;
                        this.productList[index] = response;
                        break;
                    }
                }
            },
            async getProductList() {
                this.notification.sucessfullyLoaded = false;
                let response;
                response = await this.getListOfProductAdmin(null,null,this.searchContent.searchProductName);
                console.log(response)
                this.productList = response;
                this.notification.sucessfullyLoaded = true;
            }

        },
        async created() {
            await this.getProductList();
        }
    }
</script>