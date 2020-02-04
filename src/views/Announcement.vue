<template>
  <div id="announcement">
    <div id="editor">
      <div class="page-header">
        <v-btn icon to="/">
          <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
        </v-btn>
        <span class="text">Announcement</span>
      </div>
      <v-tabs left grow>
        <v-tab>Top</v-tab>
        <v-tab>Bottom</v-tab>

        <v-tab-item>
          <div>
            <div id="md" class="half-content">
              <h2 class="header">Enter Markdown Text</h2>
              <textarea
                v-model="topText"
                style="height:auto"
                rows="16"
                class="form-control"
              ></textarea>
            </div>
            <div id="preview" class="half-content">
              <h2 class="header">Preview</h2>
              <div class="well well-sm pre-scrollable" v-html="previewTopText"></div>
            </div>
            <v-checkbox v-model="isTopVisible" label="Visible" class="checkbox"></v-checkbox>
          </div>
        </v-tab-item>

        <v-tab-item>
          <div>
            <div id="md" class="half-content">
              <h2 class="header">Enter Markdown Text</h2>
              <textarea
                v-model="botText"
                style="height:auto"
                rows="16"
                class="form-control"
              ></textarea>
            </div>
            <div id="preview" class="half-content">
              <h2 class="header">Preview</h2>
              <div class="well well-sm pre-scrollable" v-html="previewBotText"></div>
            </div>
          </div>
          <v-checkbox v-model="isBotVisible" label="Visible" class="checkbox"></v-checkbox>
        </v-tab-item>
      </v-tabs>
    </div>
    <v-btn class="mr-4" color="primary" style="float:right;" @click="submit">save changes</v-btn>

        <error
      :showDialog="showErrorDialog"
      :msg="errMsg"
      @close="showErrorDialog = false"
    ></error>

  </div>
</template>

<script>
import Error from '../components/ErrorModal.vue';

const marked = require('marked');

export default {
  data() {
    return {
      topText: '',
      isTopVisible: true,
      isBotVisible: true,
      botText: '',
      showErrorDialog: false,
      errMsg: '',
    };
  },
  computed: {
    // return this to backend
    previewTopText: {
      get() {
        marked.setOptions({
          renderer: new marked.Renderer(),
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: false,
          sanitize: true,
          smartLists: true,
          smartypants: false,
        });
        return marked(this.topText);
      },
      set(previewTopText) {
        return previewTopText;
      },
    },
    previewBotText: {
      get() {
        marked.setOptions({
          renderer: new marked.Renderer(),
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: false,
          sanitize: true,
          smartLists: true,
          smartypants: false,
        });
        return marked(this.botText);
      },
      set(previewBotText) {
        return previewBotText;
      },
    },
  },
  components: {
    Error,
  },
  methods: {
    submit() {
      const topData = {
        markdownString: this.topText,
        htmlString: this.previewTopText,
        visibility: this.isTopVisible,
        placement: 'Top',
      };
      this.$axios
        .put('/announcement/1', topData)
        .then(() => {
          this.$router.go();
        })
        .catch((err) => {
          this.errMsg = err;
          this.showErrorDialog = true;
        });
      const botData = {
        markdownString: this.botText,
        htmlString: this.previewBotText,
        visibility: this.isBotVisible,
        placement: 'Bottom',
      };
      this.$axios
        .put('/announcement/2', botData)
        .then(() => {
          this.$router.go();
        })
        .catch((err) => {
          this.errMsg = err;
          this.showErrorDialog = true;
        });
    },
  },
  mounted() {
    this.$axios
      .get('/announcement/1')
      .then((res) => {
        this.topText = res.data.markdown_string;
        this.isTopVisible = res.data.visibility;
        this.previewTopText = res.data.html_string;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
    this.$axios
      .get('/announcement/2')
      .then((res) => {
        this.botText = res.data.markdown_string;
        this.isBotVisible = res.data.visibility;
        this.previewBotText = res.data.html_string;
      })
      .catch((err) => {
        this.errMsg = err;
        this.showErrorDialog = true;
      });
  },
};
</script>

<style lang="scss" scoped>
#editor {
  padding-bottom: 20px;
}
.page-header {
  margin-bottom: 0px;
}
.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.well {
  min-height: 334px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  text-align: left;
}
.header {
  font-family: "Monst SemiBold";
  font-size: 18px;
  text-align: left;
  padding: 20px 0;
}
.checkbox {
  margin-top: 0;
  padding-left: 25px;
}
@media (min-width: 992px) {
  .half-content {
    width: 49%;
    vertical-align: top;
    display: inline-block;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }
}
</style>
