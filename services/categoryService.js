import { db } from "../src/server.js";


export const getCategroyService = async()=>{
    let dataPass = []
    await db.query('SELECT * FROM category').then((data)=>{
        return dataPass = data[0];
    }).catch((error)=>{
        console.log(error, 'getCategory db error is')
    })
    return dataPass;
}

export const postCategoryService = async(categroy)=>{
    let dataPass = []
    await db.query(`INSERT INTO CATEGORY (categoryName) VALUE('${categroy.categoryName}')`).then((data)=>{
        return dataPass = data;
    }).catch((error)=>{
        console.log(error ,'post category db error is')
    })
    return dataPass;
}

export const findCategoryService = async(category) =>{
    let dataPass = []
    await db.query(`SELECT * FROM Category WHERE categoryName = "${category.categoryName}"`).then((data)=>{
        return dataPass = data[0];
    }).catch((error)=>{
        console.log(error ,'find category db error is')
    })
    return dataPass;
}

export const getIdCategoryService = async(categoryId)=>{
    let dataPass = []
    await db.query(`SELECT * FROM CATEGORY WHERE categoryId = ${categoryId}`).then((data)=>{
        return dataPass = data[0]
    }).catch((error)=>{
        console.log(error ,'find category db error is')
    })
    return dataPass;
}

export const patchCategoryService = async(category)=>{
    let dataPass = []
    await db.query(`UPDATE CATEGORY SET categoryName = '${category.categoryName}' WHERE categoryId = ${category.id}`).then((data)=>{
        return dataPass = data
    }).catch((error)=>{
        console.log(error ,'find category db error is')
    })
    return dataPass;
}

export const deleteCategoryService = async(categoryId)=>{
        let dataPass = []
        await db.query(`DELETE FROM CATEGORY WHERE categoryId=${categoryId}`).then((data)=>{
            return dataPass = data
        }).catch((error)=>{
            console.log(error ,'find category db error is')
        })
        return dataPass;
}