<script lang="ts">
export default {};

</script>

<template>
  <div class="container-fluid">
    <div class="row">
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
.container-fluid {
  font-family: 'Fira Code' !important;
  min-width: 100vw;
}

.section {
  min-height: 94vh;
  min-width: 100vw;
}
</style>
