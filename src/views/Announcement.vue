<template>
  <div id="announcement">
    <div id="editor">
      <div class="page-header">
        <v-btn icon to="/Venue">
          <v-icon small class="mr-2" style="margin-right:0!important">mdi-chevron-left</v-icon>
        </v-btn>
        <span class="text">Announcement</span>
      </div>
      <v-tabs left grow>
        <v-tab>Top</v-tab>
        <v-tab>Bottom</v-tab>

        <v-tab-item>
          <div id="md" class="half-content">
            <h2 class="header">Enter Markdown Text</h2>
            <textarea
              v-model="top_text"
              style="height:auto"
              rows="16"
              class="form-control"
            ></textarea>
          </div>
          <div id="preview" class="half-content">
            <h2 class="header">Preview</h2>
            <div class="well well-sm pre-scrollable" v-html="previewTopText"></div>
          </div>
        </v-tab-item>

        <v-tab-item>
          <div id="md" class="half-content">
            <h2 class="header">Enter Markdown Text</h2>
            <textarea
              v-model="bot_text"
              style="height:auto"
              rows="16"
              class="form-control"
            ></textarea>
          </div>
          <div id="preview" class="half-content">
            <h2 class="header">Preview</h2>
            <div class="well well-sm pre-scrollable" v-html="previewBotText"></div>
          </div>
        </v-tab-item>
      </v-tabs>
    </div>
    <v-btn class="mr-4" color="primary" style="float:right;" @click="submit">save changes</v-btn>
  </div>
</template>

<script>
const marked = require('marked');

export default {
  data() {
    return {
      top_text: '# Top',
      bot_text: '# Bottom',
    };
  },
  computed: {
    previewTopText() {
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
      return marked(this.top_text);
    },
    previewBotText() {
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
      return marked(this.bot_text);
    },
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
