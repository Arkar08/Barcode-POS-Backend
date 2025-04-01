import { db } from "../server.js";


export const getCategroyService = (async()=>{
    let dataPass = []
    await db.query('SELECT * FROM category').then((data)=>{
        return dataPass = data[0];
    }).catch((error)=>{
        console.log(error, 'getCategory db error is')
    })
    return dataPass;
})