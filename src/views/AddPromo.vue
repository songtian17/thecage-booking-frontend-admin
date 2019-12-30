<template>
  <div>
    <div class="page-header-nav">
      <v-btn icon @click="$router.go(-1)">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Add Promotion Code</span>
    </div>

    <v-form ref="form" v-model="isFormValid" lazy-validation>
      <v-container class="form-right">
        <v-text-field
          v-model="promoName"
          :rules="promoNameRules"
          label="Promotion Code Name"
          required
        >
        </v-text-field>
        <v-menu
          v-model="startDateMenu"
          :close-on-content-click="false"
          :nudge-top="50"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startDate"
              label="Start Date"
              :rules="startDateRules"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDate"
            :min="minDate"
            @input="
              startDateMenu = false;
              minDateOnChange();
            "
          ></v-date-picker>
        </v-menu>
        <v-menu
          v-model="endDateMenu"
          :close-on-content-click="false"
          :nudge-top="50"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model="endDate" label="Expiry Date" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            :min="minEndDate"
            @input="endDateMenu = false"
          ></v-date-picker>
        </v-menu>
        <v-text-field
          v-model="useLimit"
          :rules="useLimitRules"
          label="Usage Limit"
          required
          @keypress="isNumber($event)"
        >
        </v-text-field>
        <v-text-field
          v-model="usePerUser"
          :rules="usePerUserRules"
          label="Usage Per User"
          required
          @keypress="isNumber($event)"
        >
        </v-text-field>
        <v-select
          v-model="selectedDiscountType"
          :items="discountType"
          label="Discount Type"
          :rules="discountTypeRules"
          required
        ></v-select>
        <v-text-field
          v-model="discount"
          :rules="discountRules"
          label="Discount"
          required
        ></v-text-field>
        <v-select
          v-model="selectedValidProducts"
          :items="validProducts"
          label="Valid Products"
          :rules="productsRules"
          multiple
          persistent-hint
          chips
          required
        ></v-select>
        <v-select
          v-model="selectedValidVenues"
          :items="validVenues"
          label="Valid Venues"
          :rules="venuesRules"
          multiple
          persistent-hint
          chips
          required
        ></v-select>
        <br />
        <v-btn
          class="mr-4"
          color="primary"
          @click="
            tempValidTiming = deepCopyFunction(selectedValidDays);
            editTimingDialog = true;
            calculateAvailableWeekdays();
          "
          >Edit Valid Timing</v-btn
        >
        <br />
        <br />
        <v-btn class="mr-4" color="primary" @click="submit">Add</v-btn>
      </v-container>
    </v-form>

    <v-dialog v-model="editTimingDialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Valid Timing</span>
          <v-spacer></v-spacer>
          <v-btn class="mr-4" color="primary" @click="addDayDialog = true">
            Add Day of the Week</v-btn
          >
        </v-card-title>

        <div
          v-for="(selectedValidDays, index) in this.selectedValidDays"
          :key="index"
          class="timingTable"
        >
          <div class="dayWrapper">
            <span>{{ selectedValidDays.day }} </span>
            <v-icon
              small
              class="delete-icon"
              @click="
                deleteDay(index);
                addToWeekdaysAvailable(selectedValidDays.day);
              "
              >mdi-delete</v-icon
            >
            <v-btn
              class="mr-4"
              color="primary"
              @click="
                addTimeDialog = true;
                tempTimingIndex = index;
              "
            >
              Add Timing</v-btn
            >
          </div>

          <div v-for="(timing, index) in selectedValidDays.timing" :key="index" class="timeWrapper">
            <div>
              <span>{{ timing.startTime }} - {{ timing.endTime }}</span>
              <v-icon small class="delete-icon" @click="deleteTiming(selectedValidDays, index)"
                >mdi-delete</v-icon
              >
            </div>
          </div>
        </div>

        <v-dialog v-model="addDayDialog" max-width="500px" persistent>
          <v-card>
            <v-card-title>
              Add Day of the Week
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="20" sm="6" md="4">
                    <v-select
                      v-model="selectedDay"
                      :items="weekdaysAvailable"
                      label="Select Day of Week"
                      :rules="dayOfWeekRules"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="addDayDialog = false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="addDayofWeek">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="addTimeDialog" max-width="500px" persistent>
          <v-card>
            <v-card-title>
              Add Timing
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="20" sm="6" md="4">
                    <v-menu
                      ref="startTimeMenu"
                      v-model="startTimeMenu"
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
                          :rules="startTimeRules"
                          readonly
                          required
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="startTimeMenu"
                        v-model="startTime"
                        full-width
                        @click:minute="$refs.startTimeMenu.save(startTime)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="20" sm="6" md="4">
                    <v-menu
                      ref="endTimeMenu"
                      v-model="endTimeMenu"
                      :close-on-content-click="false"
                      :nudge-top="50"
                      :return-value.sync="endTime"
                      transition="scale-transition"
                      offset-y
                      max-width="250px"
                      min-width="250px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="endTime"
                          label="End Time"
                          :rules="endTimeRules"
                          readonly
                          required
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="endTimeMenu"
                        v-model="endTime"
                        full-width
                        @click:minute="$refs.endTimeMenu.save(endTime)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="addTimeDialog = false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="addTime">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="
              editTimingDialog = false;
              selectedValidDays = tempValidTiming;
            "
            >Cancel</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="
              editTimingDialog = false;
              checkIfValidTiming();
            "
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

        <error
      :showDialog="showErrorDialog"
      :msg="errMsg"
      @close="showErrorDialog = false"
    ></error>
  </div>
</template>

<script>
import Error from '../components/ErrorModal.vue';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default {
  data() {
    return {
      isFormValid: false,
      promoName: '',
      promoNameRules: [v => !!v || 'Promotion Code Name is required'],

      startDate: new Date().toISOString().substr(0, 10),
      startDateMenu: false,
      startDateRules: [
        v => this.isStartDateValid(v) || "Start Date can't be after than Expiry Date",
      ],
      endDate: new Date().toISOString().substr(0, 10),
      endDateMenu: false,
      endDateRules: [v => this.isEndDateValid(v) || "Expiry Date can't be before than Start Date"],
      minDate: new Date().toISOString().substr(0, 10),
      minEndDate: new Date().toISOString().substr(0, 10),

      useLimit: '',
      useLimitRules: [v => !!v || 'Usage Limit is required'],
      usePerUser: '',
      usePerUserRules: [v => !!v || 'Usage Per User is required'],
      discountType: ['Price', 'Percentage'],
      discountTypeRules: [v => !!v || 'Discount Type is required'],
      selectedDiscountType: '',
      discount: '',
      discountRules: [v => !!v || 'Discount is required'],
      selectedValidProducts: '',
      validProducts: [],
      productsRules: [v => !!v || 'Valid Product is required',
        v => v.length !== 0 || 'Valid Product is required'],
      selectedValidVenues: '',
      validVenues: [],
      venuesRules: [v => !!v || 'Valid Venue is required',
        v => v.length !== 0 || 'Valid Venue is required'],

      editTimingDialog: false,
      selectedValidDays: [],
      isValidTiming: false,
      tempValidTiming: [],
      addDayDialog: false,
      selectedDay: '',
      dayOfWeekRules: [v => !!v || 'Day of Week is required'],
      addTimeDialog: false,
      startTimeMenu: false,
      startTime: '00:00',
      startTimeRules: [v => this.isStartTimeValid(v) || "Start Time can't be after than End Time"],
      endTimeMenu: false,
      endTime: '00:00',
      endTimeRules: [v => this.isEndTimeValid(v) || " End Time can't be before than Start Time"],
      tempTimingIndex: '',
      weekdaysAvailable: weekdays,
      showErrorDialog: false,
      errMsg: '',
    };
  },
  components: {
    Error,
  },
  mounted() {
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}products`)
      .then((res) => {
        this.validProducts = this.getNameFromArray(res.data);
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND}venues`)
      .then((res) => {
        this.validVenues = this.getNameFromArray(res.data);
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
    this.checkIfValidTiming();
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (
          this.promoName !== ''
          && this.useLimit !== ''
          && this.usePerUser !== ''
          && this.selectedDiscountType !== ''
          && this.discount !== ''
          && this.selectedValidProducts.length !== 0
          && this.selectedValidVenues.length !== 0
        ) {
          const data = {
            code: this.promoName,
            validFrom: this.startDate,
            validTo: this.endDate,
            usageLimit: this.useLimit,
            usageperUser: this.usePerUser,
            discountType: this.selectedDiscountType,
            discount: this.discount,
            validProducts: this.selectedValidProducts,
            validLocations: this.selectedValidVenues,
            timingIncluded: this.isValidTiming,
            validTiming: this.selectedValidDays,
          };
          this.$axios
            .post(`${process.env.VUE_APP_BACKEND}promotioncode`, data)
            .then(() => {
              this.$router.go(-1);
            })
            .catch((err) => {
              this.errMsg = err.response.data.message;
              this.showErrorDialog = true;
            });
        }
      }
    },
    minDateOnChange() {
      this.minEndDate = this.startDate.split('-');
      this.minEndDate[2] = Number(this.minEndDate[2]);
      this.minEndDate = `${this.minEndDate[0]}-${this.minEndDate[1]}-${this.minEndDate[2]}`;
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
    toDateObject(date) {
      const [year, month, day] = date.split('-');
      return new Date(year, month - 1, day);
    },
    getDayOfWeek(date) {
      return weekdays[date.getDay()];
    },
    isStartDateValid(v) {
      if (this.toDateObject(v) <= this.toDateObject(this.endDate)) {
        return true;
      }
      return false;
    },
    isEndDateValid(v) {
      if (this.toDateObject(this.startDate) <= this.toDateObject(v)) {
        return true;
      }
      return false;
    },
    deleteDay(index) {
      this.selectedValidDays.splice(index, 1);
    },
    // add day back to the list when item deleted from array
    addToWeekdaysAvailable(day) {
      this.weekdaysAvailable.push(day);
    },
    isStartTimeValid(v) {
      if (v < this.endTime) {
        return true;
      }
      return false;
    },
    isEndTimeValid(v) {
      if (this.startTime < v) {
        return true;
      }
      return false;
    },
    deleteTiming(selectedValidDays, index) {
      const indexOfDay = this.selectedValidDays.indexOf(selectedValidDays);
      this.selectedValidDays[indexOfDay].timing.splice(index, 1);
    },
    addDayofWeek() {
      // click thursday, then click add
      if (this.selectedDay) {
        this.selectedValidDays.push({
          day: this.selectedDay,
          timing: [],
        });
        this.weekdaysAvailable = this.weekdaysAvailable.filter(e => e !== this.selectedDay);
        this.addDayDialog = false;
      }
    },
    addTime() {
      this.selectedValidDays[this.tempTimingIndex].timing.push({
        startTime: this.startTime,
        endTime: this.endTime,
      });
      this.addTimeDialog = false;
    },
    deepCopyFunction(inObject) {
      return JSON.parse(JSON.stringify(inObject));
    },
    getNameFromArray(obj) {
      const outObj = [];
      for (let i = 0; i < obj.length; i += 1) {
        outObj.push(obj[i].name);
      }
      return outObj;
    },
    checkIfValidTiming() {
      if (this.selectedValidDays.length === 0) {
        this.isValidTiming = false;
      } else {
        this.isValidTiming = true;
      }
    },
    calculateAvailableWeekdays() {
      const arr = [];
      if (!this.startDate || !this.endDate) {
        return;
      }
      const startDate = this.toDateObject(this.startDate);
      const endDate = this.toDateObject(this.endDate);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const dayDiff = timeDiff / (1000 * 3600 * 24);
      if (dayDiff >= 7) {
        return;
      }
      for (startDate; startDate <= endDate; startDate.setDate(startDate.getDate() + 1)) {
        arr.push(this.getDayOfWeek(new Date(startDate)));
      }
      if (this.selectedValidDays.length) {
        this.weekdaysAvailable = arr.filter(e => !this.selectedValidDays.find(el => el.day === e));
        return;
      }
      this.weekdaysAvailable = arr;
    },
  },
  watch: {
    selectedValidDays() {
      if (this.selectedValidDays.length === 0) {
        this.isValidTiming = false;
      } else {
        this.isValidTiming = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.timingTable {
  border: 1px #707070 solid;
  margin: 10px 25px;
}
.delete-icon {
  float: right;
}
.timingTable .timeWrapper {
  font-family: "Monst Regular";
  height: auto;
  padding: 10px;
}
.timingTable .dayWrapper {
  font-family: "Monst Regular";
  padding: 15px 10px;
  background-color: #e9e9e9;
}
.dayWrapper button {
  float: right;
  font-family: Roboto, sans-serif;
  margin-top: -6px;
  font-size: 12px;
}
.timingTable i {
  padding-top: 4px;
}
</style>
