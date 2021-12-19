<template>
  <header>
    <div class="header-container">
      <div class="header-logo">
        <a href="/">
          <span>Weather</span>
        </a>
      </div>
      <div class="header-search">
        <input
          class="search-input"
          type="text"
          placeholder="Enter a city"
          @input="focus = true"
          @blur="defocus"
          v-model="search"
          @keypress.enter="searchWeather"
        />
        <img
          class="search-icon"
          src="../assets/search.png"
          alt="Search"
          @click.prevent="searchWeather"
        />
      </div>
    </div>
    <div v-if="focus" class="searchContainer">
      <ul v-for="(item, i) in items" :key="i" class="autocomplete-result-list">
        <div @click.prevent="searchWeather(item.name)" class="item-container">
          {{ item.name }}
        </div>
      </ul>
    </div>
  </header>
</template>

<script>
import Countries from "../assets/Countries.json";
export default {
  name: "Header",
  data() {
    return {
      search: "",
      focus: false,
      countries: Countries,
    };
  },
  methods: {
    searchWeather(data) {
      data
        ? (this.$store.dispatch("setSearch", data), (this.search = data))
        : this.$store.dispatch("setSearch", this.search);
    },
    defocus() {
      setTimeout(() => {
        this.focus = false;
      }, 300);
    },
  },
  computed: {
    items() {
      return this.countries.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px;
  height: 1rem;
  background-color: rgb(35, 83, 146);
  .header-logo {
    a {
      margin-right: 30px;
      color: #fff;
      text-decoration: none;
      span {
        font-size: 2rem;
        text-transform: uppercase;
      }
    }
  }
  .header-search {
    display: flex;
    border: none;
    border-radius: 0;
    padding: 10px;
    width: 100%;
    background-color: #fff;
    color: #2c3e50;
    font-size: 1.2rem;
    input {
      border: none;
      border-radius: 0;
      padding: 0;
      width: 100%;
      background-color: #fff;
      color: #2c3e50;
      font-size: 1.2rem;
      outline: none;
    }
    img {
      width: 20px;
      height: 20px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
.searchContainer {
  position: absolute;
  max-height: 20rem;
  overflow-y: auto;
  margin-left: 215px;
  margin-right: 30px;
  width: calc(100% - 245px);
  &::-webkit-scrollbar {
    width: 10px;
  }
  .autocomplete-result-list {
    position: relative;
    z-index: 5;
    color: grey;
    background-color: rgb(235, 232, 232);
    padding: 2px 0;
    list-style-type: none;
    margin: 0;
    height: 100%;
    .item-container {
      display: flex;
      align-items: center;
      line-height: 2vw;
      cursor: pointer;
      font-size: 1rem;
      padding: 0 10px;
      &:hover {
        background-color: white;
        box-shadow: -1px 1px 5px #ddd;
        margin-left: 1px;
      }
      img {
        margin-right: 10px;
        width: 20px;
      }
    }
  }
}
</style>
