import {checkLogin } from "../services/serviceAuth"

let login = async(req,res) =>{
    if(!req.body.email || !req.body.password){
        return res.status(500).json({
           user:{
            code: 1,
            mess:'missing data input'
           }
        })
    }
    let user = await checkLogin(req.body)
    return res.status(200).json({
        user
})

}
 module.exports = {
     login : login,
   
 }