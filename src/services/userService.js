import { db } from "../server.js"


export const getUserService = async()=>{
    let dataPass = []
    await db.query('SELECT userId,fullName,email,password,roleName,companyName,state,township,address,description FROM USER LEFT JOIN ROLE ON USER.roleId = ROLE.roleId LEFT JOIN INFORMATION ON user.informationId = information.informationId').then((data)=>{
        return dataPass = data[0];
    }).catch((error)=>{
        console.log(error, 'getUser db error is')
    })
    return dataPass;
}

export const postUserService = async(user)=>{
    let dataPass = []
    await db.query(`INSERT INTO USER (fullName,email,password,roleId) VALUE('${user.fullName}','${user.email}','${user.password}','${user.role}')`).then((data)=>{
        return dataPass = data;
    }).catch((error)=>{
        console.log(error ,'post user db error is')
    })
    return dataPass;
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
    let dataPass = []
    await db.query(`SELECT userId,fullName,email,password,roleName,companyName,state,township,address,description FROM USER LEFT JOIN ROLE ON USER.roleId = ROLE.roleId LEFT JOIN INFORMATION ON user.informationId = information.informationId WHERE userId = ${userId}`).then((data)=>{
        return dataPass = data[0]
    }).catch((error)=>{
        console.log(error ,'find user db error is')
    })
    return dataPass;
}

export const patchUserService = async(user)=>{
    if(user.address === undefined && user.state === undefined && user.township === undefined && user.companyName === undefined && user.description){
        let dataPass = []
        await db.query(`UPDATE USER SET fullName = '${user.fullName}', email ='${user.email}', password = '${user.password}',roleId=${user.role} WHERE userId = ${user.id}`).then((data)=>{
            return dataPass = data
        }).catch((error)=>{
            console.log(error ,'find user db error is')
        })
        return dataPass;
    }
    if(user.companyName === undefined){

        let dataPass = [];
        let informationId = 0;

        try {

            await db.query(
                'INSERT INTO INFORMATION (STATE, TOWNSHIP, ADDRESS) VALUES (?, ?, ?)',
                [user.state, user.township, user.address]
            );


            await db.query('SELECT * FROM INFORMATION').then((data)=>{
                return informationId = data[0][data[0].length - 1].informationId;
            })
            if (informationId !== 0) {

                const updateResult = await db.query(
                    'UPDATE USER SET fullName = ?, email = ?, password = ?, roleId = ?, informationId = ? WHERE userId = ?',
                    [
                        user.fullName,
                        user.email,
                        user.password,
                        user.role,
                        informationId,
                        user.id
                    ]
                );

                dataPass = updateResult;
            }
        } catch (error) {
            console.log(error, 'Database error');
        }

        return dataPass;

    }else{
        let userData = []
        await db.query('SELECT informationId,userId FROM USER').then((data)=>{
            return userData = data[0]
        })

        const data = userData.filter((userName)=>{
            if(userName.userId == user.id){
                return userName;
            }
        })
        if(data[0].informationId){
            let dataPass = [];
           try {
            await db.query(
                'UPDATE INFORMATION SET companyName = ?, state = ?, township = ?, address = ?, description = ? WHERE informationId = ?',
                [
                    user.companyName,
                    user.state,
                    user.township,
                    user.address,
                    user.description,
                    data[0].informationId
                ]
            )
                const updateResult = await db.query(
                    'UPDATE USER SET fullName = ?, email = ?, password = ?, roleId = ?, informationId = ? WHERE userId = ?',
                    [
                        user.fullName,
                        user.email,
                        user.password,
                        user.role,
                        data[0].informationId,
                        user.id
                    ]
                );

                     dataPass = updateResult;

                     return dataPass;
           } catch (error) {
            console.log(error, 'Database error');
           }
        }else{
            let dataPass = [];
            let informationId = 0;

            try {

                await db.query(
                    'INSERT INTO INFORMATION (COMPANYNAME,STATE, TOWNSHIP, ADDRESS,DESCRIPTION) VALUES (?, ?, ?,?,?)',
                    [user.companyName,user.state, user.township, user.address,user.description]
                );


                await db.query('SELECT * FROM INFORMATION').then((data)=>{
                    return informationId = data[0][data[0].length - 1].informationId;
                })
                if (informationId !== 0) {

                    const updateResult = await db.query(
                        'UPDATE USER SET fullName = ?, email = ?, password = ?, roleId = ?, informationId = ? WHERE userId = ?',
                        [
                            user.fullName,
                            user.email,
                            user.password,
                            user.role,
                            informationId,
                            user.id
                        ]
                    );

                        dataPass = updateResult;
                    }
                } catch (error) {
                    console.log(error, 'Database error');
                }

            return dataPass;
        }
    }
    
}

export const deleteUserService = async(userId)=>{
    let dataPass = []
    let userData = []
    await db.query('SELECT informationId,userId FROM USER').then((data)=>{
        return userData = data[0]
    })

    const data = userData.filter((userName)=>{
        if(userName.userId == userId){
            return userName;
        }
    })
    await db.query(`DELETE FROM USER WHERE userId=${userId}`).then((data)=>{
        return dataPass = data;
    }).catch((error)=>{
        console.log(error ,'find user db error is')
    })
    await db.query(`DELETE FROM INFORMATION WHERE informationId = ${data[0].informationId} `)
    return dataPass;
}