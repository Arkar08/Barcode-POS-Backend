import mysql from 'mysql2/promise'

const mysqlPool = mysql.createPool({
    host:"localhost",
    user:'root',
    password:"chithmwethant271222",
    database:"barcodemain"
})



export default mysqlPool;