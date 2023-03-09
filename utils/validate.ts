import jwt from "jsonwebtoken";
import { Response,Request, NextFunction } from "express";
import conexion from "../connector_db"

export const validateTokenClient = async (req:Request,res:Response,next:NextFunction)=>{
  if (!req.headers.authorization){
    return res.status(401).json({
      message:"You need a valid token"
    })
  }
  const token = req.headers.authorization.split(' ')[1]
  if (!token){
    return res.status(401).json({
      message:"Invalid format for token"
    })
  }
  try {
    const payload = jwt.verify(token,"secret")
    if((<any>payload).role==='client'||(<any>payload).role==='manager'){
      next()
    } else {
      return res.json({
        message: "Invalid token"
      })
    }
  } catch(e){
    return res.status(401).json({
      message:"Error in token",
    })
  }
}
export const validateTokenManager = async (req:Request,res:Response,next:NextFunction)=>{
  if (!req.headers.authorization){
    return res.status(401).json({
      message:"You need a valid token"
    })
  }
  const token = req.headers.authorization.split(' ')[1]
  if (!token){
    return res.status(401).json({
      message:"Invalid format for token"
    })
  }
  try {
    const payload = jwt.verify(token,"secret")
    console.log((<any>payload).role)
    if( (<any>payload).role ==='manager'){
      next()
    } else {
      return res.json({
        message:"You are a client, you don't have authorization for this"
      })
    }
    
  } catch(e){
    return res.status(401).json({
      message:"Error in token",
    })
  }
}