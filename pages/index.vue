<template>
  <div class="container">
    <div>
      <Select />
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <Album />
    </div>

    <div class="spinner-box" v-if="!loaded">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import Select from "~/components/Select.vue";
import Album from "~/components/Album.vue";

export default {
  components: {
    Select,
    Album
  },
  async fetch({ store }) {
    if (!store.getters["albums"].length) {
      await store.dispatch("getAlbums");
    }
  },
  computed: {
    albums() {
      return this.$store.getters["albums"];
    },
    loaded() {
      return this.$store.getters["loaded"];
    },
    error() {
      return this.$store.getters["error"];
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.spinner-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>
