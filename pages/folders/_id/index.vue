<template>
  <div>
    <iframe
      frameborder="0"
      width="100%"
      height="260px"
      :src="`https://drive.google.com/embeddedfolderview?id=${$route.params.id}#list`"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>