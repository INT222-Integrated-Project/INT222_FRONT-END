<template>
    <div class="my-5">
        <div class="default-medium-header-box my-5 flex sm:flex-row justify-center  flex-wrap items-center">
        <!-- <div class="ordermanage-admin-main-href">Order Managements</div> -->
        <div class="flex justify-center m-2  w-5/6">
            <div class="flex sm:flex-row flex-col justify-center items-center">
                    <input class="bg-white border-2  border-gray-500 hover:bg-purple-100 duration-100 m-1 w-3/4 sm:w-80 px-2 py-2 rounded-xl font-medium" type="text" placeholder="Search orders by username"
                        v-model="searchContent.searchUserName">
                    <button class="p-3  bg-pink-200 border-2 border-pink-500 rounded-xl  m-1 w-1/3 sm:w-3/6  py-2 hover:bg-pink-300 duration-100 placeholder-gray-800" type="button"
                        @click="listAllOrderByUserName">Search</button>
            </div>
        </div>
        <div class="flex justify-center w-5/6">
            <div class="  grid grid-cols-3 ">
                <button type="button" @click="listAllOrderByStatus(null)"
                    class="ordermanage-status-topay">ALL</button>
                <button type="button" @click="listAllOrderByStatus('To Pay')"
                    class="ordermanage-status-topay">Ordered</button>
                <button type="button" @click="listAllOrderByStatus('To Ship')"
                    class="ordermanage-status-toship">Paid</button>
                <button type="button" @click="listAllOrderByStatus('To Receive')"
                    class="ordermanage-status-recieve">Shiped</button>
                <button type="button" @click="listAllOrderByStatus('Completed')"
                    class="ordermanage-status-completed">Done</button>
                <button type="button" @click="listAllOrderByStatus('Cancelled')"
                    class="ordermanage-status-cancelled">Aborted</button>
            </div>
        </div>
        <div>
            <div v-show="!notification.sucessfullyLoaded" class="mx-4 text-2xl default-inprogress-notification-window">
                Loading...
            </div>
            <div v-show="notification.searchnotfound" class="default-error-notification-window mx-4">
                Nothing here : What ever you are looking at might not exist.
            </div>
            <div v-for="order in orderList" :key="order">
                <div @click="order.showProductDetail = !order.showProductDetail"
                    class="ordermanage-default-list flex flex-col md:flex-row items-center">
                    <div class="flex sm:flex-row flex-col  items-start ">
                        <div class="flex justify-start items-center">
                            <div class="text-right">
                                <p class="ordermanage-header-text">Ordered at : </p>
                                <p class="ordermanage-header-text">Paid at : </p>
                                <p class="ordermanage-header-text">Ordered by : </p>
                                <p class="ordermanage-header-text">User name : </p>
                            </div>
                            <div class="text-left">
                                <p class="ordermanage-default-text "> {{order.dateTime}}</p>
                                <p class="ordermanage-default-text"> {{order.paymentDate?order.paymentDate:"No payment."}}
                                </p>
                                <p class="ordermanage-default-text"> {{order.user.firstName}} {{order.user.lastName}}</p>
                                <p class="ordermanage-default-text"> {{order.user.userName}}</p>
                            </div>
                        </div>
                        <div>
                            <div class="flex flex-row">
                                <div class="flex justify-start items-start">
                                    <div class="text-right">
                                        <p class="ordermanage-header-text ml-6 sm:ml-1">Product : </p>
                                        <p class="ordermanage-header-text">Quantity: </p>
                                        <p class="ordermanage-header-text">Address : </p>
                                    </div>
                                    <div class="text-left" v-for="item in order.orderDetails" :key="item">
                                        <p class="ordermanage-default-text">ProCol {{item.productcolorID}}</p>
                                        <p class="ordermanage-default-text">{{item.quantityOrder}}</p>
                                        <p class="ordermanage-default-text">{{order.user.address}}</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                    <div class="grid grid-cols-3 md:grid-cols-2 md:text-sm">
                        <div class="">
                            <div class="ordermanage-price-tag">{{order.allPrice}} ฿</div>
                        </div>
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
                <div v-show="order.showProductDetail" class="ordermanage-default-small flex sm:flex-row flex-col">
                    <div class="flex flex-row w-3/4 sm:mt-6">
                        <div class="text-right ">
                            <p class="ordermanage-header-text">Product : </p>
                            <p class="ordermanage-header-text">Variant : </p>
                            <p class="ordermanage-header-text">Brand : </p>
                            <p class="ordermanage-header-text">Status : </p>
                        </div>
                        <div class="text-left">
                            <p class="ordermanage-default-text">
                                {{order.orderDetails[0].productColorToProducts.products.caseName}}</p>
                            <p class="ordermanage-default-text">
                                {{order.orderDetails[0].productColorToProducts.color.caseColor}}</p>
                            <p class="ordermanage-default-text">
                                {{order.orderDetails[0].productColorToProducts.products.models[0].brand.caseBrand}}</p>
                            <p class="ordermanage-default-text"> {{order.orderStatus.status}}</p>
                        </div>
                    </div>
                    <div class="ordermanage-assign-body flex flex-col w-1/4">
                        <button @click="stepUpByOneStep(order.orderID,order.orderStatus.statusID)"
                            :disabled="order.orderStatus.statusID >= 4"
                            :class="order.orderStatus.statusID >= 4 ? 'ordermanage-status-disable' : 'ordermanage-status-completed'">Success
                            by one step.</button>
                        <button @click="stepDownByOneStep(order.orderID,order.orderStatus.statusID)"
                            :disabled="order.orderStatus.statusID >= 4 || order.orderStatus.statusID < 2"
                            :class="order.orderStatus.statusID >= 4 || order.orderStatus.statusID < 2 ? 'ordermanage-status-disable' : 'ordermanage-status-toship'">Step
                            back by one step.</button>
                        <button @click="cancelOrderStatus(order.orderID)" :disabled="order.orderStatus.statusID >= 4"
                            :class="order.orderStatus.statusID >= 4 ? 'ordermanage-status-disable':'ordermanage-status-cancelled'">Cancel
                            this order.</button>
                    </div>
                </div>
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
                    sucessfullyLoaded: false,
                    assignOrderStatusValid: true
                },
                searchContent: {
                    searchUserName: "",
                    searchStatus: ""
                }
            }
        },
        methods: {
            async cancelOrderStatus(orderId) {
                let result;
                result = await this.changeOrderStatus(orderId, 5)
                for (let index = 0; index < this.orderList.length; index++) {
                    if (result.orderID == this.orderList[index].orderID) {
                        this.orderList[index] = result;
                        break;
                    }
                }
            },
            async stepUpByOneStep(orderId, orderStatusId) {
                let result;
                let toOrder;
                switch (orderStatusId) {
                    case 1:
                        toOrder = 2;
                        break;
                    case 2:
                        toOrder = 3;
                        break;
                    case 3:
                        toOrder = 4;
                        break;
                    default:
                        break;
                }
                if (toOrder >= 2 && toOrder <= 4) {
                    result = await this.changeOrderStatus(orderId, toOrder);
                    result.showProductDetail = true;
                    for (let index = 0; index < this.orderList.length; index++) {
                        if (result.orderID == this.orderList[index].orderID) {
                            this.orderList[index] = result;
                            break;
                        }
                    }
                } 
            },
            async stepDownByOneStep(orderId, orderStatusId) {
                let result;
                let toOrder;
                switch (orderStatusId) {
                    case 2:
                        toOrder = 1;
                        break;
                    case 3:
                        toOrder = 2;
                        break;
                    default:
                        break;
                }
                if (toOrder == 1 || toOrder == 2) {
                    result = await this.changeOrderStatus(orderId, toOrder);
                    result.showProductDetail = true;
                    for (let index = 0; index < this.orderList.length; index++) {
                        if (result.orderID == this.orderList[index].orderID) {
                            this.orderList[index] = result;
                            break;
                        }
                    }
                }
            },
            async listAllOrderByUserName() {
                this.notification.sucessfullyLoaded = false;
                this.orderList = [];
                let result = await this.getOrdersList(0, 200, this.searchContent.searchUserName, null)
                if (result.exceptionCode) {
                    this.notification.searchnotfound = true;
                } else {
                    this.orderList = result;
                    this.notification.searchnotfound = false;
                }
                this.notification.sucessfullyLoaded = true;
            },
            async listAllOrderByStatus(searchStatus) {
                this.notification.sucessfullyLoaded = false;
                this.orderList = [];
                let result = await this.getOrdersList(0, 200, this.searchContent.searchUserName, searchStatus)
                if (result.exceptionCode) {
                    this.notification.searchnotfound = true;
                } else {
                    this.orderList = result;
                    this.notification.searchnotfound = false;
                }
                this.notification.sucessfullyLoaded = true;
            },
        },
        async created() {
            await this.listAllOrderByUserName();
        }
    }
</script>