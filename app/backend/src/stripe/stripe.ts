import express from 'express';
import stripePackage from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

interface CartItem {
    name: string;
    currency: string;
    unit_amount: number;
    quantity: number;
}

const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY as string);

async function fetchCartDetails(): Promise<CartItem[]> {
    const response = await fetch('http://your-api-endpoint.com/cart');
    if (!response.ok) {
        throw new Error("Failed to fetch cart details");
    }
    const data = await response.json() as { items: CartItem[] };
    return data.items;
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
            success_url: 'http://localhost:3000/cart',
            cancel_url: 'http://localhost:3000/payment',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
