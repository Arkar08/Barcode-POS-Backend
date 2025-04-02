import { getProductService } from "../services/productService.js"

export const getProductController = async(req,res)=>{
     try {
            const allData = await getProductService()
            return res.status(200).json({
                status:200,
                success:true,
                length:allData.length,
                data:allData
            })
        } catch (error) {
            console.log(error , 'get product controller error is')
            return res.status(500).json({
                status:500,
                success:false,
                message:error
            })
        }
}