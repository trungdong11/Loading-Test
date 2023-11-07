<template>
  <div>
    <button @click="getResponseHTTP">Gửi yêu cầu HTTP</button>
    <!-- <div>{{ listHttp }}</div> -->
    <ul> 
      <li v-for="listHttp in listHttps" :key="listHttp.id">{{listHttp}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // data: [],
      listHttps: [],
      url: "103.195.236.45",
      iterations: 2,
      threads: 2,
    };
  },
  created() {
    this.getResponseHTTP();
  },
  methods: {
    async getResponseHTTP() {
      try {
        const response = await this.$api.httpProtocol.getHttpRequest(this.url, this.iterations, this.threads);
        const sseUrl = response.data;
        let result = this.setupEventSource(sseUrl);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    },
    setupEventSource(sseUrl) {
      const source = new EventSource(sseUrl);
      console.log(source)

      // source.addEventListener('message', event => {
      //     let data = JSON.parse(event.data);
      //     this.listHttps = data.listHttps;
      // }, false);

      // source.addEventListener('error', event => {
      //     if (event.readyState == EventSource.CLOSED) {
      //         console.log('Event was closed');
      //         console.log(EventSource);
      //     }
      // }, false);

      source.addEventListener = (event) => {
          this.listHttps.push(JSON.parse(event.data));
          console.log(this.listHttps);
        };
    }
}
}
</script>
<style scoped>

</style>