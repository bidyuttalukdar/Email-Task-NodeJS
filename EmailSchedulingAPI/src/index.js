require('./db/mongodb')
const express=require('express')
const app= express()
const EmailsRoute=require('./Router/emails')
const sendEmail=require('./Router/sendEmail')

const port = process.env.PORT || 3000



app.use(express.json())
app.use(EmailsRoute)
app.use(sendEmail)


app.listen(port, () => {
    console.log("Server is on Port " + port)
})
