<template>
    <div class="sidebar-container">
        <div class="sidebar-element" ref="sidebarEle">
            <div class="sidebar-main">
                <div class="sidebar-header">
                    <!-- <img class="header-logo" src="~/assets/img/Logo-sgo.png" alt=""> -->
                    <div class="collapse-btn" @click="collapseSidebar()">
                        
                        <!-- <img src="~/assets/svg/collapseLeft.svg" alt="" class="collapse-btn-icon-left"> -->
                        <!-- <img src="~/assets/svg/collapseRight.svg" alt="" class="collapse-btn-icon-right"> -->
                    </div>
                </div>
                <p class="dashboard-title">DASHBOARD</p>
                <div class="sidebar-list">
                    <nuxt-link to="/" class="sidebar-item" :class="{ 'active': pageParams == '/' }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M4 19v-7.375L3 12.4q-.35.25-.75.2t-.65-.4q-.25-.35-.188-.75t.388-.65l8.975-6.875q.275-.2.588-.3t.637-.1q.325 0 .638.1t.587.3l9 6.875q.325.25.375.65t-.2.75q-.25.325-.65.375t-.725-.2L20 11.625V19q0 .825-.587 1.413T18 21H6q-.825 0-1.413-.588T4 19Zm2 0h12v-8.9l-6-4.575L6 10.1V19Zm2-4q.425 0 .713-.288T9 14q0-.425-.288-.713T8 13q-.425 0-.713.288T7 14q0 .425.288.713T8 15Zm4 0q.425 0 .713-.288T13 14q0-.425-.288-.713T12 13q-.425 0-.713.288T11 14q0 .425.288.713T12 15Zm4 0q.425 0 .713-.288T17 14q0-.425-.288-.713T16 13q-.425 0-.713.288T15 14q0 .425.288.713T16 15ZM6 19h12H6Z" />
                        </svg>
                        Dashboard
                    </nuxt-link>
                     <nuxt-link to="/TestLoading" class="sidebar-item" :class="{ 'active': pageParams.startsWith('/TestLoading') }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M10.275 12q-.7 0-1.15-.525T8.8 10.25l.3-1.8q.2-1.075 1.013-1.763T12 6q1.1 0 1.913.688t1.012 1.762l.3 1.8q.125.7-.325 1.225T13.75 12h-3.475Zm-7.175.975q-.575.025-.988-.225t-.537-.775q-.05-.225-.025-.45t.125-.425q0 .025-.025-.1q-.05-.05-.25-.6q-.05-.3.075-.575T1.8 9.35l.05-.05q.05-.475.388-.8t.837-.325q.075 0 .475.1l.075-.025q.125-.125.325-.187T4.375 8q.275 0 .488.088t.337.262q.025 0 .038.013t.037.012q.35.025.612.212t.388.513q.05.175.038.338t-.063.312q0 .025.025.1q.175.175.275.388t.1.437q0 .1-.15.525q-.025.05 0 .1l.05.4q0 .525-.438.9t-1.062.375H3.1ZM20 13q-.825 0-1.413-.588T18 11q0-.3.088-.563t.237-.512l-.7-.625q-.25-.2-.088-.5T18 8.5h2q.825 0 1.413.588T22 10.5v.5q0 .825-.588 1.413T20 13ZM0 18v-1.575q0-1.1 1.113-1.763T4 14q.325 0 .625.013t.575.062q-.35.5-.525 1.075T4.5 16.375V18H0Zm6 0v-1.625q0-1.625 1.663-2.625t4.337-1q2.7 0 4.35 1T18 16.375V18H6Zm14-4q1.8 0 2.9.663t1.1 1.762V18h-4.5v-1.625q0-.65-.163-1.225t-.487-1.075q.275-.05.563-.062T20 14Z" />
                          </svg>
                        TestLoading
                    </nuxt-link>
                    <!--
                    <nuxt-link to="/customers" class="sidebar-item" :class="{ 'active': pageParams.startsWith('/customers') }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm3.61 6.34c1.07 0 1.93.86 1.93 1.93s-.86 1.93-1.93 1.93s-1.93-.86-1.93-1.93c-.01-1.07.86-1.93 1.93-1.93zm-6-1.58c1.3 0 2.36 1.06 2.36 2.36s-1.06 2.36-2.36 2.36s-2.36-1.06-2.36-2.36c0-1.31 1.05-2.36 2.36-2.36zm0 9.13v3.75c-2.4-.75-4.3-2.6-5.14-4.96c1.05-1.12 3.67-1.69 5.14-1.69c.53 0 1.2.08 1.9.22c-1.64.87-1.9 2.02-1.9 2.68zM12 20c-.27 0-.53-.01-.79-.04v-4.07c0-1.42 2.94-2.13 4.4-2.13c1.07 0 2.92.39 3.84 1.15C18.28 17.88 15.39 20 12 20z"/>
                        </svg>
                        Customers
                    </nuxt-link>
                    <nuxt-link to="/bookings" class="sidebar-item" :class="{ 'active': pageParams.startsWith('/bookings') }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="m17.275 20.25l3.475-3.45l-1.05-1.05l-2.425 2.375l-.975-.975l-1.05 1.075l2.025 2.025ZM6 9h12V7H6v2Zm12 14q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23ZM3 22V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v6.675q-.475-.225-.975-.375T19 11.075V5H5v14.05h6.075q.125.775.388 1.475t.687 1.325L12 22l-1.5-1.5L9 22l-1.5-1.5L6 22l-1.5-1.5L3 22Zm3-5h5.075q.075-.525.225-1.025t.375-.975H6v2Zm0-4h7.1q.95-.925 2.213-1.463T18 11H6v2Zm-1 6.05V5v14.05Z" />
                        </svg>
                        Bookings
                    </nuxt-link>
                    <nuxt-link to="/userInfors" class="sidebar-item" :class="{ 'active': pageParams.startsWith('/userInfors') }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="m9.83 18l.59.59L12 20.17l1.59-1.59l.58-.58H19V4H5v14h4.83zM12 5c1.65 0 3 1.35 3 3s-1.35 3-3 3s-3-1.35-3-3s1.35-3 3-3zM6 15.58C6 13.08 9.97 12 12 12s6 1.08 6 3.58V17H6v-1.42z" opacity=".3"/>
                            <path fill="currentColor" d="m9 20l3 3l3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4zM5 4h14v14h-4.83l-.59.59L12 20.17l-1.59-1.59l-.58-.58H5V4zm7 7c1.65 0 3-1.35 3-3s-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1zm6 8.58c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V17h12v-1.42zM8.48 15c.74-.51 2.23-1 3.52-1s2.78.49 3.52 1H8.48z"/>
                        </svg>
                        UserInfors
                        <div v-if="countRequest?.count != 0" class="count">
                            <p>{{ countRequest?.count }}</p>
                        </div>
                    </nuxt-link>
                    <nuxt-link to="/calendars" class="sidebar-item" :class="{ 'active': pageParams.startsWith('/calendars') }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8 14q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm4 0q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm4 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10Z"/>
                        </svg>
                        Calendars
                    </nuxt-link> -->
                </div>

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
        collapseSidebar() {
            const sidebarEle = this.$refs.sidebarEle;
            console.log(sidebarEle)
            if (sidebarEle) {
                if (sidebarEle.classList.contains("collapse")) {
                    sidebarEle.classList.remove("collapse")
                } else {
                    sidebarEle.classList.add("collapse")
                }
            }
        },
        
    }
}
</script>
<style scoped>
.count {
    color: #ffff;
    width: 20px;
    height: 20px;
    background-color: var(--primary-color);
    /* display: flex;
    justify-content: center;
    align-items: center; */
    font-weight: 600;
    border-radius: 190px;
    padding: 6px 0;

}

.count p {
    font-size: 14px;
    line-height: 10px;
    text-align: center;
    
}
.sidebar-element {
    width: 280px;
}

.sidebar-main {
    width: 280px;
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    background: #ffffff;
    padding-top: 16px;
    transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    overflow-x: hidden;
    z-index: 501;
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    margin-bottom: 20px;
}

.header-logo {
    width: 144px;
    object-fit: cover;
    height: 100px;
}

.collapse-btn {
    height: 44px;
    width: 44px;
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
}

.collapse-btn:hover {
    height: 44px;
    width: 44px;
    cursor: pointer;
    background: aliceblue;
    border-radius: 50%;
}

.dashboard-title {
    margin-left: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 12px */
    color: #959FA3;
    margin-bottom: 8px;
}

.sidebar-item {
    display: flex;
    gap: 15px;
    padding: 10px 24px;
    align-items: center;
    width: 280px;
    color: #626C70;
    text-decoration: none;
    border-left: 3px solid transparent;
}

.sidebar-item:hover {
    cursor: pointer;
    background: #F0F6FF;
    transition: 0.2s;
}

.active {
    background: #F0F6FF;
    border-left: 3px solid #0E5FD9;
    color: #191B1C;
}

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