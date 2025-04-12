import { signupService } from "../services/authService.js";
import { findUserService } from "../services/userService.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcrypt'

export const signupController = async(req,res)=>{

    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const {fullName,email,password,roleId} = req.body;
    if(!fullName){
        return res.status(400).json({
            success:false,
            status:400,
            message:"FullName is not blank."
        })
    }
    var valid = emailRegex.test(email);
    if(!valid){
        return res.status(400).json({
            success:false,
            status:400,
            message:"Email is not defined."
        })
    }

    if(password.length < 6){
        return res.status(400).json({
            success:false,
            status:400,
            message:"Password should be greater than 6."
        })
    }

    if(!roleId){
        return res.status(400).json({
            success:false,
            status:400,
            message:"Role is not defined."
        })
    }
    
    //password generator

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const data = {
            fullName:fullName,
            email:email,
            roleId:roleId,
            password:hashPassword
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
                    const dataLink = await signupService(data)
                    if(dataLink.length === 2){
                        const findUserId = await findUserService(data)
                        const token = await generateToken(res,findUserId[0].userId)
                        return res.status(200).json({
                            status:200,
                            success:true,
                            email: findUserId[0].email,
                            role: findUserId[0].roleName,
                            id:findUserId[0].userId,
                            token
                          });
                    }
            }
    } catch (error) {
        console.log(error , 'signup controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export const loginController = async(req,res)=>{
    const { email, password } = req.body;
    try {
        const data = {
            email:email,
            password:password
        }
        const validatorEmail = await findUserService(data)
        if(validatorEmail.length  === 0){
            return res.status(400).json({
                success:false,
                status:400,
                message:"Email does not exist."
            })
        }
        if(validatorEmail.length === 1){
            const validatorPassword = await bcrypt.compare(password,validatorEmail[0].password)
            if(validatorPassword){
                const token = await generateToken(res,validatorEmail[0].userId)
                return res.status(200).json({
                    status:200,
                    success:true,
                    email:validatorEmail[0].email,
                    roleName:validatorEmail[0].roleName,
                    token,
                    id:validatorEmail[0].id
                })
            }else{
                return res.status(400).json({
                    status:400,
                    success:false,
                    message:"Password is wrong"
                })
            }
        }
    } catch (error) {
        console.log(error , 'login controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export const logoutController = async(req,res)=>{
    res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: new Date(0),
      });
    return res.status(200).json("logout successfully");
}