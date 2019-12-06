<template>
  <div>
    <div class="page-header">
      <v-btn icon to="/">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Venue and Field</span>
    </div>
    <VenueList></VenueList>
  </div>
</template>

<script>
// @ is an alias to /src
import VenueList from '@/components/VenueList.vue';

export default {
  name: 'Venue',
  components: {
    VenueList,
  },
};
</script>
