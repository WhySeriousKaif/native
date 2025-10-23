import express from 'express'
import {ENV} from './config/env.js'
import {connectDB} from './config/db.js'
import cors from 'cors'
import {clerkMiddleware} from '@clerk/express'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())





app.get('/',(req,res)=>{
    res.send('API is running....')
})

app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)

app.use((err,req,res)=>{
    console.log("Unhandled error",err)
    res.status(500).json({ error : err.message|| "Internal server error"})
})

connectDB()
app.listen(ENV.PORT,(req,res)=>{
    console.log(`server is running at ${ENV.PORT}`)

})