<script lang="ts">
import { toRaw } from 'vue';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLanguageGo } from '@mdi/js';
import { mdiLanguagePython } from '@mdi/js';
import { mdiFolder } from '@mdi/js';
import { mdiLanguageJavascript } from '@mdi/js';

import eventBus from '../consumable/eventBus';

export default {
    components: {
        SvgIcon
    },
    data() {
        return {
            goIconPath: mdiLanguageGo,
            pythonIconPath: mdiLanguagePython,
            folderIconPath: mdiFolder,
            javascriptIconPath: mdiLanguageJavascript,

            isProjectFolderExpanded: true,
            selectedTechStacks: [],
            techStacks: [
                'Golang', 
                'Python', 
                'Javascript', 
                'Angular', 
                'Vue', 
                'Flask', 
                'Django', 
                'PostgreSQL',
                'SQL Server',
                'Mongo DB',
            ]
    }
  },
  methods: {
    expandProjects() {
        this.isProjectFolderExpanded = !this.isProjectFolderExpanded;
    },
    filterProjects() {
        eventBus.emit('filterProjects', this.selectedTechStacks)
    }
  },
};
</script>

<template>
    <div class="col-sm-2">
        <div class="container-fluid">
            <div class="explorer-heading-tab">
                    <i class="bi"> </i>
                    <h6 class="explorer-heading">EXPLORER</h6>
            </div>
            <div class="explorer-wrap">
                <div class="project-folder-tab">
                    <i class="bi bi-chevron-down"></i>
                    <h6>PORTFOLIO</h6>
                </div>
                <div class="project-directory-wrap">
                    <ul class="directory-list">
                        <li class="directory-list-item" @click="expandProjects()">
                            <div class="file-item-wrap">
                                <div class="icon-wrap">
                                    <i class="bi bi-chevron-down" v-if="isProjectFolderExpanded"></i>
                                    <i class="bi bi-chevron-right" v-else></i>
                                    <svg-icon class="folder-icon-svg" type="mdi" :path="folderIconPath"></svg-icon>
                                </div>
                                <p class="file-item-name">
                                    <router-link to="/projects">Projects</router-link>
                                </p>
                            </div>
                        </li>
                        <div class="projects-type-wrap" v-if="isProjectFolderExpanded">
                            <div class="form-check" :key=tech v-for="tech in techStacks">
                                <input 
                                    class="form-check-input" 
                                    type="checkbox"
                                    name="projectFilter"
                                    :value="tech.toLowerCase()" 
                                    :id="tech" 
                                    v-model="selectedTechStacks" 
                                    @change="filterProjects()">
                                <label class="form-check-label" for="tech">
                                    {{ tech }}
                                </label>
                            </div>
                        </div>
                        <li class="directory-list-item">
                            <div class="file-item-wrap">
                                <svg-icon class="go-icon-svg" type="mdi" :path="goIconPath"></svg-icon>
                                <p class="file-item-name">
                                    <router-link to="/">Home.go</router-link>
                                </p>
                            </div>
                        </li>
                        <li class="directory-list-item">
                            <div class="file-item-wrap">
                                <svg-icon class="python-icon-svg" type="mdi" :path="pythonIconPath"></svg-icon>
                                <p class="file-item-name">
                                    <router-link to="/about">About.py</router-link>
                                </p>
                            </div>
                        </li>
                        <li class="directory-list-item">
                            <div class="file-item-wrap">
                                <svg-icon class="js-icon-svg" type="mdi" :path="javascriptIconPath"></svg-icon>
                                <p class="file-item-name">
                                    <router-link to="/contact">Contact.js</router-link>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
 .col-sm-2 {
    background-color: #181818;
    border-right: 1px solid #2b2b2b;
    height: 100%;
    color: #bcbcbc;
    font-family: "Roboto", sans-serif;
    min-width: 200px;
 }

 .explorer-heading-tab {
    margin: 10px 0 0 26px;
 }

 .explorer-heading-tab h6 {
    font-size: 14px;
 }

 .explorer-wrap {
    margin: 10px 0px;
 }

 .project-folder-tab {
    display: flex;
    justify-content: flex-start;
    align-items: center;
 }

 .project-folder-tab i {
    margin: 0 10px 0 0;
 }

 .project-folder-tab h6 {
    font-size: 14px;
    margin: 0;
 }

 .directory-list {
    list-style: none;
    padding: 0 0 0 24px;
 }

 .directory-list-item:hover {
    background: #37373e;
 }

 .file-item-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
 }

.icon-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icon-wrap .folder-icon-svg {
    margin: 0 0 0 5px;
    width: 20px;
}

 .file-item-name {
    margin: 0;
    padding: 0 0 0 15px;
    font-size: 14px;
    font-family: "Roboto", sans-serif;
 }

 .projects-type-wrap {
    margin: 0 0 0 45px;
 }

 input[type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
  accent-color: #5f7b97;
  border: 1px solid #2b2b2b;
}

.form-check {
    margin: 0;
}

.form-check:hover {
    background: #37373e;
 }

.form-check-label {
    font-size: 14px;
    margin: 0;
    padding: 0 0 0 10px;
    cursor: pointer;
}

.go-icon-svg {
    color: #519aba;
    height: 30px;
    width: 30px;
    margin: 0 0 0 13px;
}

.python-icon-svg {
    color: #ffe05d;
    width: 20px;
    margin: 0 0 0 20px;
}

.js-icon-svg {
    width: 20px;
    height: 20px;
    margin: 5px 0 5px 20px;
}

  /*media query for screen width less than 1000px */
@media all and (max-width: 574px) {
    .col-sm-3 {
        display: none;
    }
}
</style>