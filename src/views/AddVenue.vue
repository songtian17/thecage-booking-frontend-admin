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


  </div>
</template>

<script>

export default {
  data: () => ({
    isFormValid: false,
    venueName: '',
    nameRules: [v => !!v || 'Venue Name is required'],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.venueName !== '') {
          const data = { name: this.venueName };
          this.$axios
            .post(`${process.env.VUE_APP_BACKEND}venue`, data)
            .then((res) => {
              console.log(res);
              this.$router.push('/Venue');
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
  },
};
</script>
