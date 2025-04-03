import { db } from "../src/server.js";

export const getOrderService = async()=>{
        let dataPass = []
        await db.query('SELECT orderId,orderNo,fullName,productLists,quantity,promotion,totalAmount,payment,orderDate FROM ORDERS LEFT JOIN  USER ON ORDERS.USERID = USER.USERID').then((data)=>{
            return dataPass = data[0];
        }).catch((error)=>{
            console.log(error, 'getOrder db error is')
        })
        return dataPass;
}

export const postOrderService = async(order)=>{
    let dataPass = []
    await db.query(`INSERT INTO ORDERS (orderNo,userId,quantity,promotion,totalAmount,payment,productLists) VALUE('${order.orderNo}',${order.userId},${order.quantity},${order.promotion},${order.totalAmount},'${order.payment}','${order.productLists}')`).then((data)=>{
        return dataPass = data;
    }).catch((error)=>{
        console.log(error ,'post order db error is')
    })
    return dataPass;
}

export const getIdOrderService = async(orderId)=>{
    let dataPass = []
    await db.query(`SELECT orderId,orderNo,fullName,productLists,quantity,promotion,totalAmount,payment,orderDate FROM ORDERS LEFT JOIN  USER ON ORDERS.USERID = USER.USERID WHERE orderId = ${orderId}`).then((data)=>{
        return dataPass = data[0]
    }).catch((error)=>{
        console.log(error ,'find order db error is')
    })
    return dataPass;
}

export const findOrderService = async(order) =>{
    let dataPass = []
    await db.query(`SELECT orderId,orderNo,fullName,productLists,quantity,promotion,totalAmount,payment,orderDate FROM ORDERS LEFT JOIN  USER ON ORDERS.USERID = USER.USERID WHERE orderNo = "${order.orderNo}"`).then((data)=>{
        return dataPass = data[0];
    }).catch((error)=>{
        console.log(error ,'find order db error is')
    })
    return dataPass;
}

export const patchOrderService = async(order)=>{
    let dataPass = []
    await db.query(`UPDATE ORDERS SET promotion = '?',totalAmount = '?' WHERE orderId = ${order.id}`,[
        order.promotion,
        order.totalAmount
    ]).then((data)=>{
        return dataPass = data
    }).catch((error)=>{
        console.log(error ,'find order db error is')
    })
    return dataPass;
}

export const deleteOrderService = async(orderId)=>{
    let dataPass = []
    await db.query(`DELETE FROM ORDERS WHERE orderId=${orderId}`).then((data)=>{
        return dataPass = data
    }).catch((error)=>{
        console.log(error ,'find order db error is')
    })
    return dataPass;
}