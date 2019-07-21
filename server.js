const express = require('express');
var proxyMiddleware = require('http-proxy-middleware')
const path = require('path');
const app = express();
 
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './dist/index.html'));
});
app.use('/assets',express.static(path.join(__dirname,'./dist/assets')));
 app.listen(3002);
