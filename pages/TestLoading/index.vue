<template>
  <div>
    <!-- <div class="container">
      <form action="" @submit.prevent="getResponseHTTP">
        <label for="">URL or Ip address</label>
        <input type="text" placeholder="Enter the url" v-model="urlValue">

        <label for="">Thread quantity</label>
        <input type="text" placeholder="Enter the thread quantity" v-model="threadValue">

        <label for="">Iteration quantity</label>
        <input type="text" placeholder="Enter the iteration" v-model="IterationValue">

        <button type="submit">Start test</button>
      </form>
    </div> -->
    <button @click="getResponseHTTP">Gửi yêu cầu HTTP</button>
    <!-- <div>{{ listHttp }}</div> -->  
    <p> 
      <!-- <li v-for="listHttp in listHttps" :key="listHttp.id">{{listHttp}}</li> -->
      {{ listHttps }}
    </p> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      // data: [],
      listHttps: [],
      urlValue: '',
      iterationValue: '',
      threadsValue: '',
       
    };
  },
  created() {
    // this.getResponseHTTP();
  },
  methods: {
    async getResponseHTTP() {
      this.$axios({
        url: 'http://localhost:8081/api/v1/http-methods/get/http/103.195.237.70?threads=2&iterations=2',
        data: {
          prompt: 'json data'
        },
        headers: {
          'accept': '*',
          'content-type': 'application/json'    
        },
        method: 'GET',
        onDownloadProgress: progressEvent => {
          const xhr = progressEvent?.target
          // console.log(xhr.response.data)
          this.listHttps = xhr.response
          const dataString = xhr.response.split('data:') 
          console.log(dataString)
          // const result = JSON.parse(dataString)
          
          // console.log(dataString)

          // const{responseText} = xhr;
          // const dataString = responseText .split(' ');
          // this.listHttps = dataString
          // console.log(dataString)
        }
      }).then(({ data }) => Promise.resolve(data));
    },
    
}
}
</script>
<style scoped lang="scss">


</style>