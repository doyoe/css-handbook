/**
 * jQuery中Cookie读写操作的封装
 * @type {Object}
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

//iframe层与iframe父层的数据交互。把iframe的父层的document注册到iframe层。
window.topDocument = window.top.document;

/*
 *  全局函数的封装
 */
var Global = {
	//在线手册根目录，默认值
	rootPath: "http://css.doyoe.com",
	//是否chm浏览方式
	isLocal: /^mk:$/i.test(location.protocol),
	//是否非IE下浏览
	notIE: document.querySelector && !(document.documentMode < 10)
};

// 下拉菜单的展开收起的构造函数,参数s为下拉菜单最外层的容器;
Global.folding = function(s){
	s.hover(function() {
		$(this).addClass('on');
	}, function() {
		$(this).removeClass('on');
	});
};

//取得标识里定位data位置的rel和标识着此项信息的name
(function(id){
	var tag = $(id);
	if(!tag.length){return};
	Global.rel = tag.attr('rel');
	Global.name = tag.attr('name');
	Global.pathname = (Global.rel ? '/' + Global.rel : '') + '/' + Global.name + '.htm';
	if (Global.isLocal) {
		Global.url = Global.rootPath + Global.pathname;
	} else {
		Global.url = location.href;
		Global.rootPath = Global.url.replace(Global.pathname, "");
	}
})('#category');

//url地址的页面跳转
if (!Global.isLocal && Global.name) {
	(function(){
		if(window === window.top){
			$.cookie('pos', Global.url, {path: '/'});
			location = Global.rootPath + (/^file:$/i.test(location.protocol) ? "/index.htm" : "");
		} else {
			var pos = $.cookie('pos');
			if(pos){
				$.cookie('pos',null,{path:'/'});
				$('#archives',topDocument).attr('src',pos);
			}
		}
	})();
}

