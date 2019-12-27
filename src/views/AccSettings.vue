<template>
  <div>
    <div class="page-header">
      <v-btn icon to="/">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Account Settings</span>
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
        <v-text-field
          v-model="confirmPassword"
          :rules="confirmPasswordRules"
          label="Confirm Password"
          :type="'password'"
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
      id: '',
      isFormValid: false,
      adminId: '',
      password: '',
      confirmPassword: '',
      nameRules: [v => !!v || 'ID is required'],
      pwdRules: [v => !!v || 'Password is required'],
      confirmPasswordRules: [
        v => !!v || 'Please enter your password again',
        v => v === this.password || 'Password is not the same',
      ],
    };
  },
  mounted() {
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}admin/${this.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.adminId !== '' && this.password !== '' && this.confirmPassword !== '') {
          const data = {
            user_id: this.adminId,
            password: this.password,
          };
          this.$axios
            .put(`${process.env.VUE_APP_BACKEND}admin/${this.id}`, data)
            .then(() => {
              this.$router.go();
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

<style lang="scss" scoped></style>
