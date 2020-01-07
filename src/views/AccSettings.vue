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
          v-model="oldPassword"
          :rules="oldPasswordRules"
          label="Old Password"
          :type="'password'"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="pwdRules"
          label="Password"
          :type="'password'"
          required
        ></v-text-field>

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
      id: '',
      isFormValid: false,
      adminId: '',
      password: '',
      oldPassword: '',
      nameRules: [v => !!v || 'ID is required'],
      pwdRules: [v => !!v || 'Password is required'],
      oldPasswordRules: [v => !!v || 'Old Password is required'],
      showErrorDialog: false,
      errMsg: '',
    };
  },
  components: {
    Error,
  },
  mounted() {
    this.id = localStorage.getItem('userId');
    this.adminId = localStorage.getItem('user');
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.adminId !== '' && this.password !== '' && this.oldPassword !== '') {
          const data = {
            userId: this.adminId,
            password: this.password,
            oldPassword: this.oldPassword,
          };
          this.$axios
            .put(`${process.env.VUE_APP_BACKEND}accountsettings`, data)
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
  },
};
</script>

<style lang="scss" scoped></style>
