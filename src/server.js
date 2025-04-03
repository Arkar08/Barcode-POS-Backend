import app from './index.js'
import http from 'http'
import dotenv from 'dotenv'
import mysqlPool from './db/db.js';

dotenv.config();

const server = http.createServer(app)
const PORT = process.env.PORT || 8080;
export const db = mysqlPool;

db.query("SELECT 1").then(()=>{
    console.log('db connecting succeeded.')
    server.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`)
    })
}).catch((error)=>{
    console.log(error , 'db connecting failed')
})

