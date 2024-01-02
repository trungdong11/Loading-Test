<template>
    <div class="result" v-if="getData.length === 0 ">
        <ToNewTest/>
    </div>
    <div class="container" v-else>
        <div class="container__header">
            <div class="container__header__options">
                <div class="container__header__options__item"
                    @click="handleOverview()"
                    :class="{'active-item' : isShow.overview === true}"
                >
                    <span :class="{'active-span' : isShow.overview === true}">Overview</span>
                    <div class="item-img" :class="{'active-img' : isShow.overview === true}">
                        <img src="~assets/icons/energy.svg" alt="">
                    </div>
                </div>
                <div class="container__header__options__item"
                    @click="handleInsights()"
                    :class="{'active-item' : isShow.insights == true}"
                >
                    <span :class="{'active-span' : isShow.insights == true}">Insights</span>
                    <div class="item-img" :class="{'active-img' : isShow.insights == true}">
                        <img src="~assets/icons/energy.svg" alt="">
                    </div>
                </div>
                <div class="container__header__options__item"
                    @click="handleStats()"
                    :class="{'active-item' : isShow.stats === true}"
                >
                    <span :class="{'active-span' : isShow.stats === true}">Stats</span>
                    <div class="item-img" :class="{'active-img' : isShow.stats === true}">
                        <img src="~assets/icons/energy.svg" alt="">
                    </div>
                </div>
                <div class="container__header__options__item"
                    @click="handleDetail()"
                    :class="{'active-item' : isShow.detail === true}"
                >
                    <span :class="{'active-span' : isShow.detail === true}">Detail</span>
                    <div class="item-img" :class="{'active-img' : isShow.detail === true}">
                        <img src="~assets/icons/energy.svg" alt="">
                    </div>
                </div>
                <div class="container__header__options__item"
                    @click="handleRender()"
                    :class="{'active-item' : isShow.render === true}"
                >
                    <span :class="{'active-span' : isShow.render === true}">Render</span>
                    <div class="item-img" :class="{'active-img' : isShow.render === true}">
                        <img src="~assets/icons/energy.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="container__header__url">
                {{ urlValue }}
            </div>
            <div class="container__header__btn">
                <div class="container__header__btn__running completed"
                    v-if="getData.length === (virtualUser * iterations) ">
                    Completed
                </div>
                <div class="container__header__btn__running" 
                    v-else>
                    Running...
                </div>  
            </div>
        </div>
            <Overview v-show="isShow.overview"/>
            <Insights v-show="isShow.insights"/>
            <Stats v-show="isShow.stats"/>
            <Detail v-show="isShow.detail"/>
            <Render v-show="isShow.render"/>
    </div>
    
</template>
<script> 
import ToNewTest from '~/components/Commons/ToNewTest.vue';
import Overview from '~/components/LoadTest/Overview.vue';
import Insights from '~/components/LoadTest/Insights.vue';
import Stats from '~/components/LoadTest/Stats.vue';
import Detail from '~/components/LoadTest/Detail.vue';
import Render from '~/components/LoadTest/Render.vue';
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            isShow: {
                overview: true,
                insights: false,
                stats: false,
                detail: false,
                render: false,
            },
            urlValue: '',
            iterations: 1,
            virtualUser: 0,
        };
    },
    components: {
        ToNewTest,
        Overview,
        Insights,
        Stats,
        Detail,
        Render,
    },
    computed: {
        ...mapGetters({
            getData: 'loadtest/getData',
        }),
    },
    created() {
        this.urlValue = this.$route.query.url
        this.virtualUser = this.$route.query.virtual_users
        if(this.$route.query.iterations > 0) {
            this.iterations = this.$route.query.iterations
        }
    },
    methods: {
        handleOverview() {
            this.isShow.overview = true
            this.isShow.insights = false
            this.isShow.stats = false
            this.isShow.detail = false
            this.isShow.render = false
        },
        handleInsights() {
            this.isShow.overview = false
            this.isShow.insights = true
            this.isShow.stats = false
            this.isShow.detail = false
            this.isShow.render = false
        },
        handleStats() {
            this.isShow.overview = false
            this.isShow.insights = false
            this.isShow.stats = true
            this.isShow.detail = false
            this.isShow.render = false
        },
        handleDetail() {
            this.isShow.overview = false
            this.isShow.insights = false
            this.isShow.stats = false
            this.isShow.detail = true
            this.isShow.render = false
        },
        handleRender() {
            this.isShow.overview = false
            this.isShow.insights = false
            this.isShow.stats = false
            this.isShow.detail = false
            this.isShow.render = true
        }
    }
}
</script>                                                                                                                                                                                                                                                                                                                                     

<style scoped lang="scss">
.container {

    &__header {
        display: flex;
        align-items: center;
        gap: 8px;

            &__options {
            border-radius: 4px;
            width: 638px;
            display: flex;
            align-items: center;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            background-color: #fbfbfb;
            &__item {
                min-width: 128px;
                border: 4px;
                border-top: solid 4px #fbfbfb;
                transition: all .2s ease;
                border-radius: 4px;
                padding: 14px 18px;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                cursor: pointer;
                gap: 6px;
                span {
                    font-size: 16px;
                    font-weight: 500;
                    color: #676aa3;
                }
    
                .item-img {
                    width: 20px;
                    height: 20px;
                    border-radius: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    align-items: center;
                    background-color: rgba(255,163,26,.2);
                    img {
                        width: 16px;
                        height: 16px;
                    }
                }
                
            }
            
            &__item:hover {
                background-color: #ffff;
                border-top: 4px solid var(--primary-1);
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            }
            &__item:hover span {
                color: var(--neutral-400);
            }
            &__item:hover .item-img {
                background-color: #ea8c00;
            }
        }

        &__url {
            background-color: #ffff;
            border-radius: 8px;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            padding: 8px 16px;
            font-size: 15px;
            font-weight: 500;
            color: var(--neutral-400);
            
        }

        &__btn {
            
            &__running {
                background-color: #ffa31a;
                padding: 8px 20px;
                font-size: 18px;
                font-weight: 500;
                color: #ffff;
                border-radius: 4px;
                min-width: 148px;
                text-align: center;
            }
            .completed {
                background: -webkit-linear-gradient(#11d924,#24b619);
            }
        }
    }
}

.active-item{
    background-color: #ffff;
    border-top: 4px solid var(--primary-1);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.active-span {
    color: var(--neutral-400);
}
.active-img {
    background-color: #ea8c00!important;
}

</style>