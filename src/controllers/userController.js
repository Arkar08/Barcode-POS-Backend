import { getUserService } from "../services/userService.js"

export const getUserController = async(req,res)=>{
    try {
        const AllUser = await getUserService();
        return res.status(200).json({
            status:200,
            success:true,
            length:AllUser.length,
            data:AllUser
        })
    } catch (error) {
        console.log(error , 'getUser error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}