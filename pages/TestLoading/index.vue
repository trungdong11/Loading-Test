<template>
  <div>
      <div class="container">
          <div class="container__item btn ">
              <input v-model="urlValue" type="text" placeholder="Enter the url" />
              <button @click="getResponseHTTP">Start test</button>
          </div>

          <div class="container__item">
            <!-- <label for="">Thread quantity</label> -->
            <input v-model="threadsValue" type="text" placeholder="Enter the thread quantity" />
            <input v-model="iterationValue" type="text" placeholder="Enter the iteration" />  
          </div>

          <div class="container__result" v-if="isCheck == true">
            <div class="container__result__header">
              <h2>Discover what your real users are experiencing</h2>
            </div>
            <div class="container__result__content">
              <div class="col-2">
                <ul> 
                  <li v-for="listHttp in listHttps" :key="listHttp.id">{{listHttp}}</li>
                </ul> 
              </div>
              <!-- <div class="col-2">

              </div> -->
            </div>
          </div>
          
          
      </div>

  </div>  
</template>

<script>
export default {
  data() {
    return {
      listHttps: [],  
      urlValue: "",
      iterationValue: "",
      threadsValue: "",
      isCheck: false,
       
    }
  },
  created() {
    // this.getResponseHTTP();
  },
  methods: {
    async getResponseHTTP() {
      this.$axios({
        url: `http://localhost:8081/api/v1/http-methods/get/http/${this.urlValue}?threads=${this.threadsValue}&iterations=${this.iterationValue}`,
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
          const dataString = xhr.responseText.replace(/data:/g, '');
          const lines = dataString.split('\n');
          const filteredArray = lines.filter(obj => Object.keys(obj).length > 0);
          const Arr = filteredArray.map(line => JSON.parse(line));
          console.log(Arr)
          this.listHttps = Arr;
          this.isCheck = true;
        }
      }).then(({ data }) => Promise.resolve(data));
    },
    
}
}
</script>
<style scoped lang="scss">

.container {
  margin: 28px 38px;

  &__item {
    
    display: flex;
    column-gap: 12px;
    width: 88%;

    input {
      width: 100%;
      height: 48px;
      border-radius: 10px;
      border: #0066ff 1px solid;
      outline: none;
      padding: 0 20px;
      font-size: 16px;
      margin-bottom: 24px;
    }

    button {
      height: 48px;
      width: 12%;
      margin-left: 8px;
      font-size: 16px;
      font-weight: 600;
      color: #ffff;
      background-color: #0066ff;
      border: none;
      outline: none;
      border-radius: 10px;
      padding: 0 12px;
      cursor: pointer;
    }

    button:hover {
      opacity: 0.8;
    }
  }

  &__item.btn {
    display: flex;
    column-gap: 12px;
    width: 100%;
  }

  &__result {
    
    &__header {
      font-size: 28px;
      font-weight: 600;
      text-align: center;
      margin-top: 24px;
      margin-bottom: 24px;
    }

    &__content {
      display: flex;
      border: 1px solid #000;
      border-radius: 6px;

      .col-2 {
        column-gap: 24px;
        //width: 50%;
        padding: 16px;
        border-right: 1px solid #000;
        
        ul {
          list-style: none;

          li {
            padding: 6px 0;
            border-bottom: 1px solid #9999;
          }
        }
      }
    }
  }
}

</style>