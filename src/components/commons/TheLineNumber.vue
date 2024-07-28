<script lang="ts">
export default {
    data() {
        return {
            defaultLineNumberCount: 100
        }
    },
    props:['totalLine'],
    computed: {
        lineCount() {
            if(this.totalLine <= 0) {
                return this.defaultLineNumberCount
            } 
            return this.totalLine
        },
    },
}; 
</script>

<template>
    <div class="line-number-wrap">
        <ul class="line-number">
            <li class="line-number-value" v-for="index in lineCount()" :key="index">{{ index }}</li>
        </ul>
    </div>
</template>

<style scoped>
.line-number-wrap {
    max-height: 100%;
    min-width: 40px;
    overflow: hidden;
    padding: 5px 0 0 10px;
}

.line-number {
    margin: 0;
    padding: 0 15px 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
}

.line-number-value {
    text-decoration: none;
    color: #6f7681;
}
</style>