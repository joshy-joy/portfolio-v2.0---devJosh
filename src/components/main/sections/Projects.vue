<script lang="ts">
export default {
    data() {
        return {
             projects : [
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
            ],
        }
    },
};
</script>

<template>
    <div class="container">
        <line-number></line-number>
        <div class="card-container">
            <div class="card-wrap" :key="project.id" v-for="project in projects">
                <p class="project-comment">
                    <span class="code-blue">Project 1 </span>
                    <span class="code-comments">// {{ project.name }}</span>
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
</template>

<style scoped>
.container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 100%;
    height: 100%;
    color: #ffff;
    margin: 0 !important;
    padding: 0 !important;
}

.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
    .card-container  {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
 @media all and (min-width: 1500px) {
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

</style>