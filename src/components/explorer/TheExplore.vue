<script lang="ts">
import { defineComponent } from 'vue'

export default {};
</script>

<template>
    <div class="col-sm-3"></div>
</template>

<style scoped>
 .col-sm-3 {
    background-color: #181818;
    border-right: 1px solid #2b2b2b;
    height: 100%;
    max-height: 100%
 }

  /*media query for screen width less than 1000px */
@media all and (max-width: 574px) {
    .col-sm-3 {
        display: none;

    }
}
</style>