// players.js

export function Player(name, health = 100, attack = 0, defense = 0, img, moves) {
    this.name = name;
    this.health = health;
    this.attack = attack <= 10 ? attack : 10;
    this.defense = defense <= 10 ? defense : 10;
    this.avatar = img;
    this.attackHistory = [];
    this.moves = moves;
  }
  const getMultiplier = () => Math.floor(Math.random() * 5) + 1;

  const player1Moves = [
    { name: 'Slash', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2 * getMultiplier(); } },
    { name: 'Pierce', type: 'Attack', cooldown: 2, currentCooldown: 0, action: function(target) { return this.attack * 2.5 * getMultiplier(); } },
    { name: 'Cleave', type: 'Attack', cooldown: 3, currentCooldown: 0, action: function(target) { return this.attack * 1.5 * getMultiplier(); } },
    { name: 'Execute', type: 'Attack', cooldown: 4, currentCooldown: 0, action: function(target) { return target.health < 20 ? target.health : this.attack * 3 * getMultiplier(); } },
  ];
  
  const player2Moves = [
    { name: 'Water Breathing Fourth Form Striking Tide ', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 5.9 * getMultiplier(); }  },
    { name: 'Water Breathing Sixth Form Whirlpool', type: 'Attack', cooldown: 3, currentCooldown: 0, action: function() {return this.attack * 6.3 * getMultiplier(); } },
    { name: 'Water Breathing Ninth Form Splashing Water Flow, Turblulent', type: 'Attack', cooldown: 4, currentCooldown: 0, action: function() {return this.attack * 7.5 * getMultiplier();  } },
    { name: 'Water Breathing Eleventh Form Dead Calm', type: 'Attack', cooldown: 5, currentCooldown: 0, action: function(target) { return this.attack * 9 * getMultiplier(); } },
  ];
  
  const player3Moves = [
    { name: 'Earth Bending', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 4.9 * getMultiplier(); } },
    { name: 'Air Bending', type: 'Attack', cooldown: 2, currentCooldown: 0, action: function(target) { return this.attack * 5.2 * getMultiplier(); } },
    { name: 'Fire bending', type: 'Attack', cooldown: 4, currentCooldown: 0, action: function(target) { return this.attack * 7.5 * getMultiplier(); } },
    { name: 'Water Bending Healing', type: 'Heal', cooldown: 5, currentCooldown: 0, action: function() { const effect = this.health += 9 * getMultiplier(); return effect; } },
  ];
  
  const player4Moves = [
    { name: 'Butt Hug', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2.5 * getMultiplier(); } },
    { name: 'Butt Pucker', type: 'Defense', cooldown: 2, currentCooldown: 0, action: function() { const effect = this.defense += 5; return effect; } },
    { name: 'Butt Replenish', type: 'Heal', cooldown: 3, currentCooldown: 0, action: function() { const effect = this.health += 30 * getMultiplier(); return effect; } },
    { name: 'Shit on em', type: 'Attack', cooldown: 4, currentCooldown: 0, action: function(target) { return this.attack * 7.2 * getMultiplier(); } },
  ];
  
  const player5Moves = [
    { name: 'Face Twist', type: 'Attack', cooldown: 0, currentCooldown: 0, action: function(target) { return this.attack * 2.5 * getMultiplier(); } },
    { name: 'Low Blow', type: 'Attack', cooldown: 2, currentCooldown: 0, action: function(target) { return this.attack * 3 * getMultiplier();} },
    { name: 'Health Punch', type: 'Heal', cooldown: 3, currentCooldown: 0, action: function() {const effect = this.health += 25 * getMultiplier(); return effect; } },
    { name: 'Death Shove', type: 'Attack', cooldown: 5, currentCooldown: 0, action: function(target) { return this.attack * 5.2 * getMultiplier(); } },
  ];
  
  const player1 = new Player("Vanellope", 1000, 8, 5, './src/assets/p1.png', player1Moves);
  const player2 = new Player("Tomioka", 1000, 7, 6, './src/assets/p3.png', player2Moves);
  const player3 = new Player("Korra", 1000, 9, 4, './src/assets/pk.png', player3Moves);
  const player4 = new Player("Trump Butt", 1000, 8, 6, './src/assets/trump.png', player4Moves);
  const player5 = new Player("Bob", 1000, 10, 2, './src/assets/scary.png', player5Moves);
  
  const playersObject = {
    player1,
    player2,
    player3,
    player4,
    player5
  }
  
  export const allPlayer = [player1, player2, player3, player4, player5];
  export { playersObject };
  