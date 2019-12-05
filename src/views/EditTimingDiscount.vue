<template>
  <div>
    <div class="page-header">
      <v-btn icon to="/">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Edit Timing Accounts</span>
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
            :allowed-minutes="allowedStep"
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
            :allowed-minutes="allowedStep"
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
            <v-checkbox
      v-model="isActive"
      :label="` Active `"
    ></v-checkbox>
        <v-btn class="mr-4" color="primary" @click="submit">save changes</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
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
      discountType: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      discountTypeRules: [v => !!v || 'Discount Type is required'],
      selectedDiscountType: '',
      discount: '',
      discountRules: [v => !!v || 'Discount is required'],
      isActive: false,
    };
  },
  methods: {
    allowedStep: m => m % 10 === 0,
    submit() {
      if (this.$refs.form.validate()) {
        // this.snackbar = true;
        // TODO: submit form to back end
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
