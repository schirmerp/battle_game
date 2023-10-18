<script setup>
import { ref } from 'vue'

defineProps({
  
})

// Define different types of attacks
const attackTypes = {
  normal: {
    name: 'Normal Attack',
    minDamage: 5,
    maxDamage: 15,
    healthChange: 0,
  },
  powerful: {
    name: 'Powerful Attack',
    minDamage: 10,
    maxDamage: 30,
    healthChange: Math.random() < 0.5 ? 20 : -10, // Randomly positive or negative health change
  },
  healing: {
    name: 'Healing Attack',
    minDamage: -5, // Negative damage (healing)
    maxDamage: 10,
    healthChange: 20,
  },
  // Add more attack types as needed
};

function Player(name, health = 100, attackType = 'normal', defense = 0, img) {
  this.name = name;
  this.health = health;
  this.attackType = attackType;
  this.defense = defense <= 10 ? defense : 10; // Ensure defense is <= 10
  this.avatar = img
}

// Create new players with different attacks
const player1 = new Player("Player 1", 100, 'normal', 5, './src/assets/p1.png');
const player2 = new Player("Player 2", 100, 'powerful', 6, './src/assets/p3.png');
const player3 = new Player("Player 3", 100, 'healing', 7, './src/assets/pk.png');
const players = [player1, player2, player3];

const currentPlayerIndex = ref(0);

// Add a property to players to store health changes
players.forEach((player) => {
  player.healthChange = null;
});

const getRandomMultiplier = () => Math.floor(Math.random() * 5) + 1; // Generates a random multiplier between 1 and 5

const attackResult = ref('');

const attackPlayer = (attacker) => {
  if (players[currentPlayerIndex.value] !== attacker) {
    // It's not the attacker's turn, do nothing
    return;
  }

  const targetIndex = players.findIndex(player => player !== attacker);
  const targetPlayer = players[targetIndex];

  const attack = attackTypes[attacker.attackType]; // Get the attack type for the attacker

  const attackMultiplier = getRandomMultiplier();
  const defenseMultiplier = getRandomMultiplier();

  const damage = Math.floor(Math.random() * (attack.maxDamage - attack.minDamage + 1) + attack.minDamage) * attackMultiplier - targetPlayer.defense * defenseMultiplier;
  targetPlayer.healthChange = attack.healthChange;

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
  } else if (targetPlayer.health > 200) {
    targetPlayer.health = 200;
  }

  let damageDisplay = damage >= 0 ? `-${damage}` : `+${-damage}`;
  attacker.attackHistory.push(`${attack.name}: ${damageDisplay}`);

  // Switch to the next player's turn
  currentPlayerIndex.value = targetIndex;
}

// Initialize attack history for each player
players.forEach((player) => {
  player.attackHistory = [];
});

const count = ref(0)


const characters = [player1, player2, player3];
const selectedCharacters = ref([]);
const gameStarted = ref(false);

function selectCharacter(character) {
  const selectedCharacterValues = selectedCharacters.value; // Access the value of the ref
  if (selectedCharacterValues.length < 2 && !selectedCharacterValues.includes(character)) {
    selectedCharacterValues.push(character);
  } else if (selectedCharacterValues.includes(character)) {
    selectedCharacters.value = selectedCharacterValues.filter((c) => c !== character);
  }
}

function startGame() {
  if (selectedCharacters.value.length === 2) { // Use selectedCharacters.value.length
    gameStarted.value = true;
  }
}


function endGame() {
  gameStarted.value = false;
  // Reset characters and their health
  characters.forEach((character) => {
    character.health = 100;
    character.attackHistory = [];
  });
  // Reset attackResult
  attackResult.value = '';
  // Reset currentPlayerIndex
  currentPlayerIndex.value = 0;
}
</script>


<template>
  <div>
    <!-- Character selection screen -->
    <div v-if="!gameStarted">
      <h1>Select Your Characters</h1>
      <div class="character-selection">
        <div
          v-for="character in characters"
          :key="character.name"
          class="character"
          @click="selectCharacter(character)"
          :class="{ selected: selectedCharacters.includes(character) }"
        >
          <img :src="character.avatar" :alt="character.name">
          <p>{{ character.name }}</p>
        </div>
      </div>
      <button @click="startGame" :disabled="selectedCharacters.length !== 2">Start Game</button>
    </div>

    <!-- Game screen -->
    <div v-else>
      <div class="game-container">
        <div class="game-wrap">
          <div class="player" v-for="player in selectedCharacters" :key="player.name">
            <img :src="player.avatar" :alt="player.name" :class="{ selected: players[currentPlayerIndex].name === player.name }">

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
            <div class="turn-indicator" v-if="players[currentPlayerIndex].name === player.name">
              {{ player.name }}'s Turn
            </div>
            <button @click="attackPlayer(player)" :disabled="players[currentPlayerIndex].name !== player.name">Attack</button>
          </div>
        </div>
        <div class="attack-result" v-if="attackResult">{{ attackResult }}</div>
      </div>
      <button @click="endGame">Restart Game</button>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.health-bar {
  height: 100%;
  background-color: #ff0000; /* Red color for the health bar */
  position: relative;
}

.green-bar {
  height: 100%;
  background-color: #00ff00; /* Green color for the health bar */
  transition: width 0.5s;
}

.blue-bar {
  height: 100%;
  background-color: #0000ff; /* Blue color for the extra health bar */
  position: absolute;
  top: 0;
  left: 100%;
  transition: width 0.5s;
}
.health {
  width: 100px; /* Adjust the width of the health bar as needed */
  height: 10px; /* Adjust the height of the health bar as needed */
  background-color: #ff0000; /* Red color for the health bar */
  position: relative;
}
.game-container {
  position: relative;
  width: 70vw;
  height: 100vh;
}
.game-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.health-change {
  position: absolute;
  top: 0;
  right: 0;
  color: #ff0000; /* Red color for health change display */
  font-weight: bold;
  animation: fadeOut 1s forwards;
}

.turn-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-weight: bold;
  color: #000; /* Black color for turn indicator */
  background-color: #ffff00; /* Yellow background for turn indicator */
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
  color: #ff0000; /* Red color for attack result */
  text-align: center;
  z-index: 9999;
}

.attack-history {
  margin-top: 4rem;
  text-align: center;
}

.damage-item {
  margin: 2px;
  color: #ff0000; /* Red color for damage display */
}
.character-selection {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.character {
  cursor: pointer;
  margin: 20px;
  text-align: center;
}

.character.selected {
  border: 2px solid #00ff00; /* Add a border to indicate selection */
}

.player img.selected {
  border: 2px solid #00ff00; /* Add a border to the selected player's image */
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
