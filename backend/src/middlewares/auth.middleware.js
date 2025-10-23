

export const protectRoute=async(req,res)=>{
    if(!req.auth().isAuthenticated){
        res.status(401).json({message:"Unauthorized"})
    }
    next();

}