import db from "../models"
import _, { isEmpty, isSet, reject } from "lodash"
import moment from 'moment';
const getAllDoctorSev = (parma)=>{
   return new Promise(async(resolve,reject)=>{
       try {
            
        let doctor = await db.User.findAll({
            limit:parma,
            where:{roleId:'R2'},
            order:[['createdAt','DESC']],
            attributes:{
                exclude:['password']
            },
            include: [
               { model : db.Allcode,as:'positionData',attributes:['valueEn','valueVi']},
               { model : db.Allcode,as:'genderData',attributes:['valueEn','valueVi']},
            ],
          raw:true,
          nest:true
          

        })       
        resolve({
            code:1,
            data:doctor
        })

       } catch (error) {          
           reject(error.message)
       }
   })
}
const selectDoctorService = ()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let selectDoc = await db.User.findAll({
                where:{roleId:'R2'},
                attributes:{
                    exclude:['password','image','createdAt','updatedAt']
                },
            })
            resolve(selectDoc)
        } catch (error) {
            console.log('error',error.message);
            reject(error)
        }
    })
}
const checkparam = (param)=>{
    const check = !Object.values(param).some(x => (x === null || x === ''))
    return check
}
const createDoctorService = (param)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           let check = checkparam(param)          
            if (!check) return reject('please full fill input')
            
            if (param.action === 'SAVE') {
                //find the id
                let id = await db.Markdown.findOne({
                    where:{doctorId:param.doctorId}
                })               
                if (isEmpty(id)) {
                     // create markdown
                await Promise.all([
                    db.Markdown.create({               
                       contentHtml:param.contentHtml,
                       contentMark:param.contentMark,
                       description:param.description,
                       doctorId:param.doctorId,                
                       }),
                       // create infodoctor
                    db.InfoDoctor.create({
                           doctorId: param.doctorId,
                           priceId: param.priceId,
                           provinceId: param.provinceId,
                           paymentId: param.paymentId,
                           addressClinic: param.addressClinic,
                           nameClinic: param.nameClinic,
                           note: param.note,
                       })
                        ]).then((data) => {
                            if(data){
                                resolve('create success')
                            }
                        }).catch(e => reject(e.message))
                    
                } else {
                    return reject('id has exits')
                }
              
            } else if (param.action === 'EDIT') {
                // find id update
            
               
                    await Promise.all([
                        db.Markdown.update({               
                            contentHtml:param.contentHtml,
                            contentMark:param.contentMark,
                            description:param.description,                                    
                        }, {
                                where:{doctorId:param.doctorId}
                        }),
                        
                            // create infodoctor
                         db.InfoDoctor.update({                               
                                priceId: param.priceId,
                                provinceId: param.provinceId,
                                paymentId: param.paymentId,
                                addressClinic: param.addressClinic,
                                nameClinic: param.nameClinic,
                                note: param.note,
                         }, {
                             where: { doctorId: param.doctorId }
                             
                            })
                    ]).then((data) => {
                        if(data){
                            resolve('update success')
                        }
                    }).catch(e=> reject(e.message))
               
              
            } else {
                reject('error action')
            }
            
        } catch (error) {
            console.log('error',error);
            reject(error.message)
        }
    })
}

const detailDoctorService = (id)=>{

    return new Promise(async(resolve,reject)=>{
        try {
            if(!id) reject('missing id')
            let data = await db.User.findOne({
                where:{id:id},
                attributes:{
                    exclude:['password','createdAt','updatedAt']
                },
                include: [
                    { model : db.Markdown,
                            attributes:{
                            exclude:['specialityId','clinicId']
                        }
                     },
                    { model : db.Allcode,as:'positionData',attributes:['valueEn','valueVi']},
                 ],
               raw:true,
               nest:true

            })
            if(data) resolve(data)
        } catch (error) {
            console.log('error',error);
            reject(error.message)
        }
    })
}



const setScheduleService = (data) => {
    return new Promise(async (resolove, reject) => {
        try {
            const dataCl = data.data
            if (isEmpty(dataCl)) reject('please full fill the obj ')                   
            let getall = await db.Schedule.findAll({
                where: { doctorId: dataCl[0].doctorId , date: dataCl[0].date },
                attributes: ['maxNumber','date','timeType','doctorId'],
                raw:true
            })
            if (!getall && getall.length > 0) {
                reject('get data error....')
            } else {
                getall.map((e) => {
                     // formatTime.setDate(formatTime.getDate() + 1);
                    e.date = new Date(dataCl[0].date).getTime()
                })
                    //compare diff array
                    const result2 = dataCl.filter(function(o1){
                    return !getall.some(function(o2){    //  for diffrent we use NOT (!) befor obj2 here
                    return o1.timeType == o2.timeType;          // id is unnique both array object
                    })
                })
                if(isEmpty(result2)) reject('opotion has choose !!')    
                const res = await db.Schedule.bulkCreate(result2, { validate: true })
                if (!res) reject('create errorr...')              
                resolove('success')
                
            }

       } catch (error) {
           console.log(error);
           reject(error.message)
       }
   })
}
const getTimeScheduleService = ({id,date}) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id || !date) reject('please full fill id & date')
            // convest date
            let  dateNew = new Date(+date)            
            const res = await db.Schedule.findAll({
                where: { doctorId: id, date: dateNew },         
                include: [                  
                    { model : db.Allcode,as:'mapTime',attributes:['valueEn','valueVi']},
                 ],
               raw:true,
               nest:true
                
            })
            if (isEmpty(res)) resolve([])
            console.log(res);
            resolve(res)
        } catch (error) {
            console.log(error);
            reject(error.message)
        }
    })
}
const getInfoDoctorService = (param) => {
    return new Promise(async (resolove, reject) => {
        try {
            if (!param.id) reject('please full fill id')
            let data = db.User.findOne({
                where: { id: param.id },
                attributes: { exclude:['id','email','password','image','address','phoneNumber','geder','roleId','positionId','createdAt','updatedAt']},
                include: [                  
                    { model: db.Markdown, attributes: { exclude: ['specialityId', 'clinicId'] } },
                    { model: db.InfoDoctor, attributes: { exclude: ['count', 'createdAt','updatedAt'] } },
                    
                 ],
               raw:true,
               nest:true
                
            })
           
            resolove(data)
           
       } catch (error) {
           console.log(error)
           reject(error.message)
       }
   }) 
}

const infoDoctorAddressService = (param) => {
    return new Promise(async(resolove, reject) => {
        try {
            if (!param.id) reject('please full fill id')
            let res =  db.InfoDoctor.findOne({
                where: { doctorId: param.id },
                include: [
                    { model : db.Allcode,as:'priceData',attributes:['valueEn','valueVi']},
                    { model : db.Allcode,as:'provinceData',attributes:['valueEn','valueVi']},
                    { model : db.Allcode,as:'paymentData',attributes:['valueEn','valueVi']},
                ],
                raw: true,
                nest:true
            })
            if (!res) return reject()
            resolove(res)
            
            
        } catch (error) {
            console.log(error)
           reject(error.message)
        }
    })
}
module.exports = {
    getAllDoctorSev,
    selectDoctorService,
    createDoctorService,
    detailDoctorService,
    setScheduleService,
    getTimeScheduleService,
    getInfoDoctorService,
    infoDoctorAddressService,
    
}