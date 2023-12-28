 <template>
    <div class="nav-bar-container">
      <div class="top__nav">
        <h2>
          <span>PBL</span>LoadTest
        </h2>
        <div class="top__nav__right">
          <span>
            <img src="~assets/icons/notify.svg" alt="">
          </span>
          <span>
            <img src="~assets/icons/question.svg" alt="">
          </span>
          <span>
            <img src="~assets/icons/person.svg" alt="">
          </span>
          
        </div>
      </div>
        <!-- <div class="nav-bar-main"> -->
            <!-- <div 
            class="container__header"
            >
                <h2>PBL WebSite Load Test</h2>
                <p>Enter a URL to test the page load time, analyze it, and find bottlenecks.</p>
            </div>
            <div class="container__input">
              <h4>Select option for test your Website</h4>
              <select name="LeaveType" class="form-control" v-model="optionSelected" @change="changeOption">
                <option value="TestLoading" selected>Test Loading</option>
                <option value="TestJDBC">Test JDBC</option>
                <option value="TestPost">Burp Suite</option>
              </select>
            </div> -->
            
        <!-- </div>  -->
    </div>
</template>

<script>
export default {
    data() {
        return {
          // optionSelected: "resultTest",
          isHiddenHeader: true,
        }
    },
    created() {
      //console.log(this.optionSelected, "dong")
      // this.changeOption();
    },
    methods: {
      // changeOption() {
      //   this.$router.push(`/${this.optionSelected}`);
      // },
  },
}
</script>

<style scoped lang="scss">
.nav-bar-container {
    background: #f3f3f3;
    //position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    color: #ffff;
    z-index: 500;
    height: 60px;
    //margin-left: 100px;
    
}

.top__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 150px;
  margin-right: 40px;
  
  h2 {
    font-size: 26px;
    color: #646566;
    margin: 0;
    font-weight: 600;
    span {
      color: var(--primary-1);
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10000px;
      border: 1px solid #e4e4e5;
      cursor: pointer;
      width: 36px;
      height: 36px;
      background-color: #ffff;
    }

    span:hover {
      background-color: #b9b7b7;
      border: 1px solid #ffff;
      color: #ffff;
    }

    img {
      width: 18px;
      height: 18px;
    }
  }
}


</style> 

