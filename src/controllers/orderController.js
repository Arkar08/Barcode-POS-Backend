import { deleteOrderService, findOrderService, getIdOrderService, getOrderService, patchOrderService, postOrderService } from "../services/orderService.js"

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

export const postOrderController = async(req,res)=>{
    const {userId,productLists,promotion,payment} = req.body;

    if(!userId || !payment){
        return res.status(404).json({
            status:404,
            success:false,
            message:"Plz Filled out in the form field."
        })
    }

    try {  

        const lastOrder = await getOrderService()
        const orderId = Number(lastOrder[lastOrder.length - 1].orderNo.slice(8)) || lastOrder.length !== 0 ? Number(lastOrder[lastOrder.length - 1].orderNo.slice(8)) + 1 : 1
        const voucherId = (number) => {
            let string = '';
            let modifyNumber = 6 - number
            for(let i = 0; i< modifyNumber ; i++){
                string = string + '0'
            }
            return string;
        }
        const orderNo = `OrderNo-${voucherId(orderId.toString().length)+orderId.toString()}` ;
        console.log(orderNo)

        const priceList = productLists.map((product)=>{
            return product.price;
        })
        
        const total = priceList.reduce((partialSum, a)=>{
            return partialSum + a
        },0)

        const order = {
            orderNo:orderNo,
            userId:userId,
            quantity:Number(productLists.length),
            promotion:Number(promotion),
            totalAmount:Number(total),
            payment:payment,
            productLists:JSON.stringify(productLists)
        }

                 const data = await postOrderService(order)
                if(data.length === 2){
                    const createData = await findOrderService(order)
                    return res.status(201).json({
                        status:201,
                        success:true,
                        message:"Create Order Successfully.",
                        data:createData
                    })
                }
        } catch (error) {
            console.log(error , 'post order controller error is')
            return res.status(500).json({
                status:500,
                success:false,
                message:error
            })
        }
}

export const getOrderIdController = async(req,res)=>{
    const params = req.params.id;
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"Order Id is not defined."
        })
    }
    try {
        const data = await getIdOrderService(params)
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
                message:"Order Not Found."
            })
        }
    } catch (error) {
        console.log(error , 'get OrderId controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export const patchOrderController = async(req,res)=>{
    const params = req.params.id;
    const {promotion} = req.body;
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"Order Id is not defined."
        })
    }
    try {
        const findData = await getIdOrderService(params)
        const total = findData[0].totalAmount - promotion;
        const order = {
            id:params,
            promotion:promotion,
            totalAmount:total
        }


        const data = await patchOrderService(order)
        if(data.length === 2){
            const updateData = await getIdOrderService(params)
            return res.status(200).json({
                status:200,
                success:true,
                message:"Update Order Successfully.",
                data:updateData
            })
        }
    } catch (error) {
        console.log(error , 'patch Order controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}

export const deleteOrderController = async(req,res)=>{
    const params = req.params.id;
    if(isNaN(params)){
        return res.status(404).json({
            status:404,
            success:false,
            message:"order Id is not defined."
        })
    }
    try {
        const data = await deleteOrderService(params)
        if(data.length === 2){
            return res.status(200).json({
                status:200,
                success:true,
                message:"Delete Order Successfully.",
            })
        }
    } catch (error) {
        console.log(error , 'delete orderId controller error is')
        return res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
}