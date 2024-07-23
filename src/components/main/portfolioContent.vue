<script lang="ts">

import Home from './sections/Home.vue'
import About from './sections/About.vue'
import Projects from './sections/Projects.vue'
import Blogs from './sections/Blogs.vue'
import Contact from './sections/Contact.vue'
import TabView from '../commons/TabView.vue'
import TheLineNumber from '../commons/TheLineNumber.vue'

export default {
    components : {
        'home': Home,
        'about': About,
        'projects': Projects,
        'blogs': Blogs,
        'contact': Contact,
        'tab-view': TabView,
    },
};
</script>

<template>
    <div class="col-sm-9 content">
        <tab-view></tab-view>
        <!-- <home></home> -->
         <about></about>
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