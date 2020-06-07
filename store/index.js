export const state = () => ({
  albums: [],
  photos: [],
  loaded: true,
  error: "",
  currentAlbum: null
});

export const mutations = {
  setAlbums(state, albums) {
    state.albums = albums;
    state.loaded = true;
    state.error = "";
  },
  addAlbum(state, album) {
    state.albums = [album, ...state.albums];
    state.loaded = true;
    state.error = "";
  },
  setPhotos(state, { data, id }) {
    state.photos = data;
    state.loaded = true;
    state.error = "";
    state.currentAlbum = id;
  },
  deletePhoto(state, id) {
    state.photos = state.photos.filter(item => item.id != id);
    state.loaded = true;
    state.error = "";
  },
  addPhoto(state, photo) {
    state.photos = [photo, ...state.photos];
    state.loaded = true;
    state.error = "";
  },
  setLoader(state) {
    state.loaded = false;
  },
  setError(state, error) {
    state.error = error;
    state.loaded = true;
  }
};

export const actions = {
  async getAlbums({ commit }) {
    try {
      commit("setLoader");
      const { data } = await this.$axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      commit("setAlbums", data);
    } catch (e) {
      commit("setError", e.message);
    }
  },
  async getPhotos({ commit }, id) {
    try {
      commit("setLoader");
      const { data } = await this.$axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
        // `https://jsonplaceholder.typicode.com/photos`
      );
      commit("setPhotos", { data, id });
    } catch (e) {
      commit("setError", e.message);
    }
  },
  async deletePhoto({ commit }, id) {
    try {
      commit("setLoader");
      // await this.$axios.delete(
      //   `https://jsonplaceholder.typicode.com/photos/${id}`
      // );
      commit("deletePhoto", id);
    } catch (e) {
      commit("setError", e.message);
    }
  },
  async addPhoto({ commit }, data) {
    try {
      commit("setLoader");
      // await this.$axios.post(
      //   `https://jsonplaceholder.typicode.com/photos`, data
      // );
      commit("addPhoto", data);
    } catch (e) {
      commit("setError", e.message);
    }
  },
  async addAlbum({ commit }, data) {
    try {
      commit("setLoader");
      // const { data } = await this.$axios.post(
      // "https://jsonplaceholder.typicode.com/albums"
      // );
      commit("addAlbum", data);
    } catch (e) {
      commit("setError", e.message);
    }
  }
};

export const getters = {
  albums: s => s.albums,
  photos: s => s.photos,
  loaded: s => s.loaded,
  error: s => s.error,
  currentAlbum: s => s.currentAlbum
};
