<script lang="ts">
import eventBus from '../consumable/eventBus'
import supabase from '../consumable/externals/supabase'

export default {
  data() {
    return {
      email: '',
      password: '',
      showLoginWindow: false,
      isAlreadyLoggedIn: false
    }
  },
  methods: {
    // function to login of dashboard
    login() {
      supabase
        .login(this.email, this.password)
        .then(() => {
          this.isAlreadyLoggedIn = true
        })
        .catch((err) => {
          console.error(err)
        })
    },

    // function to logout of dashboard
    logout() {
      supabase
        .logout()
        .then(() => {
          this.isAlreadyLoggedIn = false
        })
        .catch((err) => {
          console.error(err)
        })
    },

    // function to close login window
    hideLoginWindow() {
      this.showLoginWindow = false
    },

    // check whether already authenticated
    checkAuthenticationState() {
      supabase
        .getUserSession()
        .then((data) => {
          if (data.data && data.data.session && data.data.session.access_token) {
            this.isAlreadyLoggedIn = true
          } else {
            this.isAlreadyLoggedIn = false
          }
        })
        .catch((err: Error) => {
          console.error(err)
        })
    }
  },
  mounted() {
    this.checkAuthenticationState()
    eventBus.on('login', (data: boolean) => {
      this.checkAuthenticationState()
      this.showLoginWindow = data
    })
  }
}
</script>

<template>
  <div class="login-wrap" :class="{ 'hide-login ': !showLoginWindow }">
    <div class="close-wrap">
      <i class="bi bi-x-lg" @click="hideLoginWindow()"></i>
    </div>
    <form class="contact-form" v-if="!isAlreadyLoggedIn">
      <div class="mb-3">
        <label for="email" class="form-label">_email:</label>
        <input type="email" class="form-control" id="email" v-model="email" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">_password:</label>
        <input type="password" class="form-control" id="password" v-model="password" />
      </div>
      <div class="form-control-btn">
        <button type="submit" class="btn btn-primary" @click.prevent="login()">login</button>
      </div>
    </form>
    <form class="contact-form logout-form" v-else>
      <p>You are already logged In..!</p>
      <button type="submit" class="btn btn-primary" @click.prevent="logout()">logout</button>
    </form>
  </div>
</template>

<style>
.login-wrap {
  background-color: #1f1f1f;
  width: 100%;
  height: 100%;

  position: fixed;
  top: 45px;
  left: 0;
  z-index: 999;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffff;
}

.close-wrap {
  position: absolute;
  right: 20px;
  top: 20px;
}

.close-wrap i {
  cursor: pointer;
}

.contact-form {
  min-width: 260px;
  width: 500px;
}

.logout-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.contact-form .form-control {
  color: #729dc8 !important;
  width: 100%;
  background: #ffff;
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

.hide-login {
  display: none;
}

@media all and (max-width: 550px) {
  .contact-form {
    width: 250px;
  }
}
</style>
