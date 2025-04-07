import { findCustomerService, findProductService, findStockService, findSupplierService } from "../services/findService.js"

export const findSupplierController = async(req,res)=>{
    try {
        const allData = await findSupplierService()
            return res.status(200).json({
                status:200,
                success:true,
                length:allData.length,
                data:allData
        })
    } catch (error) {
        console.log(error , 'find supplier controller error is')
           return res.status(500).json({
               status:500,
               success:false,
               message:error.message
           })
    }
}

export const findCustomerController = async(req,res)=>{
    try {
        const allData = await findCustomerService()
            return res.status(200).json({
                status:200,
                success:true,
                length:allData.length,
                data:allData
        })
    } catch (error) {
        console.log(error , 'find customer controller error is')
           return res.status(500).json({
               status:500,
               success:false,
               message:error.message
           })
    }
}

export const findProductController = async(req,res)=>{
    try {
        const allData = await findProductService()
            return res.status(200).json({
                status:200,
                success:true,
                length:allData.length,
                data:allData
        })
    } catch (error) {
        console.log(error , 'find product controller error is')
           return res.status(500).json({
               status:500,
               success:false,
               message:error.message
           })
    }
}


  // query params
export const findStockController = async(req,res)=>{
    const {productName} = req.body;
    try {
        const allData = await findStockService(productName)
            return res.status(200).json({
                status:200,
                success:true,
                length:allData.length,
                data:allData
        })
    } catch (error) {
        console.log(error , 'find product controller error is')
           return res.status(500).json({
               status:500,
               success:false,
               message:error.message
           })
    }
}