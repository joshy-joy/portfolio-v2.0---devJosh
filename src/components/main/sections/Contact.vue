<script lang="ts">

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
    data() {
        return {
            name: "",
            email: "",
            message: "",
            isSubmited: false,
            isNameEmpty: false,
            isInvalidEmail: false,
            isMessageEmpty: false,
        }
    },
    watch:{
        name() {
            if(this.name !== "") {
                this.isNameEmpty = false;
            }
        },
        email() {
            if(this.email !== "" && regex.test(this.email)) {
                this.isInvalidEmail = false
            }
        },
        message() {
            if(this.message !== "") {
                this.isMessageEmpty = false;
            }
        },
    },
    methods: {
        resetFrom() {
            this.name = "";
            this.email = "";
            this.message= "";
        },
        sendMessage() {
            if(this.name === "") {
                this.isNameEmpty = true;
            }
            if(this.message === "") {
                this.isMessageEmpty = true;
            }
            if(this.email === "" || !regex.test(this.email)) {
                this.isInvalidEmail = true
            }
            if(!this.isNameEmpty && !this.isMessageEmpty && !this.isInvalidEmail) {
                this.isSubmited = true;
            }
        },
        sendNewMessage() {
            this.resetFrom()
            this.isSubmited = false;
        }
    },
};
</script>

<template>
    <div class="container-fluid code-comments">
        <div class="row row-cols-2">
            <div class="col contact-view-wrap">
                <form class="contact-form" v-if="!isSubmited">
                    <div class="mb-3">
                        <label for="name" class="form-label">_name:</label>
                        <input type="text" class="form-control" id="name" placeholder="joshy joy" v-model="name">
                        <p class="code-error" v-if="isNameEmpty">error: name cannot be empty</p>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">_email:</label>
                        <input type="email" class="form-control" id="email" v-model="email" aria-describedby="emailHelp" placeholder="joshy-joy@gmail.com">
                        <p class="code-error" v-if="isInvalidEmail">error: invalid email</p>
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">_message:</label>
                        <textarea class="form-control" id="message" rows="3" 
                        placeholder="Hey! Just checked your website and it looks awesome!" v-model="message"></textarea>
                        <p class="code-error" v-if="isMessageEmpty">error: message cannot be empty</p>
                    </div>
                    <div class="form-control-btn">
                        <button type="submit" class="btn btn-primary" @click.prevent="sendMessage()">
                            submit-message
                        </button>
                        <button class="btn btn-gray" @click.prevent="resetFrom()">reset</button>
                    </div>
                </form>
                <div class="text-center" v-else>
                    <h3>
                        Thank You!
                    </h3>
                    <p>Your message has been accepted. you will recieve answer really soon!</p>
                    <button class="btn btn-gray" @click="sendNewMessage()">send-new-message</button>
                </div>
            </div>
            <div class="col contact-code-wrap">
                <line-number :totalLine=12></line-number>
                <div class="code-section">
                    <p>
                        <span class="code-violet">const </span>
                        <span class="code-blue">button <span class="code-violet"> = </span>document.querySelector</span>
                        <span class="code-comments">(</span>
                        <span class="code-orange">'#sendBtn'</span>
                        <span class="code-comments">);</span>
                    </p>
                    <p>
                        <span class="code-violet">const </span>
                        <span class="code-blue">message </span>
                        <span class="code-violet">= </span>
                        <span class="code-comments"> {</span>
                    </p>
                    <p>
                        <span class="code-blue intent-L1">name: </span>
                        <span class="code-orange intent-L1">"{{ name }}"</span>
                        <span class="code-comments intent-L1">,</span>
                    </p>
                    <p>
                        <span class="code-blue intent-L1">email: </span>
                        <span class="code-orange intent-L1">"{{ email }}"</span>
                        <span class="code-comments intent-L1">,</span>
                    </p>
                    <p>
                        <span class="code-blue intent-L1">message: </span>
                        <span class="code-orange intent-L1">"{{ message }}"</span>
                        <span class="code-comments intent-L1">,</span>
                    </p>
                    <p class="code-comments">}</p>
                    <p>
                        <span class="code-blue">button.addEventlistener</span>
                        <span class="code-comments">(</span>
                        <span class="code-orange">'click'</span>
                        <span class="code-comments">, ()</span>
                        <span class="code-violet"> => </span>
                        <span class="code-comments">  {</span>
                    </p>
                    <p>
                        <span class="code-blue intent-L1">form.send(message)</span>
                    </p>
                    <p class="code-comments">})</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-fluid {
    width: 100%;
    height: 100%;
}

.row {
    height: 100%;
}

.col {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 450px;
}

.contact-view-wrap {
    border-right: 1px solid #2b2b2b;
}

.contact-form {
    min-width: 260px;
    width: 80%;
}

.contact-form .form-control {
    color: #729dc8 !important;
    width: 100%;
    background: #181818;
    border: 1px solid #2b2b2b;
    resize: none;
}

.form-control::placeholder{ 
  color: #2b3743 !important;
}

.form-control-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.code-section p {
    margin: 0;
}

/*media query for screen width less than 1000px */
@media all and (max-width: 1132px) {
    .col {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 100%;
    }
    .contact-view-wrap{
        border: none;
    }
    .contact-form{
        max-width: 500px;
    }
}

</style>