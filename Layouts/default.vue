<template>
    <div>
        <TopNavBar/>
        <div class="body-container">
            <SideBar />
            <div class="nuxt-container">
                <Nuxt />
            </div>
        </div>
    </div>
</template>
<script>
    import TopNavBar from '~/components/Layouts/TopNavBar';
    import SideBar from '~/components/Layouts/SideBar.vue';
    export default {
        components: {
            SideBar,
            TopNavBar
        },
    }
</script>
<style scoped lang="css">
.body-container {
    display: flex;  
    margin-left: 100px;
    padding: 24px;
}
.nuxt-container {
    width: 100%;
}
</style>