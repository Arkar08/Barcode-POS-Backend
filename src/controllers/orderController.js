import { getOrderService } from "../services/orderService.js"

export const getOrderController = async(req,res)=>{
     try {
            const allData = await getOrderService()
            return res.status(200).json({
                status:200,
                success:true,
                length:allData.length,
                data:allData
            })
        } catch (error) {
            console.log(error , 'get order controller error is')
            return res.status(500).json({
                status:500,
                success:false,
                message:error
            })
        }
}