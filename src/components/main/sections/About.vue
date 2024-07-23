<script lang="ts">
export default {
};
</script>

<template>
    <div class="row">
        <div class="col-sm-12">
            <line-number></line-number>
            <div class="about-code-wrap">
                <p> ## * * * About me * * *<br>
                    <br>
                    """ <br>
                    I have 4+ years of experience in software product development, with a strong track 
                    record of enhancing system performance, optimizing processes, and driving significant 
                    improvements in user experience. My professional journey spans roles that have honed 
                    my skills in backend and frontend development, database optimization, and real-time 
                    data integration. <br>
                    """
                </p>
                <br>
                <div class="skill-code">
                    <p>
                        <span class="code-orange">class </span>
                        <span class="code-yellow">Skills</span>:
                    </p>
                    <p class="intent-L1">
                        languages <span class="code-blue">=</span> [
                        <span class="code-blue">'golang'</span>,
                        <span class="code-blue">'python'</span>,
                        <span class="code-blue">'javascript'</span>]
                    </p>
                    <p class="intent-L1">
                        databases <span class="code-blue">=</span> [
                        <span class="code-blue">'postgresql'</span>,
                        <span class="code-blue">'mysql'</span>,
                        <span class="code-blue">'sql server'</span>,
                        <span class="code-blue">'mongodb'</span>]

                    </p>
                    <p class="intent-L1">
                        framework <span class="code-blue">=</span> [
                        <span class="code-blue">'django'</span>,
                        <span class="code-blue">'flask'</span>,
                        <span class="code-blue">'gin'</span>,
                        <span class="code-blue">'angular'</span>,
                        <span class="code-blue">'vue.js'</span>]
                    </p>
                    <p class="intent-L1">
                        cloud <span class="code-blue">=</span> [
                        <span class="code-blue">'ec2'</span>,
                        <span class="code-blue">'rds'</span>,
                        <span class="code-blue">'ecs'</span>,
                        <span class="code-blue">'glue'</span>,
                        <span class="code-blue">'s2'</span>,
                        <span class="code-blue">'cloudwatch'</span>]
                    </p>
                    <p class="intent-L1">
                        ci_cd <span class="code-blue">=</span> [
                        <span class="code-blue">'terraform'</span>,
                        <span class="code-blue">'github actions'</span>,
                        <span class="code-blue">'jenkins'</span>]
                    </p>
                    <p class="intent-L1">
                        devops <span class="code-blue">=</span> [
                        <span class="code-blue">'docker'</span>,
                        <span class="code-blue">'git'</span>,
                        <span class="code-blue">'jira'</span>,
                        <span class="code-blue">'bitbucket'</span>,
                        <span class="code-blue">'github'</span>]
                    </p>
                    <p class="intent-L1">
                        monitoring <span class="code-blue">=</span> [
                        <span class="code-blue">'graylog'</span>,
                        <span class="code-blue">'grafana'</span>,
                        <span class="code-blue">'pager duty'</span>]
                    </p>
                    <p class="intent-L1">
                        testing <span class="code-blue">=</span> [
                        <span class="code-blue">'cucumber'</span>,
                        <span class="code-blue">'gatling'</span>]
                    </p>
                </div>
                <div class="skill-code">
                    <p>
                        <span class="code-orange">class </span>
                        <span class="code-yellow">Education</span>:
                    </p>
                    <p class="intent-L1">
                        institution <span class="code-blue">= </span>
                        <span class="code-blue">"APJ Abdul Kalam Technological University"</span>
                    </p>
                    <p class="intent-L1">
                        degree <span class="code-blue">= </span>
                        <span class="code-blue">"bachelor’s degree"</span>
                    </p>
                    <p class="intent-L1">
                        field <span class="code-blue">= </span>
                        <span class="code-blue">"computer science and engineering"</span>
                    </p>
                    <p class="intent-L1">
                        year_of_pass <span class="code-blue">= </span>
                        <span>2019</span>
                    </p>
                    <p class="intent-L1">
                        cgpa <span class="code-blue">= </span>
                        <span>7.07</span>
                    </p>
                </div>
            </div>
            <div class="resume-download-wrap">

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
    justify-content: flex-start;
    align-items: flex-start;
}

.about-code-wrap {
    color: #607B96;
    padding: 7px 20px 7px 20px;
    max-width: 600px;
    border-right: 1px solid #2b2b2b;
    height: 100%;
}

.about-code-wrap p {
    font-size: 16px;
    line-height: 23.3px;
    margin: 0;
    padding: 0;
}

.skill-code {
    color: white;
    padding: 0 0 20px 0;
}

.skill-code p {
    font-size: 14px;
}

</style>