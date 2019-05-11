<template>
  <div>List</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "List",

  mounted() {
    this.listFiles();
  },

  watch: {
    baseFolder(value) {
      this.listFiles();
    }
  },

  methods: {
    async listFiles() {
      if (!this.isSignedIn) return;
      if (!this.baseFolder) return;
      try {
        const response = await gapi.client.drive.files.list({
          parents: this.baseFolder.id
        });

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  },

  computed: {
    ...mapState("user", ["baseFolder", "isSignedIn"])
  }
};
</script>

<style lang="scss" scoped>
</style>