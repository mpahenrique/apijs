function both(method, serviceName, data, urlComplement, fallBackJson){

    return new Promise(function(resolve, reject){
        /*************** Dependencies ***************/
            var config = require('../config')
        /********************************************/

        data = data ? jsonToFormData(data) : '';
        if(method == 'POST') data = data.replace(/^\?/, '');
        urlComplement = urlComplement ? ('/' + urlComplement) : '';
        service = serviceName.match(/^(https?:)?\/\//) ? serviceName : !fallBackJson ? config.services[serviceName].url : config.services[serviceName]['fallBack'] + '/' + fallBackJson +  '.json';

        if(!service) return fail('Service name unknown');

        try {
            var xhr = new XMLHttpRequest();
            service = (method == 'POST') ? service : service + urlComplement + data;
            xhr.open(method, service);
            method == 'POST' && xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
            xhr.onreadystatechange = function(){
                if(xhr.readyState != 4) return;
                if(xhr.status == 200) return resolve(xhr.responseText);
                return fail({ status : xhr.status, data : xhr.responseText });
            }
            xhr.send(data);
        } catch (err) {
            var xdr = new XDomainRequest();
            xdr.open(method, service + urlComplement + data);
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

function jsonToFormData(obj){
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