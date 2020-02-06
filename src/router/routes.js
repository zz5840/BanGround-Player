const routes = [
	{
		path: '/',
		component: () => import('layouts/Layout.vue'),
		children: [
			{ path: '', component: () => import('pages/Index.vue') },
			{ path: '/play', component: () => import('pages/Play.vue') }
		]
	}
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('pages/Error404.vue')
	});
}

export default routes;
