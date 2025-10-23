import express from 'express'
import {ENV} from './config/env.js'
import {connectDB} from './config/db.js'
import cors from 'cors'
import {clerkMiddleware} from '@clerk/express'
import userRouter from './routes/user.route.js'

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())





app.get('/',(req,res)=>{
    res.send('API is running....')
})

app.use('/api/users',userRouter)

connectDB()
app.listen(ENV.PORT,(req,res)=>{
    console.log(`server is running at ${ENV.PORT}`)

})