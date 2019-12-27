/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  user: localStorage.getItem('user-name') || '',
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  currentUser: state => state.user,
};

const actions = {
  login: ({ commit }, credentials) => new Promise((resolve, reject) => {
    commit('authRequest');
    axios
      .post(`${process.env.VUE_APP_API}/signin`, credentials)
      .then((resp) => {
        const { token, user } = resp.data;
        localStorage.setItem('user-token', token);
        localStorage.setItem('user-name', user || 'User');
        axios.defaults.headers.common.Authorization = token;
        commit('authSuccess', { token, user });
        resolve(resp);
      })
      .catch((err) => {
        commit('authError');
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-name');
        reject(err);
      });
  }),
  logout: ({ commit }) => new Promise((resolve) => {
    commit('logout');
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-name');
    delete axios.defaults.headers.common.Authorization;
    resolve();
  }),
};

const mutations = {
  authRequest: (state) => {
    state.status = 'loading';
  },
  authSuccess: (state, { token, user }) => {
    state.status = 'success';
    state.token = token;
    state.user = user;
  },
  authError: (state) => {
    state.status = 'error';
  },
  logout: (state) => {
    state.status = '';
    state.token = '';
    state.user = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
