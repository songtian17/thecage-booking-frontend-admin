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
    password: '',
    nameRules: [v => !!v || 'ID is required'],
    pwdRules: [v => !!v || 'Password is required'],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.adminId !== '' && this.password !== '') {
          const data = {
            user_id: this.adminId, password: this.password, role: 'admin',
          };
          this.$axios
            .post(`${process.env.VUE_APP_BACKEND}admin`, data)
            .then((res) => {
              console.log(res);
              this.$router.push('AdminAccounts');
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
