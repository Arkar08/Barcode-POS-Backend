import { getCategroyService } from "../services/categoryService.js"

export const getCategoryController = async(req,res)=>{
    try {
        const allData = await getCategroyService()
        return res.status(200).json({
            status:200,
            success:true,
            length:allData.length,
            data:allData
        })
    } catch (error) {
        console.log(error , 'get categroy controller error is')
        return res.status(400).json({
            status:400,
            success:false,
            message:error
        })
    }
}