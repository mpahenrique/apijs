function both(method, url, data, fallback){

    return new Promise(function(resolve, reject){

        data = data ? $jsonToFormData(data) : '';
        if(method == 'POST') data = data.replace(/^\?/, '');

        if(!url) return fail('Service name unknown');

        try {
            var xhr = new XMLHttpRequest();
            url = (method == 'POST') ? url : url + data;
            xhr.open(method, url);
            method == 'POST' && xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
            xhr.onreadystatechange = function(){
                if(xhr.readyState != 4) return;
                if(xhr.status == 200) return resolve(xhr.responseText);
                if(!!fallback && xhr.status != 200) return resolve($tryFallback(method, (fallback || url), (!!fallback ? true : false), data, { 'status' : xhr.status, 'data' : xhr.responseText, 'url' : url }));
                return fail({ 'status' : xhr.status, 'data' : xhr.responseText, 'url' : url });
            }
            xhr.send(data);
        } catch (err) {
            var xdr = new XDomainRequest();
            xdr.open(method, url + data);
            xdr.ontimeout = fail;
            xdr.onerror = fail;
            xdr.onprogress = progress;
            xdr.onload = function() {
                return resolve(xdr.responseText);
            }
            xdr.send();
        }

        function progress(prog){
            // console.log('progress :: ', prog)
        }

        function fail(err){
            reject(err);
        }

    });

}

function get(serviceName, data, urlComplement, fallBackJson){
    return both('GET', serviceName, data, urlComplement, fallBackJson);
}

function post(serviceName, data){
    return both('POST', serviceName, data);
}

function $tryFallback(method, url, fallback, data, err){
    if (typeof err === 'object' ) err.message = (fallback) ? "Service error, trying the fallback" : "";
    console.error('status: ', err.status, '\n', 'data: ', err.data, '\n', 'message: ', err.message, '\n', 'url: ', err.url)
    if (fallback) {
        return both(method, url, data);
    }
    //.then(function(data){
        //     reject(data);
        // }, function(data) {
        //     reject(Error("It broke"));
        // })
}

function $jsonToFormData(obj){
    if (typeof obj !== 'object') return obj;
    var paramString = '?';
    for (var key in obj) {
        var value = obj[key];
        if(obj[key] instanceof Array){
            value = encodeURIComponent(JSON.stringify(value));
        }
        if (paramString != "" && paramString != "?") paramString += "&";
        paramString += key + "=" + encodeURIComponent(value);
    }
    return paramString;
}

var apijs = {
    get  : get,
    post : post
}

try {
    module.exports = apijs;
} catch(err){
    // using like a library
    window.apijs = apijs;
}
































apijs.get('https://jsonplaceholder.typicode.com/posts/null', {'id':'1'}, 'https://jsonplaceholder.typicode.com/posts/nudes').then(function(resolve){
    console.log("then :: ", resolve);
}, function(reject){
    console.log("reject :: ", reject);
});