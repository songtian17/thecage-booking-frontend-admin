<template>
  <div>
    <div class="page-header">
      <v-btn icon to="/">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Customers</span>
    </div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="customers"
        :search="search"
        @click:row="redirectBookHist"
      ></v-data-table>
    </v-card>

        <error
      :showDialog="showErrorDialog"
      :msg="errMsg"
      @close="showErrorDialog = false"
    ></error>

  </div>
</template>

<script>
import Error from '../components/ErrorModal.vue';

export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'id',
        },
        { text: 'Email', value: 'email' },
        { text: 'Name', value: 'name' },
        { text: 'Phone', value: 'phone_no' },
      ],
      customers: [],
      showErrorDialog: false,
      errMsg: '',
    };
  },
  methods: {
    redirectBookHist(row) {
      this.$router.push(`/BookingHistory/${row.id}`);
    },
  },
  components: {
    Error,
  },
  mounted() {
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}customer`)
      .then((res) => {
        console.log(res.data);
        this.customers = res.data;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
  },
};
</script>
