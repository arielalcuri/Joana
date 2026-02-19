/**
 * @file globalLogistics.ts
 * @description Integración con APIs internacionales (FedEx & DHL).
 */

class GlobalLogisticsService {
    /**
     * DHL EXPRESS - Unified Tracking API
     * Requiere registro en developer.dhl.com
     */
    async trackDHL(trackingNumber: string) {
        const apiKey = import.meta.env.VITE_DHL_API_KEY;
        const url = `https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'DHL-API-Key': apiKey,
                    'Accept': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('DHL API Error:', error);
            return null;
        }
    }

    /**
     * FEDEX - Global Track API
     * Requiere Client ID y Client Secret de developer.fedex.com
     */
    async trackFedEx(trackingNumber: string) {
        const authUrl = 'https://apis.fedex.com/oauth/token';
        const trackUrl = 'https://apis.fedex.com/track/v1/trackingnumbers';

        try {
            // 1. Obtener Token OAuth2 (Simplificado)
            // Este paso es obligatorio en FedEx antes de rastrear
            const tokenResponse = await fetch(authUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: 'TU_CLIENT_ID',
                    client_secret: 'TU_CLIENT_SECRET'
                })
            });
            const { access_token } = await tokenResponse.json();

            // 2. Consultar el Tracking
            const response = await fetch(trackUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trackingInfo: [{ trackingNumberInfo: { trackingNumber } }],
                    includeDetailedScans: true
                })
            });
            return await response.json();
        } catch (error) {
            console.error('FedEx API Error:', error);
            return null;
        }
    }
}

export const globalLogistics = new GlobalLogisticsService();
