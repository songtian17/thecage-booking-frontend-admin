<template>
  <div>
    <div class="page-header-nav">
      <v-btn icon @click="$router.go(-1)">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Add Product</span>
    </div>

    <v-form ref="form" v-model="isFormValid" lazy-validation>
      <v-container class="form-right">
        <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
        <v-text-field
          v-model="price"
          :rules="priceRules"
          label="Price"
          required
          @keypress="isNumber($event)"
        >
        </v-text-field>

        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-top="50"
          :return-value.sync="startTime"
          transition="scale-transition"
          offset-y
          max-width="250px"
          min-width="250px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startTime"
              label="Start Time"
              readonly
              :rules="startTimeRules"
              required
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu"
            v-model="startTime"
            full-width
            @click:minute="$refs.menu.save(startTime)"
          ></v-time-picker>
        </v-menu>
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-top="50"
          :return-value.sync="endTime"
          transition="scale-transition"
          offset-y
          max-width="250px"
          min-width="250px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="endTime"
              label="End Time"
              readonly
              :rules="endTimeRules"
              required
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="endTime"
            full-width
            @click:minute="$refs.menu2.save(endTime)"
          ></v-time-picker>
        </v-menu>
        <v-text-field v-model="odooId" :rules="odooIdRules" label="Odoo Id" required>
        </v-text-field>
        <v-select
          v-model="selectedValidDays"
          :items="validDays"
          label="Valid Day of Week"
          :rules="validDaysRules"
          multiple
          persistent-hint
          chips
          required
        ></v-select>
        <v-btn class="mr-4" color="primary" @click="submit">save changes</v-btn>
      </v-container>
    </v-form>
    <error :showDialog="showErrorDialog" :msg="errMsg" @close="showErrorDialog = false"></error>
  </div>
</template>

<script>
import Error from '../components/ErrorModal.vue';

export default {
  data() {
    return {
      name: '',
      nameRules: [v => !!v || 'Product Name is required'],
      price: '',
      priceRules: [v => !!v || 'Product Price is required'],
      startTime: null,
      endTime: null,
      menu: false,
      menu2: false,
      isFormValid: false,
      startTimeRules: [v => !!v || 'Start Time is required'],
      endTimeRules: [v => !!v || 'End Time is required'],
      odooId: '',
      odooIdRules: [v => !!v || 'Odoo Id is required'],
      showErrorDialog: false,
      errMsg: '',
      validDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      selectedValidDays: '',
      validDaysRules: [v => !!v || 'Valid Day is required',
        v => v.length !== 0 || 'Valid Day is required'],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.discount !== '') {
          const data = {
            name: this.name,
            price: this.price,
            odooId: this.odooId,
            startTime: this.startTime,
            endTime: this.endTime,
            validDay: this.selectedValidDays,
          };
          this.$axios
            .post('/product', data)
            .then(() => {
              this.$router.go();
            })
            .catch((err) => {
              this.errMsg = err.response.data.message;
              this.showErrorDialog = true;
            });
        }
      }
    },
    // eslint-disable-next-line consistent-return
    isNumber(evt) {
      const evt2 = evt || window.event;
      const charCode = evt2.which ? evt2.which : evt2.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        evt2.preventDefault();
      } else {
        return true;
      }
    },
  },
  components: {
    Error,
  },
};
</script>

<style lang="scss" scoped></style>
