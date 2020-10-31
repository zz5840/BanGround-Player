const routes = [
	{
		path: '/',
		component: () => import('layouts/Layout.vue'),
		children: [
			{ path: '', alias: '/play' },
			{ path: '/play', component: () => import('pages/Play.vue') }
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
