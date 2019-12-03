<template>
  <div class="venue-table">
    <v-data-table
      :headers="headers"
      :items="venues"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      :hide-default-header="false"
      :hide-default-footer="true"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-btn color="primary" dark to="/AddVenue">Add Venue</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <router-link :to="`EditVenue/${item.id}`">
          <v-icon small class="mr-2">mdi-pencil-outline</v-icon>
        </router-link>
        <v-icon small @click="confirmDeleteDialog = true">mdi-delete</v-icon>
      </template>

      <template v-slot:expanded-item="{ item }">
        <div v-for="field in item.fields" v-bind:key="field.id" class="expandedItem">
          <td class="fieldName">{{ field.name }}</td>
          <div class="expandedItem-icon">
            <td>
              <router-link :to="`EditField/${field.id}`">
                <v-icon small class="mr-2">mdi-pencil-outline</v-icon>
              </router-link>
            </td>
            <td>
              <v-icon small @click="confirmDeleteDialog = true">mdi-delete</v-icon>
            </td>
          </div>
        </div>
        <td></td>
        <td></td>
      </template>
    </v-data-table>

    <confirm
      :showDialog="confirmDeleteDialog"
      @confirm="
        deleteItem(item);
        confirmDeleteDialog = false;
      "
      @cancel="confirmDeleteDialog = false"
    ></confirm>
  </div>
</template>

<script>
import Confirm from './ConfirmationModal.vue';

const mockDesserts = [
  {
    name: 'Kallang',
    id: '1',
    fields: [
      {
        name: '5-A-Side',
        id: 'kallang05',
      },
      {
        name: '7-A-Side',
        id: 'kallang07',
      },
    ],
  },
  {
    name: 'Bukit Timah',
    id: '2',
    fields: [
      {
        name: '5-A-Side',
        id: 'timah05',
      },
      {
        name: '7-A-Side',
        id: 'timah07',
      },
    ],
  },
];

export default {
  data: () => ({
    expanded: [],
    confirmDeleteDialog: false,
    confirmDelete: false,
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
        width: '45px',
      },
      { text: '', value: 'data-table-expand', width: '24px' },
    ],
    venues: [],
    editedIndex: -1,
    editedItem: {
      name: '',
    },
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

<style lang="scss" scoped>
.expandedItem {
  position: relative;
  .fieldName {
    padding-left: 50px !important;
  }
  td {
    vertical-align: middle;
    border-bottom: none !important;
    height: 35px;
  }
  .expandedItem-icon {
    position: absolute;
    right: -65px;
    top: 0;
    td {
      padding: 0px !important;
    }
  }
}
</style>
