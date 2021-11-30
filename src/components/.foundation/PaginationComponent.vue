<template>
    <div class="flex align-middle justify-center flex-row mr-2">
        <div class="">
            <button class="flex default-page-button " style="width: 150px;" v-on:click="changePage(1)"
                v-if="pagination.currentPage != 1">
                First Page
            </button>
            <button class="flex default-page-button-current" style="width: 150px;" v-on:click="changePage(1)" v-else>
                First Page
            </button>
        </div>

        <div>
            <button class="flex default-page-button " style="width: 30px;"
                v-on:click="changePage(pagination.currentPage - 1)" v-if="pagination.currentPage != 1">
                ←
            </button>
            <button class="flex default-page-button-current " style="width: 30px;" v-else>
                ←
            </button>
        </div>

        <div v-for="index in this.pagination.arrayofCurrentSetofPage" :key="index" class="">
            <button class="flex default-page-button" v-on:click="changePage(index)" v-if="index != pagination.currentPage">
                {{index}}
            </button>
            <button class="flex default-page-button-current" v-on:click="changePage(index)" v-else>
                {{index}}
            </button>
        </div>

        <div>
            <button class="flex default-page-button " style="width: 30px;"
                v-on:click="changePage(pagination.currentPage + 1)" v-if="pagination.currentPage != pagination.numberOfPage">
                →
            </button>
            <button class="flex default-page-button-current " style="width: 30px;" v-else>
                →
            </button>
        </div>

        <div class="">
            <button class="flex default-page-button " style="width: 150px;" v-on:click="changePage(pagination.numberOfPage)"
                v-if="pagination.numberOfPage != pagination.currentPage">
                Last Page
            </button>
            <button class="flex default-page-button-current" style="width: 150px;"
                v-on:click="changePage(pagination.numberOfPage)" v-else>
                Last Page
            </button>
        </div>

    </div>
</template>

<script>
import {
        paginationServices
    } from "@/.services/PaginationServices.js"
    export default({
        mixins: [
            paginationServices
        ],
        props:['pagination'],
        Data(){
            return{
                pagination: {}
            }
        },
        methods:{
            async changePage(pageNumber) {
                this.paging.currentPage = pageNumber;
                this.createPagingBar(pagination.pageNumber,pagination.numberOfPage);
            },
        }
    })
</script>