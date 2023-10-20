const express = require('express')
const routes = express.Router()
const UserService = require('../services/user.service')
const service = new UserService()
const {createUserSchema,updateUserSchema,getUserSchema,putUpdateUserSchema} = require('../shemas/user.schema')
const validatorHandler = require('../middlewares/validarot.handler')

routes.get('/',async (req,res,next)=>{
    
   try {
    const users = await service.find()
    res.json(users)
   } catch (error) {
    next(error)
   }

})
routes.get('/:id',validatorHandler(getUserSchema,'params'),async (req,res,next)=>{
    try {
        const id = req.params.id
        const users = await service.findOne(id)
        res.json(users)
    } catch (error) {
        next(error)
    }
    

})

routes.post('/',validatorHandler(createUserSchema,'body'),async (req,res,next)=>{
   try {
    const body = req.body;
    const user = await service.create(body)
    res.json(user)
   } catch (error) {
    next(error)
   }
})

routes.put('/:id',
validatorHandler(getUserSchema,'params'),
validatorHandler(putUpdateUserSchema,'body'),
 async (req,res,next)=>{
  try {
    const body = req.body;
    const id = req.params.id
    const user = await service.update(id,body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

routes.patch('/:id',
validatorHandler(getUserSchema,'params'),
validatorHandler(updateUserSchema,'body'),
async (req,res,next)=>{
    try {
        const body = req.body
        const id = req.params.id;
        const user = await service.updatePatch(id,body)
        res.json(user)
    } catch (error) {
        next(error)
    }
})

routes.delete('/:id',validatorHandler(getUserSchema,'params'),async (req,res,next)=>{
    try {
        const id = req.params.id
        const user =await service.delete(id)
        res.json(user)
    } catch (error) {
        next(error)
    }
})


module.exports = routes