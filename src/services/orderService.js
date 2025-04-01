import { db } from "../server.js";

export const getOrderService = async()=>{
        let dataPass = []
        await db.query('SELECT orderId,orderNo,fullName,productLists,quantity,promotion,totalAmount,payment,orderDate,deliveryDate FROM ORDERS LEFT JOIN  USER ON ORDERS.USERID = USER.USERID').then((data)=>{
            return dataPass = data[0];
        }).catch((error)=>{
            console.log(error, 'getOrder db error is')
        })
        return dataPass;
}