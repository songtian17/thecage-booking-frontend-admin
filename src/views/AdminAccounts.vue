<template>
  <div id="adminList" class="singleLineTable">
    <div class="page-header">
      <v-btn icon to="/Venue">
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
        <v-icon small @click="showConfirmationDialog = true">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <confirm
      :showDialog="showConfirmationDialog"
      @confirm="
        deleteItem(item);
        showConfirmationDialog = false;
      "
      @cancel="showConfirmationDialog = false"
    ></confirm>
  </div>
</template>

<script>
import Confirm from '../components/ConfirmationModal.vue';

const mockDesserts = [
  {
    name: 'admin1',
    id: '1',
  },
  {
    name: 'admin2',
    id: '2',
  },
];

export default {
  data: () => ({
    showConfirmationDialog: false,
    headers: [
      {
        text: '',
        align: 'left',
        sortable: false,
        value: 'name',
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
    defaultItem: {
      name: '',
    },
  }),
  components: {
    Confirm,
  },

  mounted() {
    this.venues = mockDesserts;
  },

  methods: {
    deleteItem(item) {
      const index = this.venues.indexOf(item);
      this.venues.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
