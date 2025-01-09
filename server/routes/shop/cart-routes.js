const express = require('express');
const {
    addToCar,
    fetchCartItems,
    updateCartItemQty,
    deleteCartItem
} = require('../../controllers/shop/cart-controller');


const router = express.Router();

router.post('/add', addToCar);
router.get('/get/:userId', fetchCartItems);
router.put('/update-cart', updateCartItemQty);
router.delete('/:userId/:productId', deleteCartItem);

module.exports = router;