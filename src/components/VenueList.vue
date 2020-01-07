<template>
  <div class="singleLineTable">
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
        <v-icon small @click="getVenueId(item)">mdi-delete</v-icon>
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
              <v-icon small @click="getFieldId(field)">mdi-delete</v-icon>
            </td>
          </div>
        </div>
        <td></td>
        <td></td>
        <td></td>
      </template>
    </v-data-table>

    <confirm
      :showDialog="confirmDeleteVenueDialog"
      @confirm="
        deleteVenue();
        confirmDeleteVenueDialog = false;
      "
      @cancel="confirmDeleteVenueDialog = false"
    ></confirm>

    <confirm
      :showDialog="confirmDeleteFieldDialog"
      @confirm="
        deleteField();
        confirmDeleteFieldDialog = false;
      "
      @cancel="confirmDeleteFieldDialog = false"
    ></confirm>

    <error :showDialog="showErrorDialog" :msg="errMsg" @close="showErrorDialog = false"></error>
  </div>
</template>

<script>
import Error from './ErrorModal.vue';
import Confirm from './ConfirmationModal.vue';

export default {
  data: () => ({
    expanded: [],
    confirmDeleteVenueDialog: false,
    confirmDeleteFieldDialog: false,
    deleteVenueId: '',
    deleteFieldId: '',
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
    showErrorDialog: false,
    errMsg: '',
  }),
  components: {
    Confirm,
    Error,
  },

  mounted() {
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}venues`)
      .then((res) => {
        this.venues = res.data;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
  },

  methods: {
    deleteVenue() {
      this.$axios
        .delete(`${process.env.VUE_APP_BACKEND}venue/${this.deleteVenueId}`)
        .then(() => {
          this.$router.go('/venue');
        })
        .catch((err) => {
          this.errMsg = err;
          this.showErrorDialog = true;
        });
    },
    getVenueId(item) {
      this.deleteVenueId = item.id;
      this.confirmDeleteVenueDialog = true;
    },
    deleteField() {
      this.$axios
        .delete(`${process.env.VUE_APP_BACKEND}field/${this.deleteFieldId}`)
        .then(() => {
          this.$router.go('/venue');
        })
        .catch((err) => {
          this.errMsg = err;
          this.showErrorDialog = true;
        });
    },
    getFieldId(item) {
      this.deleteFieldId = item.id;
      this.confirmDeleteFieldDialog = true;
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
    height: 40px;
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
