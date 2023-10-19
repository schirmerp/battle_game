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
  
  const playersObject = {
    player1,
    player2,
    player3,
    player4,
    player5
  }
  
  export const allPlayer = [player1, player2, player3, player4, player5];
  export { playersObject };
  