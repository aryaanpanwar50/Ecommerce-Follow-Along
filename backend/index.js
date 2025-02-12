const express = require('express');
const connectDB = require('./database/db')
const userRouter = require("./routes/user.routes")
const productRoutes = require('./routes/product.routes');
const cors = require("cors")
const app = express();
require('dotenv').config();
const PORT = process.env.PORT 

app.get('/',cors(),(req,res)=>{
    try{
        res.send("Server is ready")
        console.log("My first test API is working")
    }catch(error){
        res.status(500).send("Server Error")
    }
    
});

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api",userRouter);
app.use('/api/products', productRoutes);


app.listen(PORT,async ()=>{
    try{
        await connectDB();
        console.log(`Listening on port ${PORT}`)

    }catch(error){
        console.error("Serve failed to start")
    }

})
