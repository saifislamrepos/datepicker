const express = require('express');
var proxyMiddleware = require('http-proxy-middleware')
const path = require('path');
const app = express();
app.set('view engine', 'pug');
app.set('views','./views');
 
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './dist/index.html'));
});
app.use('/assets',express.static(path.join(__dirname,'./dist/assets')));
 app.listen(3002);
