<script lang="ts">
import { defineComponent } from 'vue'

export default {};
</script>

<template>
    <div class="header">
        <div class="search-bar">
            <input type="text" placeholder="search"/>
        </div>
    </div>
</template>

<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 5vh;
    min-width: 100vw;
    z-index: 999;
    background-color: #181818;
    border-bottom: 1px solid #2b2b2b;
    font-family: Arial, sans-serif;
}
.search-bar input {
    background-color: #2a2a2a;
    width: 500px;
    height: 27px;
    border: 1px solid #474747;
    border-radius: 7px;
    text-align: center;
}

.search-bar input, select, textarea {
    color: white;
}

.search-bar input::placeholder {
    color: white;
}

.search-bar input:focus {
    border: 1px solid #0279CB;
}

@media all and (max-width: 700px) {
    .search-bar input {
    width: 200px;
}
}
</style>