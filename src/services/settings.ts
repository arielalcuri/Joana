import { supabase } from '@/supabase';

export interface SiteSettings {
    id?: string;
    key: string;
    value: any;
    description?: string;
}

export const getSetting = async (key: string, defaultValue: any = null) => {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', key)
            .single();

        if (error) {
            if (error.code === 'PGRST116') { // Record not found
                return defaultValue;
            }
            throw error;
        }

        return data.value;
    } catch (err) {
        console.error(`Error fetching setting ${key}:`, err);
        return defaultValue;
    }
};

export const updateSetting = async (key: string, value: any) => {
    try {
        const { error } = await supabase
            .from('site_settings')
            .upsert({ key, value }, { onConflict: 'key' });

        if (error) throw error;
        return true;
    } catch (err) {
        console.error(`Error updating setting ${key}:`, err);
        throw err;
    }
};
