<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="350">
      <v-card>
        <v-card-title class="headline" style="padding: 30px 24px 30px" text-center>
          <div
            style="width: 100%;text-align: center;padding-bottom: 10px;color: rgba(0, 0, 0, 0.6);"
          >
            Error
          </div>
          <v-icon style="font-size:70px;width:100%;" color="red">mdi-close-circle</v-icon>
        </v-card-title>

        <v-card-text style="padding: 0 24px 0px;text-align:center;">{{ msg }}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="close">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    showDialog: {
      default: () => false,
      type: Boolean,
    },
    msg: {
      default: () => '',
      type: String,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
