'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { initializePayment } from '../actions/payment';
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
    message: null,
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={pending}
        >
            {pending ? 'Processing...' : 'Pay Now'}
        </button>
    )
}

export default function Checkout() {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const router = useRouter();
    const [state, formAction] = useFormState(handlePayment, initialState)

    async function handlePayment(prevState, formData) {
        const email = formData.get('email')
        const amount = formData.get('amount')

        const result = await initializePayment(email, amount);

        if (result.success) {
            router.push(result.data.authorization_url);
            return { message: 'Redirecting to payment page...' }
        } else {
            return { message: result.error }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mx-auto p-4">
            <div className="w-2/3">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <form action={formAction} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block mb-1">Amount (ZAR):</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <SubmitButton/>
                    {state.message && <p className="text-red-500">{state.message}</p>}
                </form>
            </div>
        </div>
    );
}
