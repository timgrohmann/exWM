import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    db: null,
  },
  mutations: {
    setDB(state, db) {
      state.db = db
    }
  },
  actions: {

  }
})
