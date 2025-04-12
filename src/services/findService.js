import { db } from "../server.js";

  export const findSupplierService = async () => {
    let dataPass = [];
    await db
      .query(
        "SELECT * FROM USER  WHERE roleId = 3"
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
        "SELECT * FROM USER  WHERE roleId = 2"
      )
      .then((data) => {
        return (dataPass = data[0]);
      })
      .catch((error) => {
        console.log(error, "find customer db error is");
      });
    return dataPass;
  };

  export const findProductService= async () => {
    let dataPass = [];
    await db
      .query(
        "SELECT productName as value,productId as id from products"
      )
      .then((data) => {
        return (dataPass = data[0]);
      })
      .catch((error) => {
        console.log(error, "find product db error is");
      });
    return dataPass;
  };


  // query params
  export const findStockService= async (productName) => {
    let dataPass = [];
    await db
      .query(
        `SELECT stockLevel,price from products where productName= "${productName}"`
      )
      .then((data) => {
        return (dataPass = data[0]);
      })
      .catch((error) => {
        console.log(error, "find product db error is");
      });
    return dataPass;
  };
  
  export const findRoleService = async()=>{
    let dataPass = [];
    await db
      .query(
        "SELECT roleId as value, roleName as label from role"
      )
      .then((data) => {
        return (dataPass = data[0]);
      })
      .catch((error) => {
        console.log(error, "find role db error is");
      });
    return dataPass;
  }


  export const findStateService = async()=>{
    let dataPass = [];
    await db.query(
      "SELECT stateCode as value,stateName as label from STATE"
    ).then((data)=>{
      return dataPass = data[0];
    })
    .catch((error)=>{
      console.log(error,'find state db error is')
    })
    return dataPass;
  }

  export const findTownshipService = async(stateCode)=>{
    let dataPass = [];
    await db.query(
      `SELECT townshipCode as value,townshipName as label from TOWNSHIP where stateCode = '${stateCode}'`
    ).then((data)=>{
      return dataPass = data[0];
    }).catch((error)=>{
      console.log(error,'find township db error is')
    })
    return dataPass;
  }

  export const findTownship1Service = async()=>{
    let dataPass = [];
    await db.query(
      'SELECT townshipCode as value,townshipName as label from TOWNSHIP '
    ).then((data)=>{
      return dataPass = data[0];
    }).catch((error)=>{
      console.log(error,'find township db error is')
    })
    return dataPass;
  }

