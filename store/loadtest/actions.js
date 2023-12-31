export const actions = {
    async fetchDataGet({ commit }, { method, virtual_users, iterations, url, ramp_up, durations, requestBody, requestBodyPost, keepAlive }) {
      try {
        console.log("dong")
        const newObject = {
          ...requestBody, 
          ...requestBodyPost
        }
        this.$axios({
          url: `http://36.50.134.89:8080/api/v1/http-methods/${method}?virtual_users=${virtual_users}&iterations=${iterations}&url=${url}&ramp_up=${ramp_up}&durations=${durations}&is_keep_alive=${keepAlive}`,
          data: newObject,
          method: 'POST',
          onDownloadProgress: progressEvent => {
              const xhr = progressEvent?.target
              console.log(xhr)
              const dataString = xhr.responseText.replace(/data:/g, '');
              console.log(dataString)
              const lines = dataString.split('\n');
              console.log(lines)
              const filteredArray = lines.filter(obj => Object.keys(obj).length > 0);
              console.log(filteredArray)
              const Arr = filteredArray.map(line => JSON.parse(line));
              console.log(Arr, "tết")
              commit('setApiData', Arr);

          }
        }).then(({ data }) => Promise.resolve(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchDataPost({ commit }, {option_post, virtual_users, iterations, url, ramp_up, durations, requestBody, requestBodyPost, keep_alive}) {
      try {
        const newObject = {
          ...requestBody, 
          ...requestBodyPost
        } 
        this.$axios({
          url: `http://36.50.134.89:8080/api/v1/http-methods/post/${option_post}?virtual_users=${virtual_users}&iterations=${iterations}&url=${url}&ramp_up=${ramp_up}&durations=${durations}&is_keep_alive=${keep_alive}`,
          data: newObject,
          headers: {
            'accept': '*',
            'content-type': 'application/json'  
          },
          method: 'POST',
          onDownloadProgress: progressEvent => {
            try { 
              const xhr = progressEvent?.target
              const dataString = xhr.responseText.replace(/data:/g, '');
              const lines = dataString.split('\n');
              const filteredArray = lines.filter(obj => Object.keys(obj).length > 0);
              const Arr = filteredArray.map(line => JSON.parse(line));
              console.log(Arr, "tết")
              commit('setApiData', Arr);
            }
            catch(error) {
              console.log(error, "loi")
            }
          }
        }).then(({ data }) => Promise.resolve(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchDataJDBC({ commit }, {url, jdbc_driver_class, username, password, sql_statement, virtual_users, iterations, ramp_up, durations}) {
      try {
        this.$axios({
          url: `http://36.50.134.89:8080/api/v1/jdbc-request/?database_url=${url}&jdbc_driver_class=${jdbc_driver_class}&username=${username}&password=${password}&sql_statement=${sql_statement}&virtual_users=${virtual_users}&iterations=${iterations}&ramp_up=${ramp_up}&duration=${durations}`,

          method: 'GET',
          onDownloadProgress: progressEvent => {
            const xhr = progressEvent?.target
            const dataString = xhr.responseText.replace(/data:/g, '');
            const lines = dataString.split('\n');
            const filteredArray = lines.filter(obj => Object.keys(obj).length > 0);
            const Arr = filteredArray.map(line => JSON.parse(line));
            console.log(Arr, "tết")
            commit('setApiData', Arr);

          }
        }).then(({ data }) => Promise.resolve(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  };