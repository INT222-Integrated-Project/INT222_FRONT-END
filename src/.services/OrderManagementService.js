import axios from "axios"
export const orderManagementSetvice = {
    methods: {
        async getOrdersList(page, size, searchContent, searchStatus) {
            let result;
            await axios.get(`${process.env.VUE_APP_ROOT_API}admin/orders`, {
                params: {
                    page: page,
                    size: size,
                    searchContent: searchContent,
                    searchStatus: searchStatus
                }
            }).then((response) => {
                result = response.data.content;
            }).catch((error) => {
                result = error.response.data;
            });
            return result;
        },
        async changeOrderStatus(orderId, statusId) {
            let result;
            await axios.put(`${process.env.VUE_APP_ROOT_API}staff/changestatus?orderId=${orderId}&statusID=${statusId}`).then((response) => {
                result = response.data;
            }).catch((error) => {
                result = error.response.data;
            });
            return result;
        },
        async getMyorderList(page){
            let result;
            await axios.get(`${process.env.VUE_APP_ROOT_API}user/myOrders?page=${page}`).then((response) => {
                result = response.data.content;
            }).catch((error) => {
                result = error.response.data;
            });
            return result;
        },
        async cancelUserOrderByUser(orderId){
            let result;
            await axios.put(`${process.env.VUE_APP_ROOT_API}user/cancleorder?orderId=${orderId}`).then((response) => {
                result = response.data;
            }).catch((error) => {
                result = error.response.data;
            });
            return result;
        }
        
    }
}