//复制函数
(function() {
	var tip = "你的浏览器不支持此功能,请手动进行复制。",
		clipboardData = window.clipboardData;
	if(!clipboardData){
		!function a(b,c,e){function f(d,j){if(!c[d]){if(!b[d]){var i=typeof require=='function'&&require;if(!j&&i)return i(d,!0);if(g)return g(d,!0);throw new Error("Cannot find module '"+d+"'")}var h=c[d]={exports:{}};b[d][0].call(h.exports,function(c){var a=b[d][1][c];return f(a?a:c)},h,h.exports,a,b,c,e)}return c[d].exports}var g=typeof require=='function'&&require;for(var d=0;d<e.length;d++)f(e[d]);return f}({1:[function(b,a,c){!function(e,h,p,n,k,g,q,j,l,m,i,b,c,d,f,o){'use strict';e=function(a,c){var b=a.style[c];if(a.currentStyle?b=a.currentStyle[c]:window.getComputedStyle&&(b=document.defaultView.getComputedStyle(a,null).getPropertyValue(c)),b=='auto'&&c=='cursor'){var e=['a'];for(var d=0;d<e.length;d++)if(a.tagName.toLowerCase()==e[d])return'pointer'}return b},h=function(a){if(!b.prototype._singleton)return;a||(a=window.event);var c;this!==window?c=this:a.target?c=a.target:a.srcElement&&(c=a.srcElement),b.prototype._singleton.setCurrent(c)},p=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent('on'+b,c)},n=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent('on'+b,c)},k=function(a,b){if(a.addClass)return a.addClass(b),a;if(b&&typeof b==='string'){var d=(b||'').split(/\s+/);if(a.nodeType===1)if(!a.className)a.className=b;else{var f=' '+a.className+' ',e=a.className;for(var c=0,g=d.length;c<g;c++)f.indexOf(' '+d[c]+' ')<0&&(e+=' '+d[c]);a.className=e.replace(/^\s+|\s+$/g,'')}}return a},g=function(a,b){if(a.removeClass)return a.removeClass(b),a;if(b&&typeof b==='string'||b===undefined){var e=(b||'').split(/\s+/);if(a.nodeType===1&&a.className)if(b){var c=(' '+a.className+' ').replace(/[\n\t]/g,' ');for(var d=0,f=e.length;d<f;d++)c=c.replace(' '+e[d]+' ',' ');a.className=c.replace(/^\s+|\s+$/g,'')}else a.className=''}return a},q=function(a){var b={left:0,top:0,width: $(a).outerWidth(),height:$(a).outerHeight(),zIndex:9999},c=e(a,'zIndex');c&&c!='auto'&&(b.zIndex=parseInt(c,10));while(a){var d=parseInt(e(a,'borderLeftWidth'),10),f=parseInt(e(a,'borderTopWidth'),10);b.left+=isNaN(a.offsetLeft)?0:a.offsetLeft,b.left+=isNaN(d)?0:d,b.top+=isNaN(a.offsetTop)?0:a.offsetTop,b.top+=isNaN(f)?0:f,a=a.offsetParent}return b},j=function(a){return(a.indexOf('?')>=0?'&nocache=':'?nocache=')+new Date().getTime()},l=function(a){var b=[];return a.trustedDomains&&(typeof a.trustedDomains==='string'?b.push('trustedDomain='+a.trustedDomains):b.push('trustedDomain='+a.trustedDomains.join(','))),b.join('&')},m=function(c,b){if(b.indexOf)return b.indexOf(c);for(var a=0,d=b.length;a<d;a++)if(b[a]===c)return a;return-1},i=function(a){if(typeof a==='string')throw new TypeError("ZeroClipboard doesn't accept query strings.");return a.length?a:[a]},b=function(d,e){if(d&&(b.prototype._singleton||this).glue(d),b.prototype._singleton)return b.prototype._singleton;b.prototype._singleton=this,this.options={};for(var a in f)this.options[a]=f[a];for(var c in e)this.options[c]=e[c];this.handlers={},b.detectFlashSupport()&&o()},d=[],b.prototype.setCurrent=function(a){c=a,this.reposition(),a.getAttribute('title')&&this.setTitle(a.getAttribute('title')),this.setHandCursor(e(a,'cursor')=='pointer')},b.prototype.setText=function(a){a&&a!==''&&(this.options.text=a,this.ready()&&this.flashBridge.setText(a))},b.prototype.setTitle=function(a){a&&a!==''&&this.htmlBridge.setAttribute('title',a)},b.prototype.setSize=function(a,b){this.ready()&&this.flashBridge.setSize(a,b)},b.prototype.setHandCursor=function(a){this.ready()&&this.flashBridge.setHandCursor(a)},b.version='1.1.7',f={moviePath:'ZeroClipboard.swf',trustedDomains:null,text:null,hoverClass:'zeroclipboard-is-hover',activeClass:'zeroclipboard-is-active',allowScriptAccess:'sameDomain'},b.setDefaults=function(b){for(var a in b)f[a]=b[a]},b.destroy=function(){b.prototype._singleton.unglue(d);var a=b.prototype._singleton.htmlBridge;a.parentNode.removeChild(a),delete b.prototype._singleton},b.detectFlashSupport=function(){var a=!1;try{new ActiveXObject('ShockwaveFlash.ShockwaveFlash'),a=!0}catch(b){navigator.mimeTypes['application/x-shockwave-flash']&&(a=!0)}return a},o=function(){var c=b.prototype._singleton,a=document.getElementById('global-zeroclipboard-html-bridge');if(!a){var d='      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="'+c.options.moviePath+j(c.options.moviePath)+'"/>         <param name="allowScriptAccess" value="'+c.options.allowScriptAccess+'"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="'+l(c.options)+'"/>         <embed src="'+c.options.moviePath+j(c.options.moviePath)+'"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="'+l(c.options)+'"           scale="exactfit">         </embed>       </object>';a=document.createElement('div'),a.id='global-zeroclipboard-html-bridge',a.setAttribute('class','global-zeroclipboard-container'),a.setAttribute('data-clipboard-ready',!1),a.style.position='absolute',a.style.left='-9999px',a.style.top='-9999px',a.style.width='15px',a.style.height='15px',a.style.zIndex='9999',a.innerHTML=d,document.body.appendChild(a)}c.htmlBridge=a,c.flashBridge=document['global-zeroclipboard-flash-bridge']||a.children[0].lastElementChild},b.prototype.resetBridge=function(){this.htmlBridge.style.left='-9999px',this.htmlBridge.style.top='-9999px',this.htmlBridge.removeAttribute('title'),this.htmlBridge.removeAttribute('data-clipboard-text'),g(c,this.options.activeClass),c=null,this.options.text=null},b.prototype.ready=function(){var a=this.htmlBridge.getAttribute('data-clipboard-ready');return a==='true'||a===!0},b.prototype.reposition=function(){if(!c)return!1;var a=q(c);this.htmlBridge.style.top=a.top+'px',this.htmlBridge.style.left=a.left+'px',this.htmlBridge.style.width=a.width+'px',this.htmlBridge.style.height=a.height+'px',this.htmlBridge.style.zIndex=a.zIndex+1,this.setSize(a.width,a.height)},b.dispatch=function(a,c){b.prototype._singleton.receiveEvent(a,c)},b.prototype.on=function(a,e){var d=a.toString().split(/\s/g);for(var c=0;c<d.length;c++)a=d[c].toLowerCase().replace(/^on/,''),this.handlers[a]||(this.handlers[a]=e);this.handlers.noflash&&!b.detectFlashSupport()&&this.receiveEvent('onNoFlash',null)},b.prototype.addEventListener=b.prototype.on,b.prototype.off=function(c,e){var d=c.toString().split(/\s/g);for(var a=0;a<d.length;a++){c=d[a].toLowerCase().replace(/^on/,'');for(var b in this.handlers)b===c&&this.handlers[b]===e&&delete this.handlers[b]}},b.prototype.removeEventListener=b.prototype.off,b.prototype.receiveEvent=function(b,d){b=b.toString().toLowerCase().replace(/^on/,'');var a=c;switch(b){case'load':if(d&&parseFloat(d.flashVersion.replace(',','.').replace(/[^0-9\.]/gi,''))<10){this.receiveEvent('onWrongFlash',{flashVersion:d.flashVersion});return}this.htmlBridge.setAttribute('data-clipboard-ready',!0);break;case'mouseover':k(a,this.options.hoverClass);break;case'mouseout':g(a,this.options.hoverClass);this.resetBridge();break;case'mousedown':k(a,this.options.activeClass);break;case'mouseup':g(a,this.options.activeClass);break;case'datarequested':var h=a.getAttribute('data-clipboard-target'),e=h?document.getElementById(h):null;if(e){var i=e.value||e.textContent||e.innerText;i&&this.setText(i)}else{var j=a.getAttribute('data-clipboard-text');j&&this.setText(j)}break;case'complete':this.options.text=null;break}if(this.handlers[b]){var f=this.handlers[b];typeof f=='function'?f.call(a,this,d):typeof f=='string'&&window[f].call(a,this,d)}},b.prototype.glue=function(a){a=i(a);for(var b=0;b<a.length;b++)m(a[b],d)==-1&&(d.push(a[b]),p(a[b],'mouseover',h))},b.prototype.unglue=function(a){a=i(a);for(var b=0;b<a.length;b++){n(a[b],'mouseover',h);var c=m(a[b],d);c!=-1&&d.splice(c,1)}},a!==void 0?a.exports=b:typeof define==='function'&&define.amd?define(function(){return b}):window.ZeroClipboard=b}()},{}],2:[function(h,j,i){var c=typeof self!=='undefined'?self:typeof window!=='undefined'?window:{},e=c.ZeroClipboard=h('ZeroClipboard'),g={path:'ZeroClipboard.swf',copy:null,beforeCopy:null,afterCopy:null,clickAfter:!0},f=function(a){return a=0,function(){return a++}}(),d={},b,a=jQuery;a.fn.zclip=function(i){var h,j;if(a.isPlainObject(i))h=a.extend({},g,i),j=f(),d[j]=h,this.data('zclip-client',j),b?b.glue(this):b=new e(this,{moviePath:h.path,trustedDomains:[c.location.protocol+'//'+c.location.host],hoverClass:'hover',activeClass:'active'}),a.isFunction(h.copy)&&this.on('zClip_copy',a.proxy(h.copy,this)),a.isFunction(h.beforeCopy)&&this.on('zClip_beforeCopy',a.proxy(h.beforeCopy,this)),a.isFunction(h.afterCopy)&&this.on('zClip_afterCopy',a.proxy(h.afterCopy,this)),b.on('mouseover',function(){var b=a(this);b.trigger('mouseenter')}),b.on('mouseout',function(){var b=a(this);b.trigger('mouseleave')}),b.on('mousedown',function(){var b=a(this);b.trigger('mousedown')}),b.on('load',function(a){a.setHandCursor(h.setHandCursor)}),b.on('complete',function(h,g){var b=g.text,e=a(this),f=d[e.data('zclip-client')];a.isFunction(f.afterCopy)?e.trigger('zClip_afterCopy',b):(b.length>500&&(b=b.substr(0,500)+'\u2026\n\n('+(b.length-500)+'characters not shown)'),c.alert('Copied text to clipboard:\n\n'+g.text)),f.clickAfter&&e.trigger('click')}),b.on('dataRequested',function(e){var b=a(this),c=d[b.data('zclip-client')];b.trigger('zClip_beforeCopy'),a.isFunction(c.copy)?e.setText(String(b.triggerHandler('zClip_copy'))):e.setText(c.copy)}),a(c).on('load resize',function(){b.reposition()});else if(b&&typeof i==='string')switch(i){case'remove':case'hide':b.unglue(this);break;case'show':b.glue(this)}}},{ZeroClipboard:1}]},{},[2])
	}
	Global.copy = function(btn, content, isAlertContent) {
		if (btn && btn.length) {
			content = content.replace(/\s+$/, "");
			btn.click(function(e) {
				e.preventDefault();
				try {
					clipboardData.setData("text", content);
				} catch (ex) {
					// 如果带入了isAlertContent参数，火狐无法复制时，弹出的tip包含content。
					if (isAlertContent) {
						prompt(tip + "\n链接地址为：", content);
					} else {
						alert(tip);
					}
				}
			});
			if ($.fn.zclip) {
				btn.zclip({
					afterCopy: function() {},
					path: Global.rootPath + "/js/ZeroClipboard.swf",
					clickAfter: false,
					copy: content
				});
			}
		}
	};
})();


