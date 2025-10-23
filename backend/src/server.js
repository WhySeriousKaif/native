import express from 'express'
import {ENV} from './config/env.js'
import {connectDB} from './config/db.js'
import cors from 'cors'
import {clerkMiddleware} from '@clerk/express'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'
import notificationRouter from './routes/notification.route.js'

const app=express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())






app.get('/',(req,res)=>{
    res.send('API is running....')
})

app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)
app.use('/api/comments',commentRouter)
app.use('/api/notifications',notificationRouter)

app.use((err,req,res,next)=>{
    console.log("Unhandled error",err)
    res.status(500).json({ error : err.message|| "Internal server error"})
})

connectDB()
app.listen(ENV.PORT,(req,res)=>{
    console.log(`server is running at ${ENV.PORT}`)

})