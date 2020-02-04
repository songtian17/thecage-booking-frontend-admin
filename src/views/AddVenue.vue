<template>
  <div>
    <div class="page-header-nav">
      <v-btn icon to="/Venue">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Add Venue</span>
    </div>

    <v-form ref="form" v-model="isFormValid" lazy-validation @submit.prevent>
      <v-container class="form-right">
        <v-text-field
          v-model="venueName"
          :rules="nameRules"
          label="Venue Name"
          required
        ></v-text-field>
        <v-btn color="primary" class="mr-4" @click="submit">Add </v-btn>
      </v-container>
    </v-form>

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
  data: () => ({
    isFormValid: false,
    venueName: '',
    showErrorDialog: false,
    errMsg: '',
    nameRules: [v => !!v || 'Venue Name is required'],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.venueName !== '') {
          const data = { name: this.venueName };
          this.$axios
            .post('/venue', data)
            .then(() => {
              this.$router.go(-1);
            })
            .catch((err) => {
              this.errMsg = err.response.data.message;
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
