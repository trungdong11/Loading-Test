<template>
    <div class="container">
        <div class="container__content">
            <div class="container__content__header">
                REQUESTS CONFIGURATION
            </div>
            <div class="container__content__body">
                <div class="container__content__body__choose">
                    <div class="title">
                        <span>Method</span>
                        <div class="title__question">
                            <img src="~/assets/icons/question-fill.svg" alt="">
                            <div class="title__question__popup">
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div class="select-option" @click="toggleDropdown()">
                        <span>{{selectedOption?.label}}</span>
                        <img src="~assets/icons/down-arrow.svg" alt="">
                        <div v-if="isOpenOptions == true" class="select-option__list">
                            <div
                                v-for="(option, index) in options"
                                :key="index"
                                @click="selectOption(option)"
                                class="select-option__list__item"
                            >
                                {{ option?.label }}
                            </div>
                        </div>
                    </div>  
                </div>
                <div class="container__content__body__input">
                    <div class="title">
                        <span>URL</span>
                        <div class="title__question">
                            <img src="~/assets/icons/question-fill.svg" alt="">
                            <div class="title__question__popup">
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <input type="text" v-model="urlValue" class="input__value" placeholder="Enter URL (Website, API): i.e. https://api.example.com/users">
                    <div class="container__content__body__input__bottom">
                        <input type="text" v-model="threadsValue" class="input__value" placeholder="ENTER THREAD QUANTITY">
                        <input type="text" v-model="iterationValue" class="input__value" placeholder="ENTER ITERATION QUANTITY">
                    </div>
                </div>
            </div>
        </div>
       <div class="container__btn" @click="getResponseHTTP()">
            <span>EXECUTE TEST</span>
            <img src="~assets/icons/arrow-right.svg" alt="">
       </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            isOpenOptions: false,
            selectedOption: null,
            options: [
                { value: 'GET', label: 'GET' },
                { value: 'POST', label: 'POST' },
                { value: 'PUT', label: 'PUT' },
                { value: 'PATCH', label: 'PATCH' },
                { value: 'DELETE', label: 'DELETE' },
            ],
            listResponses: [],  
            urlValue: "",
            iterationValue: "",
            threadsValue: "",
        }
    },
    created() {
        this.selectedOption = this.options[0];
    },
    methods: {
        toggleDropdown() {
            this.isOpenOptions = true
        },
        selectOption(option) {
            this.selectedOption = option;
            this.isOpenOptions = false
        },
        async getResponseHTTP() {
            console.log("dong")
        this.$axios({
            url: `http://localhost:8080/api/v1/http-methods/get?threads=${this.threadsValue}&iterations=${this.iterationValue}&url=${this.urlValue}`,
            data: {
            prompt: 'json data'
            },
            headers: {
            'accept': '*',
            'content-type': 'application/json'    
            },
            method: 'POST',
            onDownloadProgress: progressEvent => {
            const xhr = progressEvent?.target
            const dataString = xhr.responseText.replace(/data:/g, '');
            const lines = dataString.split('\n');
            const filteredArray = lines.filter(obj => Object.keys(obj).length > 0);
            const Arr = filteredArray.map(line => JSON.parse(line));
            console.log(Arr, "arr")
            this.listResponses = Arr;
            console.log(this.listResponses)
            }
            
        }).then(({ data }) => Promise.resolve(data));
    },
    }
}
</script>

<style scoped lang="scss">
.container__content {
    background-color: #ffff;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0,0,0,.08);
    transition: box-shadow .2s;
    padding: 24px;

    &__header {
        font-size: 18px;
        color: var(--neutral-400);
        font-weight: 700;
        letter-spacing: 0.2;
        margin-bottom: 24px;
    }

    &__body {
        background-color: #fafafa;
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
        padding: 24px;
        border-left: 5px solid var(--primary-1);
        border-radius: 8px;    
        cursor: pointer;
        display: flex;
        align-items: flex-start;
        gap: 24px;

        &__choose {
            
            .select-option{
                height: 48px;
                border-radius: 4px;
                border: 1px solid #ccc;
                padding: 12px;
                max-width: 120px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 24px;
                cursor: pointer;
                position: relative;

                span {
                    font-size: 16px;
                    font-weight: 700;
                    color: var(--neutral-400);
                }
                img {
                    height: 14px;
                    width: 14px;
                    transition: box-shadow 2s;
                }
                &__list {
                    position: absolute;
                    top: 46px;
                    left: 0;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 1px 1px rgba(0,0,0,.05);
                    transition: box-shadow 2s;
                    width: 118px;
                    text-align: center;

                    &__item {
                        padding: 12px;
                        font-size: 14px;
                        color: var(--neutral-400);
                        font-weight: 500;
                        cursor: pointer;
                        
                    }

                    &__item:hover {
                        border-radius: 8px;
                        background-color: #f5f5f5;
                        box-shadow: 1px 1px 4px 1px rgba(161, 161, 161, 0.25) inset, -1px -1px 2px 0px rgba(176, 176, 176, 0.25) inset;
                    }
                }
            }

            .select-option:hover {
                border-color: var(--primary-3);
            }
            .select-option:hover img {
                transform: rotate(180deg);
            }
        }
        &__input {
            display: flex;
            flex-direction: column;
            width: 100%;
            
            .input__value {
                height: 48px;
                font-size: 18px;
                font-weight: 500;
                border: 1px solid #ccc;
                color: var(--neutral-600);
                border-radius: 4px;
                padding: 10px 16px;
                width: 100%;
                outline: none;
            }

            &__bottom {
                margin-top: 16px;
                display: flex;
                align-items: center;
                gap: 16px;
            }
        }
        &__input:nth-child(1) {
            margin-top: -16px;
        }
        
    }
    &__body:hover {
        box-shadow: 0 2px 2px rgb(0 0 0 / 10%);
    }
    &__body:hover .title__question {
        display: block;
    }

    .title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;

        span {
            font-size: 14ppx;
            font-weight: 700;
            color: var(--neutral-500);
        }
        &__question{
            display: none;
            transition: box-shadow .5s;
            width: 16px;
            height: 16px;
            border-radius: 10000px;
            background-color: var(--primary-3);
            text-align: center;
            img {
                width:10px;
                height: 10px;
                margin-left: -1px;
            }
        }
    }
}


.container__btn {
    margin-top: 36px;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 12px 16px;
    font-size: 1.6rem;
    font-weight: bolder;
    border: 0!important;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: rgb(45 35 66 / 40%) 0 2px 4px, rgb(45 35 66 / 30%) 0 7px 13px -3px, rgb(58 65 111 / 50%) 0 -3px 0 inset;
    text-shadow: rgb(0 0 0 / 40%) 0 1px 0;
    background-color: #6056fc;
    color: #fff!important;
    width: 246px;

    img {
        width: 22px;
        height: 22px;
    }
}
.container__btn:hover {
    box-shadow: initial;
    background-color: #493db5!important;
}

.container__btn:hover img {
    transform: translateX(6px);
    transition: transform .3s ease-in 0s;
}
</style>