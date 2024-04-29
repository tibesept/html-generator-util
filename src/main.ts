import { createApp } from 'vue'
import App from '@/App.vue'
// stores
import { createPinia } from 'pinia';
// routes
import { router } from '@/router';
// components

// app 
export const app = createApp(App);

// store
app.use(createPinia())

// add routes
app.use(router);

// mount app
app.mount('#app');

export type TApp = typeof app;
