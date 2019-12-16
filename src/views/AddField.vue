<template>
  <div>
    <div class="page-header-nav">
      <v-btn icon @click="$router.go(-1)">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Add Field</span>
    </div>

    <v-form ref="form" v-model="isFormValid" lazy-validation>
      <v-container class="form-right">
        <v-text-field v-model="fieldName" :rules="nameRules" label="Field Name" required>
        </v-text-field>
        <v-text-field
          v-model="numOfPitches"
          :rules="numOfPitchesRules"
          label="Number of Pitches"
          required
          @keypress="isNumber($event)"
        >
        </v-text-field>

        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-top="25"
          transition="scale-transition"
          offset-y
          max-width="300px"
          min-width="300px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="showColor"
              label="Colour"
              readonly
              required
              v-on="on"
            ></v-text-field>
          </template>
          <v-color-picker v-if="menu" v-model="color" hide-inputs></v-color-picker>
        </v-menu>
        <v-btn color="primary" class="mr-4" @click="submit">Add</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      venueId: this.$route.params.id,
      isFormValid: false,
      fieldName: '',
      numOfPitches: '',
      nameRules: [v => !!v || 'Field Name is required'],
      numOfPitchesRules: [
        v => !!v || 'Number of Pitches is required',
        v => v < 9 || "Number of Pitches can't be more than 8",
      ],
      menu: false,
      type: 'hex',
      hex: '#9F0608',
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.fieldName !== '' && this.numOfPitches !== '') {
          const data = { name: this.fieldName, num_pitches: this.numOfPitches, colour: this.hex };
          this.$axios
            .post(`${process.env.VUE_APP_BACKEND}field/${this.venueId}`, data)
            .then((res) => {
              console.log(res);
              this.$router.go(-1);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    // eslint-disable-next-line consistent-return
    isNumber(evt) {
      const evt2 = evt || window.event;
      const charCode = evt2.which ? evt2.which : evt2.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        evt2.preventDefault();
      } else {
        return true;
      }
    },
  },
  computed: {
    color: {
      get() {
        return this[this.type];
      },
      set(v) {
        this[this.type] = v;
      },
    },
    showColor() {
      if (typeof this.color === 'string') return this.color;

      return JSON.stringify(
        Object.keys(this.color).reduce((color, key) => {
          const ret = color;
          ret[key] = Number(this.color[key].toFixed(2));
          return ret;
        }, {}),
        null,
        2,
      );
    },
  },
};
</script>
