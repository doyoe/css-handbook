module.exports = function(grunt) {
	"use strict";

	function readOptionalJSON(filepath) {
		var data = {};
		try {
			data = grunt.file.readJSON(filepath);
		} catch (e) {}
		return data;
	}
	var banner = "/* <%= pkg.name %> v<%= pkg.version %>\n * homepage: <%= pkg.homepage %>\n */\n";

	// The concatenated file won"t pass onevar
	// But our modules can

	grunt.initConfig({
		pkg: readOptionalJSON("package.json"),
		//js文档生成
		htmlhint: {
			htmlfiles: {
				src: ["./**/*.htm", "./**/*.html", "!./node_modules/**/*.html"]
			}
		}
	});

	//文件变化监控插件
	grunt.loadNpmTasks("grunt-htmlhint");
	// Default grunt
	grunt.registerTask("default", ["htmlhint"]);
	grunt.task.registerTask("htc", "build htc", function() {
		//grunt.file.write("src/h5form.htc", grunt.file.read("src/banner.htc") + grunt.file.read("src/h5form.htc.js") + "\n</SCRIPT></PUBLIC:COMPONENT>");
	});
};