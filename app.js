var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');
var reload = require('reload');
var mysql = require('mysql2');
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use((req,res,next)=>{    
        console.log(`${req.method} request for ${req.url} `);
        next();
});

app.use(express.static('./public'));
app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/signup'));

app.set('view engine','ejs');
app.set('views','./views');

var conn = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    port: '3306',
    password: '12345',
    database: 'users'
});
conn.connect( (err)=>{
    if(err)
    console.log(err);
    console.log('Successfully connected to mysql server!!');
});
app.set('sqlconn', conn);

var server = app.listen(3000, ()=>
{
    console.log('Listening on port 3000');
});

//reload(app);
/* var server = http.createServer((req, res)=>{
    console.log(`${req.method} request for ${req.url}`);
    if(req.url == '/')
    {
        if(req.method === 'GET')
        {
            fs.readFile('./public/index.html', 'UTF-8',(err,content)=>{
                if(err)
                {
                    console.log(err);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end("Server Error!!");
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(content);            
            });
        }
        else if(req.method === 'POST')
        {
            var body = "";
            req.on("data", function(chunk) {
                    body += chunk;
            });
            
            req.on("end", function() {            
                   res.writeHead(200, {"Content-Type": "text/html"});            
                   res.end(`       
                            <!DOCTYPE html>
                            <html>
                                <head>
                                    <title>Form Results</title>
                                </head>
                                <body>
                                    <h1>Your Form Results</h1>
                                    <p>${body}</p>
                                </body>
                            </html>
                            `);
                    });
        }
    }
    else
    {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("File not found!!");
    }
});

server.listen(3000); */
console.log("Server running...");

 



