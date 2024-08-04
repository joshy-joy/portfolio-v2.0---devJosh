<script lang="ts">

import TabView from '../commons/TabView.vue'

export default {
    components : {
        'tab-view': TabView,
    },
};
</script>

<template>
    <div class="col-sm-10 content">
        <div class="tabs-view">
            <tab-view></tab-view>
        </div>
        <div class="section-view">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.col-sm-10 {
    padding: 0 !important;
    margin: 0 !important;
}

 .content {
    background-color: #1f1f1f;
    border: 0.5px solid #181818;
    height: 100%;
    max-height: 100%;
 }

 .tabs-view {
    position: absolute;
    width: 100%;
    height: 30px;
 }

 .section-view {
    position: relative;
    top: 30px;
    height: calc(100% - 30px);
    width: 100%;
 }

 .section-view::-webkit-scrollbar {
    width: 12px !important;
    background-color: #1f1f1f; 
}

.section-view::-webkit-scrollbar-track {
    -webkit-box-shadow: #1f1f1f; 
    border-radius: 10px;
    border-left: #090b0f;

}

.section-view::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}

 /*media query for screen width less than 1000px */
@media all and (max-width: 1350px) {
    .section-view {
        overflow-y: scroll;
    }
}

</style>