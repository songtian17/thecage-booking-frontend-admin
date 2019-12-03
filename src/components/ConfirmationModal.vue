<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="350">
      <v-card>
        <v-card-title class="headline">Alert</v-card-title>

        <v-card-text>
          Are you sure you want to perform this action?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="clickedCancel">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="clickedConfirm">OK</v-btn>
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
  },
  methods: {
    clickedConfirm() {
      this.$emit('confirm');
    },
    clickedCancel() {
      this.$emit('cancel');
    },
  },
};
</script>
