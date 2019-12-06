<template>
  <v-app id="inspire">
    <navbar v-if="!$route.meta.hideNavigation"></navbar>

    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer v-if="!$route.meta.hideNavigation" color="#1867C0" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  props: {
    source: String,
  },

  components: {
    Navbar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Monst Regular";
  src: url("fonts/Montserrat-Regular.otf");
}
@font-face {
  font-family: "Monst SemiBold";
  src: url("fonts/Montserrat-SemiBold.otf");
}
a {
  text-decoration: none;
}
.container {
  padding-top: 0;
}
.v-application .text-center {
  padding-top: 0;
}
.page-header {
  padding: 10px 0;
  margin-bottom: 40px;
  border-bottom: 1px #c2c2c2 solid;
  text-align: left;
  a {
    visibility: hidden;
  }
  span {
    font-family: "Monst SemiBold";
    padding-left: 20px;
    font-size: 18px;
    vertical-align: middle;
  }
}
.page-header-nav {
  padding: 10px 0;
  margin-bottom: 40px;
  border-bottom: 1px #c2c2c2 solid;
  text-align: left;
  i {
    font-size: 24px !important;
    margin-right: 0 !important;
  }
  .text {
    font-family: "Monst SemiBold";
    padding-left: 20px;
    font-size: 18px;
    vertical-align: middle;
  }
}
.form-right {
  text-align: right !important;
  max-width: 500px;
  width: 100%;
  margin: 0;
}

#signin {
  .v-application--wrap {
    min-height: 97vh;
  }
  .v-content {
    height: 100%;
  }
}

.singleLineTable {
  td {
    padding: 0 !important;
    &:first-child {
      padding: 0 16px !important;
    }
  }
  .v-toolbar--flat {
    height: 17px !important;
  }
  .v-data-table {
    tbody {
      tr.v-data-table__expanded__content {
        box-shadow: none !important;
        background-color: #e9e9e9;
      }
    }
  }
  .v-data-table-header-mobile__wrapper {
    visibility: hidden;
  }
  .v-data-table-header-mobile__wrapper .v-select {
    margin-bottom: 0px;
  }
  .v-data-table__mobile-row {
    display: table-cell;
  }
  .v-data-table .v-data-table__mobile-row {
    height: 48px;
  }
  .v-data-table__mobile-row:first-child .v-data-table__mobile-row__cell {
    text-align: left;
  }
  .v-data-table__mobile-row .v-data-table__mobile-row__cell {
    text-align: start;
  }
  .v-data-table__mobile-row:nth-child(2) {
    width: 45px;
  }
  .v-data-table__mobile-row:nth-child(3) {
    width: 32px;
  }
  .v-data-table__wrapper tr .v-data-table__mobile-row {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
  .v-data-table__wrapper tr:first-child .v-data-table__mobile-row {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }
  .v-data-table-header-mobile th {
    border-bottom: none !important;
  }
}
#adminList .v-data-table__mobile-row:nth-child(2){
  width: auto;
}
#announcement .theme--light.v-tabs-items{
  background-color: #fafafa;
}
</style>
