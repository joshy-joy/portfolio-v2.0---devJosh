<script lang="ts">

import Home from './sections/Home.vue'
import About from './sections/About.vue'
import Projects from './sections/Projects.vue'
import Blogs from './sections/Blogs.vue'
import Contact from './sections/Contact.vue'

export default {
    components : {
        Home,
        About,
        Projects,
        Blogs,
        Contact
    },
};
</script>

<template>
    <div class="col-sm-9 content">
        <Home></Home>
    </div>
</template>

<style scoped>
 .content {
    background-color: #1f1f1f;
    border: 0.5px solid #181818;
 }
</style>