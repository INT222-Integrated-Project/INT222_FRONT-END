export const paginationServices = {
    Data() {
        return {
            pagination: {
                pageNumber: 0,
                numberOfPage: 0,
                highestMove: 0,
                lowestMove: 7,
                arrayofCurrentSetofPage: []
            }
        }
    },
    methods: {
        createPagingBar(pageNumber, numberOfPage) {
            if (numberOfPage >= 11) {
                this.pagination.highestMove = numberOfPage - 5;
                if (this.pagination.highestMove <= pageNumber) {
                    for (let index = 0; index < 11; index++) {
                        this.pagination.arrayofCurrentSetofPage[index] = this.paginationService.highestMove -
                            5 +
                            index;
                    }
                } else if (this.paging.lowestMove <= pageNumber) {
                    for (let index = 0; index < 11; index++) {
                        this.pagination.arrayofCurrentSetofPage[index] = pageNumber - 5 + index;
                    }
                } else {
                    for (let index = 0; index < 11; index++) {
                        this.pagination.arrayofCurrentSetofPage[index] = index + 1;
                    }
                }


            } else {
                this.pagination.arrayofCurrentSetofPage = [];
                for (let index = 1; index <= numberOfPage; index++) {
                    this.pagination.arrayofCurrentSetofPage.push(index);
                }
            }

            return this.pagination;
        }
    }
}