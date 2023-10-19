        <template>
          <div>
            <div v-if="screen === 'selection'">
              <div v-for="char in characters" :key="char.id">
                <img :src="char.image" @click="selectCharacter(char)" :class="{ selected: selectedCharacters.includes(char) }">
                <span>{{ char.name }}</span>
              </div>
              <button @click="startBattle" v-if="selectedCharacters.length === 2">Start Battle</button>
            </div>
        
            <div v-if="screen === 'battle'">
              <div v-for="player in players" :key="player.character.id">
                <img :src="player.character.image">
                <span>Health: {{ player.currentHealth }}</span>
                <div v-if="player === currentPlayer">
                  <button v-for="move in player.character.moves" :key="move.name" @click="executeMove(move)" :disabled="move.cooldown > 0">{{ move.name }} <span v-if="move.cooldown">({{ move.cooldown }} turns left)</span></button>
                </div>
              </div>
            </div>
          </div>
      </template>
      
      <script>
      export default {
        data() {
          return {
            screen: 'selection',
            characters: [
                { id: 1, name: 'Char1', image: './src/assets/p3.png', baseAttack: 10, defense: 5, totalHealth: 100, moves: [
                    { name: 'Basic Attack', type: 'Attack', value: 7, cooldownPeriod: 0, cooldown: 0 },
                    { name: 'Health Boost', type: 'Health Regain', value: 0.1, target: 'self', cooldownPeriod: 3, cooldown: 0 },
                    { name: 'Weaken', type: 'Effect', effect: 'Weaken', turns: 2, target: 'opponent', cooldownPeriod: 4, cooldown: 0, effectValue: -2 },
                    { name: 'Strength Boost', type: 'Effect', effect: 'Strengthen', turns: 2, target: 'self', cooldownPeriod: 5, cooldown: 0, effectValue: 2 }
                ]},
                { id: 2, name: 'Char2', image: './src/assets/pk.png', baseAttack: 10, defense: 5, totalHealth: 100, moves: [
                { name: 'Basic Attack', type: 'Attack', value: 6, cooldownPeriod: 0, cooldown: 0 },
                { name: 'Health Boost', type: 'Health Regain', value: 0.3, target: 'self', cooldownPeriod: 3, cooldown: 0 }, // regain 10% of total health
                { name: 'Weaken', type: 'Effect', effect: 'Weaken', turns: 2, target: 'opponent', cooldownPeriod: 4, cooldown: 0, effectValue: -3 },
                { name: 'Strength Boost', type: 'Effect', effect: 'Strengthen', turns: 2, target: 'self', cooldownPeriod: 5, cooldown: 0, effectValue: 3 }
            ]},
            { id: 3, name: 'Char3', image: './src/assets/trump.png', baseAttack: 10, defense: 5, totalHealth: 100, moves: [
                { name: 'Basic Attack', type: 'Attack', value: 8, cooldownPeriod: 0, cooldown: 0 },
                { name: 'Health Boost', type: 'Health Regain', value: 0.4, target: 'self', cooldownPeriod: 3, cooldown: 0 }, // regain 10% of total health
                { name: 'Weaken', type: 'Effect', effect: 'Weaken', turns: 2, target: 'opponent', cooldownPeriod: 4, cooldown: 0, effectValue: -4 },
                { name: 'Strength Boost', type: 'Effect', effect: 'Strengthen', turns: 2, target: 'self', cooldownPeriod: 5, cooldown: 0, effectValue: 3 }
            ]},
            { id: 4, name: 'Char4', image: './src/assets/scary.png', baseAttack: 10, defense: 5, totalHealth: 100, moves: [
                { name: 'Basic Attack', type: 'Attack', value: 7, cooldownPeriod: 0, cooldown: 0 },
                { name: 'Health Boost', type: 'Health Regain', value: 0.3, target: 'self', cooldownPeriod: 3, cooldown: 0 }, // regain 10% of total health
                { name: 'Weaken', type: 'Effect', effect: 'Weaken', turns: 3, target: 'opponent', cooldownPeriod: 4, cooldown: 0, effectValue: -3 },
                { name: 'Strength Boost', type: 'Effect', effect: 'Strengthen', turns: 2, target: 'self', cooldownPeriod: 5, cooldown: 0, effectValue: 3 }
            ]},
            ],
            selectedCharacters: [],
            players: [],
            currentPlayer: null,
          }},
          methods: {
            selectCharacter(char) {
              if (this.selectedCharacters.length < 2 && !this.selectedCharacters.includes(char)) {
                this.selectedCharacters.push(char);
              }
            },
            resetCooldowns() {
              this.players.forEach(player => {
                player.character.moves.forEach(move => {
                  move.cooldown = 0;
                });
              });
            },

            startBattle() {
              this.screen = 'battle';
              this.players = this.selectedCharacters.map(c => ({
                character: c,
                currentHealth: c.totalHealth,
                effects: []
              }));
              this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)];
            },
            executeMove(move) {
              const multiplier = Math.random() * (1.5 - 0.8) + 0.8;
              const opponent = this.players.find(p => p !== this.currentPlayer);
              
              if (move.type === 'Attack') {
                const damage = (move.value + this.currentPlayer.character.baseAttack) * multiplier;
                opponent.currentHealth -= damage;
              } else if (move.type === 'Health Regain') {
                this.currentPlayer.currentHealth += this.currentPlayer.character.totalHealth * move.value;
              } else if (move.type === 'Effect') {
                const targetPlayer = move.target === 'self' ? this.currentPlayer : opponent;
      
                if (move.effect === 'Weaken') {
                  targetPlayer.character.baseAttack += move.effectValue;
                  targetPlayer.effects.push({ effect: 'Weaken', turns: move.turns, value: move.effectValue });
                } else if (move.effect === 'Strengthen') {
                  targetPlayer.character.baseAttack += move.effectValue;
                  targetPlayer.effects.push({ effect: 'Strengthen', turns: move.turns, value: move.effectValue });
                }
              }
              move.cooldown = move.cooldownPeriod;
              this.switchTurn();
            },
            switchTurn() {
              this.currentPlayer = this.players.find(p => p !== this.currentPlayer);
              this.checkGameEnd();
              this.handleCooldowns();
              this.handleEffects();
            },
            checkGameEnd() {
              const defeatedPlayer = this.players.find(p => p.currentHealth <= 0);
              if (defeatedPlayer) {
                this.resetCooldowns();
                this.screen = 'end';
                alert(`${defeatedPlayer.character.name} has been defeated!`);
              }
            },
            handleCooldowns() {
              this.currentPlayer.character.moves.forEach(move => {
                if (move.cooldown > 0) move.cooldown--;
              });
            },
            handleEffects() {
              this.players.forEach(player => {
                player.effects = player.effects.filter(effect => {
                  if (effect.turns <= 1) {
                    if (effect.effect === 'Weaken' || effect.effect === 'Strengthen') {
                      player.character.baseAttack -= effect.value;
                    }
                  }
                  effect.turns--;
                  return effect.turns > 0;
                });
              });
            }
          }
        }
      
      </script>
      
      <style scoped>
        .selected {
          border: 2px solid red;
        }
      </style>
      