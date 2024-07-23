<script lang="ts">

import Home from './sections/Home.vue'
import About from './sections/About.vue'
import Projects from './sections/Projects.vue'
import Blogs from './sections/Blogs.vue'
import Contact from './sections/Contact.vue'
import TabView from '../commons/TabView.vue'

export default {
    components : {
        Home,
        About,
        Projects,
        Blogs,
        Contact,
        TabView
    },
};
</script>

<template>
    <div class="col-sm-9 content">
        <TabView></TabView>
        <Home></Home>
    </div>
</template>

<style scoped>
.col-sm-9 {
    padding: 0;
}

 .content {
    background-color: #1f1f1f;
    border: 0.5px solid #181818;
 }
</style>