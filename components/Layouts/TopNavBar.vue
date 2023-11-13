 <template>
    <div class="nav-bar-container">
        <div class="nav-bar-main">
            <div class="container__header">
                <h2>PBL WebSite Load Test</h2>
                <p>Enter a URL to test the page load time, analyze it, and find bottlenecks.</p>
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
    methods: {
    // async logout {
    //   await this.$auth.logout()
    //   this.$router.push(`/login`)
    // ,
  },
}
</script>

<style scoped lang="scss">
.nav-bar-container {
    background: #fff000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    z-index: 500;
    margin-left: 100px;
    
}


.container__header {
    text-align: center;
    padding: 36px 0;
    color: #000;
    h2{
      font-size: 42px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    p {
      font-size: 20px;
      font-weight: 400;
    }
  }

</style> 

