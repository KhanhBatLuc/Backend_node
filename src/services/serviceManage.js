import db from "../models/index"
const getAllCodeSev = ({type})=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let res = {}
            if(!type){
                res.code = 1
                res.mess = 'missing param'              
            }
            else{
                const data = await db.Allcode.findAll({
                    where:{type:type},
                    raw:true
                })
                if(!data){
                    res.code = 2
                    res.mess = {}  
                }else{
                    res.code = 3
                    res.mess = data
                }
            }
            resolve(res)
        } catch (error) {
            reject(error.message)
        }
    })
}

module.exports = {
    getAllCodeSev
}