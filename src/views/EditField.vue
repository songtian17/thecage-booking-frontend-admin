<template>
  <div>
    <div class="page-header-nav">
      <v-btn icon @click="$router.go(-1)">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Edit Field</span>
    </div>

    <v-form ref="form" v-model="isFormValid" lazy-validation>
      <v-container class="form-right">
        <v-text-field v-model="fieldName" :rules="nameRules" label="Field Name" required>
        </v-text-field>
        <v-text-field v-model="odooId" label="Odoo Id" @keypress="isNumber($event)"> </v-text-field>
        <v-text-field v-model="numOfPitches" label="Number of Pitches" required disabled>
        </v-text-field>
        <v-select
          v-model="selectedFieldType"
          :items="fieldType"
          label="Field Type"
          :rules="fieldTypeRules"
          required
        ></v-select>
        <v-menu
          ref="menu"
          v-model="colorMenu"
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
          <v-color-picker v-if="colorMenu" v-model="color" hide-inputs></v-color-picker>
        </v-menu>
        <v-btn color="primary" class="mr-4" @click="submit">Save changes</v-btn>
      </v-container>
    </v-form>
    <br />
    <br />
    <v-data-table :headers="pitchHeaders" :items="pitches" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Pitches</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn color="primary" dark @click="addPitchDialog = true">Add Pitch</v-btn>
          <v-dialog v-model="addPitchDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Add Pitch</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="20" sm="6" md="4">
                      <v-text-field
                        v-model="newPitchName"
                        :rules="pitchNameRules"
                        label="Pitch name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="20" sm="6" md="4">
                      <v-text-field
                        v-model="newPitchOdooId"
                        label="Odoo ID"
                        @keypress="isNumber($event)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAddPitch">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="addPitch">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="editPitchDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit Pitch</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="20" sm="6" md="4">
                      <v-text-field
                        v-model="editPitchName"
                        :rules="pitchNameRules"
                        label="Pitch name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="20" sm="6" md="4">
                      <v-text-field
                        v-model="editPitchOdooId"
                        label="Odoo ID"
                        @keypress="isNumber($event)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeEditPitch">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="editPitch">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="getEditPitchId(item)">
          edit
        </v-icon>
        <v-icon small @click="getDeletePitchId(item)">
          delete
        </v-icon>
      </template>
    </v-data-table>
    <br />
    <br />
    <v-data-table :headers="timeslotHeaders" :items="timeslots" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Custom Timeslot</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn color="primary" dark @click="addTimeslotDialog = true">Add Timeslot</v-btn>
          <v-dialog v-model="addTimeslotDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Add Timeslot</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="timeMenu"
                        v-model="timeMenu"
                        :close-on-content-click="false"
                        :nudge-top="50"
                        :return-value.sync="startTime"
                        transition="scale-transition"
                        offset-y
                        max-width="250px"
                        min-width="250px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="startTime"
                            label="Start Time"
                            readonly
                            :rules="startTimeRules"
                            required
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="timeMenu"
                          v-model="startTime"
                          full-width
                          :allowed-minutes="allowedStep"
                          @click:hour="$refs.timeMenu.save(startTime)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="duration"
                        :rules="durationRules"
                        label="Duration"
                        @keypress="isNumber($event)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAddTimeslot">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="addTimeslot">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small @click="getDeleteTimeslotId(item)">
          delete
        </v-icon>
      </template>
    </v-data-table>
    <br />
    <confirm
      :showDialog="confirmDeletePitchDialog"
      @confirm="
        deletePitch();
        confirmDeletePitchDialog = false;
      "
      @cancel="confirmDeletePitchDialog = false"
    ></confirm>

    <confirm
      :showDialog="confirmDeleteTimeslotDialog"
      @confirm="
        deleteTimeSlot();
        confirmDeleteTimeslotDialog = false;
      "
      @cancel="confirmDeleteTimeslotDialog = false"
    ></confirm>

        <error
      :showDialog="showErrorDialog"
      :msg="errMsg"
      @close="showErrorDialog = false"
    ></error>
  </div>
</template>

<script>
import Error from '../components/ErrorModal.vue';
import Confirm from '../components/ConfirmationModal.vue';

