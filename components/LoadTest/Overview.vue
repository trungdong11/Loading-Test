<template>
    <div class="container">
        <div class="container__header bg-container">
            <div class="container__header__title">
                CONFIGURATION
            </div>
            <div class="container__header__body">
                <div class="container__header__body__list">
                    <div class="container__header__body__list__item">
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/person.svg" alt="">
                            <p>Virtual Users</p>
                        </div>
                        <span>{{ virtual_users }} VU</span>
                    </div>
                    <div class="container__header__body__list__item"
                        v-if="durations > 0"
                    >
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/clock.svg" alt="">
                            <p>Durations</p>
                        </div>
                        <span>{{durations}}</span>
                    </div>
                    <div class="container__header__body__list__item"
                        v-if="iterations > 0"
                    >
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/clock.svg" alt="">
                            <p>Iterations</p>
                        </div>
                        <span>{{iterations}}</span>
                    </div>
                </div>
                <div class="container__header__body__list">
                    <div class="container__header__body__list__item" v-if="getData[0].data === undefined">
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/server.svg" alt="">
                            <p>Servers</p>
                        </div>
                        <span>{{getData[0]?.server_software}}</span>
                    </div> 
                    <div class="container__header__body__list__item" v-if="getData[0].data !== undefined">
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/server.svg" alt="">
                            <p>Content type</p>
                        </div>
                        <span>{{getData[0]?.content_type}}</span>
                    </div>  
                    <div class="container__header__body__list__item">
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/clock.svg" alt="">
                            <p>Ramp Up Time</p>
                        </div>
                        <span>{{rampUp}} s</span>
                    </div>
                </div>
                <div class="container__header__body__list" v-if="getData[0].data === undefined">
                    <div class="container__header__body__list__item">
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/server-host.svg" alt="">
                            <p >Servers host</p>
                        </div>
                        <span>{{getData[0]?.server_host}}</span>
                    </div>
                    <div class="container__header__body__list__item">
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/server-post.svg" alt="">
                            <p>Server port</p>
                        </div>
                        <span>{{getData[0]?.server_port}}</span>
                    </div>
                </div>
                <div class="container__header__body__list" v-if="getData[0].data !== undefined">
                    <div class="container__header__body__list__item">
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/server-host.svg" alt="">
                            <p >Name Dbms</p>
                        </div>
                        <span>{{getData[0]?.name_dbms}}</span>
                    </div>
                    <div class="container__header__body__list__item">
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/server-post.svg" alt="">
                            <p>Version Dbms</p>
                        </div>
                        <span>{{getData[0]?.version_dbms}}</span>
                    </div>
                </div>
                <div class="container__header__body__list">
                    <div class="container__header__body__list__item">
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/start.svg" alt="">
                            <p>Start</p>
                        </div>
                        <span>{{render.startTime}}</span>
                    </div>
                    <div class="container__header__body__list__item">
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/end.svg" alt="">
                            <p>End</p>
                        </div>
                        <span>{{render.endTime}}</span>
                    </div>
                </div>
                <div class="container__header__body__list" v-if="getData[0].data === undefined">
                    <div class="container__header__body__list__item">
                        <div class="container__header__body__list__item__right">
                            <img src="~/assets/icons/start.svg" alt="">
                            <p>Response Code</p>
                        </div>
                        <div class="container__header__body__list__item__left">
                            <div v-if="check.responseTwo" class="bg-200"><span>200</span></div>
                            <div v-if="check.responseThree" class="bg-300"><span>300</span></div>
                            <div v-if="check.responseFour" class="bg-400"><span>400</span></div>
                            <div v-if="check.responseFive" class="bg-500"><span>500</span></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="container__first bg-container">
            <div class="container__first__item">
                <h3>Sample</h3>
                <div class="line"></div>
                <span class="sample">{{getData.length}} <span class="item-size">samples</span></span>
            </div>
            <div class="container__first__item">
                <h3>Avg.Load Time</h3>
                <div class="line"></div>
                <span class="avg">{{avg.responseTime}} <span class="item-size">ms</span></span>
            </div>
            <div class="container__first__item">
                <h3>90% Load Time</h3>
                <div class="line"></div>
                <span class="response-time">{{avg.responseNinety}} <span class="item-size">ms</span></span>
            </div>
            <div class="container__first__item">
                <h3>95% Load Time</h3>
                <div class="line"></div>
                <span class="response-time">{{avg.responseFive}} <span class="item-size">ms</span></span>
            </div>
            <div class="container__first__item">
                <h3>ThroughPut</h3>
                <div class="line"></div>
                <span class="throughput">{{avg.throughput}} <span class="item-size">request/s</span></span>
            </div>
            <div class="container__first__item" v-if="getData[0].data === undefined">
                <h3>Error</h3>
                <div class="line"></div>
                <span class="error">{{avg.errorNumber}} <span class="item-size">%</span></span>
            </div>
            <div class="container__first__item" v-if="getData[0].data !== undefined">
                <h3>Error</h3>
                <div class="line"></div>
                <span class="error">{{avg.errorPercentJDBC}} <span class="item-size">%</span></span>
            </div>
        </div>
        <div class="container__second bg-container">
            <dynamic-chart
                :chartData="chartData"
                :options="chartOptions"
                class="line-chart"
            />
        </div>
        <div class="container__second bg-container" v-if="rampUp > 0">
            <dynamic-chart
                :chartData="chartDataRamUP"
                :options="chartOptionsRamUp"
                class="line-chart"
            />
        </div>
    </div>
