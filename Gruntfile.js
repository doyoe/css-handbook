module.exports = function(grunt) {
	"use strict";

	// JSON格式文件读取
	function readOptionalJSON(filepath) {
		var data = {};
		try {
			data = grunt.file.readJSON(filepath);
		} catch (e) {}
		return data;
	}

	// grunt配置
	grunt.initConfig({
		pkg: readOptionalJSON("package.json"),
		// HTML错误检查
		htmlhint: {
			htmlfiles: {
				src: ["./**/*.htm", "./**/*.html", "!./node_modules/**/*.html"]
			}
		}
	});

	// HTML错误检查插件
	grunt.loadNpmTasks("grunt-htmlhint");
	// Default grunt
	grunt.registerTask("default", ["htmlhint"]);
/*
	grunt.task.registerTask("chm", "build chm", function() {
		
	});
*/
};