export default {
  data() {
    return {
      fieldId: this.$route.params.id,
      isFormValid: false,
      fieldName: '',
      odooId: '',
      numOfPitches: '',
      nameRules: [v => !!v || 'Field Name is required'],
      fieldType: ['5-A-Side', '7-A-Side', '11-A-Side'],
      selectedFieldType: '',
      fieldTypeRules: [v => !!v || 'Field Type is required'],
      colorMenu: false,
      type: 'hex',
      hex: '#9F0608',
      dialog: false,
      confirmDeletePitchDialog: false,
      deletePitchId: '',
      pitchHeaders: [
        {
          text: 'Pitch Name',
          align: 'left',
          value: 'name',
          sortable: true,
        },
        {
          text: 'Odoo ID',
          align: 'left',
          value: 'odoo_id',
        },
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          width: '75px',
        },
      ],
      pitches: [],
      pitchNameRules: [v => !!v || 'Pitch Name is required'],
      addPitchDialog: false,
      newPitchName: '',
      newPitchOdooId: '',
      editPitchDialog: false,
      editPitchName: '',
      editPitchOdooId: '',
      editPitchId: '',

      timeslots: [],
      timeslotHeaders: [
        {
          text: 'Start Time',
          align: 'left',
          value: 'start_time',
        },
        {
          text: 'Duration',
          align: 'left',
          value: 'duration',
        },
        {
          text: 'End Time',
          align: 'left',
          value: 'end_time',
        },
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          width: '40px',
        },
      ],

      addTimeslotDialog: false,
      deleteTimeslotId: '',
      confirmDeleteTimeslotDialog: false,
      timeMenu: false,
      startTime: '00:00',
      startTimeRules: [v => !!v || 'Start Time is required'],
      duration: '',
      durationRules: [v => !!v || 'Duration is required'],
      showErrorDialog: false,
      errMsg: '',
    };
  },

  components: {
    Confirm, Error,
  },

  mounted() {
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}field/${this.fieldId}`)
      .then((res) => {
        this.fieldName = res.data.name;
        this.odooId = res.data.odoo_id;
        this.numOfPitches = res.data.num_pitches;
        this.selectedFieldType = res.data.field_type;
        this.hex = res.data.colour;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}pitches/${this.fieldId}`)
      .then((res) => {
        this.pitches = res.data;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}customtimeslots/${this.fieldId}`)
      .then((res) => {
        this.removeSecFromTime(res.data);
        this.timeslots = res.data;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
  },

  methods: {
    allowedStep: m => m % 60 === 0,
    submit() {
      if (this.$refs.form.validate()) {
        if (this.fieldName !== '' && this.numOfPitches !== '' && this.selectedFieldType !== '') {
          const data = {
            name: this.fieldName,
            odooId: this.odooId,
            num_pitches: this.numOfPitches,
            colour: this.hex,
            fieldType: this.selectedFieldType,
          };
          this.$axios
            .put(`${process.env.VUE_APP_BACKEND}field/${this.fieldId}`, data)
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
    getEditPitchId(item) {
      this.editPitchId = item.id;
      this.editPitchOdooId = item.odoo_id;
      this.editPitchName = item.name;
      this.editPitchDialog = true;
    },
    closeEditPitch() {
      this.editPitchDialog = false;
    },
    editPitch() {
      if (this.editPitchName !== '') {
        const data = { name: this.editPitchName, odooId: this.editPitchOdooId };
        this.$axios
          .put(`${process.env.VUE_APP_BACKEND}pitch/${this.editPitchId}`, data)
          .then(() => {
            this.addPitchDialog = false;
            this.$router.go();
          })
          .catch((err) => {
            this.errMsg = err;
            this.showErrorDialog = true;
          });
      }
    },
    closeAddPitch() {
      this.addPitchDialog = false;
    },
    addPitch() {
      if (this.newPitchName !== '') {
        const data = { name: this.newPitchName, odooId: this.newPitchOdooId };
        this.$axios
          .post(`${process.env.VUE_APP_BACKEND}pitch/${this.fieldId}`, data)
          .then(() => {
            this.addPitchDialog = false;
            this.$router.go();
          })
          .catch((err) => {
            this.errMsg = err;
            this.showErrorDialog = true;
          });
      }
    },
    getDeletePitchId(item) {
      this.deletePitchId = item.id;
      this.confirmDeletePitchDialog = true;
    },
    deletePitch() {
      this.$axios
        .delete(`${process.env.VUE_APP_BACKEND}pitch/${this.deletePitchId}`)
        .then(() => {
          this.$router.go();
        })
        .catch((err) => {
          this.errMsg = err;
          this.showErrorDialog = true;
        });
    },
    closeAddTimeslot() {
      this.addTimeslotDialog = false;
    },
    addTimeslot() {
      if (this.duration !== '') {
        const data = {
          startTime: this.startTime,
          duration: this.duration,
          endTime: this.endTime,
        };
        this.$axios
          .post(`${process.env.VUE_APP_BACKEND}customtimeslot/${this.fieldId}`, data)
          .then(() => {
            this.addTimeslotDialog = false;
            this.$router.go();
          })
          .catch((err) => {
            this.errMsg = err;
            this.showErrorDialog = true;
          });
      }
    },
    getDeleteTimeslotId(item) {
      this.deleteTimeslotId = item.id;
      this.confirmDeleteTimeslotDialog = true;
    },
    deleteTimeSlot() {
      this.$axios
        .delete(`${process.env.VUE_APP_BACKEND}customtimeslot/${this.deleteTimeslotId}`)
        .then(() => {
          this.$router.go();
        })
        .catch((err) => {
          this.errMsg = err;
          this.showErrorDialog = true;
        });
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
    removeSecFromTime(obj) {
      const outObj = obj;
      for (let i = 0; i < obj.length; i += 1) {
        outObj[i].start_time = obj[i].start_time.substring(0, 5);
        outObj[i].end_time = obj[i].end_time.substring(0, 5);
      }
      return outObj;
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
    formTitle() {
      return this.editedIndex === -1 ? 'New Pitch' : 'Edit Pitch';
    },
    endTime() {
      const startTime = this.startTime.substring(0, 2);
      let endTime = Number(startTime) + Number(this.duration);

      if (endTime >= 24) {
        endTime -= 24;
      }
      return `${endTime}:00`;
    },
  },
};
</script>
