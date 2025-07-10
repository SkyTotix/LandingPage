const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('Environment check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    urlPrefix: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'NOT_SET'
});

// Verificar que las variables de entorno existen
if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables');
    console.error('SUPABASE_URL:', supabaseUrl ? 'SET' : 'NOT SET');
    console.error('SUPABASE_ANON_KEY:', supabaseKey ? 'SET' : 'NOT SET');
}

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Función principal para manejar las peticiones
module.exports = async (req, res) => {
    console.log('🔄 API call received:', {
        method: req.method,
        url: req.url,
        headers: req.headers
    });
    
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Manejar preflight OPTIONS
    if (req.method === 'OPTIONS') {
        console.log('✅ Handling OPTIONS request');
        res.status(200).end();
        return;
    }
    
    // Solo aceptar POST
    if (req.method !== 'POST') {
        console.log('❌ Invalid method:', req.method);
        return res.status(405).json({ 
            success: false, 
            error: 'Método no permitido' 
        });
    }
    
    try {
        console.log('📦 Request body:', req.body);
        
        const { nombre, email, telefono, interes, mensaje, origen } = req.body;
        
        // Validar datos requeridos
        if (!nombre || !email) {
            console.log('❌ Missing required fields:', { nombre: !!nombre, email: !!email });
            return res.status(400).json({ 
                success: false, 
                error: 'Nombre y email son requeridos' 
            });
        }
        
        // Preparar datos para insertar
        const leadData = {
            nombre: nombre.trim(),
            email: email.trim().toLowerCase(),
            telefono: telefono ? telefono.trim() : null,
            interes: interes ? interes.trim() : null,
            mensaje: mensaje ? mensaje.trim() : null,
            origen: origen || 'formulario_contacto',
            fecha_registro: new Date().toISOString()
        };
        
        console.log('💾 Attempting to insert data:', leadData);
        
        // Insertar en Supabase
        const { data, error } = await supabase
            .from('leads')
            .insert([leadData])
            .select()
            .single();
        
        if (error) {
            console.error('❌ Error Supabase:', error);
            return res.status(500).json({ 
                success: false, 
                error: 'Error al guardar los datos',
                details: error.message
            });
        }
        
        console.log('✅ Lead guardado exitosamente:', data);
        
        // Respuesta exitosa
        return res.status(200).json({ 
            success: true, 
            message: 'Contacto guardado exitosamente',
            id: data.id
        });
        
    } catch (error) {
        console.error('❌ Error inesperado:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Error interno del servidor',
            details: error.message
        });
    }
}; 