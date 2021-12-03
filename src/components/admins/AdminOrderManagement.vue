<template>
    <div class="ordermanage-admin-main-href">Order Managements</div>
    <div class="ordermanage-default-list flex justify-center">
        <input class="defaultinput-light-input" type="text" placeholder="Search orders by username"
            v-model="searchContent.searchUserName">
        <button class="defaultinput-page-default-button" type="button" @click="listAllOrderByUserName">Search</button>
    </div>
    <div>
        <div v-show="!notification.sucessfullyLoaded" class="mx-4 text-2xl default-inprogress-notification-window">
            Loading...
        </div>
        <div v-show="notification.searchnotfound" class="default-error-notification-window mx-4">
            Nothing here : This username might not exist or doesn't have any order.
        </div>
        <div v-for="order in orderList" :key="order">
            <div @click="order.showProductDetail = !order.showProductDetail"
                class="ordermanage-default-list flex justify-between items-center">
                <div class="flex justify-start items-start">
                    <div class="flex justify-start items-center">
                        <div class="text-right">
                            <p class="ordermanage-header-text">Ordered at : </p>
                            <p class="ordermanage-header-text">Paid at : </p>
                            <p class="ordermanage-header-text">Ordered by : </p>
                            <p class="ordermanage-header-text">User name : </p>
                        </div>
                        <div class="text-left">
                            <p class="ordermanage-default-text"> {{order.dateTime}}</p>
                            <p class="ordermanage-default-text"> {{order.paymentDate?order.paymentDate:"No payment."}}
                            </p>
                            <p class="ordermanage-default-text"> {{order.user.firstName}} {{order.user.lastName}}</p>
                            <p class="ordermanage-default-text"> {{order.user.userName}}</p>
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-row">
                            <div class="">
                                <div class="ordermanage-price-tag">{{order.allPrice}} ฿</div>
                            </div>

                            <div class="flex justify-start items-start">
                                <div class="text-right">
                                    <p class="ordermanage-header-text">Product : </p>
                                    <p class="ordermanage-header-text">Quantity: </p>
                                </div>
                                <div class="text-left" v-for="item in order.orderDetails" :key="item">
                                    <p class="ordermanage-default-text">ProCol {{item.productcolorID}}</p>
                                    <p class="ordermanage-default-text">{{item.quantityOrder}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="text-left">
                            <span class="ordermanage-header-text">Address : </span>
                            <span class="ordermanage-default-text">{{order.user.address}}</span>
                        </div>
                    </div>

                </div>
                <div class="flex flex-row">
                    <div class="ordermanage-status-topay">Ordered</div>
                    <div class="ordermanage-status-toship">Paid</div>
                    <div class="ordermanage-status-recieve">Shiped</div>
                    <div class="ordermanage-status-completed">Done</div>
                    <div class="ordermanage-status-cancelled">Aborted</div>
                </div>
            </div>
            <div v-show="order.showProductDetail" class="ordermanage-default-small flex justify-between">
                <div class="flex flex-row">
                    <div class="text-right">
                        <p class="ordermanage-header-text">Product : </p>
                        <p class="ordermanage-header-text">Variant : </p>
                        <p class="ordermanage-header-text">Brand : </p>
                    </div>
                    <div class="text-left">
                        <p class="ordermanage-default-text">
                            {{order.orderDetails[0].productColorToProducts.products.caseName}}</p>
                        <p class="ordermanage-default-text">
                            {{order.orderDetails[0].productColorToProducts.color.caseColor}}</p>
                        <p class="ordermanage-default-text">
                            {{order.orderDetails[0].productColorToProducts.products.models[0].brand.caseBrand}}</p>
                    </div>
                    <div class="text-right">
                        <p class="ordermanage-header-text">Status : </p>
                    </div>
                    <div class="text-left">
                        <p class="ordermanage-default-text"> {{order.orderStatus.status}}</p>
                    </div>
                </div>
                <div class="flex flex-row">
                    <button class="">Paid</button>
                    <button class="">Shiped</button>
                    <button class="">Done</button>
                    <button class="">Cancle</button>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import {
        orderManagementSetvice
    } from '@/.services/OrderManagementService.js'
    export default {
        mixins: [orderManagementSetvice],
        data() {
            return {
                orderList: [],
                notification: {
                    searchnotfound: false,
                    sucessfullyLoaded: false
                },
                searchContent: {
                    searchUserName: ""
                }
            }
        },
        methods: {
            async listAllOrderByUserName() {
                this.notification.sucessfullyLoaded = false;
                this.orderList = [];
                let result = await this.getOrdersList(0, 200, this.searchContent.searchUserName)
                if (result.exceptionCode) {
                    this.notification.searchnotfound = true;
                } else {
                    this.orderList = result;
                    this.notification.searchnotfound = false;
                }
                this.notification.sucessfullyLoaded = true;
            }
        },
        async created() {
            this.notification.sucessfullyLoaded = false;
            await this.listAllOrderByUserName();
            this.notification.sucessfullyLoaded = true;
        }
    }
</script>