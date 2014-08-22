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

	// HTML节点查找
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

	// HTML node查找
	function queryTag(obj, tagName) {
		if (obj && obj.children) {
			var rst = obj.children.filter(function(node) {
				return node.type === "tag" && node.name == tagName;
			});
			if (rst && rst.length) {
				return rst;
			}
		}
	}

	// 转换ul标签为数组
	function parseUl(ul) {
		if (ul) {
			var children = queryTag(ul, "li");
			if (children && children.length) {
				children = children.map(parseLi);
				if (children && children.length) {
					return children;
				}
			}
		}
	}

	// 转换li标签对象
	function parseLi(li) {
		var link = queryTag(li, "div")[0];
		link = (queryTag(link, "a") || queryTag(link, "dfn"))[0];

		var obj = {
			title: link.children[0].data
		};
		var children = queryTag(li, "ul");
		if (children) {
			children = parseUl(children[0]);
			if (children) {
				obj.children = children;
			}
		}
		if (link.attribs && link.attribs.href) {
			obj.href = link.attribs.href;
		}

		// console.log(link);
		return obj;
	}

	// grunt配置
	grunt.initConfig({
		pkg: readOptionalJSON("package.json"),
		// HTML错误检查
		htmlhint: {
			htmlfiles: {
				src: ["./**/*.htm*", "!./node_modules/**/*.htm*"]
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
		var tree = queryHTML(handler.dom, function(obj) {
			return obj.type == "tag" && obj.attribs && obj.attribs.id == "dytree";
		});

		// 遍历目录树
		function forEachTree(tree, fn) {
			if (tree.href) {
				fn(tree);
			}
			if (Array.isArray(tree.children)) {
				hhc += "<UL>\n";
				tree.children.forEach(function(tree) {
					forEachTree(tree, fn);
				});
				hhc += "</UL>\n";
			}
		}

		if (tree) {
			tree = parseUl(tree)[0];
			//console.log(JSON.stringify(, 0, 4));
			//grunt.file.write("index.json", JSON.stringify(tree, 0, 4));
			var html = '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">\n<HTML>\n<HEAD>\n<meta name="GENERATOR" content="Microsoft&reg; HTML Help Workshop 4.1">\n<!-- Sitemap 1.0 -->\n</HEAD><BODY>\n',
				hhk = html + "<UL>\n",
				hhc = html + '<OBJECT type="text/site properties">\n\t<param name="ExWindow Styles" value="0x200">\n\t<param name="Window Styles" value="0x800025">\n\t<param name="Font" value="MS Sans Serif,9,0">\n</OBJECT>\n',
				hhp = "[OPTIONS]\nCompatibility=1.1 or later\nCompiled file=css.chm\nContents file=css.hhc\nDefault topic=quicksearch.htm\nDisplay compile progress=No\nFull-text search=Yes\nIndex file=css.hhk\nLanguage=0x804 中文(简体，中国)\nTitle=CSS参考手册V4.1.5(WD)_Web前端开发参考手册系列\n\n\n[FILES]\n",
				files = {};

			grunt.file.recurse(".", function(abspath, rootdir, subdir, filename) {
				if (!/^(node_modules|\.git)/.test(subdir) && !/^(ZeroClipboard\.swf|.\.psd)$/.test(filename) && subdir) {
					subdir = subdir ? subdir + "/" : "";
					files[subdir + filename] = true;
				}
			});

			forEachTree(tree, function(o) {
				hhk += '\t<LI> <OBJECT type="text/sitemap">\n\t\t<param name="Name" value="' + o.title + '">\n\t\t<param name="Local" value="' + o.href + '">\n\t\t</OBJECT>\n';

				if (files[o.href] || grunt.file.exists(o.href)) {
					files[o.href] = true;
				} else {
					console.log("发现死链接:\t" + o.href);
				}
				hhc += '\t<LI> <OBJECT type="text/sitemap">\n\t\t<param name="Name" value="' + o.title + '">\n\t\t<param name="Local" value="' + o.href + '">\n\t\t<param name="ImageNumber" value="' + (o.children ? 1 : (/\//.test(o.href) ? 11 : 15)) + '">\n\t\t</OBJECT>\n'
			});

			hhk += "\n</UL>\n</BODY></HTML>";
			grunt.file.write("css.hhk", hhk, {
				encoding: "GB2312"
			});

			hhc += "\n</BODY></HTML>";
			grunt.file.write("css.hhc", hhc, {
				encoding: "GB2312"
			});

			for (var i in files) {
				hhp += i + "\n";
			}

			grunt.file.write("css.hhp", hhp, {
				encoding: "GB2312"
			});

/*			var hhcPath;
			["hhc.exe"].forEach(function(path) {
				if (!hhcPath && grunt.file.exists(path)) {
					hhcPath = path;
					return false;
				}
			});
*/
			var path = require('path');
			var exec = require('child_process').exec;

			var workdir = '.';

			exec('hhc '+path.join(workdir, 'node.hhp'), function(error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
				grunt.file.delete("css.hh*");
			});

		}
		/*
		var $ = require("jQuery");

		function parseUl(ul) {
			var children = $.makeArray($(ul).children("li").map(parseLi));
			if (children && children.length) {
				return children;
			}
		}

		function parseLi(i, node) {
			var obj = {
				text: $(node).children("div").text()
			};
			var children = parseUl($(node).children("ul"));
			var href = $(node).children("div").find("a").attr("href");
			if (children && children.length) {
				obj.children = children;
			}
			if (href) {
				obj.href = href;
			}
			//		obj.href = $(node).find("div a").prop("href");
			return obj;
		}

		var tree = parseUl($(grunt.file.read("index.htm")).find("#dytree"))[0].children;
		console.log(tree);
		console.log($);
*/

	});

};