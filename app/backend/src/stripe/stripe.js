const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

async function fetchCartDetails() {
    try {
        const response = await fetch('http://your-actual-api-endpoint.com/cart'); // Update this
        if (!response.ok) {
            throw new Error("Failed to fetch cart details");
        }
        const data = await response.json();
        return data.items; 
    } catch (error) {
        console.error("Error fetching cart details:", error);
        throw error;
    }
}

app.post('/payment', async (req, res) => {
    try {
        const cartItems = await fetchCartDetails();

        const line_items = cartItems.map(item => ({
            price_data: {
                currency: item.currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.unit_amount,
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: '/cart',
            cancel_url: '/payment',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 4000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
