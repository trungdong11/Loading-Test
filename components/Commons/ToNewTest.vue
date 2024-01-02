<template>
    <div class="container">
        <div class="container__right">
            <div class="container__right__title">
                <img src="~assets/icons/bar-chart.svg" alt="">
                <span>RUN LOAD TESTS IN CLOUD</span>
            </div>
            <h2>Load Tests</h2>
        </div>
        <div class="container__left">
            <div class="btn" @click="onGoToAdd()">
                <img src="~assets/icons/add-for-btn.svg" alt="">
                <p>NEW TEST</p>
                <span>N</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods:{
        onGoToAdd() {
            this.$router.push('/newTest')
        }
    }
}
</script>
<style scoped lang="scss">
.container {
    background-color: #ffff;
    padding: 24px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &__right {
        display: flex;
        flex-direction: column;
        gap: 24px;

        &__title {
            display: flex;
            align-items: center;
            gap: 4px;
            
            img {
                width: 14px;
                height: 14px;
            }
            span {
                font-size: 16px;
                line-height: 18px;
                font-weight: 700;
                color: var(--primary-2);
            }
        }

        h2 {
            font-size: 18px;
            font-weight: 700;
            color: var(--neutral-400);
        }
    }

    &__left {
        .btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #6056fc;
            z-index: 2;
            text-transform: uppercase;
            background-repeat: repeat-x;
            border: 0!important;
            border-radius: 8px;
            -webkit-transition: box-shadow .15s ease,-webkit-transform .15s ease;
            transition: box-shadow .15s ease,transform .15s ease;
            will-change: box-shadow,transform;
            box-shadow: 0 2px 4px rgb(45 35 66 / 40%), 0 7px 13px -3px rgb(45 35 66 / 30%), inset 0 -3px 0 rgb(58 65 111 / 50%);
            text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
            padding: 12px 30px;
            cursor: pointer;
            img {
                width: 14px;
                height: 14px;
            }
            p {
                font-size: 18px;
                font-weight: 500;
                word-spacing: 0.2   ;
                color: #ffff;
            }
            span {
                height: 24px;
                opacity: 1;
                transition: all .2s ease-out 0s;
                pointer-events: none;
                background: #9e6ff1;
                border-radius: 8px;
                padding: 8px 6px 8px 6px;
                box-sizing: border-box;
                display: -ms-inline-flexbox;
                display: inline-flex;
                -ms-flex-align: center;
                align-items: center;
                -ms-flex-pack: center;
                justify-content: center;
                font-size: 18px;
            }
        }

        .btn:hover {
            background-color: #493db5!important;
            color: #fff!important;
            box-shadow: 0 0 2px rgba(0,0,0,.1), 0 5px 20px rgba(0,0,0,.08), 0 0 9px rgba(0,0,0,.08), 0 14px 20px rgba(0,0,0,.08);
            outline: 0;
        }
    }
}
</style>