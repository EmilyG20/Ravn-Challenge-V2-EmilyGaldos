import { Request,Response } from "express"
import conexion from '../connector_db'

const createCategory = async (req:Request,res:Response)=>{
  const {body} = req
  console.log(body)
  const resp = await conexion.category.create({
    data:{
      name: body.name,
    },
  })
  res.json({
    message:'Category created successfully',
    content:resp
  })
}

const listCategories = async (req:Request,res:Response) => {
  const resp = await conexion.category.findMany()

  res.json({
    content:resp
  })
}

const listCategoryById = async (req:Request,res:Response) => {
  const {id} = req.params
  const resp = await conexion.category.findFirst({where: {id:+id},include:{products:true}})
    if (!resp){
      return res.json({
        message:"Category doesn't exist"
      })
    } else {
        return res.json({
          content:resp
        })
    }
  
}

const updateCategory = async (req:Request,res:Response) => {
  const {id} =req.params
  const {body} = req
  const categoryFound = await conexion.category.findFirst({where:{id:+id}})
  if (!categoryFound){
    return res.json({
      message:"Category doesn't exist"
    })
  }
  const resp = await conexion.category.update({
    data:{
      name:body.name
    },where:{
      id:+id
    }})

    return res.json({
      content:resp
    })
}

const deleteCategory = async (req:Request,res:Response)=>{
  const {id} =req.params
  const categoryFound = await conexion.category.findFirst({where:{id:+id}})
  if (!categoryFound){
    return res.json({
      message:"Category doesn't exist"
    })
  }
  await conexion.category.delete({where:{id:+id}})
  return res.json({
    message:'Category eliminated'
  })
}

export {createCategory, listCategories, listCategoryById, updateCategory, deleteCategory}