</template>

<script>
import { formatDate } from 'timeUtils'
import DynamicChart from '~/components/Commons/DynamicChart.vue';
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            virtual_users: 0, 
            urlValue: '',
            rampUp: 0,
            durations: 0,
            iterations: 0,
            render: {
                startTime: '',
                endTime: '',
            },
            check: {
                responseTwo: false,
                responseThree: false,
                responseFour: false,
                responseFive: false,
            },
            avg: {
                responseTime: 0,
                responseNinety: 0,
                responseFive: 0,
                errorNumber: 0,
                throughput: 0,
                errorPercentJDBC: 0,
            },
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: "Load Time",
                        borderColor: "#4bcc96",
                        borderWidth: 1,
                        data: [],
                        fill: false,
                        pointBackgroundColor: "#4bcc96",
                        pointRadius: 0, 
                        pointHoverRadius: 0,
                        pointHoverBorderColor: "#000"
                    },
                    {
                        label: "Connect time",
                        borderColor: "#FFCB77",
                        borderWidth: 1,
                        data: [],
                        fill: false,
                        pointBackgroundColor: "#FFCB77",
                        pointRadius: 0, 
                        pointHoverRadius: 0,
                        pointHoverBorderColor: "#000"
                    },
                    {
                        label: "Latency",
                        borderColor: "#FE6D73",
                        borderWidth: 1,
                        data: [],
                        fill: false,
                        pointBackgroundColor: "#FE6D73",
                        pointRadius: 0, 
                        pointHoverRadius: 0,
                        pointHoverBorderColor: "#000"
                    }
                ],
            },
            chartDataRamUP: {
                labels: [],
                datasets: [
                    {
                        label: "Virtual User",
                        borderColor: "#4bcc96",
                        borderWidth: 1,
                        data: [],
                        fill: false,
                        pointBackgroundColor: "#4bcc96",
                        pointRadius: 0, 
                        pointHoverRadius: 0,
                        pointHoverBorderColor: "#000",
                        yAxisID: 'y-axis-1'
                    },
                    {
                        label: "Load time",
                        borderColor: "#FFCB77",
                        borderWidth: 1,
                        data: [5, 5, 5, 5,5, 5, 5, 5],
                        fill: false,
                        pointBackgroundColor: "#FFCB77",
                        pointRadius: 0, 
                        pointHoverRadius: 0,
                        pointHoverBorderColor: "#000",
                        yAxisID: 'y-axis-1',
                    }
                ],
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
            chartOptionsRamUp: {
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
                },
                scales: {
                yAxes: [
                    {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      id: 'y-axis-1',
                      gridLines: {
                        display: false
                      },
                      labels: {
                        show: true
                      },
                      title: {
                        display: true,
                        text: 'VirtualUser'
                      }
                    },
                    {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      id: 'y-axis-2',
                      gridLines: {
                        display: false
                      },
                      labels: {
                        show: true
                      },
                      title: {
                        display: true,
                        text: 'VirtualUser'
                      }
                    }
                ]
            }
            },
            listVirtualUser: [],
            listTime: []
        };
    },
    components: {
        DynamicChart,
    },
    computed: {
        ...mapGetters({
            getData: 'loadtest/getData',
        }),
    },
    watch: {
        getData(newData, oldData) {
            if (newData.length > 0) {
            // console.log(this.getData, "dong dong")
            console.log(this.getData[0].data, "testst data")
            this.handleRender(this.getData)
            this.handleResponse(this.getData)
            this.handleChartRender(this.getData)
            this.handleErrorPercentJDBC(this.getData)
            this.handleChartRampUp(this.getData)
            this.countOccurrencesLoadTime(this.getData)
            }
        },
    },
    created() {
       this.virtual_users =  this.$route.query.virtual_users
       this.urlValue =  this.$route.query.url
       this.rampUp =  this.$route.query.ramp_up
       this.durations = this.$route.query.durations
       this.iterations = this.$route.query.iterations
    },
    methods: {
        
        handleRender(listResponses) {
            let count = 0
            let sumError = 0
            let sumReponseTime = 0;
            let listData = []
            
            listResponses.forEach((d) => {
                // if(d.load_time !== undefined) {
                    sumReponseTime += parseInt(d.load_time)
                    listData.push(parseInt(d.load_time))
                // }
                count++
                if (parseInt(d.response_code) >= 400 && parseInt(d.response_code) <= 600) {
                    sumError++;
                }
            })
            // console.log(count, "count")
            // console.log(listData, "listData")
            this.avg.responseTime =  parseInt(sumReponseTime / count)
            
            const start = new Date(parseInt(listResponses[0].start_at)) 
            const end = new Date(parseInt(listResponses.slice(-1)[0].start_at))

            this.render.startTime = formatDate(start,' #{F} #{j}, #{Y} at #{g}:#{i}:#{s}')
            this.render.endTime = formatDate(end,' #{F} #{j}, #{Y} at #{g}:#{i}:#{s}')
            // const listLoadTime = listData.sort((a, b) => parseInt(a.load_time) - parseInt(b.load_time));
            const listLoadTime = this.mergeSort(listData)
            // console.log(listLoadTime, "listLoadTime")

            const responseNinety = parseFloat(listResponses.length * 90 / 100).toFixed(0)
            // console.log(responseNinety, "ninety")
            const responseNinetyFive = parseFloat(listResponses.length * 95 / 100).toFixed(0)
            // console.log(responseNinetyFive,"nityfive")
            // console.log(responseNinety)
            this.avg.responseNinety = listLoadTime[responseNinety - 1]
            this.avg.responseFive = listLoadTime[responseNinetyFive - 1]
            
            console.log(sumError, "numbererror")
            this.avg.errorNumber = parseInt((sumError * 100) / listResponses.length)

            let timeFirst = listResponses[0].start_at
            // console.log(timeFirst)
            let timeLast = listResponses.slice(-1)[0].start_at
            // console.log(timeLast)
            let loadTimeLast = parseInt(listResponses.slice(-1)[0].load_time)
            // console.log(loadTimeLast)
            let sumTime = ((timeLast-timeFirst) + loadTimeLast)/1000
            // console.log(sumTime)
            
            this.avg.throughput = parseFloat((listResponses.length) / sumTime).toFixed(1);
            // console.log(this.avg.throughput, "test time") 
        },  
        handleResponse(listResponses) {
            listResponses.some((item) => {
                if(parseInt(item?.response_code) >= 200 && parseInt(item?.response_code) < 300) {
                    this.check.responseTwo = true
                }
                if(parseInt(item?.response_code) >= 300 && parseInt(item?.response_code) < 400) {
                    this.check.responseThree = true
                }
                if(parseInt(item?.response_code) >= 400 && parseInt(item?.response_code) < 500) {
                    this.check.responseFour = true
                }
                if(parseInt(item?.response_code) >= 500 && parseInt(item?.response_code) < 600) {
                    this.check.responseFive = true
                }
            })
        },
        handleChartRender(listResponses) {
            this.chartData.labels = []
            this.chartData.datasets[0].data = []
            this.chartData.datasets[1].data = []
            this.chartData.datasets[2].data = []    
            
            listResponses.forEach((d) => {
                if(d.load_time !== undefined) {
                    this.chartData.datasets[0].data.push( parseInt(d.load_time))
                    this.chartData.datasets[1].data.push(parseInt(d.connect_time))
                    this.chartData.datasets[2].data.push(parseInt(d.latency))
                    this.chartData.labels.push(d.thread_name)
                }
            })
            
            // console.log(this.chartData.labels, "dong11")
            // console.log(this.chartData.datasets[0].data, "dong12")
        },
        handleErrorPercentJDBC(listResponses) {
            let sum = 0
            if(listResponses[0].data !== undefined) {
                listResponses.forEach((d) => {
                    if(d.error_code !== '1') {
                        sum++
                    }
                })

                this.avg.errorPercentJDBC = parseInt((sum * this.getData.length) / 100)
            }
        },
        mergeSort(arr) {
            if (arr.length <= 1) {
                return arr;
            }

            var middle = Math.floor(arr.length / 2);
            var left = arr.slice(0, middle);
            var right = arr.slice(middle);

            left = this.mergeSort(left);
            right = this.mergeSort(right);

            return this.merge(left, right);
        },
        merge(left, right) {
            var result = [];
            var leftIndex = 0;
            var rightIndex = 0;

            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] < right[rightIndex]) {
                    result.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    result.push(right[rightIndex]);
                    rightIndex++;
                }
            }

            return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        },
        countOccurrences(arr) {
            const sortedArray = this.mergeSort(arr);
            const occurrences = {};
            const uniqueValues = [];
            const countArray = [];

            for (let i = 0; i < sortedArray.length; i++) {
                const currentNumber = sortedArray[i];

                if (!occurrences[currentNumber]) {
                    let count = 1;
                    while (sortedArray[i + 1] === currentNumber) {
                        count++;
                        i++;
                    }
                    occurrences[currentNumber] = count;

                    uniqueValues.push(currentNumber);
                    
                    countArray.push(count);
                }
            }
            
            this.listVirtualUser = uniqueValues
            this.listTime = countArray
          
        },
        countOccurrencesLoadTime(arr) {
            let data = new Map();
            let listLoadTime = []

            arr.forEach((d) => {
                if(d.load_time !== undefined) {
                    const key = formatDate((new Date(parseInt(d.start_at))), '#{g}:#{i}:#{s}');
                
                    if (!data.has(key)) {
                        data.set(key, [parseInt(d.load_time)]);
                    } else {
                        let array = data.get(key);
                        array.push(parseInt(d.load_time));
                        data.set(key, array);
                    }
                }
                
            });

            console.log(data, "map");
            this.chartDataRamUP.datasets[1].data = []
            data.forEach((value, key) => {
                let sum = value.reduce((acc, cur) => acc + cur, 0);
                let average = sum / value.length
                console.log(`Key: ${key}, Sum: ${average}`);
                listLoadTime.push(average)
                // this.chartDataRamUP.datasets[1].data.push(average)

            });
            this.chartDataRamUP.datasets[1].data = listLoadTime
            console.log(this.chartDataRamUP.datasets[1].data, "chart rampup")

        },
        handleChartRampUp(listResponses) {
            let listStart = []
            listResponses.forEach((d) => {
                const resultTime = new Date(parseInt(d.start_at))
                listStart.push(formatDate(resultTime,'#{g}:#{i}:#{s}'))
            })

            // console.log(listStart, "listStart")
            this.countOccurrences(listStart)
            this.chartDataRamUP.labels = this.listVirtualUser
            this.chartDataRamUP.datasets[0].data = this.listTime
            
            console.log(this.listVirtualUser, "listVirtual")
            console.log(this.listTime, "listTime")

            // this.countOccurrences(listLoadTime)
            
        },
        
    }
}
</script>

