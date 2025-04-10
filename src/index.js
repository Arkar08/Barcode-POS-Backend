import express from 'express'
import cors from 'cors'
import userRoute from './routes/user.js'
import categoryRoute from './routes/category.js'
import productRoute from './routes/products.js'
import orderRoute from './routes/orders.js'
import invoiceRoute from './routes/invoice.js'
import findRoute from './routes/find.js'
import authRoute from './routes/auth.js'
import { authMiddleware, authorizeAdmin } from './middleware/middleware.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


app.get("/",(req,res)=>{
    return res.status(200).json("home")
})

// routes
app.use("/api/v1/users",authMiddleware,authorizeAdmin,userRoute)
app.use("/api/v1/category",authMiddleware,categoryRoute)
app.use("/api/v1/products",authMiddleware,productRoute)
app.use("/api/v1/orders",authMiddleware,orderRoute)
app.use("/api/v1/invoice",authMiddleware,invoiceRoute)
app.use("/api/v1/find",authMiddleware,findRoute)
app.use("/api/v1/auth",authRoute)




export default app;