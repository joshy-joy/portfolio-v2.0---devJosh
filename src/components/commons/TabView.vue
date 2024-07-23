<script lang="ts">
export default {
    methods: {
         closeTab() {
            console.log("close")
        }
    }
}; 

</script>

<template>
    <div class="tab-wrap">
        <div class="tab-section">
            <p>home.py</p>
            <button class="close-btn" @click="closeTab()"><span>x</span></button>
        </div>
    </div>
</template>

<style scoped>
.tab-wrap {
    width: 100%;
    height: 30px;
    background: #181818;
    color: #7e7e7e;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 0.5px solid #474747;
}

.tab-section {
    height: 100%;
    text-align: center;
    border-right: 0.5px solid #474747;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor:pointer;
}

.tab-section p {
    padding: 2px 20px;
    margin: 0 !important;
}

.close-btn {
    background: none;
    border: none;
    padding: 2px 10px 2px 10px;
    color: inherit;
    cursor: pointer;
}

.close-btn:focus {
  outline: none;
  box-shadow: none;
}

</style>