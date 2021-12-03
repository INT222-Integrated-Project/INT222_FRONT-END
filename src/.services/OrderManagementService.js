import axios from "axios"
export const orderManagementSetvice = {
    methods:{
        async getOrdersList(page, size, searchContent) {
            let result;
            await axios.get(`${process.env.VUE_APP_ROOT_API}admin/orders`, {
                params: {
                    page: page,
                    size: size,
                    searchContent: searchContent
                }
            }).then((response) => {
                result = response.data.content;
            }).catch((error) => {
                result = error.response.data;
            });
            return result;
        }
    }
}