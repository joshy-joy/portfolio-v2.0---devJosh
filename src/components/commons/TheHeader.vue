<script lang="ts">
import { defineComponent } from 'vue'

export default {};
</script>

<template>
    <div class="header">
        <div class="logo">
            <img src="/images/logo.png" alt="">
        </div>
        <div class="search-bar">
            <input type="text" placeholder="search"/>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 5vh;
    min-width: 100vw;
    z-index: 999;
    background-color: #181818;
    border-bottom: 1px solid #2b2b2b;
    font-family: Arial, sans-serif;
}

.search-bar {
    min-width: calc(100% - 25px);
    display: flex;
    justify-content: center;
    align-items: center;
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

.logo {
    margin: 0 0 0 5px;
}

.logo img {
    width: 25px;
}

@media all and (max-width: 573px) {
    .search-bar input {
    width: 200px;
}
}
</style>