<template>
  <div>
    <form @submit.prevent="sendFile">
      <input type="file" @change="onFileChange">
      <br>
      <br>
      <br>
      <button type="submit">Subir archivo</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Upload",

  data() {
    // const date = new Date();
    // `${date.getFullYear()}-${date.getMonth() +
    //       1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
    return {
      form: {
        name: "",
        file: {}
      }
    };
  },

  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.form.file = files[0];
    },

    async sendFile() {
      try {
        const folderId = this.baseFolder.id;
        const fileContent = this.form.file;
        const file = new Blob([fileContent], { type: this.form.file.type });
        const metadata = {
          name: this.form.file.name,
          parents: [folderId]
        };

        var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
        var form = new FormData();
        form.append(
          "metadata",
          new Blob([JSON.stringify(metadata)], { type: "application/json" })
        );
        form.append("file", file);

        const response = await this.$axios.$post(
          "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
          form,
          {
            headers: {
              Authorization: "Bearer " + accessToken
            }
          }
        );

        console.log(response);
      } catch (error) {
        console.log(error);
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