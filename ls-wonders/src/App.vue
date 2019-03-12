<template>
  <div id="app">
    <img alt="Vue logo" class="header-img" src="@/assets/logo.png">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./scss/forms.scss";
@import "./scss/general.scss";
@import url("https://fonts.googleapis.com/css?family=Arvo");

body,
html {
  margin: 0;
  padding: 0;
  background: url("./assets/background1.jpg") no-repeat center center fixed;
  background-size: cover;

  font-family: "Arvo", serif;
  color: rgba(50, 50, 50, 1);
}

html {
  height: 100%;
  min-height: 100%;
}
body {
  min-height: 100%;
}

#app {
  .header-img {
    display: block;
    width: 80%;
    max-width: 500px;
    margin: 0 auto;
  }

  .container {
    margin: 0 auto;
    width: 90%;
    max-width: 500px;
  }
}
</style>
