import  express  from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./route/web"
import connectDb from "./config/connectDb";
require('dotenv').config()

const path = require('path')

let app = express()
//config cors

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//config get param url from client ex: https://v1/api/home?name=khanh
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
}))
// config view - route
configViewEngine(app)
initWebRoute(app)
//connect db
connectDb()
//listen port
let port = process.env.PORT || 8081

app.listen(port, ()=>{
    console.log("backend nodejs is runing http://localhost:"+port+"/create")   
})