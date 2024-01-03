<template>
    <div class="container">
        <div class="container__header">
            <h2>STATS REPORT</h2>
            <p>All labels requests executed during the test run.</p>
        </div>
        <div class="container__body">
            <table>
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Samples</th>
                        <th>Response Time (ms)</th>
                        <th>Througt Put</th>
                        <th>Min Connect Time (ms)</th>
                        <th>Max Connect Time (ms)</th>
                        <th>Connect Time (ms) </th>
                        <th>Min Latency (ms)</th>
                        <th>Max Latency (ms)</th>
                        <th>Latency (ms)</th>
                        <th>Total Errors</th>
                        <th>Errors %</th>
                        <th>Sent Bytes</th>
                        <th>Received Bytes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{urlValue}}</td>
                        <td>{{virtual_users}}</td>
                        <td>{{avg.responseTime}}</td>
                        <td>{{avg.throughput}}</td>
                        <td>{{sum.minConnectTime}}</td>
                        <td>{{sum.maxConnectTime}}</td>
                        <td>{{avg.connectTime}}</td>
                        <td>{{sum.minLatency}}</td>
                        <td>{{sum.maxLatency}}</td>
                        <td>{{avg.latency}}</td>
                        <td v-if="getData[0].data === undefined">{{avg.errorNumber}}</td>
                        <td v-if="getData[0].data !== undefined">{{avg.errorNumberJDBC}}</td>
                        <td v-if="getData[0].data === undefined">{{avg.errorPercent}}</td>
                        <td v-if="getData[0].data !== undefined">{{avg.errorPercentJDBC}}</td>
                        <td>{{total.sentData}}</td>
                        <td>{{total.receiveData}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            listDatas: [],
            virtual_users: 0, 
            urlValue: '',
            avg: {
                responseTime: 0,
                responseNinety: 0,
                responseFive: 0,
                errorNumber: 0,
                errorPercent: 0,
                errorNumberJDBC: 0,
                errorPercentJDBC: 0,
                throughput: 0,
                latency: 0,
                connectTime: 0,
            }, 
            sum: {
                minConnectTime: 0,
                maxConnectTime: 0,
                minLatency: 0,
                maxLatency: 0,
            },
            total: {
                sentData: 0,
                receiveData: 0,
            },
        }
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
                this.handleRender(this.getData)
            }
        },
    },
    created() {
        this.virtual_users =  this.$route.query.virtual_users
        this.urlValue =  this.$route.query.url
        console.log(this.getData, "testst")
    },
    methods: {
        handleRender(listResponses) {
            let count = 0
            let sumError = 0
            let sumReponseTime = 0;
            let listData = []
            let listDataConnection = []
            let listDataLatency = []
            let sumConnectTime = 0
            let sumLatency = 0
            let totalSentData = 0
            let totalReceiveData = 0
            
            listResponses.forEach((d) => {
                console.log(d.response_code, "code")
                count++
                sumReponseTime += parseInt(d.load_time)
                sumConnectTime += parseInt(d.connect_time)
                sumLatency += parseInt(d.latency)
                listData.push(parseInt(d.load_time))
                listDataConnection.push(parseInt(d.connect_time))
                listDataLatency.push(parseInt(d.latency))

                if (parseInt(d.response_code) >= 400 && parseInt(d.response_code) < 600) {
                    sumError++;
                }

                totalSentData += parseInt(d.data_sent)
                totalReceiveData += parseInt(d.data_received)
            })

            const listConnection = this.mergeSort(listDataConnection)
            const listLatency = this.mergeSort(listDataLatency)

            this.sum.minConnectTime = listConnection[0]
            this.sum.maxConnectTime = listConnection.slice(-1)[0]

            this.sum.minLatency = listLatency[0]
            this.sum.maxLatency = listLatency.slice(-1)[0]

            this.total.sentData = totalSentData
            this.total.receiveData = totalReceiveData

            this.avg.errorNumber = sumError
            this.avg.errorPercent = parseInt((sumError * 100) / listResponses.length)

            this.avg.responseTime =  parseInt(sumReponseTime / count)
            this.avg.connectTime =  parseInt(sumConnectTime / count)
            this.avg.latency =  parseInt(sumLatency / count)
            

            let timeFirst = listResponses[0].start_at
            console.log(timeFirst)
            let timeLast = listResponses.slice(-1)[0].start_at
            console.log(timeLast)
            let loadTimeLast = parseInt(listResponses.slice(-1)[0].load_time)
            console.log(loadTimeLast)
            let sumTime = ((timeLast-timeFirst) + loadTimeLast)/1000
            console.log(sumTime)
            
            this.avg.throughput = parseFloat((listResponses.length) / sumTime).toFixed(1);
            console.log(this.avg.throughput, "test time") 
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
        margin-top: 24px;

        table{
            thead {
                tr {
                    th {
                        min-width: 48px;
                        text-align: center;
                        padding: 8px;
                        border-bottom: 1px solid #ccc;
                    }
                }
            }
            tbody {
                tr {
                    td {
                        min-width: 48px;
                        text-align: center;
                        padding: 8px 8px 0px 8px;
                    }
                }
            }
            .label {
                min-width: 150px;
            }

        }
    }
}
</style>