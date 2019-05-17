<template>
  <div>
    <ul v-if="isSignedIn">
      <li>
        <nuxt-link to="/">Estado del usuario</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/folders/new">Subir archivos</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/folders">Listar carpetas</nuxt-link>
      </li>
    </ul>
    <nuxt/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['isSignedIn'])
  }
}
</script>


<style>
</style>
