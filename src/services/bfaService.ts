/**
 * @file bfaService.ts
 * @description Integración con la Blockchain Federal Argentina (BFA).
 * Utiliza el protocolo de sellado de tiempo para certificación inmutable sin costo de gas.
 */

class BFAService {
    /**
     * Genera el Hash oficial que se enviará a BFA.
     * Representa la huella digital única del envío y sus documentos asociados.
     */
    async generateLegalHash(trackingId: string, events: any[]) {
        const content = `${trackingId}-${JSON.stringify(events)}`;
        const msgUint8 = new TextEncoder().encode(content);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async sealOnBFA(hash: string, trackingId: string) {
        try {
            const response = await fetch('http://localhost:3000/api/bfa/stamp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hash, trackingId })
            });

            if (!response.ok) throw new Error('Error en el Bridge BFA');

            const data = await response.json();
            console.log('Documento sellado en BFA:', data);

            return {
                success: true,
                bfaHash: data.txHash || hash,
                timestamp: data.timestamp || new Date().toISOString(),
                network: data.blockchain || 'BFA - Blockchain Federal Argentina',
                receipt: data
            };
        } catch (error) {
            console.error('Error BFA Service:', error);
            return null;
        }
    }
}

export const bfaService = new BFAService();
