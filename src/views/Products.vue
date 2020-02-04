<template>
  <div>
    <div class="page-header">
      <v-btn icon to="/">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Products</span>
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
        <v-btn color="primary" dark to="/AddProduct" class="addproductbtn"
          >Add Product</v-btn
        >
      </v-card-title>

      <v-data-table :headers="headers" :items="products" :search="search">
        <template v-slot:item.action="{ item }">
          <router-link :to="`../EditProduct/${item.id}`">
            <v-icon small class="mr-2">mdi-pencil-outline</v-icon>
          </router-link>
          <v-icon small @click="getProductId(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <confirm
      :showDialog="showConfirmationDialog"
      @confirm="
        deleteProduct();
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
  data() {
    return {
      showConfirmationDialog: false,
      deleteProductId: '',
      search: '',
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { text: 'Start Time', value: 'start_time' },
        { text: 'End Time', value: 'end_time' },
        { text: 'Odoo ID', value: 'odoo_id' },
        { text: 'Price', value: 'price' },
        { text: 'Price', value: 'product_valid_day' },
        {
          text: 'Action',
          value: 'action',
          width: '75px',
          sortable: false,
        },
      ],
      products: [],
      showErrorDialog: false,
      errMsg: '',
    };
  },
  components: {
    Confirm,
    Error,
  },
  mounted() {
    this.$axios
      .get('/products')
      .then((res) => {
        this.formatDateTime(res.data);
        this.products = res.data;
        this.getDayNameFromArray();
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
  },
  methods: {
    deleteProduct() {
      this.$axios
        .delete(`/product/${this.deleteProductId}`)
        .then(() => {
          this.$router.go();
        })
        .catch((err) => {
          this.errMsg = err;
          this.showErrorDialog = true;
        });
    },
    getProductId(item) {
      this.deleteProductId = item.id;
      this.showConfirmationDialog = true;
    },
    getDayNameFromArray() {
      const outObj = this.products;
      for (let i = 0; i < outObj.length; i += 1) {
        const productsArr = outObj[i].product_valid_day;
        outObj[i].product_valid_day = productsArr.map(item => `${item.day_of_week}`).join(', ');
      }
      return outObj;
    },
    formatDateTime(obj) {
      const outObj = obj;
      for (let i = 0; i < obj.length; i += 1) {
        outObj[i].start_time = obj[i].start_time.substring(0, 5);
        outObj[i].end_time = obj[i].end_time.substring(0, 5);
      }
      return outObj;
    },
  },
};
</script>

<style scoped>
@media (max-width: 437px){
  .addproductbtn{
    margin-top: 20px;
}
}

</style>
