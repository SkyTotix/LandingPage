require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Crear/verificar tabla leads
async function createTable() {
    try {
        // En Supabase, la tabla se crea desde el dashboard
        // Esta función solo verifica que la conexión funcione
        const { data, error } = await supabase
            .from('leads')
            .select('count')
            .limit(1);
        
        if (error && error.code === 'PGRST116') {
            console.log('⚠️  Tabla "leads" no encontrada. Créala en Supabase Dashboard con:');
            console.log(`
CREATE TABLE leads (
    id bigint primary key generated always as identity,
    nombre text not null,
    email text not null,
    telefono text,
    interes text,
    mensaje text,
    fecha_registro timestamp with time zone default now(),
    origen text default 'formulario_contacto'
);
            `);
            return false;
        }
        
        console.log('✅ Conexión a Supabase exitosa - Tabla leads verificada');
        return true;
    } catch (error) {
        console.error('❌ Error conectando a Supabase:', error.message);
        return false;
    }
}

// Guardar lead en Supabase
async function saveContact(data) {
    try {
        const leadData = {
            nombre: data.nombre,
            email: data.email,
            telefono: data.telefono || null,
            interes: data.interes || null,
            mensaje: data.mensaje || null,
            origen: data.origen || 'formulario_contacto',
            fecha_registro: new Date().toISOString()
        };
        
        const { data: result, error } = await supabase
            .from('leads')
            .insert([leadData])
            .select()
            .single();
        
        if (error) {
            console.error('❌ Error guardando en Supabase:', error);
            return { success: false, error: error.message };
        }
        
        console.log('✅ Lead guardado en Supabase:', data.email);
        return { success: true, id: result.id, data: result };
    } catch (error) {
        console.error('❌ Error inesperado:', error);
        return { success: false, error: error.message };
    }
}

// Obtener todos los leads (para dashboard futuro)
async function getLeads() {
    try {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('fecha_registro', { ascending: false });
        
        if (error) {
            console.error('❌ Error obteniendo leads:', error);
            return { success: false, error: error.message };
        }
        
        return { success: true, data };
    } catch (error) {
        console.error('❌ Error inesperado:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    createTable,
    saveContact,
    getLeads
}; 