import mutations from './mutations';
import actions from './action';
import getters from './getters';



const state = {
  loggedIn: false,
  userType: '',
  idToken: '',
  accessToken: '',
  user: {
    name: '',
    email: ''
  }
};


const namespaced = true;

export default {
  actions,
  getters,
  mutations,
  namespaced,
  state
}