import { db } from "../src/server.js";

export const getInvoiceService = async()=>{
        let dataPass = []
        await db.query('SELECT  invoiceId,invoiceNo, orderNo,fullName,productLists,quantity,promotion,totalAmount,payment,invoiceDate FROM INVOICE LEFT JOIN ORDERS LEFT JOIN USER ON USER.USERID = ORDERS.USERID ON INVOICE.ORDERID = ORDERS.ORDERID').then((data)=>{
            return dataPass = data[0];
        }).catch((error)=>{
            console.log(error, 'getInvoice db error is')
        })
        return dataPass;
}

export const postInvoiceService = async(invoice)=>{
    let dataPass = []
    await db.query(`INSERT INTO INVOICE (invoiceNo,orderId) VALUE('${invoice.invoiceNo}',${invoice.orderId})`).then((data)=>{
        return dataPass = data;
    }).catch((error)=>{
        console.log(error ,'post invoice db error is')
    })
    return dataPass;
}

export const getIdInvoiceService = async(invoiceId)=>{
    let dataPass = []
    await db.query(`SELECT  invoiceId,invoiceNo, orderNo,fullName,productLists,quantity,promotion,totalAmount,payment,invoiceDate FROM INVOICE LEFT JOIN ORDERS LEFT JOIN USER ON USER.USERID = ORDERS.USERID ON INVOICE.ORDERID = ORDERS.ORDERID WHERE invoiceId = ${invoiceId}`).then((data)=>{
        return dataPass = data[0]
    }).catch((error)=>{
        console.log(error ,'find invoice db error is')
    })
    return dataPass;
}

export const findInvoiceService = async(invoice) =>{
    let dataPass = []
    await db.query(`SELECT  invoiceId,invoiceNo, orderNo,fullName,productLists,quantity,promotion,totalAmount,payment,invoiceDate FROM INVOICE LEFT JOIN ORDERS LEFT JOIN USER ON USER.USERID = ORDERS.USERID ON INVOICE.ORDERID = ORDERS.ORDERID WHERE invoiceNo = "${invoice.invoiceNo}"`).then((data)=>{
        return dataPass = data[0];
    }).catch((error)=>{
        console.log(error ,'find invoice db error is')
    })
    return dataPass;
}
