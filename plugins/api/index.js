import {
    httpProtocols, 
    httpsProtocols,
  } from '~/api'
  console.log(httpsProtocols)
  export default (context, inject) => {
    // Initialize API factories
    const factories = {
     httpProtocol: httpProtocols(context.$axios),
     httpsProtocol: httpsProtocols(context.$axios),
    }
    // Inject $api
    inject('api', factories)
  } 