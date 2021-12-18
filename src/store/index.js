import { createStore } from "vuex";
// import axios from "axios";
import test from "../assets/test.json";
export default createStore({
  state: {
    search: "istanbul",
    selectedDay: 0,
    searchResults: test,
  },
  mutations: {
    setSearchResults(state, searchResults) {
      state.searchResults = searchResults;
    },
    setSearch(state, search) {
      state.search = search;
    },
    setSelectedDay(state, selectedDay) {
      state.selectedDay = selectedDay;
    },
  },
  actions: {
    setSearch({ commit }, search) {
      commit("setSearch", search);
      // const key = "91a329e45056e46f276886ccfa278897";
      // axios
      //   .get(
      //     `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`
      //   )
      //   .then((res) => {
      //     console.log(res.data.coord);
      //     var coord = res.data.coord;
      //     axios
      //       .get(
      //         `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=hourly&appid=${key}`
      //       )
      //       .then((res) => {
      //         console.log(res.data.daily);
      //         commit("setSearchResults", res.data.daily);
      //       });
      //   });
      console.log(test);
      commit("setSearchResults", test);
    },
    setSelectedDay({ commit }, selectedDay) {
      commit("setSelectedDay", selectedDay);
    },
  },
  getters: {
    getSearchResults(state) {
      return state.searchResults;
    },
    getSearch(state) {
      return state.search;
    },
    getSelectedDay(state) {
      return state.selectedDay;
    },
  },
  modules: {},
});
