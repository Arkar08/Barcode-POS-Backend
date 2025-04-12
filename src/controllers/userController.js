import { findUserService, getIdUserService, getUserService, postUserService,patchUserService, deleteUserService } from "../services/userService.js"
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";

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

export const postUserController = async(req,res)=>{
    const{fullName,email,password,role,state,township,address,description,companyName,phNumber} = req.body;
    if(!fullName || !email || !password || !role || !state || !township || !address) {
        return res.status(404).json({
            status:404,
            success:false,
            message:"Plz filled out in the form field."
        })
    }
    try {

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const data = {
                fullName:fullName,
                email:email,
                password:hashPassword,
                role:role,
                state:state,
                township:township,
                address:address,
                companyName:companyName,
                description:description,
                phNumber:phNumber
            }
            const dataPass = await findUserService(data)
            if(dataPass.length === 1){
                return res.status(400).json({
                    status:400,
                    success:false,
                    message:"Email is already exist."
                })
            }
            if(dataPass.length < 1){
                 const dataLink = await postUserService(data)
                if(dataLink.length === 2){
                    const createData = await findUserService(data)
                    const token = await generateToken(res,createData[0].userId)
                    return res.status(201).json({
                        status:201,
                        success:true,
                        message:"Create User Successfully.",
                        data:createData
                    })
                }
           }
        } catch (error) {
            console.log(error , 'post user controller error is')
            return res.status(500).json({
                status:500,
                success:false,
                message:error
            })
        }
}

export const getIdUserController = async(req,res)=>{
    const params = req.params.id;
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"user Id is not defined."
        })
    }
    try {
            const data = await getIdUserService(params)
            if(data){
                return res.status(200).json({
                    status:200,
                    success:true,
                    data:data
                })
            }else{
                return res.status(404).json({
                    status:404,
                    success:false,
                    message:"User Not Found."
                })
            }
        } catch (error) {
            console.log(error , 'get userId controller error is')
            return res.status(500).json({
                status:500,
                success:false,
                message:error
            })
        }
}

export const patchUserController = async(req,res)=>{
    const params = req.params.id;
    const{fullName,email,password,roleId,companyName,state,township,address,description} = req.body;
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"user Id is not defined."
        })
    }
    try {
        const user = {
            id:params,
            fullName:fullName,
            email:email,
            password:password,
            role:roleId,
            companyName:companyName,
            state:state,
            township:township,
            address:address,
            description:description
        }
        const data = await patchUserService(user)
        if(data.length === 2){
            const updateData = await getIdUserService(params)
            return res.status(200).json({
                status:200,
                success:true,
                message:"Update User Successfully.",
                data:updateData
            })
        }
    } catch (error) {
        console.log(error , 'patch userId controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export const deleteUserController = async(req,res)=>{
    const params = req.params.id;
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"category Id is not defined."
        })
    }
    try {
        const data = await deleteUserService(params)
        if(data.length === 2){
            return res.status(200).json({
                status:200,
                success:true,
                message:"Delete user Successfully.",
            })
        }
    } catch (error) {
        console.log(error , 'delete userId controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}