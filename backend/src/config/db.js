import mongoose from 'mongoose'
import {ENV} from './env.js'

export const connectDB=async()=>{
    try{
        await mongoose.connect(ENV.MONGODB_URI)
        console.log('Database connected successfully✅')

    }
    catch(err){
        console.error('error in connecting database',err)
        process.exit(1)

    }
}