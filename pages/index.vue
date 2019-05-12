<template>
  <section class="container">
    <p>
      Estado del usuario
      <strong>{{ isSignedIn? 'Conectado' : 'Desconectado' }}</strong>
    </p>

    <!--Add buttons to initiate auth sequence and sign out-->
    <button v-if="isSignedIn" @click="handleSignoutClick">Cerrar sesion</button>
    <button v-else @click="handleAuthClick">Iniciar sesion</button>

    <!-- <form @submit.prevent="createFolder">
      <input type="text" v-model="form.name" placeholder="Ingrese nombre de la carpeta">
      <button type="submit">Crear carpeta</button>
    </form>

    <ul v-if="isSignedIn">
      <li v-for="file in files" :key="file.id">({{ file.id }}) {{ file.name }}</li>
    </ul>-->
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Index",

  methods: {
    handleSignoutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    },

    handleAuthClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    }
  },

  computed: {
    ...mapState("user", ["isSignedIn"])
  }
};
</script>

<style>
</style>
