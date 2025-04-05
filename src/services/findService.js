import { db } from "../server.js";

export const findSupplierService = async () => {
  let dataPass = [];
  await db
    .query(
      "SELECT userId,fullName,email,password,roleName,companyName,state,township,address,description FROM USER LEFT JOIN ROLE ON USER.roleId = ROLE.roleId LEFT JOIN INFORMATION ON user.informationId = information.informationId WHERE roleName = 'supplier'"
    )
    .then((data) => {
      return (dataPass = data[0]);
    })
    .catch((error) => {
      console.log(error, "find Supplier db error is");
    });
  return dataPass;
};


export const findCustomerService = async () => {
    let dataPass = [];
    await db
      .query(
        "SELECT userId,fullName,email,password,roleName,companyName,state,township,address,description FROM USER LEFT JOIN ROLE ON USER.roleId = ROLE.roleId LEFT JOIN INFORMATION ON user.informationId = information.informationId WHERE roleName = 'customer'"
      )
      .then((data) => {
        return (dataPass = data[0]);
      })
      .catch((error) => {
        console.log(error, "find customer db error is");
      });
    return dataPass;
  };
  