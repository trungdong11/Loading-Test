<template>
    <div>
        <div class="container">
            <div class="container__item btn ">
                <input v-model="urlValue" type="text" placeholder="Enter the url" />
                <select class="form-control" v-model="methodSelected">
                  <option selected value="HttpMVC">Use MVC</option>
                  <option value="HttpAPI">Use API</option>
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
        threadsValue: "",
        isCheck: false,
        selectedJson: null,
        methodSelected: 'HttpMVC',
        keyValuePairList: [{ key: "username", value: "Anh Dung" }],
      }
    },
    created() {
      
    },
    methods: {
      async methodMVCHTTP() {
        const requestBody = {
            // key: ["username", "password", "woocommerce-login-nonce", "_wp_http_referer", "login"],
            // value: ["Anh Dung", "leanhdung123()45", "065e01ef1e", "/my-account/", "Log in"]
            key: this.keyValuePairList.map(i => i.key),
            value: this.keyValuePairList.map(i => i.value)
        };
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
          }
        }).then(({ data }) => Promise.resolve(data));
      },
      async methodAPIHTTP() {
        const requestBody = {
            key: this.keyValuePairList.map(i => i.key),
            value: this.keyValuePairList.map(i => i.value)
        };
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