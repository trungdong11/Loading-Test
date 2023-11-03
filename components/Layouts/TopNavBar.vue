<template>
    <div class="nav-bar-container">
        <div class="nav-bar-main">
            <div></div>
            <div class="nav-bar-item-left">
                <div class="admin-info">
                    <img class="nav-bar-avatar" @click="isShowPopupSettings = true"
                        src="https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Programmer-512.png" alt="">
                    <div class="popup-settings-container" v-if="isShowPopupSettings">
                        <div class="overlay-settings" @click="isShowPopupSettings = false"></div>
                        <div class="popup-main">
                            <div class="setting-item">
                                <!-- <img src="~/assets/svg/changePassword.svg"> -->
                                <p>Change password</p>
                            </div>
                            <div class="setting-item" @click="logout">
                                <!-- <img src="~/assets/svg/logOut.svg"> -->
                                <p>Đăng xuất</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShowPopupSettings: false
        }
    },
    methods: {
    // async logout {
    //   await this.$auth.logout()
    //   this.$router.push(`/login`)
    // ,
  },
}
</script>

<style scoped>
.nav-bar-container {
    height: 72px;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    z-index: 500;
}

.nav-bar-main {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    width: 100%;
}
.admin-info {
    position: relative;
}

.nav-bar-avatar {
    cursor: pointer;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
}

.popup-settings-container {
    position: absolute;
    right: 0;
    width: 200px;
}
.overlay-settings {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
}
.popup-main {
    position: relative;
    z-index: 1;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    border-radius: 3px;
    box-shadow: var(--box-shadow);
}
.setting-item {
    display: flex;
    align-items: center;
    padding: 9px 14px;
    gap: 10px;
}
.setting-item:hover {
    background: var(--hover-bg-color);
    transition: 0.2s;
    cursor: pointer;
}

</style>