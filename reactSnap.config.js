module.exports = {
	publicPath: '/',
	minifyHtml: {
		collapseWhitespace: true,
		removeComments: true,
	},
	// Include routes to prerender
	include: [
		'/',
		'/dishes',
		'/products',
		'/schedule',
		'/menu-planner',
		'/shopping-list',
		'/favorites',
	],
	// Skip auth routes
	skipThirdPartyRequests: true,
	// Headless Chrome options
	puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
};
