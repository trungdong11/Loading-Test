<template>
    <div>
        <div class="container">
            <div class="container__item btn ">
                <div class="container__item__input">
                  <input
                    v-model="urlDatabase"
                    type="text" 
                    placeholder="Enter the databaseUrl"
                    :class="{'error-border' : isInputEmpty(urlDatabase)}"
                  />
                  <p class="error" v-if="isInputEmpty(urlDatabase)">The field is required</p>
                </div>
                <button @click="getResponseHTTP">Start test</button>
            </div>
            <div class="container__item input">
              <!-- <label for="">Thread quantity</label> -->
              <div class="input">
                <div class="item">
                  <input v-model="jdbcDriverClass" type="text" placeholder="Enter the jdbcDriverClass" />
                  <p class="error" v-if="isInputEmpty(jdbcDriverClass)">The field is required</p>
                </div>
                <div class="item">
                  <input v-model="username" type="text" placeholder="Enter the Username" /> 
                  <p class="error" v-if="isInputEmpty(username)">The field is required</p>
                </div>
                <div class="item">
                  <input v-model="password" type="text" placeholder="Enter the password" />
                  <p class="error" v-if="isInputEmpty(password)">The field is required</p>
                </div>
              </div>

              <div class="input">
                <div class="item">
                  <input v-model="sqlStatement" type="text" placeholder="Enter the sqlStatement" />  
                  <p class="error" v-if="isInputEmpty(sqlStatement)">The field is required</p>
                </div>
                <div class="item">
                  <input v-model="threadsValue" type="text" placeholder="Enter the thread quantity" />
                  <p class="error" v-if="isInputEmpty(threadsValue)">The field is required</p>
                </div>
                <div class="item">
                  <input v-model="iterationValue" type="text" placeholder="Enter the iteration" />  
                  <p class="error" v-if="isInputEmpty(iterationValue)">The field is required</p>
                </div>
              </div>
              
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
                    <a @click="handleOverview" :class="{'active': isShowOVerview === true}">Data response</a>
                  </div>
                  <div class="col__item" v-if="isShowDetail">
                    <div class="col__item__detail" v-if="selectedJson?.response_code === '200'">
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
                    </div>
                    <div v-else-if="selectedJson?.response_code !== '200'" class="col__item">
                      <p><span>Thread Name: </span>{{ selectedJson.thread_name }}</p>
                      <p><span>Iterations: </span>{{ selectedJson.iterations }}</p>
                      <p><span>Response Message: </span>{{ selectedJson.response_message }}</p>
                      <p><span>Response Body: </span>{{ selectedJson.response_body }}</p>
                    </div>
                  </div>
  
                  <div class="col__item" v-if="isShowOVerview" >
                      <div class="col__item__detail">
                      <p>{{ dataResponse }}</p>
                      </div>
                      
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
        urlDatabase: "jdbc:mysql://103.195.236.45:3306/wordpress",
        jdbcDriverClass: "com.mysql.cj.jdbc.Driver",
        username: "TrungHuy",
        password: "TrungHuy123()",
        sqlStatement: "SELECT * FROM wordpress.wp_users;",
        iterationValue: "20",
        threadsValue: "1",
        isCheck: false,
        selectedJson: null,
        isShowDetail: false,
        isShowOVerview: true,
        dataResponse: "",
         
      }
    },
    created() {
      // this.getResponseHTTP();
    },
    methods: {
      async getResponseHTTP() {
        this.isInputEmpty();
        this.dataResponse = ''
        this.selectedJson = ''  
        this.$axios({
          url: `http://localhost:8080/api/v1/jdbc-request/?databaseUrl=${this.urlDatabase}&jdbcDriverClass=${this.jdbcDriverClass}&username=${this.username}&password=${this.password}&sqlStatement=${this.sqlStatement}&threads=${this.threadsValue}&iterations=${this.iterationValue}`,
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
            console.log(xhr, "testsssss")
            const dataString = xhr.responseText.replace(/data:/g, '');
            const lines = dataString.split('\n');
            const filteredArray = lines.filter(obj => Object.keys(obj).length > 0);
            const Arr = filteredArray.map(line => JSON.parse(line));
            console.log(Arr)
            this.listHttps = Arr;
            this.isCheck = true;
            this.DisplayData();
          }
        }).then(({ data }) => Promise.resolve(data));
      },
      handleDetail() {
      this.isShowDetail = true;
      this.isShowOVerview = false;
      },
      handleOverview() {
        this.isShowDetail = false;
        this.isShowOVerview = true;
      },
      DisplayData() {
        this.listHttps.forEach((d) => {
          // this.dataResponse = d.data
          this.dataResponse = JSON.stringify(d.data)
        })
      },
      SelectJSON(json) {  
      this.selectedJson = json;
      },
      isInputEmpty(value) {
        return !value.trim();
      }
      
  }
  }
  </script>
  <style lang="scss" scoped>
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

      &__input {
        width: 100%;
      }
    }
  
    &__item.btn {
      display: flex;
      column-gap: 12px;
      width: 100%;
      margin-bottom: 24px;
    }

    &__item.input {
      display: flex;
      flex-direction: column!important;

      .input {
        display: flex;
        margin-bottom: 24px;
        column-gap: 12px;
        
        .item {
          width: 100%;
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

  .error {
    color: red;
    font-size: 15px;
    line-height: 18px;
    font-weight: 500;
    margin-top: 4px;
    margin-bottom: -18px;
  }

  .error-border {
    border: 1px solid red!important;;
  }
  </style>