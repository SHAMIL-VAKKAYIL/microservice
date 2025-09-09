const express = require('express');
const { paymentSecton } = require('../controllers/payment.controller');
const router = express.Router();

router.post('/create-payment-section',paymentSecton);

module.exports = router;
