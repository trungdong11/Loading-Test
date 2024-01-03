<template>
    <div class="container">
        <div class="container__header">
            <h2>RENDER INTERFACE</h2>
            <p>All labels requests executed during the test run.</p>
        </div>
        <div class="container__body" v-if="getData[0].data === undefined">
            <iframe width="100%" height="100vh" :srcdoc="getData[0]?.response_body"></iframe>
        </div>
        <div class="container__body" v-if="getData[0].data !== undefined">
            <vue-json-pretty :data="renderData" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
    data() {
        return {
            renderData: '',
        }
    },
    components: {
        VueJsonPretty
    },
    computed: {
        ...mapGetters({
            getData: 'loadtest/getData',
        }),
    },
    watch: {
        getData(newData, oldData) {
            if (newData.length > 0) {
                this.renderJDBC(this.getData)
            }
        }
    },
    methods: {
        renderJDBC(listResponses) {
            if(this.getData[0].data !== undefined) {
                this.dataRender = JSON.parse(JSON.stringify(listResponses[0]?.data))
            }
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
        padding: 16px!important;
        iframe {
            width: 100%;
            height: 100vh;
            border: none;
        }
    }
}
</style>