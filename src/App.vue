<script setup>

</script>

<template>
    <div id="app">
      <header>
      <router-link to="/">Home</router-link>
      <router-link to="/dumb_battle">Dumb Battle</router-link>
      <router-link to="/moves_battle">Moves Battle</router-link>
      <router-link to="/alt_logic">Alt Move Logic Battle</router-link>
      <router-link to="/real_gpt4">real_gpt4 battle</router-link>
      <router-link to="/fireball_battle">Fireball Battle</router-link>
      </header>
      <router-view />
    </div>
</template>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
header{
  display: flex;
  justify-content: space-around;
}
#app{
  max-width: 100%!important;
  width: 90%!important;
}
</style>
