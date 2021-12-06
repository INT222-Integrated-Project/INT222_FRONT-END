<template>
    <div class="bg-white">
        <div class="ordermanage-admin-main-href">My Orders</div>
        <div v-show="!notification.sucessfullyLoaded" class="mx-4 text-2xl default-inprogress-notification-window">
            Loading your orders...
        </div>
        <div v-show="notification.searchnotfound" class="default-error-notification-window mx-4">
            Nothing here : What ever you are looking at might not exist.
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
                    <div
                        :class="order.orderStatus.statusID <= 4 ?'ordermanage-status-topay':'ordermanage-status-disable'">
                        Ordered</div>
                    <div
                        :class="order.orderStatus.statusID <= 4 && order.orderStatus.statusID >= 2 ?'ordermanage-status-toship':'ordermanage-status-disable'">
                        Paid</div>
                    <div
                        :class="order.orderStatus.statusID <= 4 && order.orderStatus.statusID >= 3 ?'ordermanage-status-recieve':'ordermanage-status-disable'">
                        Shiped</div>
                    <div
                        :class="order.orderStatus.statusID == 4 ?'ordermanage-status-completed':'ordermanage-status-disable'">
                        Done</div>
                    <div
                        :class="order.orderStatus.statusID == 5 ?'ordermanage-status-cancelled':'ordermanage-status-disable'">
                        Aborted</div>
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
                <button @click="cancelMyorder(order.orderID)" :disabled="order.orderStatus.statusID > 1"
                    :class="order.orderStatus.statusID >= 4 ? 'ordermanage-status-disable':'ordermanage-status-cancelled'">Cancel
                    this order.</button>
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
                searchContent: {
                    searchUserName: "",
                    searchStatus: ""
                },
                notification: {
                    searchnotfound: false,
                    sucessfullyLoaded: false,
                    assignOrderStatusValid: true,
                },
                paging: {
                    currentPage: 0
                }
            }
        },
        methods: {
            async getMyorder(currentPage) {
                this.notification.sucessfullyLoaded = false;
                let result;
                result = await this.getMyorderList(currentPage);
                this.orderList = result;
                this.notification.sucessfullyLoaded = true;
            },
            async cancelMyorder(orderid) {
                let result;
                result = await this.cancelUserOrderByUser(orderid);
                for (let index = 0; index < this.orderList.length; index++) {
                    if (result.orderID == this.orderList[index].orderID) {
                        this.orderList[index] = result;
                        break;
                    }
                }
            }
        },
        async created() {
            await this.getMyorder(0);
        }
    }
</script>