import { createStore } from "vuex";

export default createStore({
  state: {
    search: "",
  },
  mutations: {
    setSearch(state, search) {
      state.search = search;
    },
  },
  actions: {
    setSearch({ commit }, search) {
      commit("setSearch", search);
    },
  },
  modules: {},
});
