<script setup>
import { ref } from 'vue'

function Player(name, health = 100, attack = 0, defense = 0, img) {
  this.name = name;
  this.health = health;
  this.attack = attack <= 10 ? attack : 10;
  this.defense = defense <= 10 ? defense : 10;
  this.avatar = img;
  this.attackHistory = [];
}

const player1 = new Player("Player 1", 100, 8, 5, './src/assets/p1.png');
const player2 = new Player("Player 2", 100, 7, 6, './src/assets/p3.png');
const player3 = new Player("Player 3", 100, 9, 4, './src/assets/pk.png');

const allPlayers = ref([player1, player2, player3]);
const selectedPlayers = ref([]);
const players = ref([]);
const currentPlayerIndex = ref(null);
const showSelection = ref(true);
const attackResult = ref('');

const getRandomMultiplier = () => Math.floor(Math.random() * 5) + 1;

const selectPlayer = (player) => {
  if (selectedPlayers.value.length < 2 && !selectedPlayers.value.includes(player)) {
    selectedPlayers.value.push(player);
  }
};

const startGame = () => {
  players.value = [...selectedPlayers.value];
  players.value.forEach(player => {
    player.attackHistory = [];
  });
  currentPlayerIndex.value = Math.floor(Math.random() * players.value.length);
  showSelection.value = false;
};

const resetGame = () => {
  selectedPlayers.value = [];
  showSelection.value = true;
  players.value.forEach(player => {
    player.health = 100;
    player.attackHistory = [];
  });
};

const attackPlayer = () => {
  const attacker = players.value[currentPlayerIndex.value];
  const targetPlayer = players.value[1 - currentPlayerIndex.value]; // Get the opposite player.

  if (!attacker || !targetPlayer) {
    return;
  }

  const attackMultiplier = getRandomMultiplier();
  const defenseMultiplier = getRandomMultiplier();

  const damage = attacker.attack * attackMultiplier - targetPlayer.defense * defenseMultiplier;
  targetPlayer.healthChange = damage;

  setTimeout(() => {
    targetPlayer.healthChange = null;
  }, 1000);

  if (damage >= 0) {
    attackResult.value = `Damage: -${damage}`;
  } else {
    attackResult.value = `Damage: +${-damage}`;
  }

  targetPlayer.health -= damage;

  if (targetPlayer.health <= 0) {
    targetPlayer.health = 0;
    attackResult.value = `${attacker.name} wins!`;
    setTimeout(resetGame, 2000);
  } else if (targetPlayer.health > 100) {
    targetPlayer.health = 100;
  }

  let damageDisplay = damage >= 0 ? `-${damage}` : `+${-damage}`;
  targetPlayer.attackHistory.push(damageDisplay);

  currentPlayerIndex.value = 1 - currentPlayerIndex.value; // Switch turns.
};

const isSelected = (player) => {
    return selectedPlayers.value.includes(player);
}
</script>

<template>
<div class="game-container">
  <div class="p-select-wrap" v-if="showSelection">
    <div class="player-select" v-for="player in allPlayers" :class="{ 'selected-player': isSelected(player) }" :key="player.name" @click="selectPlayer(player)">
      <img :src="player.avatar" :alt="player.name">
      <div>{{ player.name }}</div>
    </div>
    <button class="start-button" v-if="selectedPlayers.length === 2" @click="startGame">Start</button>
  </div>
  
  <div v-else class="game-wrap">
    <div class="player" v-for="player in players" :key="player.name">
      <img :src="player.avatar" :alt="player.name">
      <div class="health">
        <div class="health-bar">
          <div class="green-bar" :style="{ width: player.health <= 100 ? player.health + '%' : '100%' }"></div>
          <div class="blue-bar" v-if="player.health > 100" :style="{ width: player.health - 100 + '%' }"></div>
        </div>
        <div class="health-change" v-if="player.healthChange">
          -{{ player.healthChange }}
        </div>
        <div class="attack-history">
          <div v-for="(damage, index) in player.attackHistory" :key="index" class="damage-item">
            Damage: {{ damage }}
          </div>
        </div>
      </div>
      <button @click="attackPlayer" :disabled="player !== players[currentPlayerIndex]">Attack</button>
      <div class="turn-indicator" v-if="player === players[currentPlayerIndex]">
        {{ player.name }}'s Turn
      </div>
    </div>
    <div class="attack-result" v-if="attackResult">{{ attackResult }}</div>
  </div>
</div>
</template>

<style scoped>
.start-button{
    position: absolute;
    bottom: 0;
    left: 40%;
    width: 10rem;
}
.game-container {
  position: relative;
  width: 70vw;
  height: 100vh;
  margin-top: 5rem;
}
.game-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.player-select {
  /* width: 30%; */
  cursor: pointer;
  display: inline-block;
  margin: 15px;
  text-align: center;
}
.player-select:hover {
  transform: scale(1.1);
  border: 3px solid rgb(148, 148, 252)
}
.p-select-wrap{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.read-the-docs {
  color: #888;
}
.health-bar {
  height: 100%;
  background-color: #ff0000;
  position: relative;
}
.green-bar {
  height: 100%;
  background-color: #00ff00;
  transition: width 0.5s;
}
.blue-bar {
  height: 100%;
  background-color: #0000ff;
  position: absolute;
  top: 0;
  left: 100%;
  transition: width 0.5s;
}
.health {
  width: 100px;
  height: 10px;
  background-color: #ff0000;
  position: relative;
}
.turn-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-weight: bold;
  color: #000;
  background-color: #ffff00;
  padding: 5px;
  border-radius: 5px;
}
.attack-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 24px;
  color: #ff0000;
  text-align: center;
  z-index: 9999;
}
.attack-history {
  margin-top: 4rem;
  text-align: center;
}
.damage-item {
  margin: 5px;
  display: inline-block;
  padding: 5px 10px;
  background-color: rgba(255, 0, 0, 0.6);
  border-radius: 5px;
  color: white;
}
.health-change {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 5px;
  color: #ff0000;
  transition: opacity 1s;
}
.player {
  width: 40%;
  position: relative;
  text-align: center;
}
/* img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
} */
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}
button:hover {
  background-color: #0056b3;
}
button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
.selected-player{
    border: 3px solid rgb(148, 148, 252)
}
</style>
 
