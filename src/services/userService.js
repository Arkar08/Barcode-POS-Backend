import { db } from "../server.js";

export const getUserService = async()=>{
    let dataPass = []
    await db.query('SELECT fullName,email,password,roleName,companyName,state,township,address,description FROM USER LEFT JOIN INFORMATION ON USER.USERID = INFORMATION.USERID LEFT JOIN ROLE ON USER.ROLEID = ROLE.ROLEID;').then((data)=>{
        return dataPass = data[0];
    }).catch((error)=>{
        console.log(error, 'getUser db error is')
    })
    return dataPass;
}

export const postUserService = async(user)=>{
    if(user.role === 3){
       try {
            let dataPass = []
            let userId = '';
            await db.query(`INSERT INTO USER (fullName,email,password,roleId) VALUE('${user.fullName}','${user.email}','${user.password}','${user.role}')`).then((data)=>{
            })
            await db.query('SELECT * FROM USER').then((data)=>{
                return userId = data[0][data[0].length - 1].userId;
            })
            if (userId !== 0) {
                const updateResult = await db.query(
                    'INSERT INTO INFORMATION (COMPANYNAME,STATE,TOWNSHIP,ADDRESS,DESCRIPTION,USERID) VALUE(?,?,?,?,?,?)',[
                        user.companyName,
                        user.state,
                        user.township,
                        user.address,
                        user.description,
                        userId
                    ]
            );
            
            dataPass = updateResult;
            }
        return dataPass;
       } catch (error) {
            console.log(error, 'Database error');
       }
    }else{
        try {
            let dataPass = []
            let userId = '';
            await db.query(`INSERT INTO USER (fullName,email,password,roleId) VALUE('${user.fullName}','${user.email}','${user.password}','${user.role}')`).then((data)=>{
            })
            await db.query('SELECT * FROM USER').then((data)=>{
                return userId = data[0][data[0].length - 1].userId;
            })
            if (userId !== 0) {
                const updateResult = await db.query(
                    'INSERT INTO INFORMATION (STATE,TOWNSHIP,ADDRESS,USERID) VALUE(?,?,?,?)',[
                        user.state,
                        user.township,
                        user.address,
                        userId
                    ]
            );
            
            dataPass = updateResult;
            }
        return dataPass;
       } catch (error) {
            console.log(error, 'Database error');
       }
    }
    
}

export const findUserService = async(user) =>{
    let dataPass = []
    await db.query(`SELECT * FROM  USER WHERE email = "${user.email}"`).then((data)=>{
        return dataPass = data[0];
    }).catch((error)=>{
        console.log(error ,'find user db error is')
    })
    return dataPass;
}

export const getIdUserService = async(userId)=>{
    let data = []
    let information = []
    await db.query(`SELECT fullName,email,password,roleId FROM USER  WHERE USERID = ${userId}`).then((res)=>{
        return data = res[0];
    })
    await db.query(`SELECT companyName,state,township,address,description FROM INFORMATION WHERE USERID = ${userId}`).then((res)=>{
        return information = res[0]
    })
    const dataPass2 = {...data[0],...information[0]};
    return dataPass2;
}

export const patchUserService = async(user)=>{
    try {
        let dataPass = []
        await db.query ('UPDATE USER SET fullName = ?, email = ?, password = ?, roleId = ? WHERE userId = ?',
            [
                user.fullName,
                user.email,
                user.password,
                user.role,
                user.id
            ]
        )
        const updateResult = await db.query('UPDATE INFORMATION SET COMPANYNAME = ? , STATE = ? , TOWNSHIP = ? , ADDRESS = ? , DESCRIPTION = ? WHERE USERID = ?',
            [
                user.companyName,
                user.state,
                user.township,
                user.address,
                user.description,
                user.id
            ]
        )
        
        dataPass = updateResult;
    return dataPass;
   } catch (error) {
        console.log(error, 'Database error');
   }
}

export const deleteUserService = async(userId)=>{
    let dataPass = []
    await db.query(`DELETE FROM INFORMATION WHERE USERID = ${userId}`).then((data)=>{
        return data;
    })
    await db.query(`DELETE FROM USER WHERE userId=${userId}`).then((data)=>{
        return dataPass = data
    }).catch((error)=>{
        console.log(error ,'find user db error is')
    })   
    return dataPass;
}

