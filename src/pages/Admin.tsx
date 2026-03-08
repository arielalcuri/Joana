import { useState, useEffect } from 'react';
import { getSetting, updateSetting } from '@/services/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Settings, Save, RefreshCcw } from 'lucide-react';

export function Admin() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [mpPrice, setMpPrice] = useState(50000);
    const [mpDescription, setMpDescription] = useState('Consultoría Técnica-Estratégica IA - Joana Del Fabro');

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        try {
            const price = await getSetting('mp_price', 50000);
            const description = await getSetting('mp_description', 'Consultoría Técnica-Estratégica IA - Joana Del Fabro');
            setMpPrice(price);
            setMpDescription(description);
        } catch (error) {
            toast.error('Error al cargar la configuración');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateSetting('mp_price', mpPrice);
            await updateSetting('mp_description', mpDescription);
            toast.success('Configuración guardada correctamente');
        } catch (error) {
            toast.error('Error al guardar la configuración');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background text-white">
                <RefreshCcw className="w-8 h-8 animate-spin text-gold" />
                <span className="ml-3">Cargando panel de administración...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 rounded-xl bg-gold/10 text-gold border border-gold/20">
                        <Settings className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white font-serif tracking-tight">Panel de Administración</h1>
                        <p className="text-gray-400 mt-1">Configuración del sistema de pagos y contenidos dinámicos</p>
                    </div>
                </div>

                <div className="space-y-8 p-8 rounded-2xl border border-gold/20 bg-background/50 backdrop-blur-sm">
                    <h2 className="text-xl font-serif text-gold border-b border-gold/10 pb-4">Configuración de Mercado Pago</h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-gray-300">Importe de la Sesión Inicial (ARS)</Label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                <Input
                                    id="price"
                                    type="number"
                                    value={mpPrice}
                                    onChange={(e) => setMpPrice(Number(e.target.value))}
                                    className="bg-background/50 border-gold/30 text-white pl-8 focus:border-gold focus:ring-gold/20 h-12 text-lg"
                                />
                            </div>
                            <p className="text-xs text-gray-500">Este es el monto que se cobrará automáticamente al finalizar el formulario.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-300">Descripción del Cobro</Label>
                            <Input
                                id="description"
                                value={mpDescription}
                                onChange={(e) => setMpDescription(e.target.value)}
                                className="bg-background/50 border-gold/30 text-white focus:border-gold focus:ring-gold/20 h-12"
                            />
                            <p className="text-xs text-gray-500">Esto aparecerá en el resumen de Mercado Pago del cliente.</p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gold/10 flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            variant="metallic"
                            size="lg"
                            className="px-10"
                        >
                            {saving ? (
                                <>
                                    <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Guardar Cambios
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="mt-12 p-6 rounded-xl border border-white/5 bg-white/5 text-gray-400 text-sm">
                    <p><strong>Nota de seguridad:</strong> Este panel es de acceso restringido por URL. Para un control total, considere habilitar Supabase Auth para restringir el acceso solo a administradores autorizados.</p>
                </div>
            </div>
        </div>
    );
}
