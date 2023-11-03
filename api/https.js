export default (axios) => ({
    getHttpsRequest: async (url, iterations, threads) => {
        return await axios.get(`/https/${url}`, {iterations, threads})
    },
    // PostHttpRequest: async () => {
    //     return await axios.get(`/admin/bookings?page=${page}`)
    // }
})