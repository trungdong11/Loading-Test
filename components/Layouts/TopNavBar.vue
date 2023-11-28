 <template>
    <div class="nav-bar-container">
        <div class="nav-bar-main">
            <div class="container__header">
                <h2>PBL WebSite Load Test</h2>
                <!-- <p>Enter a URL to test the page load time, analyze it, and find bottlenecks.</p> -->
            </div>
            <div class="container__input">
              <h4>Select option for test your Website</h4>
              <select name="LeaveType" class="form-control" v-model="optionSelected" @change="changeOption">
                <option value="TestLoading">Test Loading</option>
                <option value="TestJDBC">Test JDBC</option>
                <option value="3">Apache Jmeter</option>
                <option value="4">Burp Suite</option>
              </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
          optionSelected: null,

        }
    },
    created() {
      console.log(this.optionSelected, "dong")
    },
    methods: {
      changeOption() {
        this.$router.push(`/${this.optionSelected}`);
      }
  },
}
</script>

<style scoped lang="scss">
.nav-bar-container {
    background: #000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    color: #ffff;
    z-index: 500;
    //margin-left: 100px;
    
}


.container__header {
    text-align: center;
    padding: 36px 0 0 0;
    color: #ffff;
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

.container__input {
  margin: 24px 0;
  text-align: center;

  h4 {
    font-size: 24px;
    color: #ffff;
    font-weight: 500;
    }

  select {
    height: 42px;
    border-radius: 8px;
    margin-top: 16px;
    width: 100%;
    padding: 0 18px;
    font-size: 18px;
    font-weight: 500;
    color: #000;

    option {
      font-size: 16px;
      color: #000;
      border-radius: 8px;
      
    }
  }
}


</style> 

