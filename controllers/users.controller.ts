import bcrypt from "bcrypt"
import { Request,Response } from "express"
import conexion from "../connector_db"
import jwt from "jsonwebtoken"

export const registerUser = async (req:Request,res:Response) => {
  const {body} = req
  const passwordHashed = bcrypt.hashSync(body.password,10)
  const resp = await conexion.users.create({
    data:{
      ...body,
      password: passwordHashed,
      
    }
  })
  return res.json({
    message:"User created successfully",
    content: resp
  }).status(201)
}

export const login = async (req:Request,res:Response)=>{
  const {body} = req
  const userFound= await conexion.users.findFirst({
    where:{email:body.email}
  })

  if (!userFound){
    return res.json({
      message:'Invalid user'
    })
  }
  const result = bcrypt.compareSync(
    body.password,
    userFound.password
  )
  if (result){
    const payload = {
      mail:userFound.email,
      role:userFound.role,
      message:"hello"
    }
    const token = jwt.sign(payload,'secret',{expiresIn:"24h"})
    return res.json({
      message:'Welcome',
      content:token
    })
  } else {
    return res.json({
      message:'Invalid password'
    })
  }
  
}