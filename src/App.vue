<script lang="ts">
import supabase from './components/consumable/externals/supabase'
import eventBus from './components/consumable/eventBus'

const authEventCallBack = (event: string) => {
  if (event === 'SIGNED_IN') {
    eventBus.emit('authEvent', true)
  } else if (event === 'SIGNED_OUT') {
    eventBus.emit('authEvent', false)
  }
}

export default {
  data() {
    return {
      supabaseEventSubscription: null
    }
  },
  beforeMount() {
    this.supabaseEventSubscription = supabase.OnAuthEventChange(authEventCallBack)
  },
  beforeUnmount() {
    if (this.supabaseEventSubscription && this.supabaseEventSubscription.subscription) {
      this.supabaseEventSubscription.subscription.unsubscribe()
    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <push-notifications></push-notifications>
    <authentication-window></authentication-window>
    <div class="header">
      <header-layout></header-layout>
    </div>
    <div class="row section">
      <primary-nav></primary-nav>
      <main-content></main-content>
    </div>
    <div class="footer">
      <footer-layout></footer-layout>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Nanum+Gothic&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

html {
  height: 100%;
  widows: 100%;
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.container-fluid {
  font-family: 'Fira Code' !important;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 45px;
  height: 45px;
  z-index: 999;
}
.section {
  position: fixed;
  margin: 0 !important;
  padding: 0 !important;
  top: 45px;
  left: 0;
  height: calc(100% - 70px);
  width: 100%;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 25px;
  width: 100%;
  background-color: #0279cb;
}
</style>
