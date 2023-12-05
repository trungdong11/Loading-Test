<template>
  <div>
      <div class="container">
          <div class="container__item btn ">
              <input v-model="urlValue" type="text" placeholder="Enter the url" />
              <select class="form-control" v-model="methodSelected">
                <option selected value="Http">Http</option>
                <option value="Https">Https</option>
              </select>
              <button @click="startTest">Start test</button>
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
                <div class="col__btn">
                  <a @click="handleDetail" :class="{'active': isShowDetail === true}">Detail</a>
                  <a @click="handleOverview" :class="{'active': isShowOVerview === true}">Overview</a>
                </div>
                <div class="col__item" v-if="isShowDetail">
                  <div class="col__item__detail" v-if="selectedJson?.response_code === '200'">
                    <p><span>Server Software:  </span>{{ selectedJson.server_software }}</p>
                    <p><span>Server Host:  </span>{{ selectedJson.server_host }}</p>
                    <p><span>Server Post:  </span>{{ selectedJson.server_port }}</p>
                    <p><span>Keep Alive:  </span>{{ selectedJson.keep_alive }}</p>
                    <p><span>Html Transferred:  </span>{{ selectedJson.html_transferred }}</p>
                    <p><span>Content Type:  </span>{{ selectedJson.content_type }}</p>
                    <p><span>Thread Name:  </span>{{ selectedJson.thread_name }}</p>
                    <p><span>Iterations:  </span>{{ selectedJson.iterations }}</p>
                    <p><span>Start at:  </span>{{ selectedJson.start_at }}</p>
                    <p><span>Load time: </span>{{ selectedJson.load_time }}</p>
                    <p><span>Connect time:  </span>{{ selectedJson.connect_time }}</p>
                    <p><span>Latency:  </span>{{ selectedJson.latency }}</p>
                    <p><span>Header size:  </span>{{ selectedJson.header_size }}</p>
                    <p><span>Response code:  </span>{{ selectedJson.response_code }}</p>
                    <p><span>Response message:  </span>{{ selectedJson.response_message }}</p>
                    <p><span>Request methods:  </span>{{ selectedJson.request_method }}</p>
                    <!-- <div v-html="selectedJson.response_body"></div>   -->
                                 
                  </div>
                  <div v-else-if="selectedJson?.response_code !== '200'" class="col__item">
                    <p><span>Thread Name: </span>{{ selectedJson?.thread_name }}</p>
                    <p><span>Iterations: </span>{{ selectedJson?.iterations }}</p>
                    <p><span>Response Message: </span>{{ selectedJson?.response_message }}</p>
                    <p><span>Response Body: </span>{{ selectedJson?.response_body }}</p>
                  </div>
                </div>

                <div class="col__item" v-if="isShowOVerview" >
                    <div class="col__item__detail">
                       <p><span>Server Software:  </span>{{ total.serverSoftware }}</p>
                      <p><span>Server Host:  </span>{{ total.serverHost }}</p>
                      <p><span>Server Post:  </span>{{ total.serverPort }}</p> 
                      <p><span>Time taken for test:  </span>{{ total.callApi }}</p>
                      <p><span>Non-2xx responses: </span>{{total.nonResponse}}</p>
                      <p><span>Keep-alive request: </span>{{total.keepAliveRequest}}</p>
                      <p><span>HTML Transferred: </span>{{total.htmlTransfer}}</p>
                      <p><span>Connect Time min: </span>{{total.connectTime.min}}</p>
                      <p><span>Connect Time max: </span>{{total.connectTime.max}}</p>
                      <p><span>Connect Time avg: </span>{{total.connectTime.avg}}</p>
                      <p><span>Loading Time min: </span>{{total.LoadTime.min}}</p>
                      <p><span>Loading Time max: </span>{{total.LoadTime.max}}</p>
                      <p><span>Loading Time avg: </span>{{total.LoadTime.avg}}</p>
                      <p><span>Latency Time min: </span>{{total.Latency.min}}</p>
                      <p><span>Latency Time max: </span>{{total.Latency.max}}</p>
                      <p><span>Latency Time avg: </span>{{total.Latency.avg}}</p>
                      
                                   
                    </div>
                    
                </div>
                
              </div>
            </div>

            <div class="container__result__chart">
              <!-- <div class="row mt-5" v-if="listLoadTime.length > 0">
                <div class="col">
                  <h2>LoadingTime</h2>
                  <line-chart :chartData="listLoadTime" :options="chartOptions" label="LoadTime"/>
                </div>

              </div> -->
            </div>
          </div>
          
      </div>

  </div>  
</template>

<script>
import LineChart from '~/components/Commons/LineChart.vue';

