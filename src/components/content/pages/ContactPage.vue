<script lang="ts">
import { defineComponent } from 'vue'
import eventBus from '../../consumable/eventBus'
import supabase from '../../consumable/externals/supabase'
import { type SendEmailRequest } from '../../consumable/constants/common'

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const getPersonalEmailTemplate = (name: string, email: string, message: string) => {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Inquiry Received</title><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;margin:0;padding:0}table{max-width:600px;width:100%;margin:0 auto;background-color:#fff}.header{background-color:#4caf50;color:#fff;text-align:center;padding:20px}.content{padding:20px}.contact{padding:0 0 0 40px}.content p{line-height:1.6}.button{display:inline-block;padding:10px 20px;background-color:#4caf50;color:#fff;text-decoration:none;border-radius:5px;margin-top:20px}.footer{background-color:#f4f4f4;color:#666;text-align:center;padding:10px;font-size:12px}</style></head><body><table cellpadding="0" cellspacing="0"><tr><td class="header"><h1>Got a message on portfolio</h1></td></tr><tr><td class="content"><p>From:</p><p class="contact">Name: ${name}</p><p class="contact">Email: ${email}</p></td></tr><tr><td class="content"><p class="contact">${message}</p></td></tr><tr><td class="footer"><p>&copy; joshy_joy. All rights reserved.</p></td></tr></table></body></html>`
}

const getClientEmailTemplate = (name: string) => {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Inquiry Received</title><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;margin:0;padding:0}table{max-width:600px;width:100%;margin:0 auto;background-color:#fff}.header{background-color:#4caf50;color:#fff;text-align:center;padding:20px}.content{padding:20px}.content p{line-height:1.6}.button{display:inline-block;padding:10px 20px;background-color:#4caf50;color:#fff;text-decoration:none;border-radius:5px;margin-top:20px}.footer{background-color:#f4f4f4;color:#666;text-align:center;padding:10px;font-size:12px}</style></head><body><table cellpadding="0" cellspacing="0"><tr><td class="header"><h1>Thank You for Reaching Out!</h1></td></tr><tr><td class="content"><p>Hello ${name},</p><p>We’ve received your inquiry via our portfolio contact form, and we wanted to let you know that we are reviewing it. I will get back to you shortly to address your questions or provide the information you need.</p><p>Thank you for getting in touch with us!</p><p>Best regards,</p><p style="margin:0"><strong>JOSHY JOY</strong></p><p style="margin:0"><strong>Senior Software Engineer</strong></p></td></tr><tr><td class="footer"><p>&copy; joshy_joy. All rights reserved.</p></td></tr></table></body></html>`
}

export default defineComponent({
  data() {
    return {
      name: '',
      email: '',
      message: '',
      isSubmited: false,
      isNameEmpty: false,
      isInvalidEmail: false,
      isMessageEmpty: false
    }
  },
  watch: {
    name() {
      if (this.name !== '') {
        this.isNameEmpty = false
      }
    },
    email() {
      if (this.email !== '' && regex.test(this.email)) {
        this.isInvalidEmail = false
      }
    },
    message() {
      if (this.message !== '') {
        this.isMessageEmpty = false
      }
    }
  },
  methods: {
    resetFrom() {
      this.name = ''
      this.email = ''
      this.message = ''
    },
    sendMessage() {
      if (this.name === '') {
        this.isNameEmpty = true
        return
      }
      if (this.message === '') {
        this.isMessageEmpty = true
        return
      }
      if (this.email === '' || !regex.test(this.email)) {
        this.isInvalidEmail = true
        return
      }
      if (!this.isNameEmpty && !this.isMessageEmpty && !this.isInvalidEmail) {
        this.sendClientEmail()
        this.sendPersonalEmail()
        this.sendNewMessage()
        this.isSubmited = true
      }
    },
    sendNewMessage() {
      this.resetFrom()
      this.isSubmited = false
    },
    sendClientEmail() {
      const request: SendEmailRequest = {
        name: this.name,
        email: this.email,
        subject: 'Thank you for reaching out to joshy_joy',
        html: getClientEmailTemplate(this.name)
      }
      supabase
        .invokeFunction('send-email', request)
        .then(() => {
          console.log('email send')
        })
        .then((err) => {
          console.log(err)
        })
    },
    sendPersonalEmail() {
      const request: SendEmailRequest = {
        name: this.name,
        email: 'joshyjoy.dev@gmail.com',
        subject: 'Someone reachout to you via portfolio !',
        html: getPersonalEmailTemplate(this.name, this.email, this.message)
      }
      supabase
        .invokeFunction('send-email', request)
        .then(() => {
          console.log('email send')
        })
        .then((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    eventBus.emit('openTab', 'Contact.js', '/contact')
  }
})
</script>

<template>
  <div class="container-fluid code-comments">
    <div class="row row-cols-2">
      <div class="col contact-view-wrap">
        <form class="contact-form" v-if="!isSubmited">
          <div class="mb-3">
            <label for="name" class="form-label">_name:</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="joshy joy"
              v-model="name"
            />
            <p class="code-error" v-if="isNameEmpty">error: name cannot be empty</p>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">_email:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              aria-describedby="emailHelp"
              placeholder="joshy-joy@gmail.com"
            />
            <p class="code-error" v-if="isInvalidEmail">error: invalid email</p>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">_message:</label>
            <textarea
              class="form-control"
              id="message"
              rows="3"
              placeholder="Hey! Just checked your website and it looks awesome!"
              v-model="message"
            ></textarea>
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
          <h3>Thank You!</h3>
          <p>Your message has been accepted. you will recieve answer really soon!</p>
          <button class="btn btn-gray" @click="sendNewMessage()">send-new-message</button>
        </div>
      </div>
      <div class="col contact-code-wrap">
        <line-number :totalLine="12"></line-number>
        <div class="code-section">
          <p>
            <span class="code-violet">const </span>
            <span class="code-blue"
              >button <span class="code-violet"> = </span>document.querySelector</span
            >
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
            <span class="code-comments"> {</span>
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

.form-control::placeholder {
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
  .contact-view-wrap {
    border: none;
  }
  .contact-form {
    max-width: 500px;
  }
  .contact-code-wrap {
    padding: 0;
  }
  .code-section {
    max-width: 350px;
  }
}
</style>
