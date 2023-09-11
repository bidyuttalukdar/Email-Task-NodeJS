const express = require("express")
const router = new express.Router()
const Email=require('../model/emails')

//create Emails
router.post('/create/email', (req, res) => {
    const email = new Email(req.body)
    email.save().then(() => {
        res.status(201).send(email)
    }).catch((e) => {
        console.log(e)
    })
})

//to see all emails
router.get('/all/emails', async (req, res) => {
    Email.find({}).then((email) => {
        res.status(201).send(email)
    }).catch((e) => {
        console.log(e)
        res.status(501).send(e)
    })
})

//to see mails which are failed or unsend till yet
router.get('/all/failed/emails/', async (req, res) => {
    Email.find({isSend:false}).then((email) => {
        res.status(201).send(email)
    }).catch((e) => {
        console.log(e)
        res.status(501).send(e)
    })
})

//to delete a mail or schedule
router.delete('/delete/email/', async (req, res) => {
    try {
        const email = await Email.findOneAndDelete({ to : req.body.to})

        if (!email) {
            res.status(404).send()
        }

        res.send(email)
    } catch (e) {
        res.status(500).send()
    }
})

//update the schedule email
router.patch('/update/schedule/email/:id', async (req, res) => {
    const requestedUpdates = Object.keys(req.body)
    const allowedUpdatesAttributes = ['to','from','subject','body','isSend','sendTimeStamp']
    const isValid = requestedUpdates.every((update) => {
        return allowedUpdatesAttributes.includes(update)
    })
    if (!isValid) {
        return res.send("Invalid Update request")
    }
    try {
        const email = await Email.findOne({ _id: req.params.id })
        if (!email) {
            return res.status(404).send('Unable to find the Schedule Email')
        }

        requestedUpdates.forEach((update) => email[update] = req.body[update])
        await email.save()
        res.send(email)
    } catch (e) {
        console.log(e)
        res.status(404).send(e)
    }
})

module.exports = router