<style scoped lang="scss">
.container {
    margin-top: 24px;

    &__header {
        background-color: #fff;
        border-radius: 8px;
        width: 100%;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 24px;

        &__title {
            font-size: 18px;
            font-weight: 700;
            color: var(--neutral-500);
            white-space: 0.2;
        }

        &__body {
            display: flex;
            align-items: center;
            gap: 26px;
            width: 100%;
            

            &__list {
                display: flex;
                flex-direction: column;
                gap: 16px;
                width: 100%;

                &__item {
                   display: flex;
                   align-items: center;
                   justify-content: space-between;
                    &__right {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        gap: 4px;
                        
                        img {
                            width: 14px;
                            height: 14px;
                        }
                        p {
                            font-size: 14px;
                            font-weight: 500;
                            color: var(--neutral-600);
                        }
                    }
                    &__left {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        
                        div {
                            padding: 8px 10px; 
                            border-radius: 4px;
                            
                            span {
                                font-size: 16px;
                                font-weight: 700;
                                color: #ffff;
                            }
                        }
                        .bg-200 {
                            background-color: #407F3E;
                        }   
                        .bg-300 {
                            background-color: #3376BC;
                        }
                        .bg-400 {
                            background-color: #FB6376;
                        }
                        .bg-500 {
                            background-color: #FF0035;
                        }
                    }
                    span {
                        font-size: 14px;
                        font-weight: 700;
                        color: var(--neutral-500)
                    }
                }
            }
        }
    }

    &__first {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 12px;
        margin-top: 16px;
        
        &__item {
            width: 100%;
            border-radius: 4px;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            background-color: #fff;
            padding: 14px 16px;
            
            h3 {
                font-size: 18px;
                font-weight: 700;
                color: var(--neutral-500);
            }
            .line {
                width: 100%;
                border: 1px solid #cccc;
                margin: 8px 0;
            }
            span {
                font-size: 30px;
                font-weight: 900;
                line-height: 24px;
                font-family: ag_stencilag_stencil;
                .item-size {
                    font-size: 16px;
                    font-weight: 500;
                    background: var(--neutral-500);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
            .sample {
                background: linear-gradient(#6156fc,#6056fc);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .avg {
                background: -webkit-linear-gradient(#ffa601,#ff7301);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .response-time {
                background: -webkit-linear-gradient(#555,#444);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .throughput {
                background: -webkit-linear-gradient(#11d924,#24b619);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .error {
                background: -webkit-linear-gradient(#ff4f19,#ed1c17);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }

    &__second {
        margin-top: 16px;
        padding: 24px;
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        
        .line-chart {
            width: 100%;
            height: 50vh;
        }
    }
    .bg-container {
        border-radius: 8px;
    }


    
}

</style>