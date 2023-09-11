const nodemailer=require('nodemailer')
const express = require("express")
const router = new express.Router()
const Email=require('../model/emails')
const cron=require('node-cron')

router.get('/send/mail/:id',async(req,res)=>{
    try{

        const email = await Email.findOne({ _id: req.params.id })
        if (!email) {
            return res.status(404).send('Unable to find the Schedule Email')
        }
        const mailOptions={
            from:email[from],
            to:email[to],
            subject:email[subject],
            text:email[body]
        }

        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:'bidyut3004@gmail.com',
                pass:"1111111111111"
            }
        })

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error)
            }else{
                console.log("Email send: "+ info.response)
            }
        })

    }catch(e){
        console.log(e)
    }
})

router.get('/send/mail/all',async(req,res)=>{
    Email.find({isSend:false}).then((email) => {
        cron.schedule('* * * '+email.sendTimeStamp.getDay()+' *', () => {
            const mailOptions={
                from:email[from],
                to:email[to],
                subject:email[subject],
                text:email[body]
            }
    
            const transporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:'bidyut3004@gmail.com',//put your gmail
                    pass:"1111111111111"//password //incase showing auth error please go to google account setting and give less secure app authontication
                }
            })
    
            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log(error)
                }else{
                    console.log("Email send: "+ info.response)
                }
            })
            
        });
        
    }).catch((e) => {
        console.log(e)
        res.status(501).send(e)
    })
    
    
})

module.exports = router
