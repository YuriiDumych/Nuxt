<template>
  <div class="select-box mt-5 mb-2">
    <select @change="onChange" class="form-control">
      <option>--</option>
      <option v-for="album of albums" :key="album.id" :value="album.id">{{ album.title }}</option>
    </select>
    <button class="btn btn-primary add-album-btn my-3" @click="toggleModal">Add Album</button>
    <AddAlbumModal v-if="openModal" @toggle="toggleModal" />
  </div>
</template>

<script>
import AddAlbumModal from "~/components/AddAlbumModal.vue";

export default {
  components: {
    AddAlbumModal
  },
  data() {
    return {
      openModal: false
    };
  },
  async fetch({ store }) {
    if (!store.getters["albums"].length) {
      await store.dispatch("getAlbums");
    }
  },
  computed: {
    albums() {
      return this.$store.getters["albums"];
    }
  },
  methods: {
    onChange(event) {
      this.$store.dispatch("getPhotos", event.target.value);
    },
    toggleModal() {
      this.openModal = !this.openModal;
    }
  }
};
</script>
