import db from "../models/index"
import bcrypt from "bcryptjs"


let checkLogin = ({email , password})=>{   
    return new Promise(async(resolve,reject) =>{

   try {
       let userData = {}
       let isExit = await checkUserEmail(email)
    if(isExit){

        const user  = await db.User.findOne({
            where: { email: email },
            raw :true
        })
        if(user){
            let pass = await bcrypt.compareSync(password , user.password)
            if(pass){
                userData.code = 4
                userData.mess = 'success'
                const userCopy = (({password, ...other})=>other)(user)
                userData.data = userCopy
            }else{
                userData.code = 3
                userData.mess = 'password not correct'
            }
        }

    }else{
        userData.code = 2
        userData.mess = 'email not exits'
    }
    resolve(userData)
   } catch (error) {
       reject(error)
   }
})
}

let checkUserEmail = (email) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const user  = await db.User.findOne({
                where: { email: email },
                raw :true
            })
            if(user){
                resolve(true)
            }
            else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}




module.exports = {
    checkLogin,
 
}