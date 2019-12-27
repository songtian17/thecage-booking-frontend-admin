<template>
  <div>
    <div class="page-header">
      <v-btn icon to="/">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Promotion Code</span>
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
        <v-btn color="primary" dark to="/AddPromo">Add Promo Code</v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="promoCodes" :search="search">
        <template v-slot:item.action="{ item }">
          <router-link :to="`../EditPromo/${item.id}`">
            <v-icon small class="mr-2">mdi-pencil-outline</v-icon>
          </router-link>
          <v-icon small @click="getPromoId(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <confirm
      :showDialog="showConfirmationDialog"
      @confirm="
        deletePromo();
        showConfirmationDialog = false;
      "
      @cancel="showConfirmationDialog = false"
    ></confirm>
  </div>
</template>

<script>
import Confirm from '../components/ConfirmationModal.vue';

export default {
  data() {
    return {
      showConfirmationDialog: false,
      deletePromoId: '',
      search: '',
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'code',
        },
        { text: 'Start Date', value: 'valid_from' },
        { text: 'Expiry Date', value: 'valid_to' },
        { text: 'Usage Limit', value: 'usage_limit' },
        { text: 'Times Used', value: 'times_used' },
        { text: 'Usage per User', value: 'usage_per_user' },
        { text: 'Discount', value: 'discount' },
        { text: 'Discount Type', value: 'discount_type' },
        {
          text: 'Products',
          value: 'promo_code_valid_products',
        },
        { text: 'Venues', value: 'promo_code_valid_locations' },
        {
          text: 'Action',
          value: 'action',
          width: '75px',
          sortable: false,
        },
      ],
      promoCodes: [],
    };
  },
  components: {
    Confirm,
  },
  mounted() {
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}promotioncodes`)
      .then((res) => {
        this.formatDateTime(res.data);
        this.promoCodes = res.data;
        this.getProNameFromArray();
        this.getLocNameFromArray();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    deletePromo() {
      this.$axios
        .delete(`${process.env.VUE_APP_BACKEND}promotioncode/${this.deletePromoId}`)
        .then(() => {
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPromoId(item) {
      this.deletePromoId = item.id;
      this.showConfirmationDialog = true;
    },
    redirectBookHist(row) {
      this.$router.push(`/BookingHistory/${row.id}`);
    },
    formatDateTime(obj) {
      const outObj = obj;
      for (let i = 0; i < obj.length; i += 1) {
        outObj[i].valid_from = obj[i].valid_from.substring(0, 10);
        outObj[i].valid_to = obj[i].valid_to.substring(0, 10);
      }
      return outObj;
    },
    getLocNameFromArray() {
      const outObj = this.promoCodes;
      for (let i = 0; i < outObj.length; i += 1) {
        const productsArr = outObj[i].promo_code_valid_locations;
        outObj[i].promo_code_valid_locations = productsArr.map(item => `${item.name}`).toString();
      }
      return outObj;
    },
    getProNameFromArray() {
      const outObj = this.promoCodes;
      for (let i = 0; i < outObj.length; i += 1) {
        const productsArr = outObj[i].promo_code_valid_products;
        outObj[i].promo_code_valid_products = productsArr.map(item => `${item.name}`).toString();
      }
      return outObj;
    },
  },
};
</script>
