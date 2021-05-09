<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>

<style>
* {
  margin: 0%;
  padding: 0%;
  overflow: -moz-hidden-unscrollable;
}
html {
  background-color: #303030;
  overflow: hidden !important;
}
</style>
