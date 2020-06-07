<template>
  <div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Photo</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="toggle"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form action>
            <div class="form-group image-input">
              <label class="label">
                Choose file ...
                <input
                  type="file"
                  hidden
                  accept=".jpg, .jpeg, .gif, .png, .svg"
                  class="form-control my-2"
                  @change="changeFileInput"
                />
              </label>
              <img v-if="thumbnailUrl" :src="thumbnailUrl" alt="alt" />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Title"
                class="form-control my-2"
                v-model="title"
                @input="resetError"
              />
            </div>
          </form>
        </div>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="toggle">Close</button>
          <button
            type="submit"
            class="btn btn-primary"
            @click="handleSubmit"
            v-bind:disabled="!thumbnailUrl || !title"
          >Add</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      thumbnailUrl: "",
      title: "",
      error: ""
    };
  },
  computed: {
    photos() {
      return this.$store.getters["photos"];
    }
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    resetError() {
      if (this.error) {
        this.error = "";
      }
    },
    changeFileInput(e) {
      const file = e.target.files[0];
      this.thumbnailUrl = URL.createObjectURL(file);
    },
    handleSubmit(e) {
      const index = this.photos.findIndex(i => i.title == this.title);
      if (index > -1) {
        this.error = "Photo already exists";
      } else {
        this.$store.dispatch("addPhoto", {
          title: this.title,
          thumbnailUrl: this.thumbnailUrl,
          id: Math.round(Math.random() * 10e5)
        });
        this.$emit("toggle");
      }
    }
  }
};
</script>
<style>
.modal-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.label {
  cursor: pointer;
}
.image-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-input img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
