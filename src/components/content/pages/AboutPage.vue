<script lang="ts">
export default {}
</script>

<template>
  <div class="row">
    <div class="col-sm-12">
      <line-number :totalLine="50"></line-number>
      <div class="content-wrap">
        <div class="about-code-wrap">
          <p>
            ## * * * About me * * *<br />
            <br />
            """ <br />
            I have 4+ years of experience in software product development, with a strong track
            record of enhancing system performance, optimizing processes, and driving significant
            improvements in user experience. My professional journey spans roles that have honed my
            skills in backend and frontend development, database optimization, and real-time data
            integration. <br />
            """
          </p>
          <br />
          <div class="skill-code">
            <p>
              <span class="code-orange">class </span>
              <span class="code-yellow">Skills</span>:
            </p>
            <p class="intent-L1">
              languages <span class="code-blue">=</span> [ <span class="code-blue">'golang'</span>,
              <span class="code-blue">'python'</span>, <span class="code-blue">'javascript'</span>]
            </p>
            <p class="intent-L1">
              databases <span class="code-blue">=</span> [
              <span class="code-blue">'postgresql'</span>, <span class="code-blue">'mysql'</span>,
              <span class="code-blue">'sql server'</span>, <span class="code-blue">'mongodb'</span>]
            </p>
            <p class="intent-L1">
              framework <span class="code-blue">=</span> [ <span class="code-blue">'django'</span>,
              <span class="code-blue">'flask'</span>, <span class="code-blue">'gin'</span>,
              <span class="code-blue">'angular'</span>, <span class="code-blue">'vue.js'</span>]
            </p>
            <p class="intent-L1">
              cloud <span class="code-blue">=</span> [ <span class="code-blue">'ec2'</span>,
              <span class="code-blue">'rds'</span>, <span class="code-blue">'ecs'</span>,
              <span class="code-blue">'glue'</span>, <span class="code-blue">'s2'</span>,
              <span class="code-blue">'cloudwatch'</span>]
            </p>
            <p class="intent-L1">
              ci_cd <span class="code-blue">=</span> [ <span class="code-blue">'terraform'</span>,
              <span class="code-blue">'github actions'</span>,
              <span class="code-blue">'jenkins'</span>]
            </p>
            <p class="intent-L1">
              devops <span class="code-blue">=</span> [ <span class="code-blue">'docker'</span>,
              <span class="code-blue">'git'</span>, <span class="code-blue">'jira'</span>,
              <span class="code-blue">'bitbucket'</span>, <span class="code-blue">'github'</span>]
            </p>
            <p class="intent-L1">
              monitoring <span class="code-blue">=</span> [
              <span class="code-blue">'graylog'</span>, <span class="code-blue">'grafana'</span>,
              <span class="code-blue">'pager duty'</span>]
            </p>
            <p class="intent-L1">
              testing <span class="code-blue">=</span> [ <span class="code-blue">'cucumber'</span>,
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
          <button class="btn">
            <a
              href="https://ebjhvskzfrqrgegxbsnz.supabase.co/storage/v1/object/public/portfolio_images/common/resume_joshy_joy.pdf"
              target="_blank"
              download
              >Download Resume</a
            >
          </button>
          <div class="experience-section-wrap">
            <div class="experience-title">
              <h2 class="code-comments"># Experience</h2>
            </div>
            <div class="timeline code-comments">
              <div class="timeline__component">
                <div class="timeline__date timeline__date--right">Feb 2022</div>
              </div>
              <div class="timeline__middle">
                <div class="timeline__point"></div>
              </div>
              <div class="timeline__component timeline__component--bg">
                <h2 class="timeline__title">Angel One</h2>
                <p class="timeline__paragraph">Software Development Engineer II</p>
              </div>
              <div class="timeline__component">
                <div class="timeline__date timeline__date--right">Feb 2020</div>
              </div>
              <div class="timeline__middle">
                <div class="timeline__point"></div>
              </div>
              <div class="timeline__component timeline__component--bg">
                <h2 class="timeline__title">Cognicor Technologies</h2>
                <p class="timeline__paragraph">Associate - Full Stack</p>
              </div>
              <div class="timeline__component">
                <div class="timeline__date timeline__date--right">Jun 2019</div>
              </div>
              <div class="timeline__middle">
                <div class="timeline__point"></div>
              </div>
              <div class="timeline__component timeline__component--bg">
                <h2 class="timeline__title">Choice Home</h2>
                <p class="timeline__paragraph">Sfotware Developer Intern</p>
              </div>
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
  justify-content: flex-start;
  align-items: flex-start;
}

.content-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  margin: 0;
}

.about-code-wrap {
  color: #607b96;
  padding: 7px 20px 7px 20px;
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

.resume-download-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
}

.resume-download-wrap button {
  margin: 50px;
  width: 200px;
}

.btn a {
  text-decoration: none;
  color: #ffff;
}

.experience-title {
  width: 100%;
  font-size: 10px;
  text-align: center;
  padding: 0 0 10px 0;
}

.experience-title h2 {
  font-size: 26px;
}

.timeline {
  margin: 0 auto;
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 3px 5fr;
}

.timeline__component {
  margin: 0 20px 20px 20px;
}

.timeline__component--bg {
  padding: 1em;
  background: #181818;
  border-radius: 10px;
  border: 0.5px solid #474747;
}

.timeline__middle {
  position: relative;
  background: #2b2b2b;
}

.timeline__point {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  background: #2b2b2b;
  border-radius: 50%;
}

.timeline__title {
  margin: 0;
  font-size: 1.15em;
  font-weight: bold;
  padding: 0 0 10px 0;
}

.timeline__paragraph {
  line-height: 1;
  color: #ffff;
}

.timeline__date--right {
  text-align: right;
}

/*media query for screen width less than 1000px */
@media all and (max-width: 1350px) {
  .content-wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .about-code-wrap {
    min-width: auto;
    border-right: none;
  }
}
</style>
