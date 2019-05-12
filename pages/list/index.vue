<template>
  <div>
    <ul>
      <li v-for="file in files" :key="file.id">
        <nuxt-link :to="`/list/${file.id}`">{{ file.name }}</nuxt-link>
      </li>
    </ul>
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
        const response = await gapi.client.drive.files.list({
          q: `not trashed and '${this.baseFolder.id}' in parents`
          // fields:
          //   "files(kind,id,name,mimeType,description,starred,trashed,explicitlyTrashed,trashingUser,trashedTime,parents,properties,appProperties,spaces,version,webContentLink,webViewLink,iconLink,hasThumbnail,thumbnailLink,thumbnailVersion,viewedByMe,viewedByMeTime,createdTime,modifiedTime,modifiedByMeTime,modifiedByMe,sharedWithMeTime,sharingUser,owners,teamDriveId,driveId,lastModifyingUser,shared,ownedByMe,capabilities,viewersCanCopyContent,copyRequiresWriterPermission,writersCanShare,permissions,permissionIds,hasAugmentedPermissions,folderColorRgb,originalFilename,fullFileExtension,fileExtension,md5Checksum,size,quotaBytesUsed,headRevisionId,contentHints,imageMediaMetadata,videoMediaMetadata,isAppAuthorized,exportLinks)"
        });
        this.files = response.result.files;
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