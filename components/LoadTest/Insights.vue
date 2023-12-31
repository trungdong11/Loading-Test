<template>
    <div class="container">
        <div class="container__first">
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
        <div class="container__first second">
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
        <div class="container__second">
            <div class="container__second__first bg-second">
                <h3>Response Codes</h3>
                <div class="line"></div>
                <div class="container__second__first__content mt-8">
                    <img src="~/assets/icons/check.svg" alt="">
                    <span>Success 2xx</span>
                    <div class="question">
                        <img src="~/assets/icons/question.svg" alt="">
                    </div>
                </div>
                <div class="line-item"></div>
                <div class="container__second__first__content">
                    <img src="~/assets/icons/right-arrow.svg" alt="">
                    <span>Success 2xx</span>
                    <div class="question">
                        <img src="~/assets/icons/question.svg" alt="">
                    </div>
                </div>
                <div class="line-item"></div>
                <div class="container__second__first__content">
                    <img src="~/assets/icons/delete.svg" alt="">
                    <span>Success 2xx</span>
                    <div class="question">
                        <img src="~/assets/icons/question.svg" alt="">
                    </div>
                </div>
                <div class="line-item"></div>
                <div class="container__second__first__content">
                    <img src="~/assets/icons/delete.svg" alt="">
                    <span>Success 2xx</span>
                    <div class="question">
                        <img src="~/assets/icons/question.svg" alt="">
                    </div>
                </div>
                <div class="line-item"></div>
                <div class="container__second__first__content">
                    <img src="~/assets/icons/alert.svg" alt="">
                    <span>Success 2xx</span>
                    <div class="question">
                        <img src="~/assets/icons/question.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="container__second__second bg-second">
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ListResponses: [],
        };
    },
    methods: {},
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

                h3 {
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--neutral-400);
                }
                
                span {
                    font-size: 18px;
                    font-weight: 900;
                    color: var(--neutral-400);
                }
            }
        }
        .second {
            margin-top: 12px;
        }
        &__second {
            margin-top: 24px;
            display: flex;
            align-items: center;
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
            }
            &__second {
                width: 70%;
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
</style>