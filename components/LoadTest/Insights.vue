<template>
    <div class="container">
        <div class="container__first">
            <div class="container__first__item">
                <h3>Sample</h3>
                <div class="line"></div>
                <div class="container__first__item__body">
                    <span class="sample">{{ getData.length }} <span class="item-size">samples</span></span>                </div>
            </div>
            <div class="container__first__item">
                <div class="container__first__item__title">
                    <h3>Avg.Load Time (mean)</h3>
                    <p>Min (ms) - Max (ms)</p>
                </div>
                <div class="line"></div>
                <div class="container__first__item__body">
                    <span class="avg">{{ avg.responseTime }} <span class="item-size">ms</span></span>
                    <div class="container__first__item__body__right">
                        <span class="percenlite">{{ avg.minResponseTime }} <span class="item-size">ms</span> </span> 
                        <span class="percenlite">{{ avg.maxResponseTime }} <span class="item-size">ms</span></span>
                    </div>
                </div>
            </div>
            <div class="container__first__item">    
                <h3>Through Put</h3>
                <div class="line"></div>
                <span class="throughput">{{ avg.throughput }} <span class="item-size">request/s</span></span>
            </div>
            <div class="container__first__item" v-if="getData[0].data === undefined">
                <div class="container__first__item__title">
                    <h3>Error</h3>
                    <p>error %</p>
                </div>
                <div class="line"></div>
                <div class="container__first__item__body">
                    <span class="error">{{avg.errorNumber}} <span class="item-size">errors</span></span>
                    <span class="error">{{avg.errorPercent}} <span class="item-size">%</span></span>
                </div>
            </div>
            <div class="container__first__item" v-if="getData[0].data !== undefined">
                <div class="container__first__item__title">
                    <h3>Error</h3>
                    <p>error %</p>
                </div>
                <div class="line"></div>
                <div class="container__first__item__body">
                    <span class="error">{{avg.errorPercentJDBC}} <span class="item-size">errors</span></span>
                    <span class="error">{{avg.errorNumberJDBC}} <span class="item-size">%</span></span>
                </div>
            </div>
        </div>
        <div class="container__first second">
            <div class="container__first__item">
                <div class="container__first__item__title">
                    <h3>Percentile 50% (median)</h3>
                    <p>Percentile 90%</p>
                </div>
                <div class="line"></div>
                <div class="container__first__item__body">
                    <span class="percenlite">{{ percenlite.FiveTy }} <span class="item-size">ms</span></span>
                    <span class="percenlite">{{ percenlite.NineTy }} <span class="item-size">ms</span></span>
                </div>
            </div>
            <div class="container__first__item">
                <div class="container__first__item__title">
                    <h3>Percentile 95%</h3>
                    <p>Percentile 99%</p>
                </div>
                <div class="line"></div>
                <div class="container__first__item__body">
                    <span class="percenlite">{{ percenlite.NineTyFive }} <span class="item-size">ms</span></span>
                    <span class="percenlite">{{percenlite.NineTyNine}} <span class="item-size">ms</span></span>
                </div>
            </div>
            <div class="container__first__item">
                <div class="container__first__item__title">
                    <h3>Sent Bytes</h3>
                    <p>Received Bytes</p>   
                </div>
                <div class="line"></div>
                <div class="container__first__item__body">
                    <span class="percenlite">{{ total.sentData }} <span class="item-size">Bytes</span></span>
                    <span class="percenlite">{{total.receiveData}} <span class="item-size">Bytes</span></span>
                </div>
            </div>
            <div class="container__first__item">
                <h3>Standard Deviation</h3>
                <div class="line"></div>
                <div class="container__first__item__body">
                    <span class="percenlite">{{ total.standard }} <span class="item-size"></span></span>
                </div>
            </div>
        </div> 
        <div class="container__second" v-if="getData[0].data === undefined">
            <div class="container__second__first bg-second">
                <h3>Response Codes</h3>
                <div class="line"></div>
                <div class="container__second__first__content mt-8">
                    <div class="container__second__first__content__item">
                        <img src="~/assets/icons/check.svg" alt="">
                        <span>Success 2xx</span>
                        <div class="question">
                            <img src="~/assets/icons/question.svg" alt="">
                        </div>
                    </div>
                    <span>{{count.twoXX}}</span>
                </div>
                <div class="line-item"></div>
                <div class="container__second__first__content">
                    <div class="container__second__first__content__item">
                        <img src="~/assets/icons/right-arrow.svg" alt="">
                        <span>Redirects 3xx</span>
                        <div class="question">
                            <img src="~/assets/icons/question.svg" alt="">
                        </div>
                    </div>
                    <span>{{count.threeXX}}</span>
                </div>
                <div class="line-item"></div>
                <div class="container__second__first__content">
                    <div class="container__second__first__content__item">
                        <img src="~/assets/icons/delete.svg" alt="">
                        <span>Client Errors 4xx</span>
                        <div class="question">
                            <img src="~/assets/icons/question.svg" alt="">
                        </div>
                    </div>
                    <span>{{count.fourXX}}</span>
                </div>
                <div class="line-item"></div>
                <div class="container__second__first__content">
                    <div class="container__second__first__content__item">
                        <img src="~/assets/icons/delete.svg" alt="">
                        <span>Server Errors 5xx</span>
                        <div class="question">
                            <img src="~/assets/icons/question.svg" alt="">
                        </div>
                    </div>
                    <span>{{count.fiveXX}}</span>
                </div>
                <div class="line-item"></div>
                <div class="container__second__first__content">
                    <div class="container__second__first__content__item">
                        <img src="~/assets/icons/alert.svg" alt="">
                        <span>Orther</span>
                        <div class="question">
                            <img src="~/assets/icons/question.svg" alt="">
                        </div>
                    </div>
                    <span>{{count.otherXX}}</span>
                </div>
            </div>
            <div class="container__second__second bg-second">
                <PolarAreaChart 
                    :chartData="chartData"
                    :options="{}"
                    class="line-chart"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PolarAreaChart from '~/components/Commons/PolarAreaChart.vue';
