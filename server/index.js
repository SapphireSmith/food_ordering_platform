import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js'
import cartRoute from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// app config
const app = express();
const PORT = 5000; 

// middleware
app.use(express.json())
app.use(cors()) 

// db connection
connectDB();

// api endpoints
app.use('/api/food',foodRouter);
app.use("/images",express.static('uploads'));
app.use('/api/user',userRouter);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
    res.send(`Api working`)
})

app.listen(PORT, ()=>{
    console.log(`Server started https://localhost:${PORT} `);
})




