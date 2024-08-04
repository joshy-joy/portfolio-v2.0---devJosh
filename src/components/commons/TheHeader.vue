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
            <!-- <input type="text" placeholder="search"/> -->
             <p>@joshy_joy</p>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: inherit;
    min-width: 100%;
    background-color: #181818;
    border-bottom: 1px solid #2b2b2b;
    font-family: Arial, sans-serif;
}

.search-bar {
    min-width: calc(100% - 50px);
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

.search-bar p {
    color: #ffff;
    font-family: 'Fira Code';
    margin: 0;
    font-size: 20px;
    letter-spacing: 6px;
    font-weight: 700;
}

.logo {
    margin: 0 0 0 20px;
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