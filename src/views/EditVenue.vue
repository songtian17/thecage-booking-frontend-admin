<template>
  <div>
    <div class="page-header-nav">
      <v-btn icon to="/Venue">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Edit Venue</span>
    </div>

    <v-form ref="form" v-model="isFormValid" class="addvenue" lazy-validation>
      <v-container class="form-right">
        <v-text-field
          v-model="venueName"
          :rules="nameRules"
          label="Venue Name"
          required
        ></v-text-field>
        <v-btn class="mr-4" color="primary" @click="submit">save changes</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: false,
      venueName: '',
      venueId: this.$route.params.id,
      nameRules: [v => !!v || 'Venue Name is required'],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // TODO: submit form to back end
      }
    },
  },
};
</script>
