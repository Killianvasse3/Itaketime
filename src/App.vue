<template>
  <div>
    <div id="nav">
      <img id="burger" src="./assets/burger.png" alt="menu burger">
      <img id="logo" src="./assets/logo_take.png" alt="logo I take time">
    </div>
    <router-view/>
  </div>
</template>

<script>
</script>

<style>
* {
  margin: 0%;
  padding: 0%;
}
html {
  background-color: #2b323a;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display: flex;
  justify-content: space-around;
}

#nav a {
  font-weight: bold;
  color: #aefffc;
}

#burger {
  width: 2%;
  padding: 0.6%;
}

#logo {
  width:5%;
  margin-left: 85%;
  padding: 0.3%;
}
</style>
