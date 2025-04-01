import { db } from "../server.js";

export const getProductService = async()=>{
    let dataPass = []
        await db.query('SELECT productId, productName, categoryName,fullName,stockLevel,price,description FROM PRODUCTS LEFT JOIN CATEGORY ON PRODUCTS.CATEGORYID = CATEGORY.CATEGORYID LEFT JOIN USER ON PRODUCTS.USERID = USER.USERID').then((data)=>{
            return dataPass = data[0];
        }).catch((error)=>{
            console.log(error, 'getProduct db error is')
        })
        return dataPass;
}