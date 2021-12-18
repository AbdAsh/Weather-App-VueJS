import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    search: "",
    searchResults: "",
  },
  mutations: {
    setSearchResults(state, searchResults) {
      state.searchResults = searchResults;
    },
  },
  actions: {
    setSearch({ commit }, search) {
      const key = "91a329e45056e46f276886ccfa278897";
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`
        )
        .then((res) => {
          console.log(res.data.coord);
          var coord = res.data.coord;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=hourly&appid=${key}`
            )
            .then((res) => {
              console.log(res.data.daily);
              commit("setSearchResults", res.data.daily);
            });
        });
    },
  },
  modules: {},
});
