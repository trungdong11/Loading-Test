export const actions = {
    async fetchData({ commit }, { virtual_users, iterations, url, ramp_up, durations, requestBody }) {
      try {
        console.log("dong")
        const starttime = new Date(performance.now())
        console.log(starttime, "starttime")
        this.$axios({
          url: `http://localhost:8080/api/v1/http-methods/get?virtual_users=${virtual_users}&iterations=${iterations}&url=${url}&ramp_up=${ramp_up}&durations=${durations}`,
          data: requestBody,
          headers: {
            'accept': '*',
            'content-type': 'application/json'
          },
          method: 'POST',
          onDownloadProgress: progressEvent => {
            const xhr = progressEvent?.target
            const dataString = xhr.responseText.replace(/data:/g, '');
            const lines = dataString.split('\n');
            const filteredArray = lines.filter(obj => Object.keys(obj).length > 0);
            const Arr = filteredArray.map(line => JSON.parse(line));
            console.log(Arr, "tết")
            const endTime = new Date(performance.now());
            console.log(endTime, "endtime")
            commit('setApiData', Arr);

          }
        }).then(({ data }) => Promise.resolve(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  };