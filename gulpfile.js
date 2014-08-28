"use strict";
var fs = require("fs"),
	path = require("path"),
	gulp = require("gulp");

// JSON格式文件读取
function readOptionalJSON(filepath) {
	var data = {};
	try {
		data = JSON.parse(fs.readFileSync(filepath));
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

// 目录遍历，排除git目录和node模块目录
function recurse(rootdir, callback, subdir) {
	var abspath = subdir ? path.join(rootdir, subdir) : rootdir;
	fs.readdirSync(abspath).forEach(function(filename) {
		var filepath = path.join(abspath, filename);
		if (fs.statSync(filepath).isDirectory()) {
			if (!/^(node_modules|\.git)/.test(filepath)) {
				recurse(rootdir, callback, path.join(subdir || '', filename || ''));
			}
		} else {
			callback(filepath, rootdir, subdir, filename);
		}
	});
};

// html验证
gulp.task("htm", function() {

	console.log("正在检查所有html文件代码是否合法，请稍候~~~");

	var htmlhint = require("gulp-htmlhint");
	recurse(".", function(filepath, rootdir, subdir, filename) {
		if (/\.html?$/.test(filename)) {
			gulp.src(filepath)
				.pipe(htmlhint())
				.pipe(htmlhint.reporter());
		}
	});
});

//生成chm文件
gulp.task("chm", function() {
	console.log("正在生成工程文件");
	var htmlparser = require("htmlparser"),
		rawHtml = fs.readFileSync("index.htm"),
		handler = new htmlparser.DefaultHandler(function(error, dom) {
			if (error) {
				//[...do something for errors...]
			} else {
				//[...parsing done, do something...]
			}
		}),
		parser = new htmlparser.Parser(handler);
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
			hhc += "<UL>";
			tree.children.forEach(function(tree) {
				forEachTree(tree, fn);
			});
			hhc += "</UL>";
		}
	}

	if (tree) {
		tree = parseUl(tree)[0];

		var pkg = readOptionalJSON("package.json"),
			html = '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN"><HTML><HEAD><meta name="GENERATOR" content="Microsoft&reg; HTML Help Workshop 4.1"><!-- Sitemap 1.0 --></HEAD><BODY>',
			hhk = html + "<UL>",
			hhc = html + '<OBJECT type="text/site properties"><param name="ExWindow Styles" value="0x200"><param name="Window Styles" value="0x800025"><param name="Font" value="MS Sans Serif,9,0"></OBJECT>',
			hhp = "[OPTIONS]\nCompatibility=1.1 or later\nCompiled file=css.chm\nContents file=css.hhc\nDefault topic=quicksearch.htm\nDisplay compile progress=No\nFull-text search=Yes\nIndex file=css.hhk\nLanguage=0x804 中文(简体，中国)\nTitle=" + pkg.description + "\n\n\n[FILES]\n",
			files = {};

		recurse(".", function(abspath, rootdir, subdir, filename) {
			if (!/^(ZeroClipboard\.swf|\w+\.psd|selectivizr.js)$/.test(filename) && subdir) {
				files[path.normalize(subdir + "/" + filename)] = true;
			}
		});

		forEachTree(tree, function(o) {
			hhk += '<LI><OBJECT type="text/sitemap"><param name="Name" value="' + o.title + '"><param name="Local" value="' + o.href + '"></OBJECT>';
			var filepath = path.normalize(o.href);
			if (!files[filepath]) {
				if (fs.existsSync(filepath)) {
					files[filepath] = true;
				} else {
					console.log("发现死链接:\t" + o.href);
				}
			}
			hhc += '<LI><OBJECT type="text/sitemap"><param name="Name" value="' + o.title + '"><param name="Local" value="' + o.href + '"><param name="ImageNumber" value="' + (o.children ? 1 : (/\//.test(o.href) ? 11 : 15)) + '"></OBJECT>'
		});

		hhk += "</UL></BODY></HTML>";

		hhc += "</BODY></HTML>";

		for (var i in files) {
			hhp += i + "\n";
		}

		var iconv = require('iconv-lite');
		hhk = iconv.encode(hhk, "gbk");
		hhc = iconv.encode(hhc, "gbk");
		hhp = iconv.encode(hhp, "gbk");
		fs.writeFileSync("css.hhk", hhk);
		fs.writeFileSync("css.hhc", hhc);
		fs.writeFileSync("css.hhp", hhp);

		var hhcPath;
		["hhc.exe", "C:\\Program Files (x86)\\HTML Help Workshop\\hhc.exe", "C:\\Program Files\\HTML Help Workshop\\hhc.exe"].forEach(function(path) {
			if (!hhcPath && fs.existsSync(path)) {
				hhcPath = /\s/.test(path) ? '"' + path + '"' : path;
				return false;
			}
		});
		var exec = require("child_process").exec,
			opener = require("opener");

		if (hhcPath) {
			exec("taskkill /F /IM hh.exe", function() {
				console.log("正在编译chm");
				exec(hhcPath + " css.hhp", function(error, stdout, stderr) {
					if (stderr) {
						console.log(stderr);
						console.log("chm编译发生错误");
					} else {
						opener("css.chm");
						var rimraf = require("rimraf");
						rimraf("css.hhk", function() {});
						rimraf("css.hhc", function() {});
						rimraf("css.hhp", function() {});
						console.log("chm编译成功");
					}
				});
			});
		} else {
			console.log("未找到hhc.exe，请安装HTML Help Workshop后将其拷贝至当前目录");
			opener("css.hhp");
		}
	}
});

gulp.task("default", ["htm", "chm"]);