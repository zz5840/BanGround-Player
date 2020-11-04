const routes = [
	{
		path: '/',
		component: () => import('layouts/Layout.vue'),
		children: [
			{ path: '/', component: () => import('pages/Play.vue') },
			{ path: '/game', component: () => import('pages/Game.vue') },
			{ path: '/share', component: () => import('pages/Share.vue') },
			{
				path: '/tools',
				component: () => import('pages/Tools.vue'),
				children: [
					{ path: '/tools/convert', component: () => import('pages/Tools/Convert.vue') },
					{ path: '/tools/calculate', component: () => import('pages/Tools/Calculate.vue') }
				]
			},
			{ path: '/records', component: () => import('pages/Records.vue') },
			{ path: '/favorite', component: () => import('pages/Favorite.vue') },
			{ path: '/history', component: () => import('pages/History.vue') },
			{ path: '/settings', component: () => import('pages/Settings.vue') },
			{ path: '/announcements', component: () => import('pages/Announcements.vue') },
			{ path: '/about', component: () => import('pages/About.vue') }
			// { path: '/play', component: () => import('pages/Play.vue') }
		]
	}
];

// Always leave this as last one
routes.push({
	path: '*',
	component: () => import('pages/Error404.vue')
});

export default routes;
