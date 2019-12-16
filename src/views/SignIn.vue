<template>
  <v-app id="signin">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Sign In</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form id="loginForm" ref="form" lazy-validation @submit.prevent>
                  <v-text-field
                    v-model="id"
                    label="ID"
                    name="ID"
                    type="text"
                    :rules="IDRules"
                    required
                  />

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
                    name="password"
                    type="password"
                    :rules="PwdRules"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  align-end
                  type="submit"
                  form="loginForm"
                  @click="login()"
                  >Sign In</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <error
      :showDialog="showErrorDialog"
      msg="The crendential that you've entered is incorrect. Please try again."
      @close="showErrorDialog = false"
    ></error>
  </v-app>
</template>

<script>
import error from '../components/ErrorModal.vue';

export default {
  data() {
    return {
      id: '',
      password: '',
      showErrorDialog: false,
      IDRules: [v => !!v || 'ID is required'],
      PwdRules: [v => !!v || 'Password is required'],
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        // this.snackbar = true;
      }

      if (this.id !== '' && this.password !== '') {
        const data = { id: this.id, password: this.password };
        this.$axios
          .post('http://localhost:5000/authentication', data)
          .then((res) => {
            // console.log(res);
            const { token } = res.data;
            localStorage.setItem('user-token', token);
            this.$router.go('/venue');
          })
          .catch((err) => {
            localStorage.removeItem('user-token');
            console.log(err);
            this.showErrorDialog = true;
          });
      } else {
        this.showErrorDialog = true;
      }
    },
  },
  props: {
    source: String,
  },
  components: {
    error,
  },
};
</script>
