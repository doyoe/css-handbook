"use strict";
let caniuse = require("caniuse-db/data");
let convertEncoding = require("gulp-convert-encoding");
let fs = require("fs-extra-async");
let gulp = require("gulp");
let gutil = require("gulp-util");
let htmlhint = require("gulp-htmlhint");
let iconv = require("iconv-lite");
let jsdom = require("jsdom");
let path = require("path");
let replace = require("gulp-replace");
let which = require("which");

let classFix = {
	p: "experimentsupport",
	a: "partsupport",
	n: "unsupport",
	y: "support"
};

// 生成缩进
function tab(num) {
	return "\t".repeat(num);
}

// 比较两个版本号，v1>v2则返回值大于零 v1<v2则返回值大于0，若v1==v2则返回值等于0
function compare(v1, v2) {
	v1 = convert(v1);
	v2 = convert(v2);
	let diff = 0;
	for (let i = 0;
		(i < v1.length || i < v2.length) && diff === 0; i++) {
		diff = (v1[i] || 0) - (v2[i] || 0);
	}
	return diff;
}

// 将版本号按小数点分割为数组
function convert(ver) {
	return /Edge/.test(ver) ? [12] : ver.toString().split(".").map(function(subVer) {
		return +subVer || 0;
	});
}

function getPrefix(bro, ver) {
	bro = caniuse.agents[bro];
	return (bro.prefix_exceptions || {})[ver] || bro.prefix;
}

