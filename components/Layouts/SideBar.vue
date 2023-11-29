<template>
    <div class="sidebar-container">
        <div class="sidebar-element" ref="sidebarEle">
            <div class="sidebar-main">
                <div class="sidebar-header">
                    <!-- <img class="header-logo" src="~/assets/img/Logo-sgo.png" alt=""> -->
                    <div class="collapse-btn" @click="collapseSidebar()">
                    
                    </div>
                </div>
                <p class="dashboard-title">FEATURE</p>
                <div class="sidebar-list">
                    <nuxt-link to="/TestLoading" class="sidebar-item" :class="{ 'active': pageParams.startsWith('/TestLoading') }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M10.275 12q-.7 0-1.15-.525T8.8 10.25l.3-1.8q.2-1.075 1.013-1.763T12 6q1.1 0 1.913.688t1.012 1.762l.3 1.8q.125.7-.325 1.225T13.75 12h-3.475Zm-7.175.975q-.575.025-.988-.225t-.537-.775q-.05-.225-.025-.45t.125-.425q0 .025-.025-.1q-.05-.05-.25-.6q-.05-.3.075-.575T1.8 9.35l.05-.05q.05-.475.388-.8t.837-.325q.075 0 .475.1l.075-.025q.125-.125.325-.187T4.375 8q.275 0 .488.088t.337.262q.025 0 .038.013t.037.012q.35.025.612.212t.388.513q.05.175.038.338t-.063.312q0 .025.025.1q.175.175.275.388t.1.437q0 .1-.15.525q-.025.05 0 .1l.05.4q0 .525-.438.9t-1.062.375H3.1ZM20 13q-.825 0-1.413-.588T18 11q0-.3.088-.563t.237-.512l-.7-.625q-.25-.2-.088-.5T18 8.5h2q.825 0 1.413.588T22 10.5v.5q0 .825-.588 1.413T20 13ZM0 18v-1.575q0-1.1 1.113-1.763T4 14q.325 0 .625.013t.575.062q-.35.5-.525 1.075T4.5 16.375V18H0Zm6 0v-1.625q0-1.625 1.663-2.625t4.337-1q2.7 0 4.35 1T18 16.375V18H6Zm14-4q1.8 0 2.9.663t1.1 1.762V18h-4.5v-1.625q0-.65-.163-1.225t-.487-1.075q.275-.05.563-.062T20 14Z" />
                          </svg>
                        TestLoading
                    </nuxt-link>
                    <nuxt-link to="/TestJDBC" class="sidebar-item" :class="{ 'active': pageParams.startsWith('/TestJDBC') }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M10.275 12q-.7 0-1.15-.525T8.8 10.25l.3-1.8q.2-1.075 1.013-1.763T12 6q1.1 0 1.913.688t1.012 1.762l.3 1.8q.125.7-.325 1.225T13.75 12h-3.475Zm-7.175.975q-.575.025-.988-.225t-.537-.775q-.05-.225-.025-.45t.125-.425q0 .025-.025-.1q-.05-.05-.25-.6q-.05-.3.075-.575T1.8 9.35l.05-.05q.05-.475.388-.8t.837-.325q.075 0 .475.1l.075-.025q.125-.125.325-.187T4.375 8q.275 0 .488.088t.337.262q.025 0 .038.013t.037.012q.35.025.612.212t.388.513q.05.175.038.338t-.063.312q0 .025.025.1q.175.175.275.388t.1.437q0 .1-.15.525q-.025.05 0 .1l.05.4q0 .525-.438.9t-1.062.375H3.1ZM20 13q-.825 0-1.413-.588T18 11q0-.3.088-.563t.237-.512l-.7-.625q-.25-.2-.088-.5T18 8.5h2q.825 0 1.413.588T22 10.5v.5q0 .825-.588 1.413T20 13ZM0 18v-1.575q0-1.1 1.113-1.763T4 14q.325 0 .625.013t.575.062q-.35.5-.525 1.075T4.5 16.375V18H0Zm6 0v-1.625q0-1.625 1.663-2.625t4.337-1q2.7 0 4.35 1T18 16.375V18H6Zm14-4q1.8 0 2.9.663t1.1 1.762V18h-4.5v-1.625q0-.65-.163-1.225t-.487-1.075q.275-.05.563-.062T20 14Z" />
                          </svg>
                        TestJDBC
                    </nuxt-link>
                   
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
    width: 180px;
}

.sidebar-main {
    width: 180px;
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    background: #D1FAEC;
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
    width: 180px;
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