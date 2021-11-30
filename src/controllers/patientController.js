import {serviceSubmit} from "../services/servicePatient"
const submitBooking = async(req, res) => {
    try {
         let data = await serviceSubmit(req.body.data)
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
module.exports = {
    submitBooking
}