
import express  from "express";
import homeController from "../controllers/homeController"
import loginController from "../controllers/loginController"
import manageController from "../controllers/manageController"
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"
const path = require('path')
let router = express.Router()


let initWebRoute = (app)=>{

    // router.get("/create", homeController.getHomePage)
    // router.post("/store",homeController.addNewUser)


    // route api login
    router.post("/api/login",loginController.login)
   // route api show all and singer data
   router.get("/api/show/",homeController.showData)
   // route create user 
   router.post("/api/create-user",homeController.createUser)
   //route edit user
   router.put("/api/edit-user",homeController.updateUser)
   //delete user
   router.delete("/api/delete-user",homeController.deleteUser)
   //get allcodes
   router.get("/api/get-allcode",manageController.getallCode)
   //home page
   router.get("/api/best-doctor",doctorController.getDoctor)
   router.get("/api/select-doctor",doctorController.selectDoctor)
   router.post("/api/create-info-doctor",doctorController.createInfoDoctor)
    router.get("/api/detail-doctor", doctorController.detailDoctor)
    router.post("/api/set-schedule", doctorController.setSchedule)
    router.get("/api/time-schedule", doctorController.getTimeSchedule)
    router.get("/api/get-info-doctor", doctorController.getInfoDoctor)
    // detail doctor
    router.get("/api/info-address", doctorController.infoAddress)
    router.get("/api/loadComponent-info", homeController.loadComponentInfo)
    router.post("/api/submit-booking", patientController.submitBooking)
    //confirm verify
    router.get("/api/verify-booking", homeController.verifyBooking)
    //api get all id to province 
    router.get("/api/get-allprovince",homeController.getAllProvince)
    return app.use("/",router)
    
}

module.exports = initWebRoute