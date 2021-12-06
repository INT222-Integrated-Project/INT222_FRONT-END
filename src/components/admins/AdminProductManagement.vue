<template>
    <div class="prodmanage-admin-main-href">Product Management</div>
    <div class="w-1/2 flex flex-row">
        <input class="defaultinput-light-input" type="text" placeholder="Search orders by username"
            v-model="searchContent.searchProductName">
        <button class="defaultinput-page-default-button" type="button" @click="getProductList">Search</button>
    </div>
    <div v-show="!notification.sucessfullyLoaded" class="mx-4 text-2xl default-inprogress-notification-window">
        Loading...
    </div>
    <div v-show="notification.searchnotfound" class="mx-4 text-2xl default-inprogress-notification-window">
        Seems like you don't have any order, need something?
    </div>
    <div v-show="notification.sucessfullyLoaded">
        <div v-for="(item,index) in productList" :key="index">
            <div @click="item.showMoreDetails = !item.showMoreDetails" class="mx-4 flex p-2 items-center"
                :class="item.isOnStore?'prodmanage-admin-head-list':'prodmanage-admin-head-list-notonsale'">
                <div>
                    <img :src="'https://naturegecko.com/backend/public/productImage/'+item.productImage"
                        @error="replaceErrorImage" class="h-12 rounded-full" />
                </div>
                <div class="items-center"><span class="prodmanage-text-semi-header">caseName :</span><span>
                        {{item.caseName}}</span></div>
            </div>
            <div v-show="item.showMoreDetails" class="mx-3">
                <div class="flex justify-between">
                    <div class="flex justify-items-start">
                        <div>
                            <img :src="'https://naturegecko.com/backend/public/productImage/'+item.productImage"
                                @error="replaceErrorImage" class="h-56 rounded-full" />
                        </div>
                        <div class="flex flex-col">
                            <div class="flex flex-row">
                                <div class="prodmanage-text-semi-header text-right">
                                    <p>Product name : </p>
                                    <p>Product price :</p>
                                    <p>Product descrpition :</p>
                                </div>
                                <div class="text-left">
                                    <p>{{item.caseName}}</p>
                                    <p>{{item.casePrice}}</p>
                                    <p>{{item.caseDescription}}</p>
                                </div>
                            </div>
                            <div class="text-left">
                                <h2 class="text-pink-700 font-bold">Available models</h2>
                                <div v-for="(model,index) in item.models" :key="index">{{model.modelName}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="mx-5">
                        <h2>Available colors</h2>
                        <div v-for="vari in item.productColor" :key="vari" class="flex flex-col">
                            <div :class="'colorpick-bg-'+vari.color.caseColor.toLowerCase()">
                                {{vari.color.caseColor}}
                            </div>
                        </div>

                    </div>
                    <div class="flex flex-col">
                        <button class="prodmanage-page-delete-button">Delete</button>
                        <button v-show="item.isOnStore" @click="toggleProduct(item.caseID)"
                            class="prodmanage-page-hide-button">Hide</button>
                        <button v-show="!item.isOnStore" @click="toggleProduct(item.caseID)"
                            class="prodmanage-page-unhide-button">Show</button>
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