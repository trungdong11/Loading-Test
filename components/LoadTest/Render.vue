<template>
    <div class="container">
        <div class="container__header">
            <h2>RENDER INTERFACE</h2>
            <p>All labels requests executed during the test run.</p>
        </div>
        <div class="container__body">
            <iframe width="100%" height="100vh" :srcdoc="listDatas[0]?.response_body"></iframe>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            listDatas: [],
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
            // console.log(this.getData, "dong dong")
                this.listDatas = this.getData
                console.log(this.listDatas, "render")
            }
        }
    },
    
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
        padding: 16px!important;
        iframe {
            width: 100%;
            height: 100vh;
            border: none;
        }
    }
}
</style>