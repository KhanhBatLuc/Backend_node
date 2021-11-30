import db from "../models";
import { sendMail } from "./serviceSendMail"
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config()
const validation = (param)=>{
    const check = !Object.values(param).some(x => (x === null || x === ''))
    return check
}

const genToken = (token,id) => {
    let url = process.env.URL_CLIENT+`/api/verify-booking?token=${token}&id=${id}`    
    return url
}

const serviceSubmit = (param) => {
    return new Promise(async(resolve,reject)=>{
        try {
            let check = validation(param)
            if (!check) return reject('flease full fill the data')
            if (!param.email) return reject('flease full fill the email')
            let token = uuidv4()
            let link = genToken(token, param.doctorId)           
                 // send mail              
                let use = await db.User.findOrCreate({
                    where: { email: param.email },
                    defaults: {
                        email: param.email,
                        lastName: param.name,
                        phoneNumber: param.phone,
                        address: param.address,
                        roleid: 'R3',
                        gender:param.gender
                    },
                    raw:true
                })           
                if (use) {
                let book = await db.Booking.findOrCreate({
                        where:{  date: param.date,
                            timeType: param.timeType, },
                        defaults: {
                            statusId: 'S1',
                            doctorId: param.doctorId,      
                            patientId: use && use[0].id,
                            date: param.date,
                            timeType: param.timeType,
                            who:param.who,
                            reason: param.reason,
                            token:token
                        },raw:true                  
                    })
                    if (!book) return reject('Booking error')                    
                    let ifo = await sendMail({
                        name: param.name,
                        date: param.date,
                        email: param.email,
                        time: param.mapTime,
                        link:link
                    })
                    if (ifo.code === 1) {
                        resolve('success to create')
                    }  else {
                        reject(ifo.mess)
                    }
                }
          
             
          

        } catch (error) {
            console.log(error);
            reject(error.message)
        }
    })
}
module.exports = {
    serviceSubmit
}