/*
 * 建立下拉菜单
 *
 * 参数s为jquery包裹之后的下拉菜单最外层的容器,参数id为标识;
 */
(function(){
	var creatMenu = function(s){

		// 定义知识库
		// 作用 ：定义creatMenu的知识库,应用场景：iframe内部的下拉关联菜单。
		// 结构 ：每个数据的索引值+'htm'为自己的url地址,有子项的数据url地址为index.html.
		// 		  第一个值为每个属性自己的名字，不填的话默认与索引值相同。
		// 		  第二个值为假如自己有子项，那么自己被选中的时候显示的文字。
		this.data = {

			'index' : ['速查表快速通道','速查表快速通道'],
			introduction : {
				'index' : ['简介','其他简介条目'],
				'change-list' : ['更新历史'],
				'about-this-handbook' : ['关于本手册'],
				'what-is-css' : ['关于样式表'],
				'about-me' : ['关于作者'],
				'guide' : ['阅读及使用指引'],
				'thanks' : ['鸣谢'],
				'contribute' : ['捐赠']
			},

			properties : {
				'index' : ['属性列表','其他属性参考'],
				positioning : {
					'index' : ['定位(Positioning)','其它定位属性参考'],
					'position' : [],
					'z-index' : [],
					'top' : [],
					'right' : [],
					'bottom' : [],
					'left' : [],
					'clip' : []
				},
				layout : {
					'index' : ['布局(Layout)','其它布局属性参考'],
					'display' : [],
					'float' : [],
					'clear' : [],
					'visibility' : [],
					'overflow' : [],
					'overflow-x' : [],
					'overflow-y' : []
					//'rotation' : [],
					//'rotation-point' : []
				},
				dimension : {
					'index' : ['尺寸(Ddimension)','其它尺寸属性参考'],
					'width' : [],
					'min-width' : [],
					'max-width' : [],
					'height' : [],
					'min-height' : [],
					'max-height' : []
				},
				margin : {
					'index' : ['外补白(Margin)','其它外补白属性参考'],
					'margin' : [],
					'margin-top' : [],
					'margin-right' : [],
					'margin-bottom' : [],
					'margin-left' : []
				},
				padding : {
					'index' : ['内补白(Padding)','其它内补白属性参考'],
					'padding' : [],
					'padding-top' : [],
					'padding-right' : [],
					'padding-bottom' : [],
					'padding-left' : []
				},
				border : {
					'index' : ['边框(Border)','其它边框属性参考'],
					'border' : [],
					'border-width' : [],
					'border-style' : [],
					'border-color' : [],
					'border-top' : [],
					'border-top-width' : [],
					'border-top-style' : [],
					'border-top-color' : [],
					'border-right' : [],
					'border-right-width' : [],
					'border-right-style' : [],
					'border-right-color' : [],
					'border-bottom' : [],
					'border-bottom-width' : [],
					'border-bottom-style' : [],
					'border-bottom-color' : [],
					'border-left' : [],
					'border-left-width' : [],
					'border-left-style' : [],
					'border-left-color' : [],
					'border-radius' : [],
					'border-top-left-radius' : [],
					'border-top-right-radius' : [],
					'border-bottom-right-radius' : [],
					'border-bottom-left-radius' : [],
					'box-shadow' : [],
					'border-image' : [],
					'border-image-source' : [],
					'border-image-slice' : [],
					'border-image-width' : [],
					'border-image-outset' : [],
					'border-image-repeat' : []
				},
				background : {
					'index' : ['背景(Background)','其它背景属性参考'],
					'background' : [],
					'background-color' : [],
					'background-image' : [],
					'background-repeat' : [],
					'background-attachment' : [],
					'background-position' : [],
					'background-origin' : [],
					'background-clip' : [],
					'background-size' : []
				},
				color : {
					'index' : ['颜色(Color)','其它颜色属性参考'],
					'color' : [],
					'opacity' : []
				},
				font : {
					'index' : ['字体(Font)','其它字体属性参考'],
					'font' : [],
					'font-style' : [],
					'font-variant' : [],
					'font-weight' : [],
					'font-size' : [],
					'font-family' : [],
					'font-stretch' : []
				},
				text : {
					'index' : ['字体(text)','其它文本属性参考'],
					'text-transform' : [],
					'white-space' : [],
					'tab-size' : [],
					'word-break' : [],
					'word-wrap' : [],
					'overflow-wrap' : [],
					'text-align' : [],
					'text-align-last' : [],
					'text-justify' : [],
					'word-spacing' : [],
					'letter-spacing' : [],
					'text-indent' : [],
					'vertical-align' : [],
					'line-height' : []
				},
				'text-decoration' : {
					'index' : ['文本装饰(Text Decoration)','其它文本装饰属性'],
					'text-decoration' : [],
					'text-decoration-line' : [],
					'text-decoration-color' : [],
					'text-decoration-style' : [],
					'text-decoration-skip' : [],
					'text-underline-position' : [],
					'text-shadow' : []
				},
				'writing-modes' : {
					'index' : ['书写模式(Writing Modes)','其它书写模式属性'],
					'direction' : [],
					'unicode-bidi' : []
				},
				'list' : {
					'index' : ['列表(list)','其它列表属性参考'],
					'list-style' : [],
					'list-style-image' : [],
					'list-style-position' : [],
					'list-style-type' : []
				},
				'table' : {
					'index' : ['表格(table)','其它表格属性参考'],
					'table-layout' : [],
					'border-collapse' : [],
					'border-spacing' : [],
					'caption-side' : [],
					'empty-cells' : []
				},
				'content' : {
					'index' : ['内容(Content)','其它内容属性参考'],
					'content' : [],
					'counter-increment' : [],
					'counter-reset' : [],
					'quotes' : []
				},
				'user-interface' : {
					'index' : ['用户界面(User Interface)','其它用户界面属性'],
					'appearance' : [],
					'text-overflow' : [],
					'outline' : [],
					'outline-width' : [],
					'outline-color' : [],
					'outline-style' : [],
					'outline-offset' : [],
					'nav-index' : [],
					'nav-up' : [],
					'nav-right' : [],
					'nav-down' : [],
					'nav-left' : [],
					'cursor' : [],
					'zoom' : [],
					'box-sizing' : [],
					'resize' : [],
					'ime-mode' : [],
					'user-select' : [],
					'pointer-events' : []
				},
				'multi-column' : {
					'index' : ['多栏(Multi-column)','其它多栏属性参考'],
					'columns' : [],
					'columns-width' : [],
					'columns-count' : [],
					'columns-gap' : [],
					'columns-rule' : [],
					'columns-rule-width' : [],
					'columns-rule-style' : [],
					'columns-rule-color' : [],
					'columns-span' : [],
					'columns-fill' : [],
					'columns-break-before' : [],
					'columns-break-after' : [],
					'columns-break-inside' : []
				},
				'flexible-box' : {
					'index' : ['弹性盒模型(Flexible Box)(旧)','其它弹性盒模型属性'],
					'box-orient' : [],
					'box-pack' : [],
					'box-align' : [],
					'box-flex' : [],
					'box-flex-group' : [],
					'box-ordinal-group' : [],
					'box-direction' : [],
					'box-lines' : []
				},
				'flex' : {
					'index' : ['弹性盒模型(Flexible Box)(新)','其它弹性盒模型属性'],
					'flex' : [],
					'flex-basis' : [],
					'flex-direction' : [],
					'flex-flow' : [],
					'flex-grow' : [],
					'flex-shrink' : [],
					'flex-wrap' : [],
					'align-contnet' : [],
					'align-items' : [],
					'align-self' : [],
					'justify-content' : [],
					'order' : []
				},
				'transform' : {
					'index' : ['变换(Transform)','其它变换属性参考'],
					'transform' : [],
					'transform-origin' : []
				},
				'transition' : {
					'index' : ['过渡(Transition)','其它过渡属性参考'],
					'transition' : [],
					'transition-property' : [],
					'transition-duration' : [],
					'transition-timing-function' : [],
					'transition-delay' : []
				},
				'animation' : {
					'index' : ['动画(Animation)','其它动画属性参考'],
					'animation' : [],
					'animation-name' : [],
					'animation-duration' : [],
					'animation-timing-function' : [],
					'animation-delay' : [],
					'animation-iteration-count' : [],
					'animation-direction' : [],
					'animation-play-state' : [],
					'animation-fill-mode' : []
				},
				'printing' : {
					'index' : ['打印(printing)','其它打印属性参考'],
					'page' : [],
					'page-break-before' : [],
					'page-break-after' : [],
					'page-break-inside' : []
				},
				'media-queries' : {
					'index' : ['媒体查询(Media Queries)','其它媒体查询属性'],
					'width' : [],
					'height' : [],
					'device-width' : [],
					'device-height' : [],
					'orientation' : [],
					'aspect-ratio' : [],
					'color' : [],
					'color-index' : [],
					'monochrome' : [],
					'resolution' : [],
					'scan' : [],
					'grid' : []
				},
				'only-ie' : {
					'index' : ['Only IE','Only IE属性'],
					'scrollbar-3dlight-color' : [],
					'scrollbar-darkshadow-color	' : [],
					'scrollbar-highlight-color' : [],
					'scrollbar-shadow-color' : [],
					'scrollbar-arrow-color' : [],
					'scrollbar-face-color' : [],
					'scrollbar-track-color	' : [],
					'scrollbar-base-color' : [],
					'filter' : [],
					'behavior' : []
				},
				'only-firefox' : {
					'index' : ['Only Firefox','Only Firefox属性'],
					'border-colors' : [],
					'border-top-colors' : [],
					'border-right-colors' : [],
					'border-bottom-colors' : [],
					'border-left-colors' : []
				},
				'only-webkit' : {
					'index' : ['Only Webkit','Only Webkit属性'],
					'box-reflect' : [],
					'text-fill-color' : [],
					'text-stroke' : [],
					'text-stroke-width' : [],
					'text-stroke-color' : []
				}
			},

			rules : {
				'index' : ['语法与规则','其它语法与规则参考'],
				'!important' : [],
				'comment' : [],
				'@import' : [],
				'@charset' : [],
				'@media' : [],
				'@font-face' : [],
				'@page' : [],
				'@keyframes' : []
			},

			selectors : {
				'index' : ['选择符列表','其他选择符参考'],
				'element' : {
					'index' : ['元素选择符','其它元素选择符参考'],
					'all' : ['通配选择符(*)'],
					'e' : ['类型选择符(E)'],
					'id' : ['ID选择符(E#id)'],
					'class' : ['类选择符(E.class)']
				},
				'relationship' : {
					'index' : ['关系选择符','其它关系选择符参考'],
					'ef' : ['包含选择符(E F)'],
					'e-child-f' : ['子选择符(E>F)'],
					'e-adjacent-f' : ['相邻选择符(E+F)'],
					'e-brother-f' : ['兄弟选择符(E~F)']
				},
				'attribute' : {
					'index' : ['属性选择符','其它属性选择符参考'],
					'att' : ['E[att]'],
					'att2' : ['E[att="val"]'],
					'att3' : ['E[att~="val"]'],
					'att4' : ['E[att^="val"]'],
					'att5' : ['E[att$="val"]'],
					'att6' : ['E[att*="val"]'],
					'att7' : ['E[att|="val"]']
				},
				'pseudo-classes' : {
					'index' : ['伪类选择符','其它伪类选择符'],
					'link' : ['E:link'],
					'visited' : ['E:visited'],
					'hover' : ['E:hover'],
					'active' : ['E:active'],
					'focus' : ['E:focus'],
					'lang(fr)' : ['E:lang(fr)'],
					'not(s)' : ['E:not(s)'],
					'root' : ['E:root'],
					'first-child' : ['E:first-child'],
					'last-child' : ['E:last-child'],
					'only-child' : ['E:only-child'],
					'nth-child(n)' : ['E:nth-child(n)'],
					'nth-last-child(n)' : ['E:nth-last-child(n)'],
					'first-of-type' : ['E:first-of-type'],
					'last-of-type' : ['E:last-of-type'],
					'only-of-type' : ['E:only-of-type'],
					'nth-of-type(n)' : ['E:nth-of-type(n)'],
					'nth-last-of-type(n)' : ['E:nth-last-of-type(n)'],
					'empty' : ['E:empty'],
					'checked' : ['E:checked'],
					'enabled' : ['E:enabled'],
					'disabled' : ['E:disabled'],
					'target' : ['E:target'],
					'@page-first' : ['@page-first'],
					'@page-left' : ['@page-left'],
					'@page-right' : ['@page-right']
				},
				'pseudo-element' : {
					'index' : ['伪对象选择符','其它伪对象选择符'],
					'first-letter' : ['E::first-letter'],
					'first-line' : ['E::first-line'],
					'before' : ['E::before'],
					'after' : ['E::after'],
					'placeholder' : ['E::placeholder'],
					'selection' : ['E::selection']
				}
			},

			values : {
				'index' : ['取值 Values','其它取值与单位参考'],
				'length' : {
					'index' : ['长度(Length)','长度值与单位参考'],
					'length' : ['&lt;length&gt;'],
					'em' : [],
					'ex' : [],
					'ch' : [],
					'rem' : [],
					'vw' : [],
					'vh' : [],
					'vmax' : [],
					'vmin' : [],
					'cm' : [],
					'mm' : [],
					'q' : [],
					'in' : [],
					'pt' : [],
					'pc' : [],
					'px' : []
				},
				'angle' : {
					'index' : ['角度(Angle)','角度值与单位参考'],
					'angle' : ['&lt;angle&gt;'],
					'deg' : [],
					'grad' : [],
					'rad' : [],
					'turn' : []
				},
				'time' : {
					'index' : ['时间(Time)','时间值与单位参考'],
					'time' : ['&lt;time&gt;'],
					's' : [],
					'ms' : []
				},
				'frequency' : {
					'index' : ['频率(Frequency)','频率值与单位参考'],
					'frequency' : ['&lt;frequency&gt;'],
					'Hz' : [],
					'kHz' : []
				},
				'layout-specific' : {
					'index' : ['布局(Layout-specific)','布局值与单位参考'],
					'fraction' : ['&lt;fraction&gt;'],
					'grid' : ['&lt;grid&gt;'],
					'fr' : [],
					'gr' : []
				},
				'resolution' : {
					'index' : ['分辨率(Resolution)','其它分辨率单位参考'],
					'resolution' : ['&lt;resolution&gt;'],
					'dpi' : [],
					'dpcm' : [],
					'dppx' : []
				},
				'color' : {
					'index' : ['颜色(Color)','其它颜色值参考'],
					'color' : ['&lt;color&gt;'],
					'color-name' : ['Color Name'],
					'hex' : ['HEX'],
					'rgb' : ['RGB'],
					'rgba' : ['RGBA'],
					'hsl' : ['HSL'],
					'hsla' : ['HSLA'],
					'transparent' : [],
					'currentColor' : []
				},
				'textual' : {
					'index' : ['文本(Textual)','其它文本值参考'],
					'string' : ['&lt;string&gt;'],
					'url' : ['&lt;url&gt;'],
					'identifier' : ['&lt;identifier&gt;']
				},
				'content' : {
					'index' : ['生成内容(Content)','其它生成内容值参考'],
					'counter()' : [],
					'counters()' : [],
					'attr()' : []
				},
				'functional' : {
					'index' : ['函数(Functional)','其它函数值参考'],
					'calc()' : [],
					'min()' : [],
					'max()' : [],
					'toggle()' : []
				},
				'image' : {
					'index' : ['图像(Image)','其它图像值参考'],
					'image' : ['&lt;image&gt;'],
					'image()' : [],
					'image-set()' : [],
					'gradient' : ['&lt;gradient&gt;'],
					'linear-gradient()' : [],
					'radial-gradient()' : [],
					'repeating-linear-gradient()' : [],
					'repeating-radial-gradient()' : []
				},
				'numeric' : {
					'index' : ['数字(Numeric)','其它数字值参考'],
					'number' : ['&lt;number&gt;'],
					'integer' : ['&lt;integer&gt;'],
					'percentage' : ['&lt;percentage&gt;']
				}
			},

			appendix : {
				'index' : ['附录 Appendix','其它CSS附录参考'],
				'color-keywords' : ['颜色关键字(Color Keywords)'],
				'media-types' : ['媒体类型(Media Types)']
			},

			hack : {
				'index' : ['CSS Hack','其它CSS Hack参考'],
				'conditions' : ['条件Hack'],
				'properties' : ['属性级Hack'],
				'selectors' : ['选择符级Hack']
			},

			experience : {
				'index' : ['问题和经验','其它问题和经验参考'],
				'refer' : ['参考资源列表'],
				'bugs' : ['Bugs和解决方案'],
				'skill' : ['技巧和经验'],
				'other' : ['其它经验']
			}
		}
		this.searchData();
		this.drawMenu(s);
	}

	//根据标识取得此项的知识库
	creatMenu.prototype.searchData = function (){
		var i = 0,
			arr = Global.rel.split('/') || [],
			len = arr.length,
			temp;
		for (i ; i<len ; i++){
			temp = arr[i];
			if(temp != ''){
				this.data = this.data[temp];
			}
		}
	}

	//根据知识库里的内容绘制出下拉菜单
	creatMenu.prototype.drawMenu = function (s){
		var menu = $(s),
			title = menu.find('strong'),
			list = menu.find('ul'),
			listHtml = '',
			url='',
			name='',
			key,
			val;
		for(key in this.data){
			if (key == 'index'){continue;}
			else{
				val = this.data[key];
				if (val instanceof Array){
					name = val.length==0?key:val[0];
					url = key+'.htm';
				}else{
					name = val.index[0];
					url = key+'/index.htm';
				}
				listHtml += '<li><a href="'+url+'">'+name+'</a>'+'</li>';
			}
		}
		title.html(this.data.index[1]);
		list.html(listHtml);
	}

	//创建实例
	var s=$('#guide .g-combobox');
	if(s.length){new creatMenu(s);}
})();

