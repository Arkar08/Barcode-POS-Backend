import { getInvoiceService } from "../services/invoiceService.js"

export const getInvoiceController = async(req,res)=>{
    try {
           const allData = await getInvoiceService()
           return res.status(200).json({
               status:200,
               success:true,
               length:allData.length,
               data:allData
           })
       } catch (error) {
           console.log(error , 'get invoice controller error is')
           return res.status(400).json({
               status:400,
               success:false,
               message:error
           })
       }
}