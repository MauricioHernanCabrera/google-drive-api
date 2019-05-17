<template>
  <div>
    <ul v-if="folders.length">
      <li v-for="folder in folders" :key="folder.id">
        <nuxt-link :to="`/folders/${folder.id}`">{{ folder.name }}</nuxt-link>
        <button @click="deleteFolder(folder.id)">Borrar</button>
      </li>
    </ul>
    <span v-if="folders.length == 0 && !loading">Aun no tenes carpetas</span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "List",

  mounted() {
    this.listFolders();
  },

  data() {
    return {
      folders: [],
      srcFolder: "",
      loading: true,
      waitingAnswer: false,
    };
  },

  watch: {
    baseFolder(value) {
      this.listFolders();
    }
  },

  methods: {
    async listFolders() {
      try {
        const response = await gapi.client.drive.files.list({
          q: `not trashed and '${this.baseFolder.id}' in parents`
        });
        this.folders = response.result.files;
      } catch (error) {
        console.log(error.result);
      } finally {
        this.loading = false
      }
    },

    async deleteFolder(fileId) {
      if (this.waitingAnswer) return
      this.waitingAnswer = true

      try {
        const folder = await gapi.client.drive.files.delete({
          fileId
        });

        const folderIndex = this.folders.findIndex((f) => f.id === fileId)

        this.folders.splice(folderIndex, 1)
      } catch (error) {
        console.log(error)
      } finally {
        this.waitingAnswer = false
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