/*
 * 404页面随机数据
 */
(function(){
	var data = [
		{
			name : '陈思桥',
			sex : '男',
			birth : '1991年6月',
			date : '2000年8月21日',
			local : '广西贵港市郁江大桥下',
			info : '失踪时只有9岁，身高140厘米，单眼皮，下颌处有一块跌跤缝针疤痕，前额上有个小漩涡...',
			photo : 'http://qzonestyle.gtimg.cn/qzone_v6/lostchild/images/chensiqiao.jpg',
			detail : 'http://bbs.baobeihuijia.com/thread-46886-1-1.html'
		},
		{
			name : '尹思源',
			sex : '女',
			birth : '1993年01月25日',
			date : '2000年07月05日',
			local : '吉林省辽源市东辽县金岗镇原西柳九井102宿舍',
			info : '短发，小眼睛，单眼皮，一个头旋,左胳膊有一块大拇指甲大的青色胎记...',
			photo : 'http://qzonestyle.gtimg.cn/qzone_v6/lostchild/images/yinsiyuan.jpg',
			detail : 'http://bbs.baobeihuijia.com/thread-129469-1-1.html'
		},
		{
			name : '杨依林',
			sex : '女',
			birth : '2003年9月20日',
			date : '2007年11月23日',
			local : '河南省郸城县宜路镇于李庄村',
			info : '河南东部口音；单眼皮，嘴唇下面磕了一个小疤，右脚大脚趾坐自行车的时候绊了一个疤；失踪时上穿蓝袄,下穿...',
			photo : 'http://qzonestyle.gtimg.cn/qzone_v6/lostchild/images/yangyilin.jpg',
			detail : 'http://bbs.baobeihuijia.com/thread-129468-1-1.html'
		}
	];
	var getRandomNum = function(start,end){
		return Math.round(start + Math.random()*(end - start));
	};
	var getData = function(num){

		//异常处理
		if(data.length < num || !num){return false;}

		else{return data[num-1];}
	};
	var drawHtml = function(data){
		var found = $('#found');

		//异常处理
		if(!data){return false;}

		found.find('dd[type=name]').html(data['name']);
		found.find('dd[type=sex]').html(data['sex']);
		found.find('dd[type=birth]').html(data['birth']);
		found.find('dd[type=date]').html(data['date']);
		found.find('dd[type=local]').html(data['local']);
		found.find('span[type=info]').html(data['info']);
		found.find('img[type=photo]').attr('src',data['photo']).attr('title',data['name']).attr('alt',data['name']);
		found.find('a[type=detail]').attr('href',data['detail']);
	};

	//init
	(function(){
		var found = $('#found'),
			trans = $('#trans');

		//异常处理
		if(!found.length||!trans.length){return false};

		//只在iframe层显示找小孩的那个页面。跳转过程中显示
		if(window == window.top){return false;}

		//显示找小孩的页面
		found.show();
		trans.hide();

		//取得随机数
		var num = getRandomNum(1,3);

		//根据数值取得知识库中固定的某条数据
		var data = getData(num);

		//绘制404页面
		drawHtml(data);
	})();
})();

