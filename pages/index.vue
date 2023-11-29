<template>
  <div>
      <TopNavBar/>
      <div class="body-container">
          <!-- <SideBar />  -->
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
          // SideBar, 
          TopNavBar
      },
  }
</script>
<style scoped>
.body-container {
  display: flex;  
}
.nuxt-container {
  margin-top: 215 px;
  padding: 20px;
  width: 100%;
}
</style>