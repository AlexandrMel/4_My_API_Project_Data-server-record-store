
const express = require('express');
const router = express.Router();
const { getOrders, addOrder, deleteOrder, getOrder, putOrder } = require('../controllers/ordersControllers');

router
.route('/')
.get(getOrders)
.post(addOrder)


router
.route('/:id')
.get(getOrder)
.delete(deleteOrder)
.put(putOrder);
/**
 * GET all records
 */
// router.get('/', getOrders);

// /**
// * POST a record
//  */
// router.post('/', addOrder);
// /**
// * POST a record
//  */
// router.delete('/', deleteOrder);

module.exports = router;
