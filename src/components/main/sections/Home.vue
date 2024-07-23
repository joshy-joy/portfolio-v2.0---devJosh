<script lang="ts">

import HomeCodeBlock from "./HomeCodeBlock.vue";

export default {
    components : {
        'code-block': HomeCodeBlock
    },
}; 

</script>

<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="line-number-wrap">
                    <ul class="line-number">
                        <li class="line-number-value" v-for="index in 51" :key="index">{{ index }}</li>
                    </ul>
            </div>
            <div class="container">
                <div class="home-content-wrap">
                    <div class="personal-details-wrap">
                        <div class="personal-details">
                            <p class="intro">Hi all. I am</p>
                            <h1 class="name">Joshy Joy</h1>
                            <h4 class="profession code-blue">> Senior Software Engineer </h4>
                        </div>
                        <div class="overview-wrap">
                            <p class="overview code-comments">
                                // He is passioned for crafting innovative solutions and
                            </p>
                            <p class="overview code-comments">
                                // pushing boundaries of technology
                            </p>
                            <p class="github-url">
                                <span class="const code-blue">const</span>
                                <span class="code-green">githublink</span> = 
                                <a class="link" target="_blank" href="https://github.com/joshy-joy">
                                    <span class="code-orange">"https://github.com/joshy-joy"</span>
                                </a>
                            </p>
                        </div>
                    </div>
                    <div class="code-snippet-wrap">
                        <div class="code-block block-fade code-starter">
                            <code-block></code-block>
                        </div>
                        <div class="code-block">
                            <code-block></code-block>
                        </div>
                        <div class="code-block block-fade">
                            <code-block></code-block>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.row {
    width: 100%;
}

.col-sm-12 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.line-number-wrap {
    max-height: 90vh;
    overflow: hidden;
}

.line-number {
    color: white;
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

.home-content-wrap {
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 0 0 0 30px;
}

.personal-details-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 500px;
    margin: 0 20px 0 0;
}

.personal-details {
    margin: 0 0 50px 0;
}

.intro {
    width: 130px;
    height: 24px;
    font-style: normal;
    font-weight: 450;
    font-size: 15px;
    line-height: 24px;
    color: #E5E9F0;
}

.name {
    font-style: normal;
    font-weight: 300;
    font-size: 62px;
    line-height: 81px;
    color: #E5E9F0;
}

.profession {
    font-style: normal;
    font-weight: 450;
    font-size: 25px;
    line-height: 42px;
}

.overview-wrap {
    margin: 50px 0 0 0;
}

.overview {
    font-style: normal;
    font-weight: 450;
    font-size: 13px;
    line-height: 21px;
}

.github-url {
    color: #E5E9F0;
    font-size: 15px;
}

.const {
    padding: 0 10px 0 0;
}

.code-snippet-wrap {
    height: 650px;
    overflow: hidden;
    margin: 0 0 0 20px;
}

.code-block {
    background: #001221;
    padding: 20px;
    margin: 10px 0 10px 0;
    border-radius: 10px;
    opacity: 70%;
}

.block-fade {
    opacity: 30%;
}

.code-starter {
    margin-top: -175px;
}

/*media query for screen width less than 1000px */
@media all and (max-width: 975px) {
    .code-snippet-wrap {
        display: none;
    }
}
</style>