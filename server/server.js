
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-routes');
const adminOrderRouter = require('./routes/admin/order-routes');


const shopProductsRouter = require('./routes/shop/products-routes');
const shopCartRouter = require('./routes/shop/cart-routes');
const shopAddressRouter = require('./routes/shop/address-routes');
const shopOrderRouter = require('./routes/shop/order-routes');
const shopReviewRouter = require('./routes/shop/review-routes');
const shopSearchRouter = require('./routes/shop/search-routes');

mongoose.connect(
    process.env.MONGO_URI
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
app.use('/api/admin/orders', adminOrderRouter);


app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/review', shopReviewRouter);
app.use('/api/shop/search', shopSearchRouter);


app.listen(port, () => console.log(`Server is running on port ${port}`));