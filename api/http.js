export default (axios) => ({
        getHttpRequest: async (url, iterations, threads) => {
            return await axios.get(`/http-methods/get/http/${url}`, {iterations, threads})
        },
    // PostHttpRequest: async () => {
    //     return await axios.get(`/admin/bookings?page=${page}`)
    // }
})