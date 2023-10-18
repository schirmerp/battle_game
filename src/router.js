// router.js
import { createRouter, createWebHistory } from 'vue-router';

// Import your components for the pages
import dumb_battle from './components/dumb_battle.vue';
import stupid_battle from './components/stupid_battle.vue';
import comp_battle from './components/comp_battle.vue';
import moves_battle from './components/moves_battle.vue';
import home from './components/home.vue';
import alt_logic_battle from './components/alt_logic_battle.vue';

const routes = [
  { path: '/', component: home },
  { path: '/dumb_battle', component: dumb_battle },
  { path: '/stupid_battle', component: stupid_battle },
  { path: '/moves_battle', component: moves_battle },
  { path: '/comp_battle', component: comp_battle },
  { path: '/alt_logic', component: alt_logic_battle },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
