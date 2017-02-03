# APIJS
The APIJS allows you to send a service method passing a URL, a Data and a fallback, if necessary.

## Using APIJS you can:
  - Send REST methods;
  - Pass data values to a method;
  - Pass a URL fallback if the first fail;

### Installation
#### Using like a library
```sh
$ git clone https://github.com/mpahenrique/apijs.git
```
```HTML
<body>
...
...
<script src="path/to/apijs/index.js"></script>
</body>
```

#### Using like a module
```sh
$ npm install apijs --save
```

### Usage
#### Using like a module
```js
var apijs = require('apijs');
```

### Methods
#### GET
###### Usage:
```
apijs.get(URL: string, DATA: object, FALLBACK: string).then(function(resolve){
    Callback();
    // Return success;
}, function(reject){
    Callback();
    // Return error;
});
```
###### Example:
```
apijs.get('URL_TO_CALL', data_object, 'URL_TO_FALLBACK').then(function(resolve){
    console.log(resolve);
}, function(reject){
    console.log(reject);
});
```

#### POST
###### Usage:
```
apijs.post(URL: string, DATA: object, FALLBACK: string).then(function(resolve){
    Callback();
    // Return success;
}, function(reject){
    Callback();
    // Return error;
});
```
###### Example:
```
apijs.post('URL_TO_CALL', data_object, 'URL_TO_FALLBACK').then(function(resolve){
    console.log(resolve);
}, function(reject){
    console.log(reject);
});
```

#### PUT
###### Usage:
```
apijs.put(URL: string, DATA: object, FALLBACK: string).then(function(resolve){
    Callback();
    // Return success;
}, function(reject){
    Callback();
    // Return error;
});
```
###### Example:
```
apijs.put('URL_TO_CALL', data_object, 'URL_TO_FALLBACK').then(function(resolve){
    console.log(resolve);
}, function(reject){
    console.log(reject);
});
```

#### PATCH
###### Usage:
```
apijs.patch(URL: string, DATA: object, FALLBACK: string).then(function(resolve){
    Callback();
    // Return success;
}, function(reject){
    Callback();
    // Return error;
});
```
###### Example:
```
apijs.patch('URL_TO_CALL', data_object, 'URL_TO_FALLBACK').then(function(resolve){
    console.log(resolve);
}, function(reject){
    console.log(reject);
});
```

#### DELETE
###### Usage:
```
apijs.delete(URL: string, FALLBACK: string).then(function(resolve){
    Callback();
    // Return success;
}, function(reject){
    Callback();
    // Return error;
});
```
###### Example:
```
apijs.get('URL_TO_CALL', 'URL_TO_FALLBACK').then(function(resolve){
    console.log(resolve);
}, function(reject){
    console.log(reject);
});
```