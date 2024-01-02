<template>
    <div>
        <div class="container">
            <div class="container__item btn ">
                <input v-model="urlValue" type="text" placeholder="Enter the url" />
                <select class="form-control" v-model="methodSelected">
                  <option selected value="HttpMVC">Application/x-www-form-urlencoded</option>
                  <option value="HttpAPI">Application/Json</option>
                </select>
                <button @click="startTest">Start test</button>
            </div>
  
            <div class="container__item">
              <input v-model="threadsValue" type="text" placeholder="Enter the thread quantity" />
            </div>
            <div 
              class="container__item"
              v-for="(item, index) in keyValuePairList" :key="index"
            >
                <input v-model="item.key" type="text" placeholder="Enter key" />
                <input v-model="item.value" type="text" placeholder="Enter value" />
                <div class="container__item__close" @click="handleRemoveBody(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"/>
                  </svg>
                </div>  
            </div>
            <div class="container__btn">
                <button @click="handleAddBody">
                    Add 
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11 13H6q-.425 0-.713-.288T5 12q0-.425.288-.713T6 11h5V6q0-.425.288-.713T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.713-.288T11 18v-5Z"/>
                    </svg>
                </button>
            </div>
            <div class="container__result" v-if="isCheck == true">
              <div class="container__result__header">
                <h2>Discover what your real users are experiencing</h2>
              </div>
              <div class="container__result__btn">
                <button @click="handleDetail" class="detail" :class="{'active': isShowDetail === true}">Detail</button>
                <button @click="handleOverview" class="overview" :class="{'active': isShowOVerview === true}">Overview</button>
                <button @click="handleChart" class="chart" :class="{'active': isShowChart === true}">Chart</button>
                <button @click="handleRender" class="render" :class="{'active': isShowRender === true}">Render</button> 
              </div>
              <div class="container__result__content container__global" v-if="isShowDetail">
                <div class="col-2" >
                  <ul> 
                    <li
                      v-for="(listHttp, index) in listHttps" :key="index"
                      @click="SelectJSON(listHttp)" 
                      :class="{'selected' : selectedJson === listHttp}">
                      <svg v-if="listHttp?.response_code === '200'" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#407F3E"
                         d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/>
                      </svg>
                      <svg  v-if="listHttp?.response_code != '200'"  xmlns="http://www.w3.org/2000/svg"
                       width="22" height="22" viewBox="0 0 24 24">
                       <path fill="#D24150" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/>
                      </svg>
                      {{listHttp?.thread_name}}
                    </li> 
                  </ul> 
                </div>
                <div class="col-2" >
                  <div class="col__item">
                    <div class="col__item__detail" v-if="selectedJson?.response_code === '200'">
                      <p><span>Server Software:  </span>{{ selectedJson.server_software }}</p>
                      <p><span>Server Host:  </span>{{ selectedJson.server_host }}</p>
                      <p><span>Server Post:  </span>{{ selectedJson.server_port }}</p>
                      <p><span>Keep Alive:  </span>{{ selectedJson.keep_alive }}</p>
                      <p><span>Html Transferred:  </span>{{ selectedJson.html_transferred }} bytes</p>
                      <p><span>Content Type:  </span>{{ selectedJson.content_type }}</p>
                      <p><span>Thread Name:  </span>{{ selectedJson.thread_name }}</p>
                      <p><span>Iterations:  </span>{{ selectedJson.iterations }}</p>
                      <p><span>Start at:  </span>{{ selectedJson.start_at }}</p>
                      <p><span>Load time: </span>{{ selectedJson.load_time }} ms</p>
                      <p><span>Connect time:  </span>{{ selectedJson.connect_time }} ms</p>
                      <p><span>Latency:  </span>{{ selectedJson.latency }} ms</p>
                      <p><span>Header size:  </span>{{ selectedJson.header_size }} bytes</p>   
                      <p><span>Response code:  </span>{{ selectedJson.response_code }}</p>
                      <p><span>Response message:  </span>{{ selectedJson.response_message }}</p>
                      <p><span>Request methods:  </span>{{ selectedJson.request_method }}</p>
                    </div>
                    <div v-else-if="selectedJson?.response_code !== '200'" class="col__item__detail">
                      <p><span>Thread Name: </span>{{ selectedJson?.thread_name }}</p>
                      <p><span>Iterations: </span>{{ selectedJson?.iterations }}</p>
                      <p><span>Response Message: </span>{{ selectedJson?.response_message }}</p>
                      <p><span>Response Body: </span>{{ selectedJson?.response_body }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container__result__overview container__global" v-if="isShowOVerview">
                <p><span>Server Software:  </span>{{ total.serverSoftware }}</p>
                <p><span>Server Host:  </span>{{ total.serverHost }}</p>
                <p><span>Server Post:  </span>{{ total.serverPort }}</p> 
                <p><span>Time taken for test:  </span>{{ total.callApi }} ms</p>
                <p><span>Non-2xx responses: </span>{{total.nonResponse}}</p>
                <p><span>Keep-alive request: </span>{{total.keepAliveRequest}}</p>
                <p><span>HTML Transferred: </span>{{total.htmlTransfer}} bytes</p>
                <p><span>Connect Time min: </span>{{total.connectTime.min}} ms</p>
                <p><span>Connect Time max: </span>{{total.connectTime.max}} ms</p>
                <p><span>Connect Time avg: </span>{{total.connectTime.avg}} ms</p>
                <p><span>Loading Time min: </span>{{total.LoadTime.min}} ms</p>
                <p><span>Loading Time max: </span>{{total.LoadTime.max}} ms</p>
                <p><span>Loading Time avg: </span>{{total.LoadTime.avg}} ms</p>
                <p><span>Latency Time min: </span>{{total.Latency.min}} ms</p>
                <p><span>Latency Time max: </span>{{total.Latency.max}} ms</p>
                <p><span>Latency Time avg: </span>{{total.Latency.avg}} ms</p>
                <p><span>Throughput: </span>{{total.throughput}} Request/s</p>
              </div>
              <div class="container__result__chart container__global" v-if="isShowChart">
                <line-chart
                :chartData="chartData"
                :options="chartOptions"
                class="line-chart" />
              </div>
              <div class="container__result__render container__global" v-if="isShowRender">
                <!-- <p v-html="listHttps[0]?.response_body"></p>   -->
                <iframe width="100%" height="100vh" :srcdoc="listHttps[0]?.response_body"></iframe>
              </div>
            </div>
            
        </div>
  
    </div>  
  </template>
  
  <script>
import LineChart from '~/components/Commons/DynamicChart.vue'

  export default {
    components: {
      LineChart
	  },
    data() {
      return {
        listHttps: [],  
        urlValue: "",
        threadsValue: "",
        isCheck: false,
        selectedJson: null,
        methodSelected: 'HttpMVC',
        keyValuePairList: [{ key: "username", value: "Anh Dung" }],
        chartOptions: {
        responsive: true,
        maintainAspectRatio: false, 
        },
        isShowDetail: false,
        isShowOVerview: true,
        isShowChart: false,
        isShowRender: false,
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
          }, 
          throughput: 0,
        }, 
        data: {
          LoadTime: [], 
          Throughput: [],
        },
        chartData: {
        labels: [],
        datasets: [
          {
            label: "Load Time",
            borderColor: "#4bcc96",
            borderWidth: 4,
            data: [],
            fill: false,
            pointBackgroundColor: "#4bcc96",
            pointRadius: 4, 
            pointHoverRadius: 8,
            pointHoverBorderColor: "#000"
          },
          {
            label: "Load Time",
            borderColor: "#53CCEC",
            borderWidth: 4,
            data: [],
            fill: false,
            pointBackgroundColor: "#53CCEC",
            pointRadius: 4, 
            pointHoverRadius: 8,
            pointHoverBorderColor: "#000"
          },

        ]
        },
        chartOptions: {
          maintainAspectRatio: false,
          responsive: true,
          tooltips: {
            backgroundColor: "#0066ff!important",
            titleFontColor: "#ffff",
            bodyFontColor: "#ffff",
            position: "nearest",
            mode: "nearest",
            intersect: 0,
            bodySpacing: 4,
            xPadding: 20,
          }
        },
      }
    },
    methods: {
      async methodMVCHTTP() {
        const requestBody = {
            // key: ["username", "password", "woocommerce-login-nonce", "_wp_http_referer", "login"],
            // value: ["Anh Dung", "leanhdung123()45", "065e01ef1e", "/my-account/", "Log in"]
            key: this.keyValuePairList.map(i => i.key),
            value: this.keyValuePairList.map(i => i.value)
        };
        const startTime = performance.now();
        this.$axios({
          url: `http://localhost:8080/api/v1/http-methods/post/mvc/?url=${this.urlValue}&threads=${this.threadsValue}`,
          data: requestBody,
          headers: {
            'accept': '*',  
            'content-type': 'application/json'
          },
          method: 'POST',
          onDownloadProgress: progressEvent => {
            const xhr = progressEvent?.target
            const dataString = xhr.responseText.replace(/data:/g, '');
            const lines = dataString.split('\n');
            const filteredArray = lines.filter(obj => Object.keys(obj).length > 0);
            const Arr = filteredArray.map(line => JSON.parse(line));
            // console.log(Arr)
            this.listHttps = Arr;
            this.isCheck = true;
            this.HandleChartRender();
            const endTime = performance.now();
            this.total.callApi = endTime - startTime
            this.HandleOverviewRender();
          }
        }).then(({ data }) => Promise.resolve(data));
      },
      async methodAPIHTTP() {
        const requestBody = {
            key: this.keyValuePairList.map(i => i.key),
            value: this.keyValuePairList.map(i => i.value)
        };
         const startTime = performance.now();
        this.$axios({
          url: `http://localhost:8080/api/v1/http-methods/post/api/?url=${this.urlValue}&threads=${this.threadsValue}`,
          data: requestBody,
          headers: {
            'accept': '*',  
            'content-type': 'application/json'
          },
          method: 'POST',
          onDownloadProgress: progressEvent => {
            const xhr = progressEvent?.target
            const dataString = xhr.responseText.replace(/data:/g, '');
            const lines = dataString.split('\n');
            const filteredArray = lines.filter(obj => Object.keys(obj).length > 0);
            const Arr = filteredArray.map(line => JSON.parse(line));
            // console.log(Arr)
            this.listHttps = Arr;
            this.isCheck = true;
            this.HandleChartRender();
            const endTime = performance.now();
            this.total.callApi = endTime - startTime
            this.HandleOverviewRender();

          }
        }).then(({ data }) => Promise.resolve(data));
      },
      startTest() {
        if(this.methodSelected === 'HttpMVC')
        {
          this.methodMVCHTTP();
        }else if(this.methodSelected === "HttpAPI")
        {
          this.methodAPIHTTP();
        }
        
    },
      SelectJSON(json) {
        this.selectedJson = json;
      },
      handleAddBody() {
        this.keyValuePairList.push({ key: "", value: "" });
      },
      handleRemoveBody(index) {
        if(index > 0)
        {
          this.keyValuePairList.splice(index, 1);
        }
      },
      handleDetail() {
      this.isShowDetail = true;
      this.isShowOVerview = false;
      this.isShowChart = false;
      this.isShowRender = false;
      },
      handleOverview() {
        this.isShowDetail = false;
        this.isShowOVerview = true;
        this.isShowChart = false;
        this.isShowRender = false;
      },
      handleChart() {
        this.isShowDetail = false;
        this.isShowOVerview = false;
        this.isShowChart = true;
        this.isShowRender = false;
      },
      handleRender() {
        this.isShowDetail = false;
        this.isShowOVerview = false;
        this.isShowChart = false;
        this.isShowRender = true;
      },
      HandleChartRender() {
      this.chartData.labels = []
      this.chartData.datasets[0].data = []
      
      this.listHttps.forEach((d) => {
        this.chartData.datasets[0].data.push( parseInt(d.load_time))
        this.chartData.datasets[1].data.push( parseInt(d.connect_time))
        this.chartData.labels.push(d.thread_name)
      })
      
      console.log(this.chartData.labels, "dong11")
      console.log(this.chartData.datasets[0].data, "dong12")
    },
    HandleOverviewRender() {
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
        this.total.connectTime.avg = parseFloat(initConnectTime / count).toFixed(2);
        this.total.LoadTime.avg = parseFloat(initLoadTime / count).toFixed(2);
        this.total.Latency.avg = parseFloat(initLatency / count).toFixed(2);
        this.total.connectTime.max = initConnectTimeMax
        this.total.connectTime.min = initConnectTimeMin 
        this.total.LoadTime.max = initLoadTimeMax
        this.total.LoadTime.min = initLoadTimeMin
        this.total.Latency.max = initLatencyMax
        this.total.Latency.min = initLatencyMin

        let timeFirst = new Date(this.listHttps[0]?.start_at)
        console.log(timeFirst, "timeFirst")
        let timeLast = new Date(this.listHttps.slice(-1)[0]?.start_at)
        console.log(timeLast, "timeLast")
        let loadTimeLast = parseInt(this.listHttps.slice(-1)[0].load_time)
        console.log(loadTimeLast,"loadTimeLast")
        let sumTime = ((timeLast-timeFirst) + loadTimeLast)/1000
        console.log(sumTime, "sumTime")
        
        this.total.throughput = this.threadsValue / sumTime;
        console.log(this.total.throughput, "test time1") 
        this.total.throughput = parseFloat(this.total.throughput).toFixed(2);
        // console.log(this.total.throughput, "test time") 

      }, 
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

      &__close {
        margin-top: 8px;
        font-weight: 500;
        cursor: pointer;
      }
  
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

    &__btn {
        button {
            height: 40px;
            display: flex;
            align-items: center;
            border: none;
            outline: none;
            column-gap: 4px;
            padding: 0 12px;
            border-radius: 8px;
            background-color: #0066ff;
            font-size: 16px;
            font-weight: 600;
            color: #ffff;
            cursor: pointer;

            svg {
                width: 20px;
                height: 20px;
            }
        }
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
  
        .col-2 {
          column-gap: 24px;
          width: 50%;
          max-height: 500px;
          overflow: auto;
  
  
          
          ul {
            list-style: none;         
              li {
                padding: 8px 0;
                border-bottom: 1px solid #9999;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 2;
                cursor: pointer;
                display: flex;
                justify-items: center;
                align-items: center;
                gap: 8px;
                font-size: 16px;
              }     
              
              li:hover {
                color: #407F3E;
                font-weight: 600;
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
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              width: 100%;
              gap: 10px;
              padding-left: 24px;
              
              
              p {
                text-align: center;
                background-color: #F4F4F4;
                padding: 12px 8px;
                font-size: 17px;
                font-weight: 500;
                line-height: 24px;
                color: #f75142;
                width: 48%;
                border-radius: 6px;
    
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
  
      &__btn {
        margin-bottom: 24px;
        
        button {
          font-size: 16px;
          font-weight: 600;
          color: #000;
          padding: 10px 18px;
          border-radius: 10px;
          border: 1px solid #53CCEC;
          outline: none;
          margin: 0 6px;
          background-color: #ffff;
          cursor: pointer;
          min-width: 106px;
          
        }
        button:hover {
          background-color: #53CCEC;
          color: #ffff;
        }
      }
  
      &__overview {
        display: flex;
        width: 100%;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
        align-items: center;
        justify-content: center;
        p {
          text-align: center;
          background-color: #F4F4F4;
          padding: 12px 8px;
          font-size: 17px;
          font-weight: 500;
          line-height: 24px;
          color: #f75142;
          width: 23%;
          border-radius: 6px;
  
          span {
            font-weight: 500;
            color: #000;
          }
        }
      }
  
      &__chart {
        
      }
  
      &__render {
        padding: 16px!important;
        iframe {
          width: 100%;
          height: 100vh;
          border: none;
        }
      }
    }
  }
  
  .active {
    background-color: #53CCEC!important;
    color: #ffff!important;
    border: none !important;
  }
  
  .container__global {
    border-radius: 10px;
    background-color: #fff;
    box-shadow: -1px 1px 44px -33px rgba(129,124,124,0.44);
    -webkit-box-shadow: -1px 1px 44px -33px rgba(129,124,124,0.44);
    -moz-box-shadow: -1px 1px 44px -33px rgba(129,124,124,0.44);
    padding: 24px;
  }
  
  .selected {
    color: #407F3E;
    font-weight: 600;
  
  }
  
  .line-chart {
    width: 100%;
    height: 50vh;
  }
  </style>