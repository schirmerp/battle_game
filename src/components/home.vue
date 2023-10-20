<template>
    <div class="home-screen">
      <h1>Battle Game</h1>
      <p>Select your game type:</p>
      <div class="game-types">
        <button @click="navigateTo('/moves_battle')">Moves Battle</button>
        <button @click="navigateTo('/dumb_battle')">Dumb Battle</button>
        <button @click="navigateTo('/real_gpt4')">Real GPT-4</button>
        <button @click="navigateTo('/alt_logic')">Alt Logic Battle</button>
        <button @click="navigateTo('/fireball_battle')">Fireball Battle</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'HomeScreen',
  
    setup() {
      const router = useRouter();
  
      const navigateTo = (path) => {
        router.push(path);
      };
  
      return { navigateTo };
    }
  }
  </script>
  
  <style scoped>
  .home-screen {
    max-width: 800px;
    margin: auto;
    text-align: center;
    padding: 50px 0;
  }
  
  .home-screen h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .home-screen p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  .game-types button {
    padding: 10px 20px;
    font-size: 1rem;
    margin: 5px;
    cursor: pointer;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    color: #FFFFFF;
    transition: background-color 0.3s;
  }
  
  .game-types button:hover {
    background-color: #0056b3;
  }
  </style>
  