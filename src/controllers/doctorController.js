import {
    getAllDoctorSev,
    selectDoctorService,
    createDoctorService,
    detailDoctorService,
    setScheduleService,
    getTimeScheduleService,
    getInfoDoctorService,
    infoDoctorAddressService
} from "../services/serviceDoctor"
const getDoctor = async(req,res) =>{
    let limit = req.query.limit
    if(!limit) limit = 10
   
    try {
        let resDoctor = await getAllDoctorSev(+limit)
        res.status(200).json({
           
            data:resDoctor
        })
    } catch (error) {
        res.status(200).json({
            code:-1,
            mess:'error server....'
        })
    }
}

const selectDoctor = async(req,res)=>{
    try {
        const data = await selectDoctorService()
        return res.status(200).json({
            code:1,
            mess:data
        })
    } catch (error) {
        return res.status(200).json({
            code:-1,
            mess:'errorr serve ...'
        })
    }
}
const createInfoDoctor = async(req,res)=>{
    try {
       let data = await createDoctorService(req.body)
       return res.status(200).json({
        code:1,
        mess:data
    })
    } catch (error) {       
        return res.status(200).json({
            code:-1,
            mess:error
        })
    }
}
const detailDoctor = async(req,res)=>{
    try {
        let data = await detailDoctorService(req.query.id)
        return res.status(200).json({
            code:1,
            mess:data
        })
    } catch (error) {
        return res.status(200).json({
            code:-1,
            mess:error
        })
    }
}
 const setSchedule = async(req,res) => {
    try {
        let data = await setScheduleService(req.body)
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

const getTimeSchedule = async(req, res) => {
    try {
        let data = await getTimeScheduleService(req.query)
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

const getInfoDoctor = async(req,res) => {
    try {
        let data = await getInfoDoctorService(req.query)
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

const infoAddress = async (req, res) => {
    try {
        let data = await infoDoctorAddressService(req.query)
        return res.status(200).json({
            code: 1,
            mess:data
        })
    } catch (error) {
        
    }
}
module.exports = {
    getDoctor,
    selectDoctor,
    createInfoDoctor,
    detailDoctor,
    setSchedule,
    getTimeSchedule,
    getInfoDoctor,
    infoAddress
}