<template>
  <div>
    <div class="page-header-nav">
      <v-btn icon to="/AdminAccounts">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Edit Admin Account</span>
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
      isFormValid: false,
      id: this.$route.params.id,
      adminId: '',
      password: '',
      nameRules: [v => !!v || 'ID is required'],
      pwdRules: [v => !!v || 'Password is required'],
      showErrorDialog: false,
      errMsg: '',
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.adminId !== '' && this.password !== '') {
          const data = { userId: this.adminId, password: this.password };
          this.$axios
            .put(`${process.env.VUE_APP_BACKEND}admin/${this.id}`, data)
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
  components: {
    Error,
  },
  mounted() {
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}admin/${this.id}`)
      .then((res) => {
        this.adminId = res.data.user_id;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
  },
};
</script>
