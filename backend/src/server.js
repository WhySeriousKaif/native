import express from 'express'
import {ENV} from './config/env.js'
import {connectDB} from './config/db.js'

const app=express()

app.get('/',(req,res)=>{
    res.send('API is running....')
})

connectDB()
app.listen(ENV.PORT,(req,res)=>{
    console.log(`server is running at ${ENV.PORT}`)

})