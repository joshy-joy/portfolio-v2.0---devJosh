<script lang="ts">
export default {};

</script>

<template>
  <div class="container-fluid">
    <div class="header">
      <portfolio-header></portfolio-header>
    </div>
    <div class="row section">
      <side-menu></side-menu>
      <portfolio-content></portfolio-content>
    </div>
    <div class="footer">
      <portfolio-footer></portfolio-footer>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap');
html {
  height: 100%;
  widows: 100%;
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.container-fluid {
  font-family: 'Fira Code' !important;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 45px;
  height: 45px;
  z-index: 999;
}
.section {
  position: fixed;
  margin: 0;
  padding: 0;
  top: 45px;
  left: 0;
  height: calc(100% - 45px);
}
</style>
