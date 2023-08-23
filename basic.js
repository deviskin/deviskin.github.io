var basicReduce = function(url) {
    url = url.endsWith('/') ? url + 'index.html' :
      (url.indexOf('.html') >= 0 ? url : url + '/index.html');
    var names = url.split('/');
    var delCount = 2;
    var deleted = names.splice(names.length-delCount,delCount);
    return {url:names.join('/'),app:deleted[0]};
}
var basicMergeParams = function(qparams) {
    var queryParams = '';
    for(var i = 0; i < qparams.length;++i) {
        var entry = qparams[i];
        if (entry.value != '' && entry.value != null) {
            queryParams += (queryParams ? '&' : '') + entry.key + '=' + entry.value;
        }
    }
    return queryParams;
}
var basicRedirect = function(appName) {
    try {
        var currentDate = new Date();
        var light = (currentDate.getHours() >= 6 && currentDate.getHours() < 18);
        if (!light) {
          document.querySelector('html').setAttribute('class', 'night');
        }
        var base = basicReduce(window.location.href);
		    appName = appName? appName : base.app;
        var qq = basicMergeParams([{key:'app',value:appName},{key:'route',value:base.app}]);
        var r = base.url + (light?'/index.html':'/index.night.html') + (qq?'?'+qq:'');
        setTimeout(function(){
            window.location = r;
        }, 0);
    } catch (e) {
    }
}