function compatible(data, strPropName, propName, strIndent, indent) {
	let status = data.stats;
	let str = "<!-- compatible:" + strPropName + ' --><table class="g-data"><thead><tr>';
	let thead = "";
	let tbody = "";
	let tabData = {};
	let rowNum = 1;

	for (let browserName in status) {
		if (JSON.stringify(status[browserName]) === "{}") {
			delete status[browserName];
			continue;
		}
		thead += `<th><span class="browser-${ browserName }">${ caniuse.agents[browserName].browser.replace(/\s+/g, "<br>") }</span></th>`;
		tabData[browserName] = {};
		for (let browserVersion in status[browserName]) {
			tbody = status[browserName][browserVersion];
			if (propName === "viewport-units") {
				tbody = tbody.replace(/(\s+#\d+)+$/, "");
			}
			if (!/\bu\b/i.test(tbody)) {
				tbody = tbody.replace(/\bx\b/, function() {
					return "-" + getPrefix(browserName, browserVersion) + "-";
				});

				// opera做数据特殊处理
				if (browserName === "opera" && browserVersion >= 13 && tbody === "y") {
					tbody += getPrefix(browserName, browserVersion);
				}

				if (tabData[browserName][tbody]) {
					tabData[browserName][tbody].push(browserVersion);
				} else {
					tabData[browserName][tbody] = [browserVersion];
				}
			}
		}

		// opera做数据特殊处理
		if (browserName === "opera" && !tabData[browserName]["y -webkit-"] && tabData[browserName].y) {
			tabData[browserName].y = tabData[browserName].y.concat(tabData[browserName].ywebkit);
			delete tabData[browserName].ywebkit;
		}

		for (let stats in tabData[browserName]) {
			tbody = tabData[browserName][stats].join(",").split(/\s*[,-]\s*/g).sort(compare);
			if (tbody.length === 1) {
				tabData[browserName][stats] = tbody;
			} else {
				tabData[browserName][stats] = [tbody[0], tbody[tbody.length - 1]];
			}
		}
		tbody = [];
		for (let stats in tabData[browserName]) {
			tbody.push({
				supportInfo: /#(\d+)/.test(stats) ? (' <a href="#support' + RegExp.$1 + '">#' + RegExp.$1 + "</a>") : "",
				className: ' class="' + classFix[stats.substr(0, 1)] + '"',
				prefix: /(-\w+-)/.test(stats) ? (' <sup class="fix">' + RegExp.$1 + "</sup>") : "",
				value: tabData[browserName][stats],
				type: stats
			});
		}
		tabData[browserName] = tbody.sort(function(a, b) {
			return compare(a.value[0], b.value[0]);
		});
		rowNum = Math.max(rowNum, tbody.length);

	}

	for (let browserName in tabData) {
		tbody = rowNum - tabData[browserName].length + 1;
		tabData[browserName][tabData[browserName].length - 1].rowspan = tbody > 1 ? ' rowspan="' + tbody + '"' : "";
		if (/^y\w*$/.test(tabData[browserName][tabData[browserName].length - 1].type) && tabData[browserName][tabData[browserName].length - 1].value.length > 1) {
			tabData[browserName][tabData[browserName].length - 1].value = [tabData[browserName][tabData[browserName].length - 1].value[0] + "+"];
		}
	}
	tbody = "";
	for (let i = 0; i < rowNum; i++) {
		tbody += "<tr>";
		for (let browserName in status) {
			if (tabData[browserName][i]) {
				tbody += "<td" + (tabData[browserName][i].rowspan || "") + tabData[browserName][i].className + ">" + tabData[browserName][i].value.join("-") + tabData[browserName][i].prefix + tabData[browserName][i].supportInfo + "</td>";
			}
		}
		tbody += "</tr>";
	}
	str += thead + "</tr></thead><tbody>" + tbody + "</tbody></table><!-- compatible:end -->";
	str = strIndent + str.replace(/(\s*<\/?(ul|div|section|tr|t\w{2,})(\s[^>]+)*>\s*)/ig, "\n$1\n").replace(/(<\/(li|h\d|th|td)>\s*)/ig, "$1\n").replace(/\n+(<[\/\!]?(\w+)?)/g, indent);
	return str;
}

// 使用caniuse.com数据自动生成兼容性图表
function caniuseData(str, strIndent, strPropName, subName, index, html) {
	strIndent = strIndent.match(/\t| {4}/g);
	strIndent = strIndent ? tab(strIndent.length) : "";
	// 缩进所用的数据
	let indentData = {
		thead: strIndent + tab(1),
		tbody: strIndent + tab(1),
		tr: strIndent + tab(2),
		th: strIndent + tab(3),
		td: strIndent + tab(3)
	};

	// 生成缩进
	function indent(s, tag, tagName) {
		return "\r\n" + (indentData[tagName] || strIndent) + tag;
	}

	// 数据项在数据库中的名称与css属性名称转换
	let propFix = {
			"repeating-linear-gradient()": "css-repeating-gradients",
			"repeating-radial-gradient()": "css-repeating-gradients",
			"linear-gradient()": "css-gradients",
			"radial-gradient()": "css-gradients",
			"user-select": "user-select-none",
			"box-sizing": "css3-boxsizing",
			"text-shadow": "textshadow",
			"tab-size": "css3-tabsize",
			"box-shadow": "boxshadow",
			transform: "transforms2d",
			"@media": "mediaqueries",
			columns: "multicolumn",
			vmax: "viewport-units",
			vmin: "viewport-units",
			vw: "viewport-units",
			vh: "viewport-units",
			"rgba": "css3-colors",
			"hsla": "css3-colors",
			"hsl": "css3-colors",
		},
		regPropSub = /((-\w+)+|\(\))$/,
		regPropS = /s$/,
		propName,
		data;

	caniuse.data["border-radius"].stats.safari["5"] = "y #1";

	function getDate(prop) {
		prop = propFix[prop] || prop;
		data = caniuse.data[prop] || caniuse.data["css-" + prop];
		if (!data && regPropSub.test(prop)) {
			getDate(prop.replace(regPropSub, ""));
		}
		if (!data && !regPropS.test(prop)) {
			getDate(prop + "s");
		}
		if (data) {
			if (/^column-break\b/.test(propName)) {
				// 克隆一份数据
				data = JSON.parse(JSON.stringify(data));
				data.stats.firefox = JSON.parse(JSON.stringify(data.stats.firefox).replace(/"a\b[^"]*/g, "\"n"));
			} else {
				if (/^(vw|vh|vmin|(repeating-)?linear-gradient\(\)|columns|column(-\w+)*)$/.test(propName)) {
					data = JSON.parse(JSON.stringify(data).replace(/"a\b/g, "\"y").replace(/\s*\#\d\"/g, "\""));
				} else if (/^(vmax|(repeating-)?radial-gradient\(\))$/.test(propName)) {
					data = JSON.parse(JSON.stringify(data).replace(/"a\b[^"]*/g, "\"n"));
				}
				// caniuse-db 版本 1.0.30000013 中，出现了Android的奇怪版本号37，未搞懂，先过滤掉
				for (let i in data.stats.android) {
					if (i > 36) {
						delete data.stats.android[i];
					}
				}
				// 非数字版本号，全部删掉
				for (let browserName in data.stats) {
					for (let verName in data.stats[browserName]) {
						if (!/\d/.test(verName)) {
							delete data.stats[browserName][verName];
						}
					}
				}
			}
			propName = prop;
		}
	}

	getDate(strPropName === "start" ? readDom(html, "#category").name : strPropName);

	if (!data) {
		if (propName) {
			gutil.log("caniuse数据中无此项：\t" + propName);
		} else {
			gutil.log("未指定caniuse查询项目。");
		}
	} else {
		str = compatible(data, strPropName, propName, strIndent, indent) || str;
	}
	return str;
}

// html修复
gulp.task("htm", function() {
	gutil.log("正在修复HTML文件");

	return gulp.src(["**/*.htm", "**/*.html", "!**/node_modules/**/*", "!index.htm"])
		.pipe(replace(/([\t ]*)<\!--\s*compatible\s*:\s*(\w+(-\w+)?)\s*-->[\s\S]*?<!--\s*compatible\s*:\s*end\s*-->/g, caniuseData))
		.pipe(replace(/(\t|\n) {4,}/g, function(str, char) {
			return char + tab(parseInt(str.length / 4));
		}))
		.pipe(replace(/<meta\s+charset=(["'])[\w-]+\1(?:\s+\/)?>/i, process.env.CI ? "<meta charset=\"gbk\">" : "<meta charset=\"utf-8\" />"))
		.pipe(process.env.CI ? convertEncoding({to: "gbk"}) : gutil.noop())
		.pipe(gulp.dest("."));
});

// html修复
gulp.task("gbk-js", function(cb) {
	if (process.env.CI) {
		gutil.log("正在修改js文件文件编码");

		return gulp.src(["js/**/*.js"])
			.pipe(convertEncoding({to: "gbk"}))
			.pipe(gulp.dest("js"));
	} else {
		cb();
	}
});

// html验证
gulp.task("lint", function() {
	gutil.log("正在检查所有html文件代码是否合法");

	return gulp.src(["**/*.htm", "**/*.html", "!**/node_modules/**/*"])
		.pipe(htmlhint())
		.pipe(htmlhint.reporter());

});

function readDom(html, selector) {
	return jsdom.jsdom(html).defaultView.document.querySelector(selector);
}

function readTree() {
	return fs.readFileAsync("index.htm")

	.then(html => readDom(html.toString(), "#dytree .unfold"))

	.then(ul2array);
}

function li2obj(li) {
	let link = li.querySelector("a");
	let ul = li.querySelector("ul");
	return {
		html: link.innerHTML.replace(/"/g, "&quot;"),
		link: link.href,
		children: ul && ul2array(ul)
	}
}

function ul2array(ul) {
	return Array.from(ul.children).filter(tag => tag.tagName === "LI").map(li2obj)
}

let projWalkerPromise;

function projWalker() {
	if (!projWalkerPromise) {
		projWalkerPromise = fsWalker(".").then(files => {
			return files.filter(file => {
				return file.dir && file.dir !== "images" && !/^(ZeroClipboard\.swf|prefixfree\.min\.js|\w+\.psd)$/.test(file.name)
			}).map(file => {
				return file.path
			}).sort()
		});
	}
	return projWalkerPromise;
}

function fsWalker(rootDir) {
	// 遍历当前目录下的子对象
	return fs.readdirAsync(rootDir).then(subNames => {

		// 储存当前目录下的子目录的遍历Promise对象
		let subDirs = [];

		// 储存当前目录下的文件
		let subFiles = [];

		// 排除`.*`、`node_modules`
		subNames = subNames.filter(subName => {
			return !/^(?:node_modules|\..*)$/i.test(subName);
		}).map(subName => {
			let subPath = path.join(rootDir, subName);

			// 异步获取子对象状态
			return fs.statAsync(subPath).then(stat => {
				if (stat.isDirectory()) {

					// 子对象是个目录，则递归查询
					subDirs.push(fsWalker(subPath));
				} else {

					// 子对象是个文件
					subFiles.push({
						dir: rootDir === "." ? "" : rootDir,
						name: subName,
						path: subPath,
					});
				}
				return stat;
			});
		});

		// 等待所有fs.statAsync操作完成
		return Promise.all(subNames).then(() => {

			// 获取所有子目录的遍历结果
			return Promise.all(subDirs).then(subDirsChilds => {

				// 将子目录的遍历结果，与当前目录的遍历结果，合为一个数组
				return subFiles.concat.apply(subFiles, subDirsChilds);
			});
		});
	});
}

function treeWalker(node, nest) {
	if (Array.isArray(node)) {
		let html = node.map(node => treeWalker(node, nest)).join("");
		if (nest) {
			html = `<UL>${ html }</UL>`;
		}
		return html
	} else {

		let ImageNumber = nest ? `<param name="ImageNumber" value="${ node.children ? 1 : (/\//.test(node.link) ? 11 : 15) }">` : "";
		let html = `<LI><OBJECT type="text/sitemap"><param name="Name" value="${ node.html }"><param name="Local" value="${ node.link }">${ ImageNumber }</OBJECT>`;
		if (node.children) {
			html += treeWalker(node.children, nest);
		}
		return html;
	}
}

function build() {
	let hhcPath;
	if (fs.existsSync("hhc.exe")) {
		hhcPath = "hhc.exe";
	} else {
		try {
			hhcPath = which.sync("hhc");
		} catch (ex) {
			// 
		}
		if (!hhcPath) {
			["ProgramFiles", "ProgramFiles(x86)", "ProgramW6432", "TEMP"]
			.map(envName => process.env[envName])
				.filter(Boolean)
				.map(rogramDir => path.join(rogramDir, "HTML Help Workshop/hhc.exe"))
				.some(exePath => {
					if (fs.existsSync(exePath)) {
						hhcPath = exePath;
						return true;
					}
				});
		}
	}

	let opener = require("opener");
	if (hhcPath) {
		let child_process = require("child_process");
		return new Promise((resolve, reject) => {
			gutil.log("正在编译chm");
			child_process.exec("taskkill /F /IM hh.exe", function() {

				child_process.execFile(hhcPath, [path.join(process.cwd(), "css.hhp")], (error, stdout, stderr) => {
					if (stderr) {
						reject(stderr);
					} else {
						if (stdout && /\s+Created\s+.+?,\s+[\d\,]+\s+\w+\s+/.test(stdout)) {
							resolve(stdout);
						} else {
							reject(stderr || stdout || error);
						}
					}
				});
			});
		})

		.then(stdout => {
			if (!process.env.CI) {
				opener("css.chm");
			}
			gutil.log(stdout);
			gutil.log("chm编译成功");
		}).catch(stderr => {
			gutil.log(stderr);
			gutil.log("chm编译发生错误");
		});
	} else {
		gutil.log("未找到hhc.exe，请安装[HTML Help Workshop](https://download.microsoft.com/download/0/A/9/0A939EF6-E31C-430F-A3DF-DFAE7960D564/htmlhelp.exe)");
		opener("css.hhp");
		return Promise.reject(hhcPath);
	}
}

//生成chm文件
gulp.task("chm", function() {
	gutil.log("正在生成工程文件");
	return Promise.all([
		readTree(),
		projWalker(),
	]).then(function (results) {
		let tree = results[0];
		let files = results[1];
		let pkg = require("./package.json");
		let htmlHead = `<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN"><HTML><HEAD><meta name="GENERATOR" content="Microsoft&reg; HTML Help Workshop 4.1"><!-- Sitemap 1.0 --></HEAD><BODY>`;
		let hhc = `${ htmlHead }<OBJECT type="text/site properties"><param name="ExWindow Styles" value="0x200"><param name="Window Styles" value="0x800025"><param name="Font" value="MS Sans Serif,9,0"></OBJECT>${ treeWalker(tree, true) }</BODY></HTML>`;
		let hhk = `${ htmlHead }<UL>${ treeWalker(tree) }</UL></BODY></HTML>`;
		let hhp = "[OPTIONS]\nCompatibility=1.1 or later\nCompiled file=css.chm\nContents file=css.hhc\nDefault topic=quicksearch.htm\nDisplay compile progress=No\nFull-text search=Yes\nIndex file=css.hhk\nLanguage=0x804 中文(简体，中国)\nTitle=" + pkg.description + "\n\n\n[FILES]\n";

		hhp += files.filter(path => {
			if (/\.html?$/.test(path)) {
				return false;
			} else {
				return true;
			}
		}).join("\n");

		return Promise.all([
			fs.writeFileAsync("css.hhc", iconv.encode(hhc, "gbk")),
			fs.writeFileAsync("css.hhk", iconv.encode(hhk, "gbk")),
			fs.writeFileAsync("css.hhp", iconv.encode(hhp, "gbk")),
		]);
	}).then(build);
});


gulp.task("build", gulp.series("htm", "gbk-js", "chm"));

gulp.task("default", gulp.series("lint", "htm", "gbk-js", "chm"));
