/**
*** Copyright (c) Doyoe.com All rights reserved.
*** Doyoe's HTML5 js
*** Version: 1.0.0
*** Author Joy Du(飘零雾雨)
*** Edit at 2012.2.1
**/
(function(){
	var aHtml5 = ['article','aside','audio','bdi','canvas','command','datalist','details','figcaption','figure','footer','header','hgroup','keygen','mark','meter','nav','output','progress','rp','rt','ruby','section','source','summary','time','track','vedio'];
    var iHtml5 = aHtml5.length;
    for(var i=0;i<iHtml5;i++){
		document.createElement(aHtml5[i]);
	}
})();