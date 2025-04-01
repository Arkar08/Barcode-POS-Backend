import { db } from "../server.js";

export const getInvoiceService = async()=>{
        let dataPass = []
        await db.query('SELECT  invoiceId,invoiceNo, orderNo,fullName,productLists,quantity,promotion,totalAmount,payment,invoiceDate FROM INVOICE LEFT JOIN ORDERS LEFT JOIN USER ON USER.USERID = ORDERS.USERID ON INVOICE.ORDERID = ORDERS.ORDERID').then((data)=>{
            return dataPass = data[0];
        }).catch((error)=>{
            console.log(error, 'getInvoice db error is')
        })
        return dataPass;
}