<template>
    <div class="container">
        <div class="container__content">
            <div class="container__content__header">
                REQUESTS CONFIGURATION
            </div>
            <div class="container__content__body">
                <div class="container__content__body__above">
                    <div class="container__content__body__above__choose">
                        <div class="title">
                            <span>Method</span>
                            <div class="title__question">
                                <img src="~/assets/icons/question-fill.svg" alt="">
                                <div class="title__question__popup">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div class="choose__post">
                            <div class="select-option" >
                                <div class="select-option__body" @click="toggleDropdown()">
                                    <span>{{selectedOption?.label}}</span>
                                    <img src="~assets/icons/down-arrow.svg" alt="">
                                    <div v-if="isOpenOptions === true" class="select-option__body__list">
                                        <div
                                            v-for="(option, index) in options"
                                            :key="index"
                                            @click.stop="selectOption(option)"
                                            class="select-option__body__list__item"
                                        >
                                            {{ option?.label }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="select-option" v-if="check.isShowPost">
                                <div class="select-option__body" @click="toggleDropdownMethodPost()">
                                    <span>{{selectedMethodPost?.label}}</span>
                                    <img src="~assets/icons/down-arrow.svg" alt="">
                                    <div v-if="isOpenMethodPost === true" class="select-option__body__list">
                                        <div
                                            v-for="(option, index) in optionsMethodPost"
                                            :key="index"
                                            @click.stop="selectMethodPost(option)"
                                            class="select-option__body__list__item"
                                        >
                                            {{ option?.label }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                          
                    </div>
                    <div class="container__content__body__above__input">
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
                        <div class="jdbc-test" v-if="check.jdbc">
                            <input type="text" v-model="jdbc_driver_class" class="input__value" placeholder="Enter jdbc_driver_class">
                            <input type="text" v-model="sql_statement" class="input__value" placeholder="Enter sql_statement">
                        </div>
                        <div class="jdbc-test" v-if="check.jdbc">
                            <input type="text" v-model="username" class="input__value" placeholder="Enter username">
                            <input type="text" v-model="password" class="input__value" placeholder="Enter password">
                        </div>
                        <div class="container__content__body__above__input__bottom">
                            <input type="text" v-model="virtual_users" class="input__value" placeholder="ENTER VIRTUAL USER">
                            <div class="select-method">
                                <div class="select-option" >
                                    <div class="select-option__body" @click="toggleDropdownMethod()">
                                        <span>{{selectedMethod?.label}}</span>
                                        <img src="~assets/icons/down-arrow.svg" alt="">
                                        <div v-if="isOpenMethod === true" class="select-option__body__list">
                                            <div
                                                v-for="(option, index) in optionsMethod"
                                                :key="index"
                                                @click.stop="selectMethod(option)"
                                                class="select-option__body__list__item"
                                            >
                                                {{ option?.label }}
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                                <input v-model="numberMethod" class="input__value" type="number" name="quantity" min="1">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container__content__btn">
                    <div class="container__content__btn__item" 
                        @click="toggleRamup()"
                        :class="{'btn-active' : check.ramup == true}"
                    >
                        <img src="~/assets/icons/plus-btn.svg" alt="">
                        <span>Ram up</span>
                    </div>
                    <div class="container__content__btn__item" 
                        @click="toggleHeader()"
                        :class="{'btn-active' : check.header == true}"
                        v-if="selectedOption.value !== 'JDBC'"
                    >
                        <img src="~/assets/icons/plus-btn.svg" alt="">
                        <span>Header</span>
                        <span>({{ countListGet }})</span>
                    </div>
                    <div class="container__content__btn__item"
                        v-if="selectedOption.value !== 'GET' && selectedOption.value !== 'JDBC'"
                        @click="togglePost()"
                        :class="{'btn-active' : check.post == true}"
                        >
                        <img src="~/assets/icons/plus-btn.svg" alt="">
                        <span>Post body</span>
                        <span>({{ countListPost }})</span>
                    </div>
                </div>
                <div class="container__content__post"
                    v-if="check.ramup"
                     >
                    <div class="container__content__post__title">
                        Ram up
                    </div>
                    <div 
                        class="container__content__post__body"
                    >
                        <input v-model="ramup" type="text" placeholder="Ramp-up quantity">
                    </div>
                    
                    
                </div>
                <div class="container__content__post"
                    v-if="check.header && selectedOption.value !== 'JDBC'"
                     >
                    <div class="container__content__post__title">
                        Header
                    </div>
                    <div 
                        class="container__content__post__body"
                        v-for="(item, index) in keyValueListGet" :key="index"
                    >
                        <input v-model="item.key" type="text" placeholder="Header name">
                        <input v-model="item.value" type="text" placeholder="Value">
                        <div 
                            class="remove-img"
                            @click.stop="handleRemoveBody(index, keyValueListGet, countListGet)"
                        >
                            <img src="~assets/icons/remove.svg" alt="">
                        </div>
                    </div>
                    
                    <div class="container__content__post__add"
                        @click.stop="handleAddBody(keyValueListGet, countListGet)"
                    >
                        <img src="~assets/icons/plus-btn.svg" alt="">
                        <span>Add header</span>
                    </div>
                </div>
                <div class="container__content__post"
                    v-if="check.post && selectedOption.value !== 'GET' && selectedOption.value !== 'JDBC'"
                     >
                    <div class="container__content__post__title">
                        POST 
                    </div>
                    <div 
                        class="container__content__post__body"
                        v-for="(item, index) in keyValueListPost" :key="index"
                    >
                        <input v-model="item.key" type="text" placeholder="Header post">
                        <input v-model="item.value" type="text" placeholder="Value">
                        <div 
                            class="remove-img"
                            @click.stop="handleRemoveBody(index, keyValueListPost, countListPost)"
                        >
                            <img src="~assets/icons/remove.svg" alt="">
                        </div>
                    </div>
                    
                    <div class="container__content__post__add"
                        @click.stop="handleAddBody(keyValueListPost, countListPost)"
                    >
                        <img src="~assets/icons/plus-btn.svg" alt="">
                        <span>Add post</span>
                    </div>
                </div>
            </div>
            
        </div>
       <div class="container__btn" @click="toggleExecute">
            <span>EXECUTE TEST</span>
            <img src="~assets/icons/arrow-right.svg" alt="">
       </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
                { value: 'JDBC', label: 'JDBC' },
            ],
            isOpenMethod: false,
            selectedMethod: null,
            optionsMethod: [
                {value: 'ITERATIONS', label: 'Iterations'},
                {value: 'DURATIONS', label: 'Durations'}
            ],
            isOpenMethodPost: false,
            selectedMethodPost: null,
            optionsMethodPost: [
                {value: 'encoded-form-body', label: 'Encoded Form'},
                {value: 'json-body', label: 'Json'}
            ],
            keyValueListGet: [
                { 
                    key: "",
                    value: "" 
                }
            ],
            keyValueListPost: [
                { 
                    key: "",
                    value: "" 
                }
            ],
            countListGet: 0,
            countListPost: 0,
            check: {
                header: false,
                post: false,
                ramup: false,
                isShowPost: false,
                jdbc: false,
            },
            listResponses: [],  
            urlValue: "",
            iterationValue: 0,
            virtual_users: "",
            durations: 0,
            ramup: 0,
            numberMethod: 10,
            jdbc_driver_class: 'com.mysql.cj.jdbc.Driver',
            username: 'TrungHuy',
            password: 'TrungHuy123()',
            sql_statement: 'SELECT * FROM wordpress.wp_users;',
            
        }
    },
    created() {
        this.selectedOption = this.options[0]
        this.selectedMethod = this.optionsMethod[0]
        this.selectedMethodPost = this.optionsMethodPost[0]
    },
    
    methods: {
        ...mapActions({
            apiDataGet: 'loadtest/fetchDataGet',
            apiDataPost: 'loadtest/fetchDataPost',
            apiDataJDBC: 'loadtest/fetchDataJDBC'
        }),
        toggleHeader() {
            this.check.header = !this.check.header
            this.countListGet = this.keyValueListGet.length
        },
        togglePost() {
            this.check.post = !this.check.post
            this.countListPost = this.keyValueListPost.length
        },
        toggleRamup() {
            this.check.ramup = !this.check.ramup
        },
        toggleDropdown() {
            this.isOpenOptions = !this.isOpenOptions
        },
        toggleDropdownMethod() {
            this.isOpenMethod = !this.isOpenMethod
        },
        toggleDropdownMethodPost() {
            this.isOpenMethodPost = !this.isOpenMethodPost
        },
        selectOption(option) {
            this.selectedOption = option
            this.isOpenOptions = false
            this.checkOptionpost()
            this.checkOptionJDBC()
        },
        selectMethod(option) {
            this.selectedMethod = option
            this.isOpenMethod = false
        },
        selectMethodPost(option) {
            this.selectedMethodPost = option
            this.isOpenMethodPost = false
        },
        checkOptionpost() {
            if(this.selectedOption.value === 'POST')
                {
                    this.check.isShowPost = true
                } else {
                    this.check.isShowPost = false
                }
        },
        checkOptionJDBC() {
            if(this.selectedOption.value === 'JDBC')
                {
                    this.check.jdbc = true
                } else {
                    this.check.jdbc = false
                }
        },
        handleAddBody(listValue, countlist) {
            countlist = 0
            listValue.push({ key: "", value: "" });
            countlist++
        },
        handleRemoveBody(index, listValue, countlist) {
            countlist = 0
            if(index > 0)
            {   
                listValue.splice(index, 1);
                countlist--
            }
        }, 
        async methodGetData() {       
            const requestBody = {
                // key_headers: [""],
                // value_headers: [""]
                key_headers: this.keyValueListGet.map(i => i.key),
                value_headers: this.keyValueListGet.map(i => i.value)
            };

            const requestBodyPost = {
                // key_bodies: [""],
                // value_bodies: [""],
                key_bodies: this.keyValueListPost?.map(i => i.key),
                value_bodies: this.keyValueListPost?.map(i => i.value)
            }

            this.apiDataGet(
                {
                    method: this.selectedOption.value,
                    virtual_users: this.virtual_users, 
                    iterations: this.iterationValue, 
                    url:this.urlValue, 
                    ramp_up:this.ramup, 
                    durations: this.durations,
                    requestBody: requestBody,
                    requestBodyPost: requestBodyPost
                }
            );
        },
        async methodPostData() {
       
            const requestBody = {
                // key_headers: this.keyValueListGet,
                // value_headers: [""]

                key_headers: this.keyValueListGet.map(i => i.key),
                value_headers: this.keyValueListGet.map(i => i.value)
            }
            const requestBodyPost = {
                // key_bodies: [""],
                // value_bodies: [""],
                key_bodies: this.keyValueListPost.map(i => i.key),
                value_bodies: this.keyValueListPost.map(i => i.value)
            }
            this.apiDataPost(
                {
                    option_post: this.selectedMethodPost.value,
                    virtual_users: this.virtual_users, 
                    iterations: this.iterationValue, 
                    url:this.urlValue, 
                    ramp_up:    this.ramup, 
                    durations: this.durations,
                    requestBody: requestBody,
                    requestBodyPost: requestBodyPost
                }
            );
        },
        async methodJDBCData() {
            this.apiDataJDBC(
                {
                    url:this.urlValue, 
                    jdbc_driver_class: this.jdbc_driver_class,
                    username: this.username,
                    password: this.password,
                    sql_statement: this.sql_statement,
                    virtual_users: this.virtual_users, 
                    iterations: this.iterationValue, 
                    ramp_up:this.ramup, 
                    durations: this.durations,
                }
            );
        },
        handleChooseOption(option) {
            if(option === 'GET' || option === 'PUT' || option === 'PATCH' || option === 'DELETE') {
                this.methodGetData()
            } else if (option === "POST") {
                this.methodPostData()
            } else if (option === 'JDBC') {
                this.methodJDBCData()
            }
        },
        toggleExecute() {
            console.log(this.selectedMethod, "test 1")
            console.log(this.selectedOption, "test 2")

            if(this.selectedMethod.value === 'DURATIONS') {
                this.durations = this.numberMethod
                console.log(this.durations, "duration")
            } else {
                this.iterationValue = this.numberMethod
            }
            
            this.handleChooseOption(this.selectedOption.value)
            this.$router.push(`/resultTest?virtual_users=${this.virtual_users}&ramp_up=${this.ramup}&url=${this.urlValue}&durations=${this.durations}&iterations=${this.iterationValue}`)
            
        }   
    }
}
</script>

