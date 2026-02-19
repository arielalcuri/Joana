/**
 * @file correoArgentino.ts
 * @description Servicio técnico para la integración con la API Paq-Ar 2.0 de Correo Argentino.
 * Basado en la documentación técnica oficial v2.0.
 */

interface CATrackingEvent {
    facilityId: string;
    facility: string;
    statusId: string;
    status: string;
    date: string;
    sign: string;
}

interface CATrackingResponse {
    quantity: number;
    countryId: string;
    serviceType: string;
    trackingNumber: string;
    event: CATrackingEvent[];
}

class CorreoArgentinoService {
    private baseUrl: string;
    private apiKey: string;
    private agreement: string;

    constructor() {
        // Estas variables deben configurarse en un archivo .env para seguridad
        this.baseUrl = import.meta.env.VITE_CA_API_URL || 'https://apitest.correoargentino.com.ar/paqar/v1';
        this.apiKey = import.meta.env.VITE_CA_API_KEY || 'TU_API_KEY_AQUI';
        this.agreement = import.meta.env.VITE_CA_AGREEMENT || 'TU_NUMERO_DE_ACUERDO';
    }

    /**
     * Valida las credenciales contra el gateway de Correo Argentino.
     * @returns Promise<boolean>
     */
    async authenticate(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/auth`, {
                method: 'GET',
                headers: {
                    'authorization': `Apikey ${this.apiKey}`,
                    'agreement': this.agreement
                }
            });

            return response.status === 204;
        } catch (error) {
            console.error('Error de autenticación CA:', error);
            return false;
        }
    }

    /**
     * Consulta el historial de movimientos de un tracking number.
     * @param trackingNumber Código de seguimiento (ej: CA123456789AR)
     */
    async getTrackingHistory(trackingNumber: string): Promise<CATrackingResponse[] | null> {
        try {
            // El endpoint /tracking acepta un array de trackingNumbers
            const response = await fetch(`${this.baseUrl}/tracking?trackingNumbers=${trackingNumber}`, {
                method: 'GET',
                headers: {
                    'authorization': `Apikey ${this.apiKey}`,
                    'agreement': this.agreement,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Error al consultar tracking');

            const data: CATrackingResponse[] = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener historial CA:', error);
            return null;
        }
    }

    /**
     * Genera el rótulo (etiqueta de envío) en formato PDF Base64.
     */
    async getLabel(trackingNumber: string): Promise<string | null> {
        try {
            const response = await fetch(`${this.baseUrl}/labels`, {
                method: 'POST',
                headers: {
                    'authorization': `Apikey ${this.apiKey}`,
                    'agreement': this.agreement,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([{
                    sellerId: '',
                    trackingNumber: trackingNumber
                }])
            });

            const data = await response.json();
            if (data && data[0] && data[0].result === 'OK') {
                return data[0].fileBase64;
            }
            return null;
        } catch (error) {
            console.error('Error al obtener rótulo:', error);
            return null;
        }
    }
}

export const correoArgentino = new CorreoArgentinoService();
