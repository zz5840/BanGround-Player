const routes = [
	{
		path: '/',
		component: () => import('layouts/Layout.vue'),
		children: [
			{ path: '/', component: () => import('pages/Play.vue') },
			{ path: '/share', component: () => import('pages/Share.vue') }
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
