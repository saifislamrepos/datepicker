const express = require('express');
const path = require('path');
const app = express();

const serveGzipped = contentType => (req, res, next) => {
    const acceptedEncodings = req.acceptsEncodings()
    if (
        acceptedEncodings.indexOf('gzip') === -1 
    ) {
        next()
        return
    }
    req.url = req.url.replace(".js", ".js.gz");
    res.set('Content-Encoding', 'gzip')
    res.set('Content-Type', contentType)
    res.set('Transfer-Encoding', 'chunked')
    res.set('Vary', 'Accept-Encoding')
    next()
}
app.disable('x-powered-by');
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});
app.get('*.js', serveGzipped('text/javascript'))
app.use('/assets', express.static(path.join(__dirname, './dist/assets'),{
    immutable : true,
    maxAge    : '1y'
}));
app.listen(3002);