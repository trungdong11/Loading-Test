<template>
    <div class="container">
        <div class="container__header">
            <h2>DETAIL REPORT</h2>
            <p>All labels requests executed during the test run.</p>
        </div>
        <div class="container__body">
            <div class="col-2" >
                <ul> 
                  <li
                    v-for="(listData, index) in listDatas" :key="index"
                    @click="SelectJSON(listData)" 
                    :class="{'selected' : selectedJson === listData}">
                    <svg v-if="(parseInt(listData?.response_code) >= 200 && parseInt(listData?.response_code) < 300) || (getData[0].data !== undefined)" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#407F3E"
                       d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/>
                    </svg>
                    <svg  v-else xmlns="http://www.w3.org/2000/svg"
                     width="22" height="22" viewBox="0 0 24 24">
                     <path fill="#D24150" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/>
                    </svg>
                    {{listData?.thread_name}}
                  </li> 
                </ul> 
            </div>
            <div class="col-2" >
            <div class="col__item" v-if="getData[0].data === undefined">
                <div class="col__item__detail" v-if="selectedJson">
                    <p><span>Server Software:  </span>{{ selectedJson.server_software }}</p>
                    <p><span>Server Host:  </span>{{ selectedJson.server_host }}</p>
                    <p><span>Server Post:  </span>{{ selectedJson.server_port }}</p>
                    <p><span>Keep Alive:  </span>{{ selectedJson.keep_alive }}</p>
                    <p><span>Data Sent:  </span>{{ selectedJson.data_sent }} byte</p>
                    <p><span>Content Type:  </span>{{ selectedJson.content_type }}</p>
                    <p><span>Thread Name:  </span>{{ selectedJson.thread_name }}</p>
                    <p><span>Iterations:  </span>{{ selectedJson.iterations }}</p>
                    <p><span>Start at:  </span>{{ new Date(selectedJson?.start_at) }}</p>
                    <p><span>Load time: </span>{{ selectedJson.load_time }} ms</p>
                    <p><span>Connect time:  </span>{{ selectedJson.connect_time }} ms</p>
                    <p><span>Latency:  </span>{{ selectedJson.latency }} ms</p>
                    <p><span>Data Received:  </span>{{ selectedJson.data_received }} ms</p>
                    <p><span>Response code:  </span>{{ selectedJson.response_code }}</p>
                    <p><span>Response message:  </span>{{ selectedJson.response_message }}</p>
                    <p><span>Request methods:  </span>{{ selectedJson.request_method }}</p>
                </div>
                
            </div>
            <div class="col__item" v-if="getData[0].data !== undefined">
              <div class="col__item__detail" v-if="selectedJson">
                  <p><span>Name Dbms:  </span>{{ selectedJson.name_dbms }}</p>
                  <p><span>Version Dbms:  </span>{{ selectedJson.version_dbms }}</p>
                  <p><span>Data Sent:  </span>{{ selectedJson.data_sent }} byte</p>
                  <p><span>Content Type:  </span>{{ selectedJson.content_type }}</p>
                  <p><span>Thread Name:  </span>{{ selectedJson.thread_name }}</p>
                  <p><span>Iterations:  </span>{{ selectedJson.iterations }}</p>
                  <p><span>Start at:  </span>{{ new Date(selectedJson?.start_at) }}</p>
                  <p><span>Load time: </span>{{ selectedJson.load_time }} ms</p>
                  <p><span>Connect time:  </span>{{ selectedJson.connect_time }} ms</p>
                  <p><span>Latency:  </span>{{ selectedJson.latency }} ms</p>
                  <p><span>Data Received:  </span>{{ selectedJson.data_received }} ms</p>
                  <p><span>Error code:  </span>{{ selectedJson.error_code }}</p>
              </div>
              
          </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { formatDate } from 'timeUtils'

export default {
    data() {
        return {
            selectedJson: '',
            listDatas: [], 
            startAt: '', 
        }
    },
    filters: {
      timeCreatedAt(value) {
        return formatDate((new Date(value)),' #{F} #{j}, #{Y} at #{g}:#{i}:#{s}')
      },
    },
    computed: {
        ...mapGetters({
            getData: 'loadtest/getData',
        }),
    },
    watch: {
        getData(newData, oldData) {
            if (newData.length > 0) {
                console.log(this.getData, "dong dong11")
                this.listDatas = this.getData
            }
        },
    },
    methods: {
        SelectJSON(json) {  
            this.selectedJson = json;
        },
        handleStart() {
          this.startAt = formatDate((new Date(this.selectedJson.start_at)),' #{F} #{j}, #{Y} at #{g}:#{i}:#{s}')
          
        }
    }
}
</script>

<style lang="scss" scoped> 
.container {
    background-color: #fff;
    margin-top: 24px;
    border-radius: 8px;
    padding: 24px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    &__header {
        display: flex;
        flex-direction: column;
        gap: 8px;

        h2 {
            font-size: 18px;
            color: var(--neutral-400);
            font-weight: 700;
        }
        p {
            font-size: 18px;
            font-weight: 500;
            color: var(--neutral-400);
        }
    }

    &__body {
        display: flex;
        margin-top: 24px;
        padding: 12px;
        max-height: 440px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border-radius: 8px;

        .col-2 {
          column-gap: 24px;
          width: 50%;
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
              margin: 12px 0;
              
              p {
                text-align: center;
                background-color: #fff;
                padding: 12px 8px;
                font-size: 17px;
                font-weight: 500;
                line-height: 24px;
                color: #f75142;
                width: 48%;
                border-radius: 6px;
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                
    
                span {
                  font-weight: 500;
                  color: #000;
                }
              }
            }
          }
  
          
        }
  
        .col-2::-webkit-scrollbar-thumb { 
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
.selected {
    color: #407F3E;
    font-weight: 600;
}
  
</style>