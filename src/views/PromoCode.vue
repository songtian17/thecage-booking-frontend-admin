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
          <router-link :to="`../EditPromoCode/${item.id}`">
            <v-icon small class="mr-2">mdi-pencil-outline</v-icon>
          </router-link>
          <v-icon small @click="getPromoId(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        { text: 'Uses Left', value: 'uses_left' },
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
        let validLocString = '';
        for (let j = 0; j < outObj[i].promo_code_valid_locations.length; j += 1) {
          if (j < 1) {
            validLocString = outObj[i].promo_code_valid_locations[j].name;
          } else {
            validLocString += `${outObj[i].promo_code_valid_locations[j].name}, `;
          }
        }
        outObj[i].promo_code_valid_locations = validLocString;
      }
      return outObj;
    },
    getProNameFromArray() {
      const outObj = this.promoCodes;
      for (let i = 0; i < outObj.length; i += 1) {
        let validProString = '';
        for (let j = 0; j < outObj[i].promo_code_valid_products.length; j += 1) {
          if (j < 1) {
            validProString = outObj[i].promo_code_valid_products[j].name;
          } else {
            validProString = `${outObj[i].promo_code_valid_products[j].name}, `;
          }
        }
        outObj[i].promo_code_valid_products = validProString;
      }
      return outObj;
    },
  },
};
</script>