export default {
  data() {
    return {
      listHttps: [],  
      urlValue: "",
      iterationValue: "",
      threadsValue: "",
      isCheck: false,
      selectedJson: null,
      methodSelected: "Http",
      listLoadTime: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false, 
      },
      isShowDetail: false,
      isShowOVerview: true,
      total: {
        serverSoftware: '',
        serverHost: '',
        serverPort: '',
        LoadingTime: 0,
        callApi: 0,
        nonResponse: 0,
        keepAliveRequest: 0,
        htmlTransfer: 0,
        connectTime: {
          min: 0,
          avg: 0,
          max: 0,
        },
        LoadTime: {
          min: 0,
          avg: 0,
          max: 0,
        },
        Latency: {
          min: 0,
          avg: 0,
          max: 0,
        }
      }
      
    }
  },
  components: {
    LineChart,
  },
  created() {
    
  },
  methods: {
    async getResponseHTTP() {
      const startTime = performance.now();
      this.$axios({
        url: `http://localhost:8080/api/v1/http-methods/get/http?url=${this.urlValue}&threads=${this.threadsValue}&iterations=${this.iterationValue}`,
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
          this.LoadingTime();
          this.LoadingTimeTest();
          const endTime = performance.now();
          this.total.callApi = endTime - startTime
          console.log(endTime - startTime, "test")
        }
      }).then(({ data }) => Promise.resolve(data));
    },
    async getResponseHTTPs() {
      this.$axios({
        url: `http://localhost:8080/api/v1/http-methods/get/https?url=${this.urlValue}&threads=${this.threadsValue}&iterations=${this.iterationValue}`,
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
    startTest() {
        if(this.methodSelected === 'Http')
        {
          this.getResponseHTTP();
        }else if(this.methodSelected === "Https")
        {
          this.getResponseHTTPs();
        }   
    },
    SelectJSON(json) {  
      this.selectedJson = json;
    },
    handleDetail() {
      this.isShowDetail = true;
      this.isShowOVerview = false;
    },
    handleOverview() {
      this.isShowDetail = false;
      this.isShowOVerview = true;
    },
    LoadingTime() {
      this.listHttps.forEach((d) => {
      this.listLoadTime.push({total: d.load_time})
      // console.log(this.listLoadTime, "dong")
      })
      console.log(this.listLoadTime, "dong11")
    },
    LoadingTimeTest() {
      let initKeepAlive = 0;
      let initNonResponse = 0;
      let initHtmlTransfer = 0;
      let initConnectTime = 0;
      let initConnectTimeMin = Infinity;
      let initConnectTimeMax = 0;
      let initLoadTime = 0;
      let initLoadTimeMin = Infinity;
      let initLoadTimeMax = 0;
      let initLatency = 0;
      let initLatencyMin = Infinity;
      let initLatencyMax = 0;
      
      let count = 0;

      this.listHttps.forEach((d) => {
        if(d.response_code !== '200') {
          initNonResponse++;
        }
        if(d.keep_alive === 'true') {
          initKeepAlive++;
        }
        if(d.connect_time > initConnectTimeMax)
         {
          initConnectTimeMax = parseInt(d.connect_time) 
         }
        if(d.connect_time < initConnectTimeMin) 
        {
          initConnectTimeMin = parseInt(d.connect_time)
        }

        if(d.load_time > initLoadTimeMax)
         {
          initLoadTimeMax = parseInt(d.load_time) 
         }
        if(d.load_time < initLoadTimeMin) 
        {
          initLoadTimeMin = parseInt(d.load_time)
        }

        if(d.latency > initLatencyMax)
         {
          initLatencyMax = parseInt(d.latency) 
         }
        if(d.latency < initLatencyMin) 
        {
          initLatencyMin = parseInt(d.latency)
        }
        
        this.total.serverSoftware = d.server_software
        this.total.serverHost = d.server_host
        this.total.serverPort = d.server_port
        count++
        initHtmlTransfer += parseInt(d.html_transferred)
        initConnectTime += parseInt(d.connect_time)
        initLoadTime += parseInt(d.load_time)
        initLatency += parseInt(d.latency)
        

      })
      this.total.keepAliveRequest = initKeepAlive;
      this.total.nonResponse = initNonResponse;
      this.total.htmlTransfer = initHtmlTransfer; 
      this.total.connectTime.avg = initConnectTime / count;
      this.total.LoadTime.avg = initLoadTime / count;
      this.total.Latency.avg = initLatency / count;
      this.total.connectTime.max = initConnectTimeMax
      this.total.connectTime.min = initConnectTimeMin 
      this.total.LoadTime.max = initLoadTimeMax
      this.total.LoadTime.min = initLoadTimeMin
      this.total.Latency.max = initLatencyMax
      this.total.Latency.min = initLatencyMin

      
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

        .col__btn {
          a {
            font-size: 16px;
            font-weight: 500;
            color: #000;
            padding: 0 8px 38px 8px;
            text-decoration: none;
            cursor: pointer;
          }
        }

        .col__item {
          &__detail {
          
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

.active {
  color: #0066ff!important;
  text-decoration: underline!important;
}

.selected {
  color: #EE6457;
}
</style>