<template>
  <div class="container">
    <div class="arrow-container" @click.prevent="prevDay">
      <img class="flipped" src="../assets/next.png" alt="Left" />
    </div>
    <div class="hourly-forecast">
      <div
        v-for="(result, i) in hourlyForecast"
        :key="i"
        class="hour"
        @click="selectDay(i)"
      ></div>
    </div>
    <div class="arrow-container" @click.prevent="nextDay">
      <img src="../assets/next.png" alt="Right" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hourlyForecast: {
      type: Array,
      required: true,
    },
  },
  methods: {
    nextDay() {
      let selected = this.$store.state.selectedDay;
      let limit = this.$store.state.searchResults.length - 1;
      console.log(selected);
      if (selected < limit) {
        this.$store.dispatch("setSelectedDay", selected + 1);
      }
    },
    prevDay() {
      let selected = this.$store.state.selectedDay;
      console.log(selected);
      if (selected > 0) {
        this.$store.dispatch("setSelectedDay", selected - 1);
      }
    },
  },
  mounted() {
    // console.log(this.hourlyForecast);
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 30rem;
  .hourly-forecast {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: calc(100% - 4rem);
    height: 100%;
    background-color: rgb(228, 228, 228);
    margin: 1px;
    overflow-x: scroll;
    overflow-y: hidden;
    transform: rotateX(180deg);
    -ms-transform: rotateX(180deg); /* IE 9 */
    -webkit-transform: rotateX(180deg);

    &::-webkit-scrollbar {
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: lightgrey;
      // box-shadow: 0px 1px 0 2px #6f6f6f, inset 0px 2px 0 1px rgba(255, 255, 255, 0.7), inset 0px -1px 0 1px rgba(140, 140, 140, 0.5), -3px 3px 10px 0 rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    }
    .hour {
      transform: rotateX(180deg);
      -ms-transform: rotateX(180deg); /* IE 9 */
      -webkit-transform: rotateX(180deg);
      min-width: 5rem;
      width: 5rem;
      max-width: 5rem;
      height: 100%;
      border-radius: 1px;
      background-color: #fff;
      margin: 0 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      color: #2c3e50;
    }
  }
  .arrow-container {
    width: 2rem;
    height: 20%;
    background-color: rgb(92, 92, 92);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      &.flipped {
        transform: rotate(180deg);
      }
      width: 1.5rem;
      height: 1.5rem;
      filter: invert(1);
    }
  }
}
</style>
