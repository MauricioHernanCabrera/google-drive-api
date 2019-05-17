<template>
  <section class="container">
    <div>
      <p>
        Estado del usuario
        <strong>{{ isSignedIn? 'Conectado' : 'Desconectado' }}</strong>
      </p>

      <button v-if="isSignedIn" @click="handleSignoutClick">Cerrar sesion</button>
      <button v-else @click="handleAuthClick">Iniciar sesion</button>
    </div>

    <div>
      <h1>¿Qué puedo hacer?</h1>
      <ul>
        <li>Vincular tu cuenta de google drive con la aplicación al tocar el boton de <strong>iniciar sesión</strong></li>
        <li>Crear carpetas con archivos que se guardaran en tu drive una vez dado los permisos necesarios</li>
        <li>Ver todas las carpetas creadas con sus contenidos</li>
        <li>Eliminar una carpeta</li>
      </ul>
    </div>
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