/*
 * 页面内的小功能
 */
(function(){
	//得到UA和浏览器版本
	var UA = navigator.userAgent,
		gteWin7 = UA.match(/Windows NT ([\d\.]+)/) && parseFloat(RegExp.$1) > 6,
		isiPad = UA.match(/iPad/),
		isiPhone = UA.match(/iPhone/),
		isiPod = UA.match(/iPod/);

	//给所有页面增加一些通用的模块，如执行环境，如copyright等。
	(function (){
		//在页面头部的最后增加测试基础环境的模块
		var testBrowser =
		'<div class="g-browser g-clear">'+
			'<ul>'+
				'<li><a href="https://github.com/doyoe/css-handbook/issues" target="_blank" rel="external" class="external">Issues</a></li>'+
				'<li><a href="https://github.com/doyoe/css-handbook/pulls" target="_blank" rel="external" class="external">Pull Requests</a></li>'+
			'</ul>'+
			'<p>Base Browsers: IE6.0+, Firefox2.0+, Chrome4.0+, Safari4.0+, Opera15.0+</p>'+
		'</div>';

		$('#title').append(testBrowser);
		$('#rights').append(testBrowser);

		//在页面的的最后增加copyright模块
		var copyright = '<p class="copyright">Copyright © 2006-2014 <a href="http://www.doyoe.com/" rel="external" target="_blank">Doyoe</a>. All Rights Reserved</p>'
		$('#rights').append(copyright);

		//在页面的标题后面添加分享功能模块,复制链接等
		var share = '<div id="share" class="g-combobox g-transition share">'+
			'<div class="g-transition target">'+
			'	<strong>分享到</strong>'+
			'	<span>选择其它项<!--[if lte IE 7]><ins>IE7 and earlier, Get to die</ins><![endif]--></span>'+
			'</div>'+
			'<div class="g-transition list"><ul>'+
			'<li><a href="#" class="weibo">新浪微博</a></li>'+
			'<li><a href="#" class="txweibo">腾讯微博</a></li>'+
			'<li><a href="#" class="qq">QQ空间</a></li>'+
			'<li><a href="#" class="renren">人人网</a></li>'+
			'<li><a href="#" class="douban">豆瓣</a></li>'+
			'</ul></div></div>';
		var copyLink = '<a href="#" id="copylink" class="copylink">复制本页链接</a>'
		var tit = $('#hd .tit');
		if(tit.length){
			Global.title = tit.html();
			tit.after(copyLink).after(share);
		}

	})();

	//复制本页链接功能
	Global.copy($("#copylink"), Global.url, true);

	//分享功能
	(function(){
		var container = $('#share'),
			title = Global.title ? encodeURIComponent('CSS参考手册　' + Global.title + '　精彩呈现：') : encodeURIComponent('CSS参考手册'),
			url =  Global.url,
			pic = Global.rootPath + "/images/share.png";

		if(!container.length) return;

		// 新浪微博
		container.delegate('.weibo', 'click', function() {
			window.open('http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&pic=' + pic, '_blank');
			return false;
		});

		// QQ空间
		container.delegate('.qq', 'click', function() {
			window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?site=www.tuan2.com&title=' + '' + '&desc=' + title + '&summary=' + '' + '&url=' + url + '&pics=' + pic, '_blank');
			return false;
		});

		// 腾讯微博
		container.delegate('.txweibo', 'click', function() {
			window.open('http://v.t.qq.com/share/share.php?title=' + title + '&url=' + url + '&pic=' + pic, '_blank');
			return false;
		});

		// 人人网
		container.delegate('.renren', 'click', function() {
			window.open('http://widget.renren.com/dialog/share?resourceUrl=' + url + '&title=' + title + '&description=' + '' + '&pic=' + pic + '&charset=utf-8', '_blank')
			return false;
		});

		// 豆瓣
		container.delegate('.douban', 'click', function() {
			window.open('http://www.douban.com/recommend/?title=' + title + '&url=' + url, '_blank');
			return false;
		});
	})();

	//ipad 滚动条失效，将每个页面外层包裹一层。
	(function(){
		if(!isiPad && !isiPhone && !isiPod){return;}
		if($('#wrapper').length){return;}
		$('body').children().not('script').wrapAll('<div id="wrapper"></div>');
	})();

	//运行示例代码以及相关操作
	(function(){
		var example = $('#example'),
			content = example.find('textarea').val(),
			btnRun = example.find('.g-btn-sure');

		if (example.length) {
			//添加复制代码的按钮
			var copyCode = '<input type="button" class="g-btn g-btn-copy" value="复制">';
			btnRun.after(copyCode);

			//运行代码
			if (Global.isLocal && gteWin7) {

				//如果是win7下的chm版本，不支持直接打开浏览器运行
				btnRun.on({
					click: function(e) {
						e.preventDefault();
						if (confirm('本次操作将在浏览器中打开，请从手册在线版中点击运行按钮')) {
							var codeWin = window.open(Global.url);
						}
					}
				});
			} else {
				btnRun.on({
					click: function(e) {
						e.preventDefault();
						var codeWin = window.open();
						codeWin.document.write(content);
						codeWin.document.close();
					}
				});
			}

			//复制代码
			Global.copy(example.find(".g-btn-copy"), content);
		}
	})();

	//为自己和外层添加展开收起的折叠效果
	Global.folding($('.g-combobox'));

	$(".g-combobox .target").click(function(e) {
		e.preventDefault();
	});
})();


