export const AUTH_ACTIONS = {
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT',
  SET_USER_TYPE: 'SET_USER_TYPE',
  SET_ID_TOKEN: 'SET_ID_TOKEN',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  SET_USER: 'SET_USER'
};

export default {
  LOGGED_IN({ commit }) {
    commit(AUTH_ACTIONS.LOGGED_IN);
  },

  LOGGED_OUT({ commit }) {
    commit(AUTH_ACTIONS.LOGGED_OUT);
  },

  SET_USER_TYPE({ commit }, payload) {
    commit(AUTH_ACTIONS.SET_USER_TYPE, payload);
  },

  SET_ID_TOKEN({ commit }, payload) {
    commit(AUTH_ACTIONS.SET_ID_TOKEN, payload);
  },

  SET_ACCESS_TOKEN({ commit }, payload) {
    commit(AUTH_ACTIONS.SET_ACCESS_TOKEN, payload);
  },

  SET_USER({ commit }, payload) {
    commit(AUTH_ACTIONS.SET_USER, payload);
  }
}
