const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());

app.post('/payment', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'vnd',
                product_data: {
                    name: 'Your product name',
                },
                unit_amount: 20, 
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: '/cart',
        cancel_url: '/payment',
    });

    res.json({ id: session.id });
});

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
