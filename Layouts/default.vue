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
    // import Header from '~/components/Layouts/Header';
    import SideBar from '~/components/Layouts/SideBar.vue';
    export default {
        components: {
            TopNavBar,
            SideBar
        },
    }
</script>
<style scoped>
.body-container {
    display: flex;  
}
.nuxt-container {
    margin-top: 72px;
    padding: 20px;
    width: 100%;
}
</style>