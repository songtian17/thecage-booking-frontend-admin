<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item v-if="isAdminAutho" link to="/Venue">
          <v-list-item-content>
            <v-list-item-title>Venue and Fields</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/PromoCode">
          <v-list-item-content>
            <v-list-item-title>Promotion Code</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAdminAutho" link to="/Announcement">
          <v-list-item-content>
            <v-list-item-title>Announcement</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/Customers">
          <v-list-item-content>
            <v-list-item-title>Customers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAdminAutho" link to="/EditTimingDiscount">
          <v-list-item-content>
            <v-list-item-title>Timing Discounts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAdminAutho" link to="/AdminAccounts">
          <v-list-item-content>
            <v-list-item-title>Admin Accounts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#1867C0" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>The Cage Admin Portal</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="my-2">
        <v-btn text large @click="logout()">Sign Out</v-btn>
      </div>
      <div class="my-2">
        <router-link to="/AccountSettings">
          <v-btn text><v-icon>mdi-settings</v-icon></v-btn>
          </router-link>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    drawer: null,
    isAdminAutho: true,
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style></style>
