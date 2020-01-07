<template>
  <div id="adminList" class="singleLineTable">
    <div class="page-header">
      <v-btn icon to="/">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Admin Accounts</span>
    </div>
    <v-data-table
      :headers="headers"
      :items="venues"
      item-key="name"
      :hide-default-header="false"
      :hide-default-footer="true"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-btn color="primary" dark to="/AddAdmin">Add Admin</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <router-link :to="`EditAdmin/${item.id}`">
          <v-icon small class="mr-2">mdi-pencil-outline</v-icon>
        </router-link>
        <v-icon small @click="getAdminId(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <confirm
      :showDialog="showConfirmationDialog"
      @confirm="
        deleteAdmin();
        showConfirmationDialog = false;
      "
      @cancel="showConfirmationDialog = false"
    ></confirm>

    <error :showDialog="showErrorDialog" :msg="errMsg" @close="showErrorDialog = false"></error>
  </div>
</template>

<script>
import Error from '../components/ErrorModal.vue';
import Confirm from '../components/ConfirmationModal.vue';

export default {
  data: () => ({
    showConfirmationDialog: false,
    showErrorDialog: false,
    errMsg: '',
    deleteAdminId: '',
    headers: [
      {
        text: '',
        align: 'left',
        sortable: false,
        value: 'user_id',
        width: '100%',
      },
      {
        text: '',
        sortable: false,
        value: 'action',
        width: '55px',
      },
    ],
    venues: [],
  }),
  components: {
    Confirm,
    Error,
  },

  mounted() {
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}admin`)
      .then((res) => {
        this.venues = res.data;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
  },

  methods: {
    deleteAdmin() {
      this.$axios
        .delete(`${process.env.VUE_APP_BACKEND}admin/${this.deleteAdminId}`)
        .then(() => {
          this.$router.go('/AdminAccounts');
        })
        .catch((err) => {
          this.errMsg = err;
          this.showErrorDialog = true;
        });
    },
    getAdminId(item) {
      this.deleteAdminId = item.id;
      this.showConfirmationDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
