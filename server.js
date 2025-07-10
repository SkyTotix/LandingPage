const express = require('express');
const cors = require('cors');
const { createTable, saveContact } = require('./database');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Inicializar base de datos
async function initDB() {
    console.log('🔧 Iniciando base de datos...');
    const success = await createTable();
    if (success) {
        console.log('✅ Base de datos lista');
    } else {
        console.log('❌ Error con la base de datos');
    }
}

// Ruta para guardar contacto
app.post('/api/contact', async (req, res) => {
    try {
        const result = await saveContact(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: 'Error del servidor' 
        });
    }
});

// Iniciar servidor
app.listen(PORT, async () => {
    await initDB();
    console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
}); 