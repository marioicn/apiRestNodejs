const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')


class UserService{
    constructor(){
        this.users =[],
        this.generator()
    }

    generator(){
        const limit = 100
        for (let i = 0; i < limit; i++) {
            this.users.push({
                id:faker.datatype.uuid(),
                name:faker.person.fullName(),
                job:faker.person.jobArea()
            })
            
        }
    }

    async create(body){
        const newUser = {
            id:faker.datatype.uuid(),
            ...body
        }
        this.users.push(newUser)
        return newUser

    }

    find(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.users)
            }, 2000);
        })


    }

    async findOne(id){
        const product = this.users.find(item=>item.id===id)
        if (!product) {
            throw boom.notFound('User Not Found')
        }
        return product
        
    }


    async update(id,body){
        const index = this.users.findIndex(item=>item.id ===id)
        if (index === -1) {
            throw  boom.notFound('User Not Found')
        }
        const product = this.users[index]
        this.users[index]={
            id:product.id,
            ...body
        }

        return this.users[index]
        
    }

    async updatePatch(id,body){
        const index = this.users.findIndex(item=>item.id===id)
        if (index === -1) {
            throw  boom.notFound('User Not Found')
        }
        const product = this.users[index]
        const newUser ={
            ...product,
            ...body
        }

        return newUser

        
    }

    async delete(id){
        const index = this.users.findIndex(item=>item.id===id)
        if (index === -1) {
            throw  boom.notFound('User Not Found')
        }
        this.users.splice(index,1)
        return {
            message:true,
            id
        }

        
    }

}

module.exports = UserService