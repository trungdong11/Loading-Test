<template>
    <div class="sidebar-container">
            <div class="sidebar-main">
                <div class="sidebar-header">
                    <img class="header-logo" src="~/assets/icons/services.svg" alt="">
                    <div class="sidebar__popup">
                        <div class="sidebar__popup__list"   >
                            <div class="sidebar__popup__list__img">
                                <img src="~assets/icons/bar-chart.svg" alt="">
                            </div>
                            <div class="sidebar__popup__list__item">
                                <h3>Loading Test</h3>
                                <p>See how your website or APIs are doing under load</p>
                            </div>
                        </div>
                        <div class="sidebar__popup__list">
                            <div class="sidebar__popup__list__img">
                                <img src="~assets/icons/line-chart.svg" alt="">
                            </div>
                            <div class="sidebar__popup__list__item">
                                <h3>Jdbc Test</h3>
                                <p>See how your website or APIs are doing under load</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="sidebar-list">
                    <nuxt-link to="/resultTest" class="sidebar-item " :class="{ 'sidebar-active': pageParams == '/resultTest' }">
                        <img src="~/assets/icons/bar-chart.svg" alt="">
                        <p>Tests</p>
                    </nuxt-link>
                    <nuxt-link to="/newTest" class="sidebar-item" :class="{ 'sidebar-active': pageParams == '/newTest' }">
                        <img src="~/assets/icons/add-test.svg" alt="">
                        <p>Add test</p>
                    </nuxt-link>
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
    computed: {
        pageParams() {
            return this.$route.path
        },
    },
    methods: {
        
        
    }
}
</script>
<style scoped>
.sidebar-element {
    width: 50px;
}

.sidebar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100px;
    height: 100%;
}

.sidebar-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 38px;
    height: 100%;
    padding-top: 16px;
    transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    background-color: #f3f3f3;
    box-shadow: 1px 1px 4px 1px rgba(161, 161, 161, 0.25) inset, -1px -1px 2px 0px rgba(176, 176, 176, 0.25) inset;
}

.sidebar__popup::after {
    content: "";
    position: absolute;
    height: 20px;
    width: 100px;
    top: -16px;
    left: 0px;
}

.sidebar__popup {
    position: absolute;
    background-color: #ffff;
    box-shadow: 1px 1px 4px 1px rgba(161, 161, 161, 0.25) inset, -1px -1px 2px 0px rgba(176, 176, 176, 0.25) inset;
    border-radius: 8px;
    cursor: pointer;
    z-index: 9999;
    top: 54px;
    left: -10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 420px;
    text-align: left;
    display: none;
}
.sidebar__popup__list {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
    border-radius: 8px;
    border-left: 5px solid transparent;
    transition: all .2s ease;
}

.sidebar__popup__list:hover {
    border-left: 5px solid var(--primary-1);
    background-color: #f5f5f5;
    box-shadow: 1px 1px 4px 1px rgba(161, 161, 161, 0.25) inset, -1px -1px 2px 0px rgba(176, 176, 176, 0.25) inset;
}

.sidebar__popup__list:hover .sidebar__popup__list__item h3 {
    color: var(--primary-1)
}

.sidebar__popup__list__img {
    width: 48px;
    height:48px;
    background-color: #ffff;
    border-radius: 8px;
    border: 1px solid var(--neutral-400);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sidebar__popup__list__img > img {
    width: 28px;
    height: 28px;
}

.sidebar__popup__list__item{
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    h3 {
        font-size: 16px;
        color: var(--neutral-500);
        font-weight: 600;
    }

    p {
        font-size: 14px;
        color: var(--neutral-400);
        font-weight: 400;
    }
}
.sidebar-header {
    text-align: center;
    margin-top: 12px;
    position: relative;
    cursor: pointer;
}

.sidebar-header:hover .sidebar__popup {
    display: block;
}

.header-logo {
    width: 44px;
    height: 44px;
}
.sidebar-item {
    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 0;
    align-items: center;
    width: 80px;
    color: #626C70;
    text-decoration: none;
    border-left: 3px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 8px;

    p {
        font-size: 14px;
        font-weight: 500;
        color: var(--neutral-500);
    }
}

.sidebar-active {
    background-color: #ffff;
    border-left: 5px solid var(--primary-1);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.sidebar-item:hover {
    cursor: pointer;
    background: #ffff;
    transition: 0.2s;
    border-left: 5px solid var(--primary-1);
}
/*
.active {
    background: #F0F6FF;
    border-left: 3px solid #0E5FD9;
    color: #191B1C;
}
*/

.active svg {
    color: #0E5FD9;
}
.collapse-btn-icon-right {
    display: none;
}
.collapse {
    width: 65px;
    transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
}
.collapse .sidebar-main {
    width: 62px;
}
.collapse .header-logo {
    display: none;
}
.collapse .sidebar-header {
    padding-left: 14px;
}
.collapse .dashboard-title {
    visibility:hidden;
}
.collapse .collapse-btn-icon-right {
    display: block;
}
.collapse .collapse-btn-icon-left {
    display: none;
}
</style>