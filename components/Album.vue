<template>
  <div>
    <button class="btn btn-primary add-photo-btn" v-if="currentAlbum" @click="toggleModal">Add Photo</button>
    <div class="album-box" v-if="photos">
      <Item v-for="photo of photos" :key="photo.id" :photo="photo" />
    </div>
    <div class="alert alert-primary my-2" v-if="currentAlbum && !photos.length">Album is empty</div>
    <AddPhotoModal v-if="openModal" @toggle="toggleModal" />
  </div>
</template>

<script>
import Item from "~/components/Item.vue";
import AddPhotoModal from "~/components/AddPhotoModal.vue";

export default {
  components: {
    Item,
    AddPhotoModal
  },
  data() {
    return {
      openModal: false
    };
  },
  computed: {
    photos() {
      return this.$store.getters["photos"];
    },
    currentAlbum() {
      return this.$store.getters["currentAlbum"];
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

<style>
.album-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
}
.add-photo-btn {
  margin: 20px 0;
}
</style>
