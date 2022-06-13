const http = require('http');

const fs = require('fs');

const path = require('path')

// create a server
const server = http.createServer();

const PORT = 3000

server.on('request', (req, res) => {

    function loadHtmlPage(error, data) {
        if (error) { throw error }
        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(data)
        res.end()
    }

    let METHOD = req.method;
    let URL = req.url;

    // routes
    if (METHOD === 'GET' && URL === '/') {
        fs.readFile(path.join(__dirname, 'pages', 'home.html'), function (error, data) {
            loadHtmlPage(error, data)
        })
    } else if (METHOD === 'GET' && URL === '/home') {
        res.writeHead(302, { "Location": "http://" + req.headers['host'] + '/' })
        res.end()
    } else if (METHOD === 'GET' && URL === '/about') {
        fs.readFile(path.join(__dirname, 'pages', 'about.html'), function (error, data) {
            loadHtmlPage(error, data)
        })
    } else if (METHOD === 'GET' && URL === '/contact') {
        fs.readFile(path.join(__dirname, 'pages', 'contact.html'), function (error, data) {
            loadHtmlPage(error, data)
        })
    } else {
        res.statusCode = 404
        fs.readFile(path.join(__dirname, 'pages', '404_not_found.html'), function (error, data) {
            loadHtmlPage(error, data)
        })
    }
})


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})