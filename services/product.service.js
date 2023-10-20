const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')
class ProductService{

    constructor(){
        this.products=[]
        this.generate();
    }

    generate() {

        const limit = 100
        for (let i = 0; i < 100; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.url(),
                isBlock:faker.datatype.boolean()
            })
        }
    }

    async create(body){
        const newProduct ={
            id:faker.datatype.uuid(),
            ...body
        }
        this.products.push(newProduct)
        return newProduct
    }

    find(){
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products)


            }, 2000);
        })


    }

    async findOne(id){
        const product = this.products.find(item=>item.id==id)

        if (!product) {
            throw boom.notFound('Product Not Found')
        }

        if (product.isBlock) {
            throw boom.conflict('Product is block')
        }

        return product
    }

    async update(id,body){
        const index = this.products.findIndex(item=>item.id==id)
        if (index === -1) {
            throw new boom.notFound('Product Not Found')
        }
        const product = this.products[index]
        this.products[index] = {
            id:product.id,
            ...body
        }
        return this.products[index]
    }

    async updatePatch(id,body){
        const index = this.products.findIndex(item=> item.id ==id)
        if (index === -1) {
            throw boom.notFound('Product Not Found')
        }
        const product =this.products[index]
        this.products[index]={
            ...product,
            ...body
        }
        return this.products[index]
    }

    async delete(id){
        const index = this.products.findIndex(item=> item.id ==id)
        if (index === -1) {
            throw boom.notFound('Product Not Found')
        }

        this.products.splice(index,1)
        return{
            message:true,
            id
        }
    }
}

module.exports = ProductService
