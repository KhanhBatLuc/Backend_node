import bcrypt from 'bcryptjs'
import { reject } from 'lodash'
const db = require("../models/index")

const salt = bcrypt.genSaltSync(10)

const showDataSv = async({id}) =>{
  let respon = {}
  if(id == 'all'){        
          let  alldata = await db.User.findAll()
          respon.mess = 0
          respon.alldata = alldata
          return respon
        } 
  try {  
   let  checkId = await db.User.findOne({
      where:{id:id}
    }) 
    if(checkId)
    {
      respon.mess = 1
      respon.alldata = checkId      
    }    
    return respon
  } catch (error) {
     return error.message
  }          
}

const createUserSv = async(param) =>{

  try {
   const check = !Object.values(param).some(x => (x === null || x === ''))
    if(!check){
      return Promise.resolve({
        code:1,
        mess:'please fill full the inf'
      })
    }
    //check == true
     let pass = await hashPassWord(param.password)
     let checkMail = await checkEmail(param.email)
     if(!checkMail){
      const user = await db.User.create({
        email: param.email,
        password: pass,
        firstName: param.fname,
        lastName: param.lname,
        address: param.address,
        phoneNumber: param.phonenumber,
        image:param.image,
        gender: param.sex,
        roleId: param.role,
        positionId:param.position
    })  
    if(!user){
      return Promise.reject('create error')
    }
    return Promise.resolve({
      code:3,
      mess:'success'
    })
     }     
     return Promise.reject({
      code:2,
      mess:'email alreadly exits'
    })
  
     
  } catch (error) {
    return error.message
  }
 
}
//edit user service
const updateUserSv = (param)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      if(!param.id){
        resolve({
          code:3,
          mess:'missing id'
        })
      }
      let user = await db.User.findOne({
        where:{id:param.id}
      })
      if(user){       
           user.firstName = param.fname,
          user.lastName = param.lname,
          user.address = param.address,
          user.phoneNumber = param.phonenumber,
          user.image = param.image,
          user.gender =  param.sex,
          user.roleId =  param.role,
          user.positionId = param.position
        await user.save()
        resolve({
          code:1,
          mess:'update success'
        })
      }
        resolve({
          code:2,
          mess:'dont find success'
        })
      
        
     } catch (error) {
       return error.message
     }
   })
}
//delete User
const deleteUserSv = ({id})=>{
  return new Promise(async(resolve,reject)=>{
    try {
      
      if(!id){
        resolve({
          code:1,
          mess:'missing id'
        })
      }
      let idDelete = await db.User.findOne({
        where:{id:id}
      })

      if(!idDelete){
        resolve({
          code:2,
          mess:'not found id'
        })
      }

      await idDelete.destroy()
      resolve({
        code:3,
        mess:'delete success'
      })

    } catch (error) {
      reject(error.message)
    }
  })
}
//hash password
let hashPassWord = (password) =>{
 return new Promise(async(resolve, reject) =>{
   try{
     let pass = await bcrypt.hashSync(password, salt)
       resolve(pass)

   }catch(e)
   {
     reject(e)
   }
 })
}
//check email
let checkEmail = async(email) =>{
  let cEmail= await db.User.findOne({
    where:{email:email}
  })
  if(cEmail){
    return true
  }else{
    return false
  }
}
const loadComponentInfoService = (param) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!param.id) return reject('missing param id')
      let res = await db.User.findOne({
        where: { id: param.id },
        attributes: {
          exclude: ['password','createdAt', 'updatedAt','email','gender','roleId','positionId']
        }, include: [
          {
            model: db.InfoDoctor, attributes: { exclude: ['createdAt', 'updatedAt','id','provinceId','priceId','paymentId'] },
            include: [
              { model: db.Allcode, as: 'priceData', attributes: { attributes: ['valueEn', 'valueVi'] } },
              {model: db.Allcode, as: 'paymentData', attributes: { attributes: ['valueEn', 'valueVi'] }},
            ]
          },
          { model : db.Allcode,as:'positionData',attributes:['valueEn','valueVi']},
         

         ],
       raw:true,
        nest: true
      })

      resolve(res)
      
    } catch (error) {
      console.log(error)
      reject(error.message)
    }
  })
}

const verifyBookingService = (param) => {
  return new Promise(async(resolove, reject) => {
    try {
      if (!param.id || !param.token) return reject('missing param id')
      let rs = await db.Booking.update({               
         statusId: 'S2'                              
      }, {
              where:{token:param.token,doctorId:param.id}
      })
      if (rs == false) return reject('cant found !!')
      resolove('success')
    } catch (error) {
        console.log(error)
       reject(error.message)
  }
  
})
}

const getAllProvinceService = (param) => {
  return new Promise(async (resolve, reject) => {
    try {
      let arr = []
      if (!param.param) {
        let data = await db.InfoDoctor.findAll({
          attributes:{exclude:['id','priceId','paymentId','addressClinic','nameClinic','note','count','createdAt','updatedAt']}
        })
        arr = data
      } else {
        let data = await db.InfoDoctor.findAll({
          where: { provinceId: param.param },
          attributes: { exclude:['id','priceId','paymentId','addressClinic','nameClinic','note','count','createdAt','updatedAt'] }
        })
        arr =data
      }    
      if (!arr) reject('error')
      resolve(arr)
    } catch (error) {
      console.log(error)
      reject(error.message)      
    }
  })
  
}
module.exports = {
    // createUser: createUser,
    showDataSv : showDataSv,
    createUserSv:createUserSv,
    updateUserSv: updateUserSv,
  deleteUserSv: deleteUserSv,
  loadComponentInfoService,
  verifyBookingService,
  getAllProvinceService
}