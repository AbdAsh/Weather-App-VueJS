<template>
  <div class="container">
    <div class="arrow-container" @click.prevent="prevDay">
      <img class="flipped" src="../assets/next.png" alt="Left" />
    </div>
    <div class="hourly-forecast">
      <div
        v-for="(result, i) in hourlyForecast"
        :key="i"
        class="hour-container"
        :class="i == selected ? 'selected' : ''"
        @click="selectDay(i)"
      >
        <div class="hour">
          <p>
            <b>{{ new Date(result.dt * 1000).getHours() }}</b
            >00
          </p>
          <div>
            <img
              :src="`https://openweathermap.org/img/wn/${result.weather[0].icon}.png`"
              alt="Weather Icon"
            />
            <p>{{ result.temp }}&deg;</p>
          </div>
          <div>
            <img
              height="25"
              width="25"
              src="../assets/water.png"
              alt="Weather Icon"
            />
            <p>{{ result.humidity }}%</p>
            <div
              class="wind"
              :style="{ transform: `rotate(${result.wind_deg + 45}deg)` }"
            >
              <span
                class="wind-text"
                :style="{ transform: `rotate(-${result.wind_deg + 45}deg)` }"
                >{{ new Number(result.wind_speed).toFixed(0) }}</span
              >
            </div>
          </div>
        </div>
        <div v-if="i == selected" class="details"></div>
      </div>
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
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    nextDay() {
      let limit = this.hourlyForecast.length - 1;
      if (this.selected < limit) {
        this.selected++;
      }
    },
    prevDay() {
      if (this.selected > 0) {
        this.selected--;
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
    .hour-container {
      transform: rotateX(180deg);
      -ms-transform: rotateX(180deg); /* IE 9 */
      -webkit-transform: rotateX(180deg);
      display: flex;
      width: fit-content;
      max-width: 25rem;
      height: 100%;
      background-color: #fff;
      margin: 0 1px;
      &.selected {
        border-top: 5px solid greenyellow;
      }
      .hour {
        min-width: 5rem;
        width: 5rem;
        max-width: 5rem;
        height: 95%;
        border-radius: 1px;
        margin: 0 1px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        color: #2c3e50;
        width: 5rem;
        margin-bottom: 20px;
        .wind {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background-image: url("../assets/wind-arrow.png");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          background-position-x: 5px;
          background-position-y: -5px;
          transform: rotate(90deg);
          .wind-text {
            appearance: none;
          }
        }
      }
      .details {
        position: relative;
        min-width: 20rem;
        height: 100%;
        background-color: rgb(226, 225, 225);
      }
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
