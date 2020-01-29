import Vue from 'vue';
import VueRouter from 'vue-router';
import Signin from '../views/SignIn.vue';

import Venue from '../views/Venue.vue';
import AddVenue from '../views/AddVenue.vue';
import EditVenue from '../views/EditVenue.vue';
import AddField from '../views/AddField.vue';
import EditField from '../views/EditField.vue';

import AdminAccounts from '../views/AdminAccounts.vue';
import AddAdmin from '../views/AddAdmin.vue';
import EditAdmin from '../views/EditAdmin.vue';

import Announcement from '../views/Announcement.vue';
import TimingDiscount from '../views/EditTimingDiscount.vue';

import Products from '../views/Products.vue';
import AddProduct from '../views/AddProduct.vue';
import EditProduct from '../views/EditProduct.vue';

import PromoCode from '../views/PromoCode.vue';
import AddPromo from '../views/AddPromo.vue';
import EditPromo from '../views/EditPromo.vue';

import Customers from '../views/Customers.vue';
import BookingHistory from '../views/BookingHistory.vue';

import AccSettings from '../views/AccSettings.vue';

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: 'signin',
    component: Signin,
    meta: { hideNavigation: true, isSignedIn: true },
  },
  {
    path: '/Venue',
    name: 'Venue',
    component: Venue,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/AddVenue',
    name: 'AddVenue',
    component: AddVenue,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/EditVenue/:id',
    name: 'EditVenue',
    component: EditVenue,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/AddField/:id',
    name: 'AddField',
    component: AddField,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/EditField/:id',
    name: 'EditField',
    component: EditField,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/AdminAccounts',
    name: 'AdminAccounts',
    component: AdminAccounts,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/AddAdmin',
    name: 'AddAdmin',
    component: AddAdmin,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/EditAdmin/:id',
    name: 'EditAdmin',
    component: EditAdmin,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/Announcement',
    name: 'Announcement',
    component: Announcement,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/PromoCode',
    name: 'PromoCode',
    component: PromoCode,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/AddPromo',
    name: 'AddPromo',
    component: AddPromo,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/EditPromo/:id',
    name: 'EditPromo',
    component: EditPromo,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/EditTimingDiscount',
    name: 'EditTimingDiscount',
    component: TimingDiscount,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/Products',
    name: 'Products',
    component: Products,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/AddProduct',
    name: 'AddProduct',
    component: AddProduct,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/EditProduct/:id',
    name: 'EditProduct',
    component: EditProduct,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') !== 'SuperAdmin') next({ path: '/' });
      else next();
    },
  },
  {
    path: '/Customers',
    name: 'Customers',
    component: Customers,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/BookingHistory/:id',
    name: 'BookingHistory',
    component: BookingHistory,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/AccountSettings',
    name: 'AccountSettings',
    component: AccSettings,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }

  if (to.matched.some(record => record.meta.isSignedIn)) {
    if (localStorage.getItem('token') != null) {
      if (localStorage.getItem('role') !== 'SuperAdmin') {
        next({
          path: '/PromoCode',
          params: { nextUrl: to.fullPath },
        });
      } else {
        next({
          path: '/Venue',
          params: { nextUrl: to.fullPath },
        });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
