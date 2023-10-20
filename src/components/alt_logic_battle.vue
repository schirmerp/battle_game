<template>
    <div class="container">
      <div v-if="showSelection">
        <h2>Select Players</h2>
        <div class="player-selection">
          <div v-for="player in allPlayers" :key="player.name" class="player-card" :class="{selected: isSelected(player)}" @click="selectPlayer(player)">
            <img :src="player.avatar" alt="player-avatar" />
            <h4>{{ player.name }}</h4>
          </div>
        </div>
        <button @click="startGame" :disabled="selectedPlayers.length !== 2">Start Game</button>
      </div>
      
      <div v-else>
        <div class="game-container">
          <div v-for="player in players" :key="player.name" class="player-area">
            <div class="player-info">
              <img :src="player.avatar" alt="player-avatar" />
              <h4>{{ player.name }}</h4>
              <p>Health: {{ player.health }}</p>
              <div class="moves">
                <h5>Moves:</h5>
                <button v-for="move in player.moves" :key="move.name" :disabled="move.currentCooldown > 0 || !isPlayerTurn(player)" @click="executeMove(move, player)">
                  {{ move.name }} (Cooldown: {{ move.currentCooldown }})
                </button>
              </div>
              <div class="attack-history">
                <h5>Attack History:</h5>
                <ul>
                  <li v-for="attack in player.attackHistory" :key="attack">{{ attack }}</li>
                </ul>
              </div>
            </div>
          </div>
          <p>{{ attackResult }}</p>
          <button @click="resetGame">Reset Game</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  function Player(name, health = 100, attack = 10, defense = 10, img, moves) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.avatar = img;
    this.attackHistory = [];
    this.moves = moves;
    this.buffs = {
      attack: 0,
      defense: 0,
      weakenDefense: 0,
      weakenAttack: 0
    }
  }
  
  const applyEffect = (move, player, opponent) => {
    if (move.attackValue) {
      const damage = move.attackValue.base * getRandomMultiplier(move.attackValue.multiplierRange);
      if (move.target === 'opponent') opponent.health -= damage;
      else player.health -= damage;
    }
  
    if (move.defenseBoost) {
      if (move.target === 'self') player.defense += move.defenseBoost;
      else opponent.defense += move.defenseBoost;
    }
  
    if (move.defenseWeaken) {
      if (move.target === 'opponent') opponent.defense -= move.defenseWeaken;
      else player.defense -= move.defenseWeaken;
    }
  
    if (move.healing) {
      player.health += move.healing;
    }
  };
  
  const getRandomMultiplier = (range) => Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]);
  
  const player1Moves = [
    { name: 'Slash', target: 'opponent', attackValue: { base: 3, multiplierRange: [1, 5] }, defenseBoost: null, defenseWeaken: 2, healing: null, cooldown: 0, currentCooldown: 0 },
    { name: 'Parry', target: 'self', attackValue: null, defenseBoost: 3, defenseWeaken: null, healing: null, cooldown: 1, currentCooldown: 0 },
    { name: 'Double Slash', target: 'opponent', attackValue: { base: 6, multiplierRange: [1, 4] }, defenseBoost: null, defenseWeaken: null, healing: null, cooldown: 2, currentCooldown: 0 },
    { name: 'Evade', target: 'self', attackValue: null, defenseBoost: null, defenseWeaken: null, healing: 5, cooldown: 3, currentCooldown: 0 },
  ];
  
  const player2Moves = [
    { name: 'Punch', target: 'opponent', attackValue: { base: 4, multiplierRange: [1, 4] }, defenseBoost: null, defenseWeaken: null, healing: null, cooldown: 1, currentCooldown: 0 },
    { name: 'Block', target: 'self', attackValue: null, defenseBoost: 2, defenseWeaken: null, healing: null, cooldown: 0, currentCooldown: 0 },
    { name: 'Roundhouse Kick', target: 'opponent', attackValue: { base: 8, multiplierRange: [1, 3] }, defenseBoost: null, defenseWeaken: 1, healing: null, cooldown: 2, currentCooldown: 0 },
    { name: 'Heal Punch', target: 'self', attackValue: null, defenseBoost: null, defenseWeaken: null, healing: 4, cooldown: 3, currentCooldown: 0 },
  ];
  
  const player3Moves = [
    { name: 'Magic Bolt', target: 'opponent', attackValue: { base: 3, multiplierRange: [1, 6] }, defenseBoost: null, defenseWeaken: null, healing: null, cooldown: 1, currentCooldown: 0 },
    { name: 'Barrier', target: 'self', attackValue: null, defenseBoost: 5, defenseWeaken: null, healing: null, cooldown: 0, currentCooldown: 0 },
    { name: 'Mana Drain', target: 'opponent', attackValue: { base: 6, multiplierRange: [1, 3] }, defenseBoost: null, defenseWeaken: 2, healing: null, cooldown: 2, currentCooldown: 0 },
    { name: 'Healing Wave', target: 'self', attackValue: null, defenseBoost: null, defenseWeaken: null, healing: 7, cooldown: 3, currentCooldown: 0 },
  ];
  
  const player1 = new Player("Player 1", 100, 8, 5, './src/assets/p1.png', player1Moves);
  const player2 = new Player("Player 2", 100, 7, 6, './src/assets/pk.png', player2Moves);
  const player3 = new Player("Player 3", 100, 6, 7, './src/assets/p3.png', player3Moves);
  
  const allPlayers = ref([player1, player2, player3]);
  const selectedPlayers = ref([]);
  const showSelection = ref(true);
  const players = ref([]);
  const attackResult = ref("");
  
  const isSelected = (player) => selectedPlayers.value.includes(player);
  
  const selectPlayer = (player) => {
    if (isSelected(player)) {
      const index = selectedPlayers.value.indexOf(player);
      selectedPlayers.value.splice(index, 1);
    } else {
      if (selectedPlayers.value.length < 2) {
        selectedPlayers.value.push(player);
      }
    }
  };
  
  const startGame = () => {
    players.value = [...selectedPlayers.value];
    showSelection.value = false;
  };
  
  const isPlayerTurn = (player) => players.value[0] === player;
  
  const executeMove = (move, player) => {
    if (!isPlayerTurn(player)) return;
    
    const opponent = players.value.find(p => p !== player);
    applyEffect(move, player, opponent);
    players.value.reverse();
  };
  
  const resetGame = () => {
    players.value = [];
    selectedPlayers.value = [];
    showSelection.value = true;
  };
  </script>
  
  <style scoped>
    .container {
      padding: 20px;
    }
    .player-card {
      border: 1px solid black;
      padding: 10px;
      margin: 5px;
    }
    .player-card.selected {
      background-color: lightblue;
    }
  </style>
  