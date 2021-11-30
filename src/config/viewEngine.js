import  express  from "express";
const path = require('path')
let configViewEngine = (app)=>{
    app.use(express.static('./src/public'))
    app.set('views', './src/views')
    app.set('view engine', 'ejs')
}

module.exports = configViewEngine