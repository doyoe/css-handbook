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

	function queryHTML(obj, fn) {
		if (obj) {
			if (Array.isArray(obj)) {
				for (var rst, i = obj.length - 1; i >= 0; i--) {
					rst = queryHTML(obj[i], fn);
					if (rst) {
						return rst;
					}
				}
			}
			if (fn(obj)) {
				return obj;
			} else if (obj.children) {
				return queryHTML(obj.children, fn)
			}
		}
	}

	function findTree(obj) {
		return queryHTML(obj, function(obj) {
			return obj.type == "tag" && obj.attribs && obj.attribs.id == "dytree";
		});
	}

	function findFirstUl(obj) {
		return queryHTML(obj.children, function(obj) {
			return obj.type == "tag" && obj.name == "ul";
		});
	}

	function filterTextNode(obj) {
		function filter(obj) {
			var children;
			if (obj.children) {

				children = obj.children.filter(function(obj) {
					return !(obj.type == "comment" || obj.type == "text" && /^\s+$/.test(obj.raw) && /^\s+$/.test(obj.data));
				});
				if (children.length == 1) {
					if (children[0].type == "text") {
						obj.text = children.pop().data;
					} else {
						filter(children[0]);
						if (children[0].children) {
							children = children[0].children;
						}
					}
				}
				if (children.length) {
					obj.children = children;
				} else {
					delete obj.children;
				}
			} else if(obj.attribs){
				for (var i in obj.attribs) {
					obj[i] = obj.attribs[i];
				}
				delete obj.attribs;
			}
		}
		queryHTML(obj, filter);
		return obj;
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

	grunt.task.registerTask("chm", "build chm", function() {
		var htmlparser = require("htmlparser");
		var rawHtml = grunt.file.read("index.htm");
		var handler = new htmlparser.DefaultHandler(function(error, dom) {
			if (error) {
				//[...do something for errors...]
			} else {
				//[...parsing done, do something...]
			}
		});
		var parser = new htmlparser.Parser(handler);
		parser.parseComplete(rawHtml);
		var tree = filterTextNode(findFirstUl(findTree(handler.dom)));
		tree = filterTextNode({children: tree.children});
		if (tree) {
			grunt.file.write("index.json", JSON.stringify(tree, 0, 4));
			
			console.log(tree);
		}
	});

};