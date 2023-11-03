<template>
    <div>
      <button @click="getResponseHTTP">Gửi yêu cầu HTTP</button>
      <!-- <div>{{ listHttp }}</div> -->
      <ul> 
        <li v-for="item in data" :key="item.id">{{item.id}}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        data: [],
        url: "103.195.236.45",
        iterations: 2,
        threads: 50,
      };
    },
    methods: {
      async getResponseHTTP() {
        try {
          const response = await this.$api.httpProtocol.getHttpRequest(this.url, this.iterations, this.threads);
          this.listHttp = response.data;
          console.log('Done');
        } catch (error) {
          console.error(error);
        }
      }
    },
  };
  </script>
  