export default {
    data() {
        return {
            avg: {
                responseTime: 0,
                minResponseTime: 0,
                maxResponseTime: 0,
                errorNumber: 0,
                errorPercent: 0,
                throughput: 0,
                errorPercentJDBC: 0,
                errorNumberJDBC: 0
            },
            percenlite: {
                FiveTy: 0, 
                NineTyNine: 0,
                NineTy: 0,
                NineTyFive: 0,
            },
            total: {
                sentData: 0,
                receiveData: 0,
                standard: 0,
            },
            count: {
                twoXX: 0,
                threeXX: 0,
                fourXX: 0,
                fiveXX: 0,
                otherXX: 0,
            },
            chartData: {
                labels: [
                    '2XX',
                    '3XX',
                    '4XX',
                    '5XX',
                    'Other',
                ],
                datasets: [
                    {
                        label: "Response Code",
                        data: [],
                        backgroundColor: [
                        '#407F3E',
                        '#3376BC',
                        '#FB6376',
                        '#FF0035',
                        'rgb(201, 203, 207)'
                        ]
                    },
                    
                ],
            },
            listRender: [],
        };
    },
    components: {
        PolarAreaChart,
    },
    computed: {
        ...mapGetters({
            getData: 'loadtest/getData',
        }),
    },
    watch: {
        getData(newData, oldData) {
            if (newData.length > 0) {
                console.log(this.getData, "dong dong")
                this.handleRender(this.getData)
                this.handleErrorJDBC(this.getData)
            }
        },
    },
    methods: {
        handleRender(listResponses) {
            let count = 0
            let sumError = 0
            let sumReponseTime = 0;
            let listData = []
            let initLoadTimeMin = Infinity;
            let initLoadTimeMax = 0;
            let totalSentData = 0
            let totalReceiveData = 0
            let totalStandard = 0
            let countTwoXX = 0
            let countThreeXX = 0
            let countFourXX = 0
            let countFiveXX = 0
            

            listResponses.forEach((d) => {
                count++
                sumReponseTime += parseInt(d.load_time) 
                listData.push(parseInt(d.load_time))

                if(parseInt(d.load_time) > initLoadTimeMax)
                {
                    this.avg.maxResponseTime = parseInt(d.load_time) 
                }
                if(parseInt() < initLoadTimeMin) 
                {
                    this.avg.minResponseTime = parseInt(d.load_time)
                }

                if (parseInt(d.response_code) >= 400 && parseInt(d.response_code) < 600) {
                    sumError++;
                }
                
                if( parseInt(d.response_code) >= 200 && parseInt(d.response_code) < 300) {
                    countTwoXX++
                }
                if(parseInt(d.response_code) >= 300 && parseInt(d.response_code) < 400) {
                    countThreeXX++
                }
                if(parseInt(d.response_code) >= 400 && parseInt(d.response_code) < 500) {
                    countFourXX++
                }
                if(parseInt(d.response_code) >= 500 && parseInt(d.response_code) < 600) {
                    countFiveXX++
                }

                totalSentData += parseInt(d.data_sent)
                totalReceiveData += parseInt(d.data_received)

                totalStandard += Math.abs(this.avg.responseTime - parseInt(d.load_time))
            })

            this.count.twoXX = countTwoXX
            this.count.threeXX = countThreeXX
            this.count.fourXX = countFourXX
            this.count.fiveXX = countFiveXX
            this.count.otherXX = listResponses.length - (countTwoXX + countThreeXX + countFourXX + countFiveXX)

            this.total.sentData = totalSentData
            this.total.receiveData = totalReceiveData

            this.avg.responseTime = parseInt(sumReponseTime / count)

            this.total.standard = parseInt(totalStandard / listResponses.length)

            let timeFirst = new Date(listResponses[0].start_at)
            // console.log(timeFirst)
            let timeLast = new Date(listResponses.slice(-1)[0].start_at)
            // console.log(timeLast)
            let loadTimeLast = parseInt(listResponses.slice(-1)[0].load_time)
            // console.log(loadTimeLast)
            let sumTime = ((timeLast-timeFirst) + loadTimeLast)/1000
            // console.log(sumTime)
            
            this.avg.throughput = parseFloat((listResponses.length) / sumTime).toFixed(1);
            // console.log(this.avg.throughput, "test time")

            // console.log(sumError, "numbererror")
            this.avg.errorNumber = sumError
            this.avg.errorPercent = parseInt((sumError * 100) / listResponses.length)


            // const listLoadTime = listData.sort((a, b) => parseInt(a.load_time) - parseInt(b.load_time));
            const listLoadTime = this.mergeSort(listData)
            // console.log(listLoadTime)
            const responseNinety = parseInt(listResponses.length * 90 / 100)
            const responseNinetyFive = parseInt(listResponses.length * 95 / 100)
            const responseFiveTy = parseInt(listResponses.length * 50 / 100)
            const responseNineTyNine = parseInt(listResponses.length * 99 / 100)
            // console.log(responseNinety)
            this.percenlite.NineTy = listLoadTime[responseNinety - 1]
            this.percenlite.NineTyFive = listLoadTime[responseNinetyFive -1 ]
            this.percenlite.FiveTy = listLoadTime[responseFiveTy - 1]
            this.percenlite.NineTyNine = listLoadTime[responseNineTyNine - 1]
            
            this.handleChart()
        },
        handleChart() {
            this.chartData.datasets[0].data = []
            this.chartData.datasets[0].data.push(this.count.twoXX, this.count.threeXX, this.count.fourXX, this.count.fiveXX, this.count.otherXX)
        },
        handleErrorJDBC(listResponses) {
            let sum = 0
            if(this.getData[0].data !== undefined) {
                listResponses.forEach((d) => {
                    if(d.error_code !== '1') {
                        sum++
                    }
                })

                this.avg.errorNumberJDBC = sum
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
        }
    },
}
</script>

<style scoped lang="scss">
    .container {
        margin-top: 24px;

        &__first {
            display: flex;
            align-items: center;
            gap: 16px;

            &__item {
                border-radius: 8px;
                background-color: #fff;
                padding: 16px;
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                width: 100%;  
                
                &__title {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    p{
                        font-size: 12px;
                        color: var(--neutral-400);
                        font-weight: 400;
                        
                    }
                }

                &__body {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    &__right {
                        display: flex;
                        gap: 12px;
                    }
                }

                h3 {
                    font-size: 14px;
                    font-weight: 700;
                    color: var(--neutral-400);
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
                .percenlite {
                    background: -webkit-linear-gradient(#555,#444);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
        }
        .second {
            margin-top: 12px;
        }
        &__second {
            margin-top: 24px;
            display: flex;
            gap: 16px;
            width: 100%;

            &__first {
                width: 30%;
                h3 {
                    font-size: 20px;
                    color: var(--neutral-600);
                    font-weight: 700;
                }

                &__content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    
                    &__item {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        
                        img {
                            width: 18px;
                            height: 18px;
                        }
                        
                        span {
                            margin-left: -8px;
                            font-size: 18px;
                            color: var(--neutral-400);
                            font-weight: 500;
                        }
                        .question {
                            width: 16px;
                            height: 16px;
                            border-radius: 10000px;
                            display: flex;
                            align-items: center;
                            text-align: center;
                            justify-content: center;
                            background-color: #999;

                            img {
                                width: 10px;
                                height: 10px;
                            }
                        }

                        .question:hover {
                            cursor: pointer;
                            background-color: #fff;
                            border: 1px solid #999;
                        }
                    }

                    span {
                        font-size: 18px;
                        color: var(--neutral-400);
                        font-weight: 700;
                    }
                }
            }
            &__second {
                width: 70%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .bg-second {
            background-color: #fff;
            padding: 24px;
            border-radius: 8px;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        }   
        .line {
            border: 1px solid #ccc;
            margin: 8px 0;
        }
        .line-item {
            border-top: 1px solid #ccc;
            margin: 16px 0;
        }
        .mt-8 {
            margin-top: 24px;
        }
    }
    .line-chart {
        width: 500px;
        height: 500px;
    } 
</style>