export default {
  LOGGED_IN(state) {
    state.loggedIn = true;
  },
  LOGGED_OUT(state) {
    state.loggedIn = false;
  },
  SET_USER_TYPE(state, payload) {
    state.userType = payload;
  },
  SET_ID_TOKEN(state, payload) {
    state.idToken = payload;
  },
  SET_ACCESS_TOKEN(state, payload) {
    state.accessToken = payload;
  },
  SET_USER(state, payload) {
    state.user = {
      ...payload
    };
  }
}