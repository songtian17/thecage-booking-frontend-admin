<template>
  <div id="editVenue">
    <div class="page-header-nav">
      <v-btn icon @click="$router.go(-1)">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Edit Venue</span>
    </div>

    <v-form ref="form" v-model="isFormValid" lazy-validation>
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
    <br />
    <br />
    <v-data-table
      :headers="headers"
      :items="fields"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Fields</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark :to="`/AddField/${venueId}`">Add Field</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
      </template>

      <template v-slot:item.action="{ item }">
        <router-link :to="`../EditField/${item.id}`">
          <v-icon small class="mr-2">mdi-pencil-outline</v-icon>
        </router-link>
        <v-icon small @click="getFieldId(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <confirm
      :showDialog="showConfirmationDialog"
      @confirm="
        deleteField();
        showConfirmationDialog = false;
      "
      @cancel="showConfirmationDialog = false"
    ></confirm>
  </div>
</template>

<script>
import Confirm from '../components/ConfirmationModal.vue';

export default {
  data() {
    return {
      isFormValid: false,
      showConfirmationDialog: false,
      venueName: '',
      venueId: this.$route.params.id,
      nameRules: [v => !!v || 'Venue Name is required'],
      deleteFieldId: '',
      fields: [],
      headers: [
        {
          text: 'Field Name',
          align: 'left',
          value: 'name',
        },
        {
          text: 'Odoo ID',
          value: 'odoo_id',
        },
        {
          text: 'Field Type',
          value: 'field_type',
        },
        {
          text: 'Number of Pitches',
          value: 'num_pitches',
        },
        {
          text: 'Action',
          value: 'action',
          width: '75px',
          sortable: false,
        },
      ],
    };
  },
  components: {
    Confirm,
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.venueName !== '') {
          const data = { name: this.venueName };
          this.$axios
            .put(`${process.env.VUE_APP_BACKEND}venue/${this.venueId}`, data)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    deleteField() {
      this.$axios
        .delete(`${process.env.VUE_APP_BACKEND}field/${this.deleteFieldId}`)
        .then((res) => {
          console.log(res);
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFieldId(item) {
      this.deleteFieldId = item.id;
      this.showConfirmationDialog = true;
    },
  },
  mounted() {
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}venue/${this.venueId}`)
      .then((res) => {
        this.venueName = res.data.name;
        this.fields = res.data.fields;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}fields/${this.venueId}`)
      .then((res) => {
        this.fields = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
