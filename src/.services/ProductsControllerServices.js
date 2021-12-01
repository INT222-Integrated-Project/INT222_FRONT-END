import axios from "axios"
export const prodcutControllerServices = {

    Data() {
        return {

        }
    },
    methods: {
        increaseStock(current) {
            if (current > 9998) {
                return 9999
            } else return current += 1;
        },
        decreaseStock(current) {
            if (current < 1) {
                return 0
            } else return current -= 1;
        },
        async addProduct(newProduct, newImage) {
            const newProductBlob = new Blob([JSON.stringify(newProduct)], {
                type: 'application/json'
            })
            let formData = new FormData();
            formData.append('newProducts', newProductBlob)
            if (newImage != null) {
                formData.append('imageFile', newImage)
            }
            let actionResponse;
            await axios.post(`${process.env.VUE_APP_ROOT_API}staff/products`, formData).then(response => {
                actionResponse = response.data;
            }).catch(error => {
                actionResponse = error.response.data;
            })
            return actionResponse;
        },
        async editProduct(newProductEdit, newImage) {
            const newProductEditBlob = new Blob([JSON.stringify(newProductEdit)], {
                type: 'application/json'
            })

            let formData = new FormData;
            formData.append(newProducts, newProductEditBlob)
            if (newImage != null) {
                formData.append('imageFile', newImage)
            }

            let actionResponse;
            await axios.put(`${process.env.VUE_APP_ROOT_API}staff/product`, formData).then(response => {
                actionResponse = response.data;
            }).catch(error => {
                actionResponse = error.response.data;
            })
            return actionResponse;

        },
        async toggleThisProductOnorOutofStore(comingId) {
            console.log(comingId)
            let actionResponse;
            await axios.put(`${process.env.VUE_APP_ROOT_API}staff/product/onstore?productId=${comingId}`).then(response => {
                actionResponse = response.data;
            }).catch(error => {
                actionResponse = error.response.data;
            })

            return actionResponse;
        },
        async addQuaitity(quantity, productColorId) {

            let actionResponse;
            await axios.put(`${process.env.VUE_APP_ROOT_API}staff/addStock`, {
                parem: {
                    productColorId: productColorId,
                    quantity: quantity
                }
            }).then(response => {
                actionResponse = response.data;
            }).catch(error => {
                actionResponse = error.response.data;
            })

            return actionResponse;
        },
        async permanentlyRemoveProduct() {

        },
        async getAllAvailableColors() {
            let result;
            await axios.get(`${process.env.VUE_APP_ROOT_API}public/colors`).then(response => {
                result = response.data.content;
            }).catch(error => {
                result = error.response;
            });
            return result;
        },
        async getAllAvailableBrand() {
            let result;
            await axios.get(`${process.env.VUE_APP_ROOT_API}public/brands`).then(response => {
                result = response.data.content;
            }).catch(error => {
                result = error.response;
            });
            return result;
        },
        async getAllAvailableModels(searchcontent) {
            let result;
            await axios
                .get(`${process.env.VUE_APP_ROOT_API}public/models`, {
                    params: {
                        searchname: searchcontent
                    }
                })
                .then((response) => {
                    result = response.data.content;
                })
                .catch((error) => {
                    result = error.response;
                });
            return result;
        }
    }
}