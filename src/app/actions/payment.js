'use server'

import axios from 'axios';

export async function initializePayment(email, amount) {
    try {
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount: amount * 100, // Convert to kobo
                callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-callback`,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return { success: true, data: response.data.data };
    } catch (error) {
        console.error('Payment initialization error:', error);
        return { success: false, error: 'Failed to initialize payment' };
    }
}

export async function verifyPayment(reference) {
    try {
        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        if (response.data.status && response.data.data.status === 'success') {
            return { success: true, message: 'Payment verified' };
        } else {
            return { success: false, message: 'Payment verification failed' };
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return { success: false, message: 'Error verifying payment' };
    }
}
