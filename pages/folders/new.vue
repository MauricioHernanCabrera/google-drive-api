<template>
  <div>
    <form @submit.prevent="createFolderWithFiles" v-if="!sending">
      <!-- <input class="m-5" type="text" v-model="form.name" placeholder="Nombre de la carpeta">
      <br>-->
      <input class="m-5" type="file" @change="onFileChange" multiple>
      <br>
      <button class="m-5" type="submit" v-if="form.files.length">Subir archivo</button>
    </form>

    <div>
      <h3 style="margin: 0;">{{ sending? 'Enviando' : '' }}</h3>
      <h3 style="margin: 0;">{{ sucess? 'Terminado' : '' }}</h3>
      <ul style="margin: 0; padding: 0;">
        <li
          v-for="(file, fileIndex) in form.files"
          :key="fileIndex"
          style="display: flex; justify-content: space-between;"
        >
          <span>{{ file.name }}</span>
          <span>{{ progress[fileIndex]? progress[fileIndex].percentaje : 0 }}%</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Upload",

  data() {
    return {
      form: {
        files: []
      },

      progress: [],

      sending: false,

      sucess: false
    };
  },

  methods: {
    onFileChange(event) {
      this.form.files = event.target.files;
    },

    async createFolderWithFiles() {
      this.sending = true;
      this.sucess = false
      try {
        const date = new Date();
        const [year, mount, day, hours, minutes, seconds] = [
          `${this.pad2(date.getFullYear())}`,
          `${this.pad2(date.getMonth() + 1)}`,
          `${this.pad2(date.getDate())}`,
          `${this.pad2(date.getHours())}`,
          `${this.pad2(date.getMinutes())}`,
          `${this.pad2(date.getSeconds())}`
        ];

        const folderId = this.baseFolder.id;
        const folderResponse = await this.createFolder(
          folderId,
          `${day}/${mount}/${year}   ${hours}h:${minutes}m:${seconds}s`
        );

        const folderPermisionResponse = await this.createPermission(
          folderResponse.result.id
        );

        const { files } = this.form;
        const promisesFiles = [];

        for (let i = 0; i < files.length; i++) {
          // promisesFiles.push(
          await this.createFile(folderResponse.result.id, files[i], (event) => {
            const progress = JSON.parse(JSON.stringify(this.progress));
            progress[i] = {
              percentaje: this.calculatePercent(event),
              event
            }

            this.progress = progress;
          })
          // );
        }

        this.progress = []
        this.form.files = []
        this.sucess = true

        this.$router.push(`/folders/${folderResponse.result.id}`)
      } catch (error) {
        console.log(error);
      } finally {
        this.sending = false;
      }
    },

    createFile(parentId, fileContent, onUploadProgress = null) {
      const file = new Blob([fileContent], { type: fileContent.type });
      const metadata = {
        name: fileContent.name,
        parents: [parentId]
      };

      const accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
      
      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      form.append("file", file);

      const config = {
        headers: {
          Authorization: "Bearer " + accessToken
        },
        onUploadProgress
      };

      return this.$axios.$post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        form,
        config
      );
    },

    createFolder(parentId, name) {
      return gapi.client.drive.files.create({
        name,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentId]
      });
    },

    createPermission(fileId) {
      return gapi.client.drive.permissions.create({
        resource: {
          type: "anyone",
          role: "reader"
        },
        fileId
      });
    },

    calculatePercent(event) {
      try {
        return Math.round((event.loaded * 100) / event.total );
      } catch (error) {
        return 0;
      }
    },

    pad2: number => (String(number).length == 1 ? `0${number}` : number)
  },

  computed: {
    ...mapState("user", ["baseFolder"]),
  }
};
</script>

<style scoped>
.m-5 {
  margin: 5px;
}
</style>