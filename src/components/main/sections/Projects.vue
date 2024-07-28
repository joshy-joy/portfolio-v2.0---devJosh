<script lang="ts">
export default {
    data() {
        return {
             projects : {
                personal: [
                    {
                        id:"d035d93d-22bb-40e3-9238-d62ac4a88daa",
                        name:"FolioHub",
                        description: `A Software-as-a-Service (SaaS) platform empowers users to create and showcase 
                                        portfolio websites without coding skills effortlessly.`,
                        status: "in-progress",
                        image: "/images/foliohub.png",
                        redirect: "",
                        tags: ['python', 'javascript', 'vue', 'django']
                    },
                    {
                        id:"4a05a71a-ab50-4c1d-ac08-c5b544056571",
                        name:"One-Call",
                        description: `The Onecall library is used to connect and trade with cryptocurrency exchanges 
                                        and payment processing services worldwide.`,
                        status: "completed",
                        image: "/images/onecall.png",
                        redirect: "https://pypi.org/project/onecall/",
                        tags: ['python']
                    },
                    {
                        id:"e307b453-da78-433f-a099-dcc058fd3454",
                        name:"M-Health",
                        description: `A deep learning model designed to predict employees' mental health conditions and 
                                        determine if they require medical support`,
                        status: "completed",
                        image: "/images/mental-health-app.png",
                        redirect: "https://github.com/joshy-joy/Employee-Treatment-prediction",
                        tags: ['python']
                    },
                    {
                        id:"928acebe-1d4c-456d-adf7-2bb7b55279cc",
                        name:"Portfolio",
                        description: `A re-designed developer portfolio that took the theme of VS Code editor`,
                        status: "completed",
                        image: "/images/portfolio.png",
                        redirect: "https://github.com/joshy-joy/portfolio-v2.0---devJosh",
                        tags: ['vue', 'golang']
                    },
                ],
                company: [
                    {
                        id:"80acf183-6042-43fe-bb57-40544d212c5c",
                        name:"NXT 2.0",
                        description: `NXT is the sub-broker platform that enable partners to acquire provide stock 
                                        brokerage service.`,
                        status: "On-going",
                        image: "/images/nxt.png",
                        redirect: "https://www.angelone.in/authorised-person/platform-and-tools",
                        tags: ['python', 'golang']
                    },
                    {
                        id:"d3487a12-b00a-4ce8-bef0-af8cabfd0408",
                        name:"Cira",
                        description: `CIRA by CogniCor is a digital assistant platform that uses AI to improve 
                                    efficiency and client engagement in financial services and wealth management.`,
                        status: "On-going",
                        image: "/images/cira.png",
                        redirect: "https://www.cognicor.com/platform",
                        tags: ['python', 'javascript', 'angular', 'flask']
                    },
                ]
            }
        }
    },
};
</script>

<template>
    <div class="container">
        <line-number></line-number>
        <div class="card-container">
            <p class="code-comments">// Company Projects</p>
            <div class="row row-cols-3">
                <div class="col card-wrap" :key="project.id" v-for="(project, i) in projects.company">
                    <p class="project-comment">
                        <span class="code-blue">Project {{ i+1 }} </span>
                        <span class="code-comments"> // {{ project.name }}</span>
                    </p>
                    <div class="card">
                        <div class="card-img-wrap">
                            <img :src="project.image" class="card-img-top" alt="...">
                        </div>
                        <div class="card-body">
                            <div class="card-title-wrap">
                                <h5 class="card-title">{{ project.name }}</h5>
                                <span :class="['badge', project.status === 'completed' ? 'completed' : 'in-progress']">
                                    {{ project.status }}
                                </span>
                            </div>
                            <p class="card-text code-comments">{{ project.description }}</p>
                            <a :href="project.redirect" class="btn" target="_blank">view-project</a>
                        </div>
                    </div>
                </div>
            </div>
            <p class="code-comments">// Personal Projects</p>
            <div class="row row-cols-3">
                <div class="col card-wrap" :key="project.id" v-for="(project, i) in projects.personal">
                    <p class="project-comment">
                        <span class="code-blue">Project {{ i+1 }} </span>
                        <span class="code-comments"> // {{ project.name }}</span>
                    </p>
                    <div class="card">
                        <div class="card-img-wrap">
                            <img :src="project.image" class="card-img-top" alt="...">
                        </div>
                        <div class="card-body">
                            <div class="card-title-wrap">
                                <h5 class="card-title">{{ project.name }}</h5>
                                <span :class="['badge', project.status === 'completed' ? 'completed' : 'in-progress']">
                                    {{ project.status }}
                                </span>
                            </div>
                            <p class="card-text code-comments">{{ project.description }}</p>
                            <a :href="project.redirect" class="btn" target="_blank">view-project</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 100%;
    height: 100%;
    color: #ffff;
    margin: 0 !important;
    padding: 0 !important;
    overflow-y: scroll;
}

