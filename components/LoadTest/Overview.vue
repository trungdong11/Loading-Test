<template>
    <div class="container">
        <div class="container__header bg-container">
            
        </div>
        <div class="container__first bg-container">
            <div class="container__first__item">
                <h3>Sample</h3>
                <div class="line"></div>
                <span>12</span>
            </div>
            <div class="container__first__item">
                <h3>Sample</h3>
                <div class="line"></div>
                <span>12</span>
            </div>
            <div class="container__first__item">
                <h3>Sample</h3>
                <div class="line"></div>
                <span>12</span>
            </div>
            <div class="container__first__item">
                <h3>Sample</h3>
                <div class="line"></div>
                <span>12</span>
            </div>
            <div class="container__first__item">
                <h3>Sample</h3>
                <div class="line"></div>
                <span>12</span>
            </div>
            <div class="container__first__item">
                <h3>Sample</h3>
                <div class="line"></div>
                <span>12</span>
            </div>
        </div>
        <div class="container__second bg-container">
            <LineChart/>
        </div>
    </div>
</template>

<script>
import LineChart from '~/components/Commons/LineChart.vue';
export default {
    props: {
        listResponses: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            ListResponses: [],
        };
    },
    components: {
        LineChart,
    },
    create() {
        this.ListResponses = this.listResponses
        console.log(this.ListResponses, "list")
    },
    methods: {},
}
</script>

<style scoped lang="scss">
.container {
    margin-top: 24px;

    &__header {
        background-color: #fff;
        border-radius: 8px;
        width: 100%;
        height: 100px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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
                font-size: 24px;
                font-weight: 900;
                line-height: 24px;
                
            }
        }
    }

    &__second {
        margin-top: 16px;
        padding: 24px;
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    }

    .bg-container {
        border-radius: 8px;
    }

    
}
</style>