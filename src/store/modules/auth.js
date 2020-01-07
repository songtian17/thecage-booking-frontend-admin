/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from '@/plugins/axios';

const state = {
  token: localStorage.getItem('token') || '',
  status: '',
  user: localStorage.getItem('user') || '',
  role: localStorage.getItem('role') || '',
  userId: localStorage.getItem('userId') || '',
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
      .post(`${process.env.VUE_APP_BACKEND}signin`, credentials)
      .then((resp) => {
        const {
          userId, user, token, role,
        } = resp.data;
        localStorage.setItem('userId', userId);
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        axios.defaults.headers.Authorization = token;
        commit('authSuccess', { token, user });
        resolve(resp);
      })
      .catch((err) => {
        commit('authError');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        reject(err);
      });
  }),
  logout: ({ commit }) => new Promise((resolve) => {
    commit('logout');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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
    state.role = '';
    state.userId = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
