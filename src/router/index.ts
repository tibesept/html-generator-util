import { createRouter, createWebHistory } from 'vue-router';

// pages
import HomePageVue from '@/modules/generator/HtmlGenerator.vue';

const defaultPageTitle = 'util';

export const routeNames = {
	home: 'home',
} as const;

export type TRoutes = keyof typeof routeNames;

export const ENavy: Record<TRoutes, string> = {
	home: '/',
};

export type TNavyRoute = typeof ENavy[keyof typeof ENavy];

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: routeNames.home,
			path: ENavy.home,
			component: HomePageVue,
		},
	],
});

