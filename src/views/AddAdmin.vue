<template>
  <div>
    <div class="page-header-nav">
      <v-btn icon to="/AdminAccounts">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Add Admin Account</span>
    </div>

    <v-form ref="form" v-model="isFormValid" lazy-validation>
      <v-container class="form-right">
        <v-text-field v-model="adminId" :rules="nameRules" label="ID" required></v-text-field>
        <v-text-field
          v-model="password"
          :rules="pwdRules"
          label="Password"
          :type="'password'"
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
    adminId: '',
    nameRules: [v => !!v || 'ID is required'],
    pwdRules: [v => !!v || 'Password is required'],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // this.snackbar = true;
        // TODO: submit form to back end
      }
    },
  },
};
</script>