/*
 * 父层的功能
 */
(function(){

//如果是chm版本，没有父层就返回函数
if(window == window.top){return false;}

//给父层添加下拉列表的展开收起的折叠效果

Global.folding($('.g-combobox',topDocument));

/*
 * 功能 ：导航树的展开收起、点击后的iframe跳转
 *
 * 依赖jquery.js;
 */
(function(){
	var dytree = $('#dytree',topDocument);
	var iframe = $('#archives',topDocument),
		allLinks = dytree.find('a'),
		allFolder = dytree.find('.haschild'),
		allList = dytree.find('ul');

	//让父页面中的左侧的导航树中对应子页面正在打开的项 被选中.
	(function(){
		if(!Global.name){return false;}
			var url = Global.pathname.slice(1),
			onLink = dytree.find('a[href="'+url+'"]'),
			onLinkList = onLink.parents('ul'),
			onLinkFolder = onLinkList.siblings('.haschild'),
			onFolder = onLink.parents('.haschild'),
			onFolderList = onFolder.siblings('ul');

		//选中链接
		allLinks.removeClass('on');
		onLink.addClass('on');

		//收起所有文件夹。
		allFolder.removeClass('open')
		allList.removeClass('unfold');

		//展开被选中的链接之上的文件夹。
		onLinkFolder.addClass('open');
		onLinkList.addClass('unfold');
		onFolder.addClass('open');
		onFolderList.addClass('unfold');
	})();

	if(Global.notIE && dytree.prop('loaded')){
		return;
	}


	//展开与收起的切换
	allFolder.on({
		click : function(){
			var _this = $(this),
				item = _this,
				list = item.siblings('ul');

			item.hasClass('open') ? item.removeClass('open') : item.addClass('open');
			list.hasClass('unfold') ? list.removeClass('unfold') : list.addClass('unfold');
		}
	})

	//点击链接时更改右侧iframe的地址,显示当前选择,阻止默认行为
	dytree.on("click", "a", function(e){
		//阻止默认行为
		e.preventDefault();
		var _this = $(this),
			iframeSrc = _this.attr('href');

		//更改右侧iframe地址
		iframe.attr('src',iframeSrc);

		//显示当前选择
		allLinks.removeClass('on');
		_this.addClass('on');

	});

	dytree.prop('loaded', true);

})();


/*
 *  构造函数 ：弹出层
 *             可选择性配置关闭弹出层，拖拽，内部翻页的效果。
 *
 *  配置列表 ：
 *              popSelector : '#pop' ,//弹出层的选择器
 *              closeBtnSelector : '#pop .btn-close', //弹出层的关闭按钮的选择器,不填的情况下默认为没有关闭按钮
 *              titleSelector : '#pop .pop-hd',//弹出层的头部的选择器,以实现拖拽效果,如果不需要拖拽效果,可不配置此项。
 *              pagesSelector : "#pop .content",//弹出层的需翻页的部分的选择器,以实现翻页效果,如果不需要翻页效果,可不配置此项。
 *              nextBtnSelector : '#pop .next',//当弹出层有翻页效果时,下一页按钮的选择器,无翻页效果可不配置此项。
 *              prevBtnSelector : '#pop .prev',//当弹出层有翻页效果时,上一页按钮的选择器,无翻页效果可不配置此项。
 *              startPage : 0,//当弹出层有翻页效果时,起始的页面编号,可不配置,默认为0,无翻页效果可不配置此项。
 *  依赖jquery.js;
 */
(function (){


	var popUp = function(opts){
		var obj = this;

		this._doConfig(opts);
		this._makeDomCenter();
		this._withChangePages();
		this._withDrag();
		this.dom.fadeIn(1000);
		this.mask();
		this.closeBtn.click(function (e){e.preventDefault();obj.clear();});

		$(window.top).on('resize',function (){obj._makeDomCenter();});
		$(window.top).on('scroll',function (){obj._makeDomCenter();});
	}

	//使弹出层居中
	popUp.prototype._makeDomCenter = function (){
		var height = this.dom.outerHeight(),
			width = this.dom.outerWidth(),
			xtop = $(window.top).height() > height?($(window.top).height()-height)/2 + $(window.top).scrollTop() : 0,
			xleft = $(window.top).width() > width?($(window.top).width()-width)/2 + $(window.top).scrollLeft() : 0 ;

		this.dom.css("top",xtop).css("left",xleft);
	}

	//内部翻页功能
	popUp.prototype._withChangePages = function (){
		if (!this.pages){return false;};
		var obj = this,
			pagesLength = obj.pages.length,
			changePage = function (){
				obj.pages.hide();
				obj.pages.eq(obj.curPage).show();
				obj._makeDomCenter();
			};
		$(obj.nextBtn).click(function (){obj.curPage = obj.curPage>=pagesLength-1?0:obj.curPage+1;changePage();});
		$(obj.prevBtn).click(function (){obj.curPage = obj.curPage<1?pagesLength-1:obj.curPage-1;changePage();});
	}

	// 接收配置参数
	popUp.prototype._doConfig = function (opts){
		this.dom = opts.popSelector ? $(opts.popSelector,topDocument) : '';
		this.closeBtn = opts.closeBtnSelector ? $(opts.closeBtnSelector,topDocument) : '';
		this.hd = opts.titleSelector ? $(opts.titleSelector,topDocument) : '';
		this.pages = opts.pagesSelector ? $(opts.pagesSelector,topDocument) : '' ;
		this.nextBtn = opts.nextBtnSelector ? $(opts.nextBtnSelector,topDocument) : '' ;
		this.prevBtn = opts.prevBtnSelector ? $(opts.prevBtnSelector,topDocument) : '' ;
		this.curPage = opts.startPage || 0 ;
	}

	//拖拽功能
	popUp.prototype._withDrag = function () {
		if (!this.hd){return false;};
		var onDrag = false,
			disX = disY = 0,
			obj = this;
		obj.hd.mousedown(function (event){
			var event = event || window.event;
			onDrag = true;
			disX = event.clientX - obj.dom.offset().left;
			disY = event.clientY - obj.dom.offset().top;
			return false;
		});
		$(topDocument).mousemove(function (event){
			if (!onDrag) return;
			var event = event || window.event;
				iL = event.clientX - disX,
				iT = event.clientY - disY,
				maxL = topDocument.documentElement.clientWidth - obj.dom.outerWidth();
				maxT = topDocument.documentElement.clientHeight - obj.dom.outerHeight();
			iL = iL < 0 ? 0 : iL;
			iL = iL > maxL ? maxL : iL;
			iT = iT < 0 ? 0 : iT;
			iT = iT > maxT ? maxT : iT;
			obj.dom.css('marginTop',0).css('marginLeft',0).css('left',iL + "px").css('top',iT + "px");
			return false;
		});
		$(topDocument).mouseup(function (){onDrag = false;});
	}

	//添加蒙版
	popUp.prototype.mask = function (){
		var str = '';
		str += '<section id="mask" style="position:absolute;top:0px;left:0;width:100%;height:'+$(topDocument).height()+'px;z-index:100;background:#000;opacity:0.5;filter:alpha(opacity=50)"></section>'
		$('body',topDocument).append(str);
	}

	//关闭弹出层
	popUp.prototype.clear = function (){
		this.dom.hide();
		$("#mask",topDocument).remove();
		$(window.top).off('resize');
		$(window.top).off('scroll');
	}

	window.popUp = popUp;

	//弹出层的调用
	(function(){

		//非IE下第二次打开不用重新注册事件
		if( Global.notIE && $('#offer',topDocument).prop('loaded')){return false};
		$('.offer', topDocument).on({
			click : function(e){
				e.preventDefault();
				var opts = {
					popSelector : '#contribute',
					closeBtnSelector : '#contribute .g-btn-popup-close',
					titleSelector : '#contribute .g-popup-hd'
				}
				new popUp(opts);
				$('#offer', topDocument).prop('loaded', true);
			}
		})
	})()

})();

})();
