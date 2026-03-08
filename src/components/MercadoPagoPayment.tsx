import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState, useEffect } from 'react';

// Use environment variable or placeholder
const PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY || 'TEST-123abc456def789ghi';
initMercadoPago(PUBLIC_KEY, { locale: 'es-AR' });

interface PaymentButtonProps {
    description: string;
    price: number;
    quantity: number;
}

export function MercadoPagoPayment({ description, price, quantity }: PaymentButtonProps) {
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/mp/create-preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description,
                    price,
                    quantity,
                }),
            });

            const data = await response.json();
            if (data.id) {
                setPreferenceId(data.id);
            }
        } catch (error) {
            console.error('Error creating preference:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Automatically trigger preference creation if needed, 
        // or wait for user to click a "Pay" button first
        handlePayment();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                <span className="ml-3 text-sm text-gray-400">Generando link de pago seguro...</span>
            </div>
        );
    }

    return (
        <div className="mt-6">
            {preferenceId && (
                <Wallet
                    initialization={{ preferenceId }}
                />
            )}
        </div>
    );
}
