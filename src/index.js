import express from 'express'
import cors from 'cors'
import userRoute from './routes/user.js'
import categoryRoute from './routes/category.js'
import productRoute from './routes/products.js'
import orderRoute from './routes/orders.js'
import invoiceRoute from './routes/invoice.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


app.get("/",(req,res)=>{
    return res.status(200).json("home")
})

// routes
app.use("/api/v1/users",userRoute)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/products",productRoute)
app.use("/api/v1/orders",orderRoute)
app.use("/api/v1/invoice",invoiceRoute)




export default app;