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
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchWeather() {
      this.$store.dispatch("setSearch", this.search);
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
</style>
