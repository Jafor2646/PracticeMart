
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-routes');
mongoose.connect(
    "mongodb://localhost:27017/express-mongo"
).then(() => console.log("Connected to MongoDB")
).catch((error) => console.log("Could not connect to MongoDB"));   


const app = express();
const port = process.env.PORT || 5000;


app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "cache-control", "Expires", "Pragma"],
        credentials: true,
    })
);    

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));