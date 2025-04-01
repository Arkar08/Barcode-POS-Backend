import { db } from "../server.js"


export const getUserService = (async()=>{
    let dataPass = []
    await db.query('SELECT userId,fullName,email,password,roleName,companyName,state,township,address,description FROM USER LEFT JOIN ROLE ON USER.roleId = ROLE.roleId LEFT JOIN INFORMATION ON user.informationId = information.informationId').then((data)=>{
        return dataPass = data[0];
    }).catch((error)=>{
        console.log(error, 'getUser db error is')
    })
    return dataPass;
})

