export const state = () => ({
  user: {},
  isSignedIn: false,
  baseFolder: null
});

export const getters = {};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_IS_SIGNED_IN(state, isSignedIn) {
    state.isSignedIn = isSignedIn;
  },
  SET_BASE_FOLDER(state, baseFolder) {
    state.baseFolder = baseFolder;
  }
};

export const actions = {};
