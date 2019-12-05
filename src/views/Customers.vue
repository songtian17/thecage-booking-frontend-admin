<template>
  <div>
    <div class="page-header">
      <v-btn icon to="/">
        <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text">Customers</span>
    </div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table :headers="headers" :items="customers" :search="search"></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'Id',
        },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
      ],
      customers: [
        {
          Id: '001',
          email: 'gozer@sbcglobal.net',
          phone: '62565356',
        },
        {
          Id: '002',
          email: 'william@hotmail.com',
          phone: '62938320',
        },
        {
          Id: '003',
          email: 'denton@att.net',
          phone: '67785003',
        },
        {
          Id: '004',
          email: 'martink@msn.com',
          phone: '64373815',
        },
        {
          Id: '005',
          email: 'boein@gmail.com',
          phone: '67483995',
        },
        {
          Id: '006',
          email: 'jaesenj@mac.com',
          phone: '64733226',
        },
      ],
    };
  },
};
</script>
