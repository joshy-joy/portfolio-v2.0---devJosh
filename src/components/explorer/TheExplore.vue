<script lang="ts">

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLanguageGo } from '@mdi/js';
import { mdiLanguagePython } from '@mdi/js';
import { mdiFolder } from '@mdi/js';
import { mdiLanguageJavascript } from '@mdi/js';

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
                        <li class="directory-list-item">
                            <div class="file-item-wrap">
                                <div class="icon-wrap">
                                    <i class="bi bi-chevron-right"></i>
                                    <svg-icon class="folder-icon-svg" type="mdi" :path="folderIconPath"></svg-icon>
                                </div>
                                <p class="file-item-name">Projects</p>
                            </div>
                        </li>
                        <li class="directory-list-item">
                            <div class="file-item-wrap">
                                <svg-icon class="go-icon-svg" type="mdi" :path="goIconPath"></svg-icon>
                                <p class="file-item-name">Home.go</p>
                            </div>
                        </li>
                        <li class="directory-list-item">
                            <div class="file-item-wrap">
                                <svg-icon class="python-icon-svg" type="mdi" :path="pythonIconPath"></svg-icon>
                                <p class="file-item-name">About.py</p>
                            </div>
                        </li>
                        <li class="directory-list-item">
                            <div class="file-item-wrap">
                                <svg-icon class="js-icon-svg" type="mdi" :path="javascriptIconPath"></svg-icon>
                                <p class="file-item-name">Contact.js</p>
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
    max-height: 100%;
    color: #bcbcbc;
    font-family: "Roboto", sans-serif;
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