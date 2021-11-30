import {getAllCodeSev} from "../services/serviceManage"
const getallCode = async(req,res)=>{
    try {  
            const data =await getAllCodeSev(req.query) 
            return res.status(200).json({
                data:data
          })
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        data:error
    })
    }
}

module.exports = {
    getallCode:getallCode
}