import { db } from "../server.js";


export const signupService = async(data)=>{
    let dataPass = [];
    await db.query(`INSERT INTO USER (fullName,email,password,roleId) VALUE('${data.fullName}','${data.email}','${data.password}',${data.roleId})`).then((res)=>{
        return dataPass = res;
    }).catch((error)=>{
        console.log(error ,'signup db error is')
    })
    return dataPass;
}