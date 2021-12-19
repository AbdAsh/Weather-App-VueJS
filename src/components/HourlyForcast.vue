<template>
  <div class="container">
    <div
      class="arrow-container"
      :class="selected < 1 ? 'disabled' : ''"
      @click.prevent="prevHour"
    >
      <img class="flipped" src="../assets/next.png" alt="Left" />
    </div>
    <div class="hourly-forecast">
      <div
        v-for="(result, i) in hourlyForecast"
        :key="i"
        class="hour-container"
        :class="i == selected ? 'selected' : ''"
        @click="selectHour(i)"
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
            <p>{{ new Number(result.pop * 100).toFixed(2) }}%</p>
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
        <div v-if="i == selected" class="details">
          <p class="main">{{ result.weather[0].description }}</p>
          <div>
            <p>
              Humidity: <b>{{ result.humidity }}%</b>
            </p>
            <p>
              Pressure: <b>{{ result.pressure }}mb</b>
            </p>
            <p>
              Visibility:
              <b>{{ result.visibility > 500 ? "Clear" : "Foggy" }}</b>
            </p>
            <div class="spacer"></div>
            <p>
              Temprature feels like <b>{{ result.feels_like }}&deg;</b>
            </p>
            <div class="spacer"></div>
            <p>
              {{
                result.pop > 50
                  ? "High chance of precipitation"
                  : "Low chance of precipitation"
              }}
            </p>
            <div class="spacer"></div>
            <p>
              A
              {{ result.wind_speed > 10 ? "strong wind" : "gentle breeze" }}
              from the
              {{ result.wind_deg > 180 ? "south" : "north" }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="arrow-container"
      :class="selected < hourlyForecast.length - 1 ? '' : 'disabled'"
      @click.prevent="nextHour"
    >
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
    nextHour() {
      let limit = this.hourlyForecast.length - 1;
      if (this.selected < limit) {
        this.selected++;
      }
    },
    prevHour() {
      if (this.selected > 0) {
        this.selected--;
      }
    },
    selectHour(hour) {
      this.selected = hour;
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
    background-color: rgb(233, 235, 225);
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
      cursor: pointer;
      &.selected {
        border-top: 5px solid lightgreen;
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: relative;
        min-width: 20rem;
        height: 100%;
        background-color: rgb(226, 225, 225);
        text-transform: capitalize;
        text-align: left;
        .main {
          font-size: 1.5rem;
          font-weight: bold;
          width: 75%;
        }
      }
    }
  }
  .arrow-container {
    &.disabled {
      background-color: rgba(160, 160, 160, 0.432);
      cursor: default;
    }
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
  .spacer {
    width: 100%;
    border-bottom: 1px lightgrey solid;
  }
}
</style>
