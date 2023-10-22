<script setup>
import { ref, nextTick } from 'vue';
import { Player, playersObject, allPlayer } from './player.js';

const allPlayers = ref([...allPlayer]);
const selectedPlayers = ref([]);
const players = ref([]);
const currentPlayerIndex = ref(null);
const showSelection = ref(true);
const attackResult = ref('');
const fireballPosition = ref(null); // 'left', 'right', or null

// const player1Moves = [
//     { name: 'Slash', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2 * getMultiplier(); } },
//     { name: 'Pierce', type: 'Attack', cooldown: 2, currentCooldown: 0, action: function(target) { return this.attack * 2.5 * getMultiplier(); } },
//     { name: 'Cleave', type: 'Attack', cooldown: 3, currentCooldown: 0, action: function(target) { return this.attack * 1.5 * getMultiplier(); } },
//     { name: 'Execute', type: 'Attack', cooldown: 4, currentCooldown: 0, action: function(target) { return target.health < 20 ? target.health : this.attack * 3 * getMultiplier(); } },
//     { name: 'Boost', type: 'Effect', target: 'self', effectType: 'attack', effectMagnitude: 2, effectDuration: 3, cooldown: 3, currentCooldown: 0, effectRemaining: 0, action: function() { return this.effectMagnitude; }}
//   ];
  
//   const player2Moves = [
//     { name: 'Water Breathing Fourth Form Striking Tide ', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 5.9 * getMultiplier(); }  },
//     { name: 'Water Breathing Sixth Form Whirlpool', type: 'Attack', cooldown: 3, currentCooldown: 0, action: function() {return this.attack * 6.3 * getMultiplier(); } },
//     { name: 'Water Breathing Ninth Form Splashing Water Flow, Turblulent', type: 'Attack', cooldown: 4, currentCooldown: 0, action: function() {return this.attack * 7.5 * getMultiplier();  } },
//     { name: 'Water Breathing Eleventh Form Dead Calm', type: 'Attack', cooldown: 5, currentCooldown: 0, action: function(target) { return this.attack * 9 * getMultiplier(); } },
//     { name: 'Boost', type: 'Effect', target: 'self', effectType: 'attack', effectMagnitude: 2, effectDuration: 3, cooldown: 3, currentCooldown: 0, effectRemaining: 0, action: function() { return this.effectMagnitude; }}
//   ];
  
//   const player3Moves = [
//     { name: 'Earth Bending', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 4.9 * getMultiplier(); } },
//     { name: 'Air Bending', type: 'Attack', cooldown: 2, currentCooldown: 0, action: function(target) { return this.attack * 5.2 * getMultiplier(); } },
//     { name: 'Fire bending', type: 'Attack', cooldown: 4, currentCooldown: 0, action: function(target) { return this.attack * 7.5 * getMultiplier(); } },
//     { name: 'Water Bending Healing', type: 'Heal', cooldown: 5, currentCooldown: 0, action: function() { const effect = this.health += 9 * getMultiplier(); return effect; } },
//     { name: 'Boost', type: 'Effect', target: 'self', effectType: 'attack', effectMagnitude: 2, effectDuration: 3, cooldown: 3, currentCooldown: 0, effectRemaining: 0, action: function() { return this.effectMagnitude; }}
//   ];
  
//   const player4Moves = [
//     { name: 'Butt Hug', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2.5 * getMultiplier(); } },
//     { name: 'Butt Pucker', type: 'Defense', cooldown: 2, currentCooldown: 0, action: function() { const effect = this.defense += 5; return effect; } },
//     { name: 'Butt Replenish', type: 'Heal', cooldown: 3, currentCooldown: 0, action: function() { const effect = this.health += 30 * getMultiplier(); return effect; } },
//     { name: 'Shit on em', type: 'Attack', cooldown: 4, currentCooldown: 0, action: function(target) { return this.attack * 7.2 * getMultiplier(); } },
//     { name: 'Fortify', type: 'Effect', target: 'self', effectType: 'defense', effectMagnitude: 3, effectDuration: 3, cooldown: 5, currentCooldown: 0, effectRemaining: 0, action: function() { return this.effectMagnitude; }},
//   ];
  