<style scoped lang="scss">
.container__content {
    background-color: #ffff;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;

        &__above {
            display: flex;
            gap: 24px;
            width: 100%;
            
            &__choose {
                .choose__post {
                    display: flex;
                    align-items: center;
                    gap: 16px;
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
                
                .jdbc-test {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    width: 100%;
                    margin-top: 16px;
                }
                
                &__bottom {
                    margin-top: 16px;
                    display: flex;
                    align-items: center;
                    gap: 16px;

                    .select-method {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                    }
                }
            }
            &__input:nth-child(1) {
                margin-top: -16px;
            }
        }
        
    }
    &__body:hover {
        box-shadow: 0 2px 2px rgb(0 0 0 / 10%);
    }
    &__body:hover .title__question {
        display: block;
    }

    &__btn {
        display: flex;
        align-items: center;
        gap: 16px;
        
        &__item {
            display: flex;
            align-items: center;
            font-size: 14px!important;
            border-radius: 4px;
            border: 1px #ccc solid;
            color: #7c7c7c;
            padding: 8px 12px;
            gap: 8px;
            cursor: pointer;

            img {
                width: 14px;
                height: 14px;
            }
            span {
                font-size: 14px;
                font-weight: 500;
                color: var(--neutral-400);
                line-height: 16px;
            }
        }

        &__item:hover{
            background-color: var(--primary-3);
            border-color: var(--primary-3);
        }
        &__item:hover img {
            fill: #ffff;
        }
        &__item:hover span {
            color: #ffff
        }
    }

    &__post {
        display: flex;
        flex-direction: column;
        gap: 8px;

        &__title {
            font-size: 16px;
            color: var(--neutral-400);
            font-weight: 700;
        }
        &__body {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;

            input {
                border-radius: 4px!important;
                padding: 6px 12px;
                font-size: 14px;
                -webkit-box-shadow: initial;
                box-shadow: initial;
                border: 1px solid #ccc;
                outline: none;
            }
            .remove-img {
                width: 26px;
                height: 26px;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                border: 1px solid #ccc;
                cursor: pointer;
                background-color: #fff;
                img {
                    width: 14px;
                    height: 14px;
                }
            }

            .remove-img:hover {
                background-color: #b9b7b7;
                border-color: #fff;
            }
        }
        &__add {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid #cccc;
            cursor: pointer;
            gap: 4px;
            width: 116px;
            margin-top: 4px;
            img {
                width: 12px;
                height: 12px;
            }
            span {
                font-size: 14px;
                font-weight: 500;
                color: var(--neutral-400);
            }
        }

        &__add:hover {
            background-color: var(--primary-3);
            border-color: var(--primary-3);
        }
        &__add:hover span {
            color: #ffff
        }
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
.btn-active {
    color: #333;
    background-color: #e6e6e6;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.select-option{
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    
    
    &__body {
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
        min-width: 120px;

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
    
}
.select-option:hover {
    border-color: var(--primary-3);
}
.select-option:hover img {
    transform: rotate(180deg);
}
</style>