import { findInvoiceService, findorderInvoiceService, getIdInvoiceService, getInvoiceService, postInvoiceService } from "../services/invoiceService.js"

export const getInvoiceController = async(req,res)=>{
    try {
           const allData = await getInvoiceService()
           return res.status(200).json({
               status:200,
               success:true,
               length:allData.length,
               data:allData.reverse()
           })
       } catch (error) {
           console.log(error , 'get invoice controller error is')
           return res.status(500).json({
               status:500,
               success:false,
               message:error.message
           })
       }
}

export const postInvoiceController = async(req,res)=>{
    const {orderId} = req.body;
    if(!orderId){
        return res.status(404).json({
            success:false,
            status:404,
            message:"Plz filled out in the form field"
        })
    }

    try {
        const lastInvoice = await getInvoiceService()
        const Invoice = Number(lastInvoice[lastInvoice.length - 1].invoiceNo.slice(10))? Number(lastInvoice[lastInvoice.length - 1].invoiceNo.slice(10)) + 1 :1
        const voucherId = (number) => {
            let string = '';
            let modifyNumber = 6 - number
            for(let i = 0; i< modifyNumber ; i++){
                string = string + '0'
            }
            return string;
        }
        const invoiceNo = `InvoiceNo-${voucherId(Invoice.toString().length)+Invoice.toString()}` ;
    
        const invoice = {
            invoiceNo:invoiceNo,
            orderId:orderId
        }

        const findOrder = await findorderInvoiceService(orderId)
        if(findOrder.length === 0){
             const data = await postInvoiceService(invoice)
            if(data.length === 2){
                const createData = await findInvoiceService(invoice)
                    return res.status(201).json({
                    status:201,
                    success:true,
                    message:"Create Invoice Successfully.",
                    data:createData
                })
            }
        }
        if(findOrder.length > 0){
            return res.status(400).json({
                status:400,
                success:false,
                message:"Invoice already exists.",
            })
        }

       
    } catch (error) {
        console.log(error , 'post invoice controller error is')
           return res.status(500).json({
               status:500,
               success:false,
               message:error.message
           })
    }
}

export const getIdInvoiceController = async(req,res)=>{
    const params = req.params.id;
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"invoice Id is not defined."
        })
    }
    try {
        const data = await getIdInvoiceService(params)
        if(data.length === 1){
            return res.status(200).json({
                status:200,
                success:true,
                data:data
            })
        }else{
            return res.status(404).json({
                status:404,
                success:false,
                message:"Invoice Not Found."
            })
        }
    } catch (error) {
        console.log(error , 'get invoiceId controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}