'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyPayment } from '../actions/payment';

export default function PaymentCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [verificationStatus, setVerificationStatus] = useState('Verifying payment...');

    useEffect(() => {
        const reference = searchParams.get('reference');
        if (reference) {
            handleVerification(reference);
        }
    }, [searchParams]);

    const handleVerification = async (reference) => {
        const result = await verifyPayment(reference);

        if (result.success) {
            setVerificationStatus('Payment verified successfully');
            setTimeout(() => router.push('/success'), 2000);
        } else {
            setVerificationStatus('Payment verification failed');
            setTimeout(() => router.push('/failure'), 2000);
        }
    };

    return <div>{verificationStatus}</div>;
}
