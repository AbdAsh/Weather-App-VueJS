<template>
  <Header />
  <div
    v-if="search"
    class="top-part"
    :style="{
      backgroundImage: `url(https://s7d2.scene7.com/is/image/TWCNews/stars_png`,
    }"
  >
    <div class="title">
      <h1>{{ search }}</h1>
      <span> Add to my favorites</span>
    </div>
    <Tabs :searchresults="searchResults" :selected="selected" />
    <!-- <div class="spacer" /> -->
    <HourlyForecast :hourlyForecast="hourlyForecast" />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Tabs from "../components/Tabs.vue";
import HourlyForecast from "../components/HourlyForcast.vue";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Header,
    Tabs,
    HourlyForecast,
  },
  computed: {
    ...mapGetters({
      search: "getSearch",
      searchResults: "getSearchResults",
      selected: "getSelectedDay",
      hourlyForecast: "getHourlyForecast",
    }),
  },
};
</script>

<style lang="scss" scoped>
.top-part {
  height: 15rem;
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 30px 30px;
    height: 1rem;
    text-transform: capitalize;
    h1 {
      padding: 0 10px;
      color: white;
    }
    span {
      padding: 5px 10px;
      color: white;
      font-size: 0.75rem;
      border-radius: 5px;
      background-color: #000000c7;
      cursor: pointer;
    }
  }
  .spacer {
    height: 0.5rem;
    background-color: #2c3e5038;
    margin: 0 calc(2rem + 30px);
  }
}
</style>
