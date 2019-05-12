<template>
  <div>
    <pre>{{ baseFolder }}</pre>
    <!-- <ul>
      <li v-for="file in files" :key="file.id">{{ file.name }}</li>
    </ul>-->

    <!-- <iframe
      src="https://drive.google.com/drive/folders/13TIm0zhwKs2PC_zWKRERrWXnnh1xJadQ"
      style="width:100%; height:600px; border:0;"
    ></iframe>-->

    <!-- :src="`https://drive.google.com/embeddedfolderview?authuser=0&amp;id=${baseFolder.id}#list`" -->
    <iframe
      v-if="baseFolder && baseFolder.id"
      frameborder="0"
      width="100%"
      height="260px"
      :src="`https://drive.google.com/embeddedfolderview?id=${baseFolder.id}#list`"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "List",

  mounted() {
    this.listFiles();
  },

  data() {
    return {
      files: [],
      srcFolder: ""
    };
  },

  watch: {
    baseFolder(value) {
      this.listFiles();
    }
  },

  methods: {
    async listFiles() {
      if (!this.baseFolder) return;
      if (!this.baseFolder.id) return;
      try {
        const response = await gapi.client.drive.files.get({
          fileId: "1bpU4AWSApqlXhrCCPHDLWf7v3U8ybKTG",
          fields: "webViewLink,shared,permissions,shared,spaces,parents"
        });
        console.log(response);
        console.log(response.result);
        // this.srcFolder = response.result.webViewLink;
        // this.files = response.result.files;
      } catch (error) {
        console.log(error.result);
      }
    }
  },

  computed: {
    ...mapState("user", ["baseFolder"])
  }
};
</script>

<style lang="scss" scoped>
</style>