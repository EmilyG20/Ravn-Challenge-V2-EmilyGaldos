import conexion from '../connector_db'
import { Response,Request } from 'express'

export const createProduct = async (req:Request,res:Response)=>{
  const {body} = req
  const categoryFound = await conexion.category.findFirst({where:{id:+body.categoryId}})

  if(!categoryFound) {
    return res.json({
      message:"Category doesn't exist"
    })
  }

  const resp = await conexion.product.create({
    data:{
      ...body,
      categoryId: +body.categoryId,
    }
  })

  return res.json({
    message:'Product created successfully',
    'content': resp
  })
}

export const updateProduct = async (req:Request,res:Response)=>{
  const {body} = req
  const {id} = req.params
  const product = await conexion.product.findFirst({
    where: {
      id:+id
    }
  })
  if(!product){
    return res.json({
      message:"Product doesn't exist"
    })
  }
  const resp = await conexion.product.update({
    data:{
      name:body.name,
      price:body.price,
      active:body.active,
      categoryId:body.categoryId
    },where:{
      id:+id
    }
  })

  return res.json({
    content:resp
  })
}

export const deleteProduct = async(req:Request,res:Response)=>{
  const {id}= req.params
  const product = await conexion.product.findFirst({where:{
    id:+id
  }})
  if (!product){
    return res.json({
      message:"Product doesn't exist"
    })
  }
  await conexion.product.delete({where:{id:+id}})
  return res.json({
    message:'Product eliminated'
  })
}

export const toggleProduct = async (req:Request,res:Response) => {
  const {id} = req.params
  const product = await conexion.product.findFirst({
    where: {
      id:+id,
    },
    select:{
      active:true
    }
  })
  if (!product){
    return res.json({
      message:"Product doesn't exist"
    })
  }

  const resp = await conexion.product.update({
    where:{id:+id},
    data:{
    active: !product.active,
  },
    select:{
      active:true,
    }})

  return res.json({
    message:'Product ' + (resp.active ? 'active':'inactive')
  })
}

export const getProducts = async (req:Request,res:Response)=> {
  const products = await conexion.product.findMany()

  return res.json({
    content: products
  })
}
 export const getProductById = async (req:Request,res:Response)=>{
  const {id} = req.params
  const resp = await conexion.product.findFirst({where:{
    id:+id
  }})
  if(!resp){
    return res.json({
      message: "Product doesn't exist"
    })
  } else {
    return res.json({
      content:resp
    })
  }
  
 }