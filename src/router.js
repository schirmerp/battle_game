// router.js
import { createRouter, createWebHistory } from 'vue-router';

// Import your components for the pages
import dumb_battle from './components/dumb_battle.vue';
import moves_battle from './components/moves_battle.vue';
import home from './components/home.vue';
import alt_logic_battle from './components/alt_logic_battle.vue';
import real_gpt4 from './components/real_gpt4.vue';
import fireball_battle from './components/fireball_battle.vue';

const routes = [
  { path: '/', component: home },
  { path: '/dumb_battle', component: dumb_battle },
  { path: '/moves_battle', component: moves_battle },
  { path: '/alt_logic', component: alt_logic_battle },
  { path: '/real_gpt4', component: real_gpt4 },
  { path: '/fireball_battle', component: fireball_battle },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
