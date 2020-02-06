<template>
  <div id="bookingHistory">
    <div class="page-header-nav">
      <v-btn icon to="/Customers">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Booking History</span>
    </div>

    <div class="user-info">
      <h2>User information:</h2>
      <p>ID: {{ custId }}</p>
      <p>Email: {{ email }}</p>
      <p>Name: {{ name }}</p>
      <p>Phone: {{ phone }}</p>
    </div>

    <v-card v-for="item in history" :key="item.id" class="mx-auto">
      <v-list>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title class="text-left">
              <span class="booking-id">#{{ item.id }} </span>
              <span> {{ formatDateTime(item.timestamp) }}</span>
            </v-list-item-title>
          </template>

          <div v-for="detail in item.details" :key="detail.venue" class="hist-details">
            <div class="detail-content">
              <p>{{ detail.field_name }}</p>
              <p>{{ detail.pitch_id }}</p>
              <p>
                {{ formatDateTime(detail.start_time) }} -
                {{ formatDateTime(detail.end_time) }}
              </p>
            </div>
            <div class="detail-content">
              <p class="semibold">TYPE</p>
              <P>{{ detail.product_id }}</P>
            </div>
            <div class="detail-content">
              <p class="semibold">AMOUNT</p>
              <P>${{ detail.price }}</P>
            </div>
          </div>
        </v-list-group>
      </v-list>
    </v-card>

        <error
      :showDialog="showErrorDialog"
      :msg="errMsg"
      @close="showErrorDialog = false"
    ></error>

  </div>
</template>

<script>
import Error from '../components/ErrorModal.vue';

export default {
  data() {
    return {
      isFormValid: false,
      custId: this.$route.params.id,
      email: '',
      phone: '',
      name: '',
      showErrorDialog: false,
      errMsg: '',

      history: [],
    };
  },
  mounted() {
    this.$axios
      .get(`/customer/${this.custId}`)
      .then((res) => {
        this.email = res.data.email;
        this.name = res.data.name;
        this.phone = res.data.phone_no;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
    this.$axios
      .get(`/bookinghistory/${this.custId}`)
      .then((res) => {
        this.history = res.data;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
  },
  components: {
    Error,
  },
  methods: {
    formatDateTime(obj) {
      let outObj = obj;
      const date = outObj.substring(0, 10);
      const time = outObj.substring(11, 16);
      outObj = `${date} ${time}`;
      return outObj;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  text-align: left;
  font-family: "Monst Regular";
  font-size: 14px;
  margin-bottom: 40px;
  p {
    margin: 10px 0;
  }
}
.text-left {
  text-align: left;
  font-family: "Monst Regular";
  font-size: 14px;
  .booking-id {
    padding-right: 40px;
  }
}
.semibold {
  font-family: "Monst SemiBold";
}
.hist-details {
  font-size: 14px;
  font-family: "Monst Regular";
  text-align: left;
  padding: 5px 14px;
  color: black !important;
  border-top: 1px solid black;
  p {
    margin: 10px 0;
  }
}
.detail-content {
  width: 100%;
  display: block;
  position: relative;
  min-height: 1px;
  padding: 0;
}
.detail-content:nth-child(2) {
  padding-top: 10px;
  border-top: 0.1px solid #d1d1d1;
}
@media (max-width: 360px) {
  .text-left .booking-id {
    padding-right: 10px;
  }
}
@media (min-width: 800px) {
  .detail-content {
    width: 30%;
    vertical-align: bottom;
    display: inline-block;
    position: relative;
    min-height: 1px;
    padding: 0 3%;
  }
  .detail-content:nth-child(2) {
    width: 50%;
    border-top: none;
    border-left: 0.1px solid #d1d1d1;
  }
  .detail-content:nth-child(3) {
    width: 20%;
  }
}
</style>
