<script setup>
import { ref } from 'vue'
import { Player, playersObject, allPlayer } from './player.js';


// function Player(name, health = 100, attack = 0, defense = 0, img, moves) {
//   this.name = name;
//   this.health = health;
//   this.attack = attack <= 10 ? attack : 10;
//   this.defense = defense <= 10 ? defense : 10;
//   this.avatar = img;
//   this.attackHistory = [];
//   this.moves = moves;
// }

// const player1Moves = [
//     { name: 'Slash', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2 * getMultiplier(); } },
//     { name: 'Pierce', type: 'Attack', cooldown: 2, currentCooldown: 0, action: function(target) { return this.attack * 2.5 * getMultiplier(); } },
//     { name: 'Cleave', type: 'Attack', cooldown: 3, currentCooldown: 0, action: function(target) { return this.attack * 1.5 * getMultiplier(); } },
//     { name: 'Execute', type: 'Attack', cooldown: 4, currentCooldown: 0, action: function(target) { return target.health < 20 ? target.health : this.attack * 3 * getMultiplier(); } },
//   ];
  
//   const player2Moves = [
//     { name: 'Smash', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2 * getMultiplier(); } },
//     { name: 'Heal', type: 'Heal', cooldown: 3, currentCooldown: 0, action: function() { const effect = this.health += 20 * getMultiplier(); return effect; } },
//     { name: 'Earth Throw', type: 'Attack', cooldown: 5, currentCooldown: 0, action: function(target) { return this.attack * 6 * getMultiplier(); }  },
//     { name: 'Revive', type: 'Heal', cooldown: 5, currentCooldown: 0, action: function() {const effect = this.health += 50 * getMultiplier(); return effect; } },
//   ];
  
//   const player3Moves = [
//     { name: 'Stab', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 1.5 * getMultiplier(); } },
//     { name: 'Dodge', type: 'Defense', cooldown: 2, currentCooldown: 0, action: function() { const effect = this.defense += 2; return effect; } },
//     { name: 'Minor Heal', type: 'Heal', cooldown: 3, currentCooldown: 0, action: function() { const effect = this.health += 10 * getMultiplier(); return effect; } },
//     { name: 'Charge', type: 'Attack', cooldown: 4, currentCooldown: 0, action: function(target) { return this.attack * 2.2 * getMultiplier(); } },
//   ];
  
//   const player4Moves = [
//     { name: 'Butt Hug', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2.5 * getMultiplier(); } },
//     { name: 'Butt Pucker', type: 'Defense', cooldown: 2, currentCooldown: 0, action: function() { const effect = this.defense += 5; return effect; } },
//     { name: 'Butt Replenish', type: 'Heal', cooldown: 3, currentCooldown: 0, action: function() { const effect = this.health += 30 * getMultiplier(); return effect; } },
//     { name: 'Shit on em', type: 'Attack', cooldown: 4, currentCooldown: 0, action: function(target) { return this.attack * 7.2 * getMultiplier(); } },
//   ];
  
//   const player5Moves = [
//     { name: 'Face Twist', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2.5 * getMultiplier(); } },
//     { name: 'Low Blow', type: 'Attack', cooldown: 2, currentCooldown: 0, action: function(target) { return this.attack * 3 * getMultiplier();} },
//     { name: 'Health Punch', type: 'Heal', cooldown: 3, currentCooldown: 0, action: function() {const effect = this.health += 25 * getMultiplier(); return effect; } },
//     { name: 'Death Shove', type: 'Attack', cooldown: 5, currentCooldown: 0, action: function(target) { return this.attack * 5.2 * getMultiplier(); } },
//   ];
  
//   const player1 = new Player("Player 1", 1000, 8, 5, './src/assets/p1.png', player1Moves);
//   const player2 = new Player("Player 2", 1000, 7, 6, './src/assets/p3.png', player2Moves);
//   const player3 = new Player("Player 3", 1000, 9, 4, './src/assets/pk.png', player3Moves);
//   const player4 = new Player("Trump Butt", 1000, 8, 6, './src/assets/trump.png', player4Moves);
//   const player5 = new Player("Bob", 1000, 10, 2, './src/assets/scary.png', player5Moves);

const allPlayers = ref([...allPlayer]);
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
    // Reset the current cooldown for each move of the player
    player.moves.forEach(move => {
      move.currentCooldown = 0;
    });
  });
};
const isPlayerTurn = (player) => {
    return players.value[currentPlayerIndex.value] === player;
}
const isSelected = (player) => {
    return selectedPlayers.value.includes(player);
}
const executeMove = (move, player) => {
  if (!isPlayerTurn(player)) return;

  const opponent = players.value.find(p => p !== player);

  const damageOrEffect = move.action.call(player, opponent);

  switch (move.type) {
    case 'Attack':
      opponent.health -= damageOrEffect;
      if (opponent.health < 0) opponent.health = 0;
      player.attackHistory.push(`${player.name} attacked ${opponent.name} with ${move.name} for ${damageOrEffect} damage!`);
      break;
    case 'Defense':
      player.defense += damageOrEffect;
      player.attackHistory.push(`${player.name} defended using ${move.name} and increased defense by ${damageOrEffect}.`);
      break;
    case 'Heal':
      player.health += damageOrEffect;
      if (player.health > 100) player.health = 100; // Assuming 100 is the max health
      player.attackHistory.push(`${player.name} healed for ${damageOrEffect} health using ${move.name}.`);
      break;
    case 'Effect':
      let target = move.target === "self" ? player : opponent;
      if (move.effectType === "attack") {
        target.attack += damageOrEffect;  // Assuming each player has an 'attack' property
      } else if (move.effectType === "defense") {
        target.defense += damageOrEffect;
      }
      player.attackHistory.push(`${player.name} used ${move.name} on ${move.target === "self" ? "themselves" : opponent.name} for a ${move.effectType} effect of ${damageOrEffect}.`);
      break;
  }

  player.moves.forEach(m => {
    if (m === move && m.currentCooldown === 0) {
      m.currentCooldown = m.cooldown;
    } else if (m.currentCooldown > 0) {
      m.currentCooldown--;
    }
  });

  currentPlayerIndex.value = players.value.indexOf(opponent);

  if (opponent.health <= 0) {
    attackResult.value = `${opponent.name} has been defeated! ${player.name} wins!`;
    setTimeout(() => {
      resetGame();
    }, 2000);
  }
}


</script>

<template>
  <div class="container">
    <!-- Player Selection Screen -->
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
    
    <!-- Game Screen -->
    <div v-else>
      <div class="game-container">
        <!-- Display for each player -->
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
        <button class="reset_button" @click="resetGame">Reset Game</button>
      </div>
    </div>
  </div>
</template>

<style>
/* You can customize this CSS to fit the look and feel of your game */
.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.player-selection {
  display: flex;
  justify-content: space-between;
}

.player-card {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.player-card.selected {
  background-color: #eee;
}

.player-area {
  margin: 20px;
}

.moves {
  margin-top: 20px;
}

.attack-history {
  margin-top: 20px;
}
.game-container {
  display: flex;
  justify-content: space-between;
}
.reset_button{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 10rem;
}
</style>
