import express from "express";
import { Response, Request } from "express";
import { categoryRouter } from "./routes/categories.routes";
import {productRouter} from './routes/products.routes'
import { userRouter } from "./routes/users.routes";

const servidor = express()
servidor.use(express.json())

const PORT = 3000

servidor.get('/',(req:Request,res:Response)=> {
  res.json({
    message:'Welcome to PetStore'
  })
})
servidor.use(productRouter)
servidor.use(userRouter)
servidor.use(categoryRouter)


servidor.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})