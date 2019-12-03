import Vue from 'vue';
import VueRouter from 'vue-router';
import Signin from '../views/SignIn.vue';
import Venue from '../views/Venue.vue';
import AddVenue from '../views/AddVenue.vue';
import EditVenue from '../views/EditVenue.vue';
import Home from '../views/Home.vue';

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
  },
  {
    path: '/AddVenue',
    name: 'AddVenue',
    component: AddVenue,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/EditVenue/:id',
    name: 'EditVenue',
    component: EditVenue,
    meta: {
      requiresAuth: true,
    },
  },
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user-token') == null) {
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
    if (localStorage.getItem('user-token') != null) {
      next({
        path: '/Venue',
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
