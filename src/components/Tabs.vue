<template>
  <div class="container">
    <div class="tabs-container">
      <div
        class="arrow-container"
        :class="selected < 1 ? 'disabled' : ''"
        @click.prevent="prevDay"
      >
        <img class="flipped" src="../assets/next.png" alt="Left" />
      </div>
      <div class="days-container">
        <div
          v-for="(result, i) in searchresults"
          :key="i"
          class="day"
          :class="i == selected ? 'selected' : ''"
          @click="selectDay(i)"
        >
          <span class="day-text" :class="i == selected ? 'selected' : ''">
            {{ result.day }}
            {{ processDate(result.dt) }}
          </span>
          <div class="weather-container">
            <div class="summery">
              <img
                :src="`https://openweathermap.org/img/wn/${result.weather[0].icon}.png`"
                alt="Weather Icon"
              />
              <div class="temp-container">
                <p v-if="i == selected" class="top">low</p>
                <p v-else class="top bold">
                  {{ `${result.temp.max}&deg;` }}
                </p>
                <p class="bottom">{{ result.temp.min }}&deg;</p>
              </div>
            </div>
            <div v-if="i == selected" class="details">
              <span class="description">{{
                result.weather[0].description
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="arrow-container"
        :class="selected < searchresults.length - 1 ? '' : 'disabled'"
        @click.prevent="nextDay"
      >
        <img src="../assets/next.png" alt="Right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchresults: {
      type: Array,
      required: true,
    },
    selected: {
      type: Number,
      required: true,
    },
  },
  methods: {
    processDate(date) {
      let today = new Date();
      let currentDate = today.toLocaleDateString();
      let newDate = new Date(date * 1000).toLocaleDateString();
      return currentDate == newDate
        ? "Tonight"
        : new Date(newDate).toLocaleString("en-GB", {
            weekday: "short",
            day: "numeric",
          });
    },
    selectDay(day) {
      this.$store.dispatch("setSelectedDay", day);
    },
    nextDay() {
      if (this.selected < this.searchresults.length - 1) {
        this.$store.dispatch("setSelectedDay", this.selected + 1);
      }
    },
    prevDay() {
      if (this.selected > 0) {
        this.$store.dispatch("setSelectedDay", this.selected - 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  max-width: 100vw;
  height: 10.25rem;
  align-items: flex-end;
  margin: 0 30px;
  overflow: hidden;
  .tabs-container {
    display: flex;
    height: 6rem;
    width: 100%;
    justify-content: space-between;
    border-radius: 1px;
    .arrow-container {
      &.disabled {
        background-color: rgba(160, 160, 160, 0.432);
        cursor: default;
      }
      width: 2rem;
      height: 100%;
      background-color: rgb(13, 33, 145);
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
    .days-container {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      width: 100%;
      max-width: calc(100vw - 6rem - 30px);
      .day {
        &.selected {
          width: 30rem;
          height: 8rem;
          border-top: 5px solid greenyellow;
        }
        cursor: pointer;
        width: 15rem;
        height: 100%;
        background-color: white;
        border-radius: 1px;
        border: 0.5px solid #e6e6e6;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .day-text {
          &.selected {
            font-size: 1.5rem;
          }
          width: 90%;
          color: rgb(54, 54, 54);
          font-size: 1rem;
          text-transform: capitalize;
          text-align: left;
          padding: 5px;
        }
        .weather-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 60%;
          .summery {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: 5px;
            img {
              width: 65px;
              height: 65px;
            }
            .temp-container {
              p {
                &.top {
                  color: rgba(66, 66, 66, 0.815);
                  &.bold {
                    font-weight: bold;
                  }
                }
                width: 100%;
                color: rgb(54, 54, 54);
                font-size: 1rem;
                text-transform: capitalize;
                text-align: center;
                padding: 5px;
                margin: 0;
              }
            }
          }
          .details {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-left: 0.5px solid #e6e6e6;
            margin-bottom: 10px;
            .description {
              width: 100%;
              color: rgb(54, 54, 54);
              font-size: 1.2rem;
              text-transform: capitalize;
              text-align: center;
              padding: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
