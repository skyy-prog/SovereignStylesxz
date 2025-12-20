import jwt from 'jsonwebtoken'

const Auth = (req,res,next)=>{
    const {token} = req.headers;
    if(!token){
      return  res.json({success:false  , message : 'You r not authorized Login again'})
    }
    try {
        const token_decode = jwt.verify(token , process.env.JWT_SECRET)
        req.body.userId = token_decode.id;
        console.log("AUTH:", req.body);

        next();
console.log("AUTH:", req.body);

    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}
export default Auth;