import { deleteCategoryService, findCategoryService, getCategroyService, getIdCategoryService, patchCategoryService, postCategoryService } from "../services/categoryService.js"

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
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export const postCategoryController = async(req,res)=>{
    const categoryName = req.body;
    if(Object.keys(categoryName)[0] !== 'categoryName'){
        return res.status(500).json({
            status:500,
            success:false,
            message:"Object key is wrong. Plz check Object Key"
        })
    }
    if(!categoryName){
        return res.status(404).json({
            status:404,
            success:false,
            message:"Plz filled out in the form field."
        })
    }
    try {
        const dataPass = await findCategoryService(categoryName)
        if(dataPass.length === 1){
            return res.status(400).json({
                status:400,
                success:false,
                message:"Category Name is already exist."
            })
        }
        if(dataPass.length < 1){
             const data = await postCategoryService(categoryName)
            if(data.length === 2){
                const createData = await findCategoryService(categoryName)
                return res.status(201).json({
                    status:201,
                    success:true,
                    message:"Create Categroy Successfully.",
                    data:createData
                })
            }
       }
    } catch (error) {
        console.log(error , 'post categroy controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export const getCategoryIdControler = async(req,res)=>{
    const params = req.params.id;
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"category Id is not defined."
        })
    }
    try {
        const data = await getIdCategoryService(params)
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
                message:"Category Not Found."
            })
        }
    } catch (error) {
        console.log(error , 'get categroyId controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export const patchCategoryController = async(req,res)=>{
    const params = req.params.id;
    const categoryName = req.body;
    if(Object.keys(categoryName)[0] !== 'categoryName'){
        return res.status(500).json({
            status:500,
            success:false,
            message:"Object key is wrong. Plz check Object Key"
        })
    }
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"category Id is not defined."
        })
    }
    try {
        const category = {
            id:params,
            categoryName:categoryName.categoryName
        }
        const data = await patchCategoryService(category)
        if(data.length === 2){
            const updateData = await getIdCategoryService(params)
            return res.status(200).json({
                status:200,
                success:true,
                message:"Update Categroy Successfully.",
                data:updateData
            })
        }
    } catch (error) {
        console.log(error , 'patch categroyId controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export const deleteCategoryController = async(req,res)=>{
    const params = req.params.id;
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"category Id is not defined."
        })
    }
    try {
        const data = await deleteCategoryService(params)
        if(data.length === 2){
            return res.status(200).json({
                status:200,
                success:true,
                message:"Delete Category Successfully.",
            })
        }
    } catch (error) {
        console.log(error , 'delete categroyId controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}