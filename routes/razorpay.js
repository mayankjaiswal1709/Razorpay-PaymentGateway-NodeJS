const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
require('dotenv').config()

const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
});

router.get('/', (req, res) => {
    var option = {
        amount: 600 * 100,
        currency: 'INR',
    };
    instance.orders.create(option, function (err, order) {
        if (err) {
            console.log(err);
        } else {
            console.log(order);
            res.render('checkout', { amount: order.amount, order_id: order.id });
        }
    });

});

router.post('/pay-verify', (req, res) => {
    console.log(req.body)
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var expertedSignature = crypto.createHmac('sha256', '9d8l99fYOkVT0zOfjY8MSZh0')
        .update(body.toString())
        .digest('hex');
    console.log("sig" + req.body.razorpay_signature);
    console.log("sig" + expertedSignature);

    if (expertedSignature === req.body.razorpay_signature) {
        console.log("Payment Success");
    } else {
        console.log("Payment Fail");
    }
})

module.exports = router;
