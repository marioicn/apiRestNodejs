const express = require('express')
const cors= require('cors')
const app = express()
const port = 3000

app.use(express.json())
const routerApi = require('./routes/index')
const {logErrors, errorHandler,boomErrorHandler } = require('./middlewares/error.handler')

const wilelist =['http://localhost:3000','http://localhost:8080' ,'http://myapp.co']
const options = {
    origin:(origin,callbacks)=>{
        if (wilelist.includes(origin)) {
            callbacks(null,true)
        }
        callbacks(new Error ('no permitido'))
    }
}
//incluir options si quiere que solo reciba peticiones de esas rutas
app.use(cors())

routerApi(app)


app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Puerto ${port}`);
})

