const express = require('express')
const router = express.Router()
const ProductService = require('../services/product.service')
const validatorHandler = require('../middlewares/validarot.handler')
const {createProductSchema,updateProductSchema,getProductSchema} = require('../shemas/product.schema')
const service = new ProductService()


router.get('/',async (req,res,next)=>{
    try {
        const products = await service.find()
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
    
})

router.get('/:id',validatorHandler(getProductSchema,'params'),async (req,res,next)=>{
   try {
    const {id}= req.params
    const product = await service.findOne(id)
    res.json(product)
   } catch (error) {
    next(error)
   }
   
})

router.post('/',validatorHandler(createProductSchema,'body'),async (req,res,next)=>{
    try {
        const body = req.body;
        const product = await service.create(body)
        res.status(201).json({
        message:'created',
        product
        })
    } catch (error) {
        next(error)
    }
})

router.put('/:id',async (req,res,next)=>{
    try {
        const body = req.body;
        const id = req.params.id
        const product = await service.update(id,body)
        res.status(200).json({
        product
        })
    } catch (error) {
        next(error)
    }
})

router.patch('/:id',
    validatorHandler(getProductSchema,'params'),
    validatorHandler(updateProductSchema,'body'),
    async (req,res,next)=>{
    try {
    const body = req.body;
    const id = req.params.id;
    const product = await service.updatePatch(id,body)

    res.json({
        message:`Product ${id} update`,
        product
    })
    } catch (error) {
      next(error)
    }
})

router.delete('/:id', async (req,res,next)=>{
    try {
        const id = req.params.id
        const product = await service.delete(id)
        res.json({product})
    } catch (error) {
        next(error)
    }
})



module.exports = router