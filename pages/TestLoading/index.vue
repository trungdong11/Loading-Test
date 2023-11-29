<template>
  <div>
      <div class="container">
          <div class="container__item btn ">
              <input v-model="urlValue" type="text" placeholder="Enter the url" />
              <select class="form-control" v-model="methodSelected" @change="changeMethod">
                <option selected value="Http">Http</option>
                <option value="Https">Https</option>
              </select>
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
                  <li
                  
                   v-for="(listHttp, index) in listHttps" :key="index"
                    @click="SelectJSON(listHttp)" 
                    :class="{'selected' : selectedJson === listHttp}">
                    {{listHttp}}
                  </li> 
                </ul> 
              </div>
              <div class="col-2">
                <div class="col__item" v-if="selectedJson?.response_code === '200'">
                  <p><span>Thread Name:  </span>{{ selectedJson.thread_name }}</p>
                  <p><span>Iterations:  </span>{{ selectedJson.iterations }}</p>
                  <p><span>Start at:  </span>{{ selectedJson.start_at }}</p>
                  <p><span>Load time: </span>{{ selectedJson.load_time }}</p>
                  <p><span>Connect time:  </span>{{ selectedJson.connect_time }}</p>
                  <p><span>Latency:  </span>{{ selectedJson.latency }}</p>
                  <p><span>Header size:  </span>{{ selectedJson.header_size }}</p>
                  <p><span>Body size:  </span>{{ selectedJson.body_size }}</p>
                  <p><span>Response code:  </span>{{ selectedJson.response_code }}</p>
                  <p><span>Response message:  </span>{{ selectedJson.response_message }}</p>
                  <p><span>Content Type:  </span>{{ selectedJson.content_type }}</p>
                  <!-- <p><span>Response Body: </span>{{ selectedJson?.response_body }}</p> -->
                  <p><span>Request methods:  </span>{{ selectedJson.request_method }}</p>
                  <div v-html="selectedJson.response_body"></div>  
                               
                </div>
                <div v-else-if="selectedJson?.response_code !== '200'" class="col__item">
                  <p><span>Thread Name: </span>{{ selectedJson?.thread_name }}</p>
                  <p><span>Iterations: </span>{{ selectedJson?.iterations }}</p>
                  <p><span>Response Message: </span>{{ selectedJson?.response_message }}</p>
                  <p><span>Response Body: </span>{{ selectedJson?.response_body }}</p>
                </div>
              </div>
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
      selectedJson: null,
      methodSelected: null,
    }
  },
  created() {},
  methods: {
    async getResponseHTTP() {
      this.$axios({
        url: `http://localhost:8080/api/v1/http-methods/get/http/${this.urlValue}?threads=${this.threadsValue}&iterations=${this.iterationValue}`,
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
    async getResponseHTTPs() {
      this.$axios({
        url: `http://localhost:8080/api/v1/http-methods/get/https/${this.urlValue}?threads=${this.threadsValue}&iterations=${this.iterationValue}`,
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
    changeMethod() {
        
    },
    SelectJSON(json) {
      this.selectedJson = json;
    }
    
  }
}
</script>
<style scoped lang="scss">

.container {
  margin: 28px 108px;

  &__item {
    
    display: flex;
    column-gap: 12px;
    width: 88%;

    select,
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

    select {
      width: 30%;
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
        width: 50%;
        padding: 16px;
        border-right: 1px solid #000;
        max-height: 500px;
        overflow: auto;
        
        ul {
          list-style: none;         
            li {
              margin: 8px 0;
              border-bottom: 1px solid #9999;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
              -webkit-line-clamp: 2;
              cursor: pointer;
              
            }      
        }

        .col__item {
          
          p {
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            color: #EE6457;

            span {
              font-weight: 500;
              color: #000;
            }
          }
        }
      }

      .col-2::-webkit-scrollbar-thumb { 
        //width: 40px;
        background-color: transparent;
        border-radius: 10px;
        cursor: pointer;
        -webkit-transition: background-color 1000ms linear;
        transition: background-color 1000ms linear;
      }

      .col-2::-webkit-scrollbar-track {
        background-color: none;
        cursor: pointer;
        width: 5px !important;
      }

      .col-2::-webkit-scrollbar {
        height: 6px;
        width: 6px;
        background-color: none;
        cursor: pointer;
        opacity: 0;
      }

      .col-2:hover::-webkit-scrollbar {
        opacity: 1;
        cursor: pointer;
      }

      .col-2:hover::-webkit-scrollbar-thumb {
        background-color: #a3aed0;
        cursor: pointer;
      }
    }
  }
}

.selected {
  color: #EE6457;
}
</style>