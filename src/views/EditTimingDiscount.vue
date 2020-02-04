<template>
  <div>
    <div class="page-header">
      <v-btn icon to="/">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Edit Timing Discounts</span>
    </div>

    <v-form ref="form" v-model="isFormValid" lazy-validation>
      <v-container class="form-right">
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
        <v-select
          v-model="selectedDiscountType"
          :items="discountType"
          label="Discount Type"
          :rules="discountTypeRules"
          required
        ></v-select>
        <v-text-field
          v-model="discount"
          :rules="discountRules"
          label="Discount"
          required
        ></v-text-field>
        <v-checkbox v-model="isActive" :label="` Active `"></v-checkbox>
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
      startTime: null,
      endTime: null,
      menu: false,
      menu2: false,
      isFormValid: false,
      startTimeRules: [v => !!v || 'Start Time is required'],
      endTimeRules: [v => !!v || 'End Time is required'],
      discountType: ['Price', 'Percentage'],
      discountTypeRules: [v => !!v || 'Discount Type is required'],
      selectedDiscountType: '',
      discount: '',
      discountRules: [v => !!v || 'Discount is required'],
      isActive: false,
      showErrorDialog: false,
      errMsg: '',
    };
  },
  mounted() {
    this.$axios
      .get('/discount/1')
      .then((res) => {
        this.startTime = res.data.start_time.substring(0, 5);
        this.endTime = res.data.end_time.substring(0, 5);
        this.selectedDiscountType = res.data.discount_type;
        this.discount = res.data.discount;
        this.isActive = res.data.status;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
  },
  methods: {
    // allowedStep: m => m % 10 === 0,
    submit() {
      if (this.$refs.form.validate()) {
        if (this.discount !== '') {
          const data = {
            startTime: this.startTime,
            endTime: this.endTime,
            discountType: this.selectedDiscountType,
            discount: this.discount,
            status: this.isActive,
          };
          this.$axios
            .put('/discount/1', data)
            .then(() => {
              this.$router.go();
            })
            .catch((err) => {
              this.errMsg = err;
              this.showErrorDialog = true;
            });
        }
      }
    },
  },
  components: {
    Error,
  },
};
</script>

<style lang="scss" scoped></style>
