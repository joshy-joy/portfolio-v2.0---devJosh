<script lang="ts">
export default {
}; 
</script>

<template>
    <div class="row h-100">
        <div class="col-sm-12">
            <div class="personal-details-wrap">
                <div class="line-number-wrap">
                    <ul class="line-number">
                        <li class="line-number-value" v-for="index in 30" :key="index">{{ index }}</li>
                    </ul>
                </div>
                <div class="personal-details">
                    <p class="intro">Hi all. I am</p>
                    <h1 class="name">Joshy Joy</h1>
                    <h4 class="profession code-blue">> Software Development Engineer</h4>
                    <p class="overview code-comments">
                        // He is passioned fro crafting innovative solutions and
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
            <div class="home-code-snippet">
                
            </div>
        </div>
    </div>
</template>

<style scoped>
.col-md-1 {
    padding: 0 !important;
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

.personal-details-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
font-size: 32px;
line-height: 42px;
}

.overview {
font-style: normal;
font-weight: 450;
font-size: 16px;
line-height: 21px;
}

.github-url {
 color: #E5E9F0;
}

.const {
    padding: 0 10px 0 0;
}

</style>