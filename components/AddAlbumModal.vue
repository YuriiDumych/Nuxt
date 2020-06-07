<template>
  <div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Album</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="toggle()"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form action>
            <input type="text" placeholder="Title" class="form-control my-2" v-model="title" />
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="toggle()"
          >Close</button>
          <button type="submit" class="btn btn-primary" @click="handleSubmit" :disabled="!title">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    handleSubmit(e) {
      this.$store.dispatch("addAlbum", {
        title: this.title,
        id: Math.round(Math.random() * 10e5)
      });
      this.$emit("toggle");
    }
  }
};
</script>
<style>
.modal-dialog {
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
