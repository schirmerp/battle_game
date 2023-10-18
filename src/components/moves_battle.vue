<script setup>
import { ref } from 'vue'

function Player(name, health = 100, attack = 0, defense = 0, img, moves) {
  this.name = name;
  this.health = health;
  this.attack = attack <= 10 ? attack : 10;
  this.defense = defense <= 10 ? defense : 10;
  this.avatar = img;
  this.attackHistory = [];
  this.moves = moves;
}

const player1Moves = [
  { name: 'Slash', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2; } },
  { name: 'Pierce', cooldown: 2, currentCooldown: 0, action: function(target) { return this.attack * 2.5; } },
  { name: 'Cleave', cooldown: 3, currentCooldown: 0, action: function(target) { return this.attack * 1.5; } },
  { name: 'Execute', cooldown: 4, currentCooldown: 0, action: function(target) { return target.health < 20 ? target.health : this.attack * 3; } },
];

const player2Moves = [
  { name: 'Smash', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2; } },
  { name: 'Heal', cooldown: 3, currentCooldown: 0, action: function() { this.health += 20; return 0; } },
  { name: 'Earth Throw', cooldown: 5, currentCooldown: 0, action: function(target) { return this.attack * 6; }  },
  { name: 'Revive', cooldown: 5, currentCooldown: 0, action: function() { this.health += 50; return 0; } },
];

const player3Moves = [
  { name: 'Stab', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 1.5; } },
  { name: 'Dodge', cooldown: 2, currentCooldown: 0, action: function() { this.defense += 2; return 0; } },
  { name: 'Minor Heal', cooldown: 3, currentCooldown: 0, action: function() { this.health += 10; return 0; } },
  { name: 'Charge', cooldown: 4, currentCooldown: 0, action: function(target) { return this.attack * 2.2; } },
];
const player4Moves = [
  { name: 'Butt Hug', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2.5; } },
  { name: 'Butt Pucker', cooldown: 2, currentCooldown: 0, action: function() { this.defense += 5; return 0; } },
  { name: 'Butt Replenish', cooldown: 3, currentCooldown: 0, action: function() { this.health += 30; return 0; } },
  { name: 'Shit on em', cooldown: 4, currentCooldown: 0, action: function(target) { return this.attack * 7.2; } },
];
const player5Moves = [
  { name: 'Face Twist', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2.5; } },
  { name: 'Low Blow', cooldown: 2, currentCooldown: 0, action: function(target) { return this.attack * 3;} },
  { name: 'Health Punch', cooldown: 3, currentCooldown: 0, action: function() { this.health += 25; return 0; } },
  { name: 'Death Shove', cooldown: 5, currentCooldown: 0, action: function(target) { return this.attack * 5.2; } },
];

const player1 = new Player("Player 1", 100, 8, 5, './src/assets/p1.png', player1Moves);
const player2 = new Player("Player 2", 100, 7, 6, './src/assets/p3.png', player2Moves);
const player3 = new Player("Player 3", 100, 9, 4, './src/assets/pk.png', player3Moves);
const player4 = new Player("Trump Butt", 100, 8, 6, './src/assets/trump.png', player4Moves);
const player5 = new Player("Bob", 100, 10, 2, './src/assets/scary.png', player5Moves);

const allPlayers = ref([player1, player2, player3, player4, player5]);
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
const isPlayerTurn = (player) => {
    return players.value[currentPlayerIndex.value] === player;
}
const isSelected = (player) => {
    return selectedPlayers.value.includes(player);
}
const executeMove = (move, player) => {
  if (!isPlayerTurn(player)) return;
  // Get the opponent
  const opponent = players.value.find(p => p !== player);

  // Call the action of the move
  const damageOrEffect = move.action.call(player, opponent);

  // Apply the damage or effect
  if (damageOrEffect > 0) {
    opponent.health -= damageOrEffect;
    if (opponent.health < 0) opponent.health = 0;
  }

  // Add the move to the attack history
  player.attackHistory.push(`${player.name} used ${move.name} on ${opponent.name} for ${damageOrEffect} damage!`);

  // Handle cooldowns for the player's moves
  player.moves.forEach(m => {
    if (m === move && m.currentCooldown === 0) {
      m.currentCooldown = m.cooldown;
    } else if (m.currentCooldown > 0) {
      m.currentCooldown--;
    }
  });

  // Switch the turn to the opponent
  currentPlayerIndex.value = players.value.indexOf(opponent);

  // Check for game over
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
