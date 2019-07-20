const webpack = require('webpack');
const config = require('../config/webpack.build.config.js');
var compiler = webpack(config);
compiler.run(
	function (err, stats) {
		if (err || stats.hasErrors()) {
			console.log(stats.toJson({
				assets: false,
				hash: true
			}).errors)
		} else { 
		console.log("build completed in " + (stats.endTime - stats.startTime) + "ms") ;
		}
	}
)