//   const player5Moves = [
//     { name: 'Face Twist', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2.5 * getMultiplier(); } },
//     { name: 'Low Blow', type: 'Attack', cooldown: 2, currentCooldown: 0, action: function(target) { return this.attack * 3 * getMultiplier();} },
//     { name: 'Health Punch', type: 'Heal', cooldown: 3, currentCooldown: 0, action: function() {const effect = this.health += 25 * getMultiplier(); return effect; } },
//     { name: 'Death Shove', type: 'Attack', cooldown: 5, currentCooldown: 0, action: function(target) { return this.attack * 5.2 * getMultiplier(); } },
//     { name: 'Fortify', type: 'Effect', target: 'self', effectType: 'defense', effectMagnitude: 3, effectDuration: 3, cooldown: 5, currentCooldown: 0, effectRemaining: 0, action: function() { return this.effectMagnitude; }},
//   ];
  
//   const player1 = new Player("Vanellope", 1000, 8, 5, './src/assets/p1.png', player1Moves);
//   const player2 = new Player("Tomioka", 1000, 7, 6, './src/assets/p3.png', player2Moves);
//   const player3 = new Player("Korra", 1000, 9, 4, './src/assets/pk.png', player3Moves);
//   const player4 = new Player("Trump Butt", 1000, 8, 6, './src/assets/trump.png', player4Moves);
//   const player5 = new Player("Bob", 1000, 10, 2, './src/assets/scary.png', player5Moves);


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
    player.health = 1000;
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
      fireballPosition.value = player === players.value[0] ? 'left' : 'right';
        setTimeout(() => {
          // Stop the fireball animation after 1 second (adjust as needed)
          fireballPosition.value = null;
        }, 1000);

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
      // if (player.health > 1000) player.health = 1000; // Assuming 100 is the max health
      player.attackHistory.push(`${player.name} healed for ${damageOrEffect} health using ${move.name}.`);
      break;
    case 'Effect':
      let target = move.target === "self" ? player : opponent;
      if (move.effectType === "attack") {
        target.attack += move.effectMagnitude;  // Apply effect
      } else if (move.effectType === "defense") {
        target.defense += move.effectMagnitude;
      }
      move.effectRemaining = move.effectDuration; // Initialize effect duration
      player.attackHistory.push(`${player.name} used ${move.name} on ${move.target === "self" ? "themselves" : opponent.name} for a ${move.effectType} boost of ${move.effectMagnitude}.`);
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

  player.moves.forEach(m => {
    if (m.type === 'Effect' && m.effectRemaining > 0) {
      m.effectRemaining--;
      if (m.effectRemaining === 0) { // If effect duration is over
        let target = m.target === "self" ? player : opponent;
        if (m.effectType === "attack") {
          target.attack -= m.effectMagnitude; // Revert the effect
        } else if (m.effectType === "defense") {
          target.defense -= m.effectMagnitude;
        }
      }
    }
  });
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
          <div v-if="fireballPosition && isPlayerTurn(player)" id="fireball" class="fireball" :class="fireballPosition"></div>
          <div class="player-info">
            <h4>{{ player.name }}</h4>
            <p>Health: {{ player.health }}</p>
            <img :src="player.avatar" alt="player-avatar" />
            <div class="moves">
              <h5>Moves:</h5>
              <button v-for="move in player.moves" :key="move.name" :disabled="move.currentCooldown > 0 || !isPlayerTurn(player)" @click="executeMove(move, player)">
                {{ move.name }} (Cooldown: {{ move.currentCooldown }})
              </button>
            </div>
            <p v-for="move in player.moves" v-if="move && move.type === 'Effect' && move.effectRemaining > 0"> {{ move.name }} effect remains for {{ move.effectRemaining }} turns.</p>
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
/* .player-info {
  z-index: 101;
  background-color: white;
} */

.moves {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.attack-history {
  margin-top: 20px;
}
.game-container {
  display: flex;
  justify-content: space-between;
}
.game-container > :nth-child(2) {
    margin-left: auto;
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

.player-info {
  position: relative;
}

.fireball {
  position: absolute;
  width: 50px; /* adjust as needed */
  height: 50px; /* adjust as needed */
  background-image: url('../assets/fireball.png');
  background-size: cover;
  top: 50%; /* vertically center */
  transform: translateY(-50%); /* offset the vertical centering */
}

.fireball.left {
  left: 100%; /* place it to the right end of player info */
  animation: fireballToLeft 1s forwards; /* animation to move it to the left */
}

.fireball.right {
  right: 100%; /* place it to the left end of player info */
  animation: fireballToRight 1s forwards; /* animation to move it to the right */
}

@keyframes fireballToLeft {
  to { left: -100%; } /* move it outside to the left */
}

@keyframes fireballToRight {
  to { right: -100%; } /* move it outside to the right */
}

</style>
