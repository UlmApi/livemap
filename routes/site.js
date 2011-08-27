module.exports = function(app) {
	app.get('/', function(req, res) {
		res.redirect("/map");
	});
	app.get('/map', function(req, res) {
		res.render('container/map', { locals: { pageTitle: "LiveMap", type: "map"}});
	});
	app.get('/about', function(req, res) {
		res.render('container/about', { locals: { pageTitle: "About", type: "about"}});
	});
};
