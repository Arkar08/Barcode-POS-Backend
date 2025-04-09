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
        "SELECT productName as value from products"
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
  