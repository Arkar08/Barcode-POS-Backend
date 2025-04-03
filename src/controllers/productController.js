import { deleteProductService, findProductService, getIdProductService, getProductService, patchProductService, postProductService } from "../services/productService.js"

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

export const postProductController = async(req,res)=>{
    const {productName,categoryId,userId,stockLevel,price,description} = req.body;

    if(!productName || !categoryId || !userId || !stockLevel || !price || !description){
        return res.status(404).json({
            status:404,
            success:false,
            message:"Plz filled out in the form field."
        })
    }
    try {
        const product = {
            productName:productName,
            categoryId:categoryId,
            userId:userId,
            stockLevel:stockLevel,
            price:price,
            description:description
        }

        const dataPass = await findProductService(product)
                if(dataPass.length === 1){
                    return res.status(400).json({
                        status:400,
                        success:false,
                        message:"Product Name is already exist."
                    })
                }
                if(dataPass.length < 1){
                     const data = await postProductService(product)
                    if(data.length === 2){
                        const createData = await findProductService(product)
                        return res.status(201).json({
                            status:201,
                            success:true,
                            message:"Create Product Successfully.",
                            data:createData
                        })
                    }
               }
    } catch (error) {
        console.log(error , 'post product controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export const getIdProductController = async(req,res)=>{
    const params = req.params.id;
        if(isNaN(params)){
            return res.status(404).json({
                status:404,
                success:false,
                message:"product Id is not defined."
            })
        }
        try {
            const data = await getIdProductService(params)
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
                    message:"Product Not Found."
                })
            }
        } catch (error) {
            console.log(error , 'get productId controller error is')
            return res.status(500).json({
                status:500,
                success:false,
                message:error
            })
        }
}

export const patchProductController = async(req,res)=>{
    const params = req.params.id;
    const {productName,categoryId,userId,stockLevel,price,description} = req.body;
    if(!productName || !categoryId || !userId || !stockLevel || !price || !description){
        return res.status(404).json({
            status:404,
            success:false,
            message:"Plz filled out in the form field."
        })
    }
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"prodcut Id is not defined."
        })
    }
    try {
        const products = {
            id:params,
            productName:productName,
            userId:userId,
            categoryId:categoryId,
            stockLevel:stockLevel,
            price:price,
            description:description
        }
        const data = await patchProductService(products)
        if(data.length === 2){
            const updateData = await getIdProductService(params)
            return res.status(200).json({
                status:200,
                success:true,
                message:"Update Product Successfully.",
                data:updateData
            })
        }
    } catch (error) {
        console.log(error , 'patch productId controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export const deleteProductController = async(req,res)=>{
    const params = req.params.id;
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"Product Id is not defined."
        })
    }
    try {
        const data = await deleteProductService(params)
        if(data.length === 2){
            return res.status(200).json({
                status:200,
                success:true,
                message:"Delete Product Successfully.",
            })
        }
    } catch (error) {
        console.log(error , 'delete ProductId controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}