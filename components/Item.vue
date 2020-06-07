<template>
  <div class="album-item">
    <button class="btn btn-sm text-danger x-btn" @click="deletePhoto(photo.id)">&times;</button>
    <img :src="photo.thumbnailUrl" alt />
    <p>{{ photo.title }}</p>
  </div>
</template>

<script>
export default {
  props: ["photo"],
  methods: {
    deletePhoto(id) {
      this.$store.dispatch("deletePhoto", id);
    }
  }
};
</script>

<style>
.album-item {
  position: relative;
  border: 2px solid;
  border-radius: 10px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.album-item img {
  width: 150px;
  height: 150px;
}
.album-item:hover .x-btn {
  display: block;
}
.x-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  display: none;
  font-size: 20px;
}
</style>
