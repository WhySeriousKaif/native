import express from 'express'
import {getPosts,getPost,getUserPosts,likePost, deletePost} from '../controllers/post.controller.js'
import { protectRoute } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'


const postRouter=express.Router()


postRouter.get('/',getPosts)
postRouter.get('/:postId',getPost)
postRouter.get('/user/:username',getUserPosts)

// protected routes


postRouter.post('/',protectRoute,upload.single('image'),createPost);
postRouter.post('/:postId/like',protectRoute,likePost);
postRouter.delete('/:postId',protectRoute,deletePost);




export default postRouter
