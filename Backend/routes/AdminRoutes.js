const adminRouter = require('express').Router();
//const jwt = require('jsonwebtoken')
//var path = require('path')
const {login,signup,updateAdmin,deleteAdmin,getAllAdmin,getOneAdmin} = require('../controller/AdminController')


/*const verifyToken = (req,res,next)=>{
    // const {token} = req.headers
    const token = req.headers['token']
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                res.status(400).send({message:'Invalid token',error:err})
            }else{
                req.decoded = decoded
                next()
            }
        })
    }else{
        res.status(400).send({message:'Invalid token'})
    }
}

const verifyUser = (req,res,next)=>{
    console.log("Execute the Verifyuser function");
    if(req.decoded.role=="user"){
        next()
    }else{
        res.status(400).send({message:'Unauthorized'})
    }
}

const verifyAdmin = (req,res,next)=>{
    if(req.decoded.role=='admin'){
        next()
    }else{
        res.status(400).send({message:'Unauthorized'})
    }
}*/




adminRouter.post('/signup',signup)
adminRouter.post('/login',login)
adminRouter.post('/update/:id',updateAdmin)
adminRouter.post('/delete/:id',deleteAdmin)
adminRouter.get('/getAdmins',getAllAdmin)
adminRouter.get('/oneAdmin/:id',getOneAdmin)



module.exports = adminRouter;