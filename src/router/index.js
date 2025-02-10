import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../modules/Users/views/Dashboard.vue';
import UsersView from '../modules/Users/views/UsersView.vue';
import Settings from '../modules/Users/views/Settings.vue';
import Reports from '../modules/Users/views/Reports.vue';
import Profile from '../modules/Users/views/Profile.vue';
import LoginPage from '../modules/Users/views/LoginPage.vue';
const routes = [
  { path: '/', name: 'UsersView', component: UsersView ,meta: { title: 'Users And Accounts' }},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard,meta: { title: 'Dashboard' }},
  { path: '/profile', name: 'Profile', component: Profile ,meta: { title: 'Profile' }  },
  { path: '/reports', name: 'Reports', component: Reports ,meta: { title: 'Reports' } },
  { path: '/settings', name: 'Settings', component: Settings ,meta: { title: 'Settings' }  },
  { path: '/loginpage', name: 'Settings', component: LoginPage ,meta: { title: 'Loginpage' }  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title';
  next();
});

export default router