"use strict";
import nodemailer from "nodemailer";
import moment from 'moment';
require('dotenv').config()
// async..await is not allowed in global scope, must use a wrapper
 const sendMail = async (param)=> {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER_MAIL, // generated ethereal user
      pass: process.env.PASS_MAIL, // generated ethereal password
    },
  });

     let date = moment(param.date).add(0, 'days').locale('en').format('dddd DD/MM')
     let res = {}
  // send mail with defined transport object
  try {
    await transporter.sendMail({
        from: '"KhanhBatLuc👻" <khanhbatluc@ongtrumquanbinh.com>', // sender address
        to: param.email, // list of receivers
        subject: "MAIL VERIFY BOOKINGCARE ✔", // Subject line    
          html: `<h1>Dear,${param.name} This is Mail confirm schedule to BookingCare ...</h1>
                <h3>You have got  booking schedule on ${date} at ${param.time} </h3>
                <p>If have you booked these , Can you <a href=${param.link}>Click here</a>  </p>
                <p>Thank's !<p/>
                <b>CoppyRight&&KHANHBATLUC<b>
            
          `,
    });
      res = {
          code: 1          
      }
  } catch (error) {
      res = {
          code: -1,
          mess:'mail fake dm :))'
      }
  }
     
     return res
   
}

module.exports = { sendMail }
