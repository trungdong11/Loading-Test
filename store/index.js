import loadtestModule from './loadtest';
import Vuex from 'vuex'


const createStore = () => {
  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
      loadtest: loadtestModule,
    },
  })
}

export default createStore
