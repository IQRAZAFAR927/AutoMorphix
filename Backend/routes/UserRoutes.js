const userRouter = require('express').Router();
//const jwt = require('jsonwebtoken')
//var path = require('path')
const {AddUser,updateUser,deleteUser,getAllUser,getOneUsers} = require('../controller/UserController')


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




userRouter.post('/adduser',AddUser)
userRouter.put('/updateuser/:userId',updateUser)
userRouter.post('/deleteuser/:userId',deleteUser)
userRouter.get('/getusers',getAllUser)
userRouter.get('/getoneUser/:userId',getOneUsers)




module.exports = userRouter;