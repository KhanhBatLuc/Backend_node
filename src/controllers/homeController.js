
const { showDataSv,createUserSv,updateUserSv,deleteUserSv,loadComponentInfoService ,verifyBookingService,getAllProvinceService} = require("../services/serviceUser");


const showData = async(req,res)=>{
   
    const data = await showDataSv(req.query)
    return res.status(200).json({       
        data:data
    })
}

const createUser = async(req,res) =>{
    if(Object.entries(req.body).length ===0){
        return res.status(200).json({       
            mess:'dont required'
        })
    }
        let user = await createUserSv(req.body)
       .then((data)=>{
            return res.status(200).json({       
                mess:data
            })  
        })
        .catch((e)=>{
            return res.status(200).json({       
                mess:e
            })  
        })
}

const updateUser = async(req,res) =>{

        let user = await updateUserSv(req.body)       
       .then((data)=>{
            return res.status(200).json({       
                data
            })  
        })
        .catch((e)=>{
            return res.status(500).json({       
                mess:e
            })  
        })
}
const deleteUser = async(req,res)=>{
    let rs = await deleteUserSv(req.body)
    .then((data) =>{
        return res.status(200).json({       
            data
        })  
    })
}
const loadComponentInfo = async (req, res) => {
    try {
        let data = await loadComponentInfoService(req.query)
        return res.status(200).json({
            code: 1,
            mess:data
        })
    } catch (error) {
        return res.status(200).json({
            code:-1,
            mess:error
        })  
    }
}

const verifyBooking = async (req, res) => {
    try {
        let data = await verifyBookingService(req.query)
        return res.status(200).json({
            code: 1,
            mess:data
        })
    } catch (error) {
        return res.status(200).json({
            code:-1,
            mess:error
        })  
    }
}
const getAllProvince = async (req, res) => {
    try {
        let data = await getAllProvinceService(req.query)
        return res.status(200).json({
            code: 1,
            mess:data
        })
    } catch (error) {
        return res.status(200).json({
            code:-1,
            mess:error
        })  
    }
    
}
module.exports = {
    // getHomePage: getHomePage,
    // addNewUser: addNewUser,
    showData :showData,
    createUser:createUser,
    updateUser:updateUser,
    deleteUser: deleteUser,
    loadComponentInfo,
    verifyBooking,
    getAllProvince
}