.container::-webkit-scrollbar {
    display: none;
}

.card-container {
    width: 100%;
    height: 100%;
    padding: 7px 0 0 0;
}

.card-container .code-comments {
    margin: 0;
    padding: 0px 0 5px 0;
}

.row {
    width: 100%;
    padding: 10px 0px 23px 0;
}

.col {
    max-width: 325px;
}

.project-comment {
    width: 290px;
    margin: 0 0 0 20px;
}

.card {
    height: 300px;
    min-width: 300px;
    max-width: 300px;
    border-radius: 15px 15px;
    overflow: hidden;
    background: #181818;
    border: 1px solid #2b2b2b;
    margin: 10px;
}

.card-img-wrap {
    box-sizing: border-box;
    border: 1px solid #1E2D3D;
    min-height: 150px;
    overflow: hidden;
    animation: 1s forwards;
    animation-name: image-push-down;
}

.card:hover > .card-img-wrap {
  animation: 1s forwards;
  animation-name: image-push-up;
}

@keyframes image-push-down {
  from {min-height: 50px;}
  to {min-height: 150px;}
}

@keyframes image-push-up {
  from {min-height: 150px;}
  to {min-height: 50px;}
}

.card-body {
    max-height: 70px;
    animation: 1s forwards;
    animation-name: detail-push-down;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.card:hover > .card-body  {
  animation: 1s forwards;
  animation-name: detail-push-up;
}
@keyframes detail-push-up {
  from {min-height: 70px;}
  to {min-height: 250px;}
}

@keyframes detail-push-down {
  from {min-height: 250px;}
  to {min-height: 70px;}
}

.card-title-wrap {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
}

.card-title {
    font-size: 18px;
}

.card-text {
    font-size: 14px;
    opacity: 0;
    animation: 1s forwards;
    animation-name: hide;
}

.badge {
    color: #181818;
    width: 100px;
    height: 20px;
    text-align: center;
}

.completed {
    background: #74c991;
}

.in-progress {
    background: #9cdcff;
}

.btn {
    opacity: 0;
    animation: 1s forwards;
    animation-name: hide;
}

.btn:hover {
    text-decoration: none;
    color: #ffff;
}

.card:hover > .card-body > .card-text {
  animation: 1s forwards;
  animation-name: show;
}

.card:hover > .card-body > .btn {
  animation: 1s forwards;
  animation-name: show;
}

@keyframes show {
  from {opacity: 0;}
  30% {opacity: 0.3;}
  50% {opacity: 0.5;}
  700% {opacity: 0.7;}
  to {opacity: 1;}
}

@keyframes hide {
    from {opacity: 1;}
    30% {opacity: 0.7;}
    50% {opacity: 0.5;}
    700% {opacity: 0.3;}
    to {opacity: 0;}
}

 /*media query for screen width less than 1300px */
 @media all and (max-width: 1350px) {
    .card {
        height: 300px;
        min-width: 300px;
        max-width: 500px;
        border-radius: 15px 15px;
        overflow: hidden;
        background: #181818;
        border: 1px solid #2b2b2b;
        margin: 10px;
        float: left;
    }
}

 /*media query for screen width less than 1300px */
 @media all and (min-width: 1500px) {
    .col {
        max-width: 400px;
    }

    .card {
        height: 300px;
        min-width: 300px;
        max-width: 500px;
        border-radius: 15px 15px;
        overflow: hidden;
        background: #181818;
        border: 1px solid #2b2b2b;
        margin: 10px;
        float: left;
    }
}

 /*media query for screen width less than 1300px */
 /* @media all and (min-width: 972px) {
   .container {
    height: ;
   }
} */

</style>