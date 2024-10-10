const ModifierRouter = require('express').Router();
// const AdminRouter = require('express').Router();
//const jwt = require('jsonwebtoken')
//var path = require('path')
const {AddModifier, updateModifier, deleteModifier, getAllModifier,getOneModifier} = require('../controller/ModifierController')




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




// AdminRouter.post('/signup',AddModifier)
ModifierRouter.post('/addmodifier',AddModifier)
ModifierRouter.put('/updatemodifier/:modifierId',updateModifier)
ModifierRouter.delete('/deletemodifier/:modifierId',deleteModifier)
// In your ModifierRoutes.js file
ModifierRouter.get('/getallmodifiers', getAllModifier);
ModifierRouter.get('/test', (req, res) => res.send('Test route is working'));

ModifierRouter.get('/getoneModifier/:modifierId',getOneModifier)




module.exports = ModifierRouter;
// module.exports = AdminRouter;