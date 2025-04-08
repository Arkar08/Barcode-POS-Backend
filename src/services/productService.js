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

export const postProductService = async(product)=>{
    let dataPass = []
    await db.query(`INSERT INTO PRODUCTS (PRODUCTNAME,CATEGORYID,USERID,STOCKLEVEL,PRICE,DESCRIPTION) VALUE('${product.productName}', ${product.categoryId},${product.userId},'${product.stockLevel}','${product.price}','${product.description}')`).then((data)=>{
        return dataPass = data;
    }).catch((error)=>{
        console.log(error, 'post product db error is')
    })
    return dataPass;
}

export const findProductService = async(product) =>{
    let dataPass = []
    await db.query(`SELECT * FROM PRODUCTS WHERE productName = "${product.productName}"`).then((data)=>{
        return dataPass = data[0];
    }).catch((error)=>{
        console.log(error ,'find product db error is')
    })
    return dataPass;
}

export const getIdProductService = async(productId)=>{
    let dataPass = []
    await db.query(`SELECT * FROM PRODUCTS WHERE productId = ${productId}`).then((data)=>{
        return dataPass = data[0]
    }).catch((error)=>{
        console.log(error ,'find prodcut db error is')
    })
    return dataPass;
}

export const patchProductService = async(product)=>{
    let dataPass = []
    await db.query(`UPDATE PRODUCTS SET productName = ? ,userId = ? , categoryId = ? ,stockLevel = ? , price = ? ,description = ?  WHERE productId = ${product.id}`, 
                [
                    product.productName,
                    product.userId,
                    product.categoryId,
                    product.stockLevel,
                    product.price,
                    product.description
                ]).then((data)=>{
        return dataPass = data
    }).catch((error)=>{
        console.log(error ,'find prodcut db error is')
    })
    return dataPass;
}

export const deleteProductService = async(productId)=>{
    let dataPass = []
    await db.query(`DELETE FROM PRODUCTS WHERE productId=${productId}`).then((data)=>{
        return dataPass = data
    }).catch((error)=>{
        console.log(error ,'find PRODUCTS db error is')
    })
    return dataPass;
}