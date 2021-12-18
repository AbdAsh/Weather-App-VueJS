import { createStore } from "vuex";
// import axios from "axios";
import test from "../assets/test.json";
export default createStore({
  state: {
    search: "istanbul",
    selectedDay: 0,
    searchResults: test.daily,
    hourlyForecast: test.hourly,
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
    setHourlyForecast(state, hourlyForecast) {
      state.hourlyForecast = hourlyForecast;
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
      //         `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${key}`
      //       )
      //       .then((res) => {
      //         console.log(res.data);
      //         commit("setSearchResults", res.data.daily);
      //         commit("setHourlyForecast", res.data.hourly);
      //       });
      //   });
      // console.log(test);
      commit("setSearchResults", test.daily);
      commit("setHourlyForecast", test.hourly);
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
    getHourlyForecast(state) {
      let index = state.selectedDay;
      return state.hourlyForecast.filter(
        (e) =>
          new Date(e.dt * 1000).toLocaleDateString() ==
          new Date(state.searchResults[index].dt * 1000).toLocaleDateString()
      );
    },
  },
  modules: {},
});
