# 🚀 Guía de Deployment: MR.BEELECTOR Landing Page

## Vercel + Supabase | Guía Completa Paso a Paso

### 📋 Requisitos Previos
- Una cuenta de GitHub (gratis)
- Una cuenta de Vercel (gratis)
- Una cuenta de Supabase (gratis)

---

## 🎯 PARTE 1: Configurar Supabase (Base de Datos)

### 1. Crear cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Regístrate con GitHub (es gratis)

### 2. Crear nuevo proyecto
1. Haz clic en "New Project"
2. Elige tu organización
3. Nombre del proyecto: `mr-beelector-landing`
4. Crea una contraseña segura para la base de datos
5. Región: `South America (São Paulo)` (más cercana a ti)
6. Haz clic en "Create new project"

### 3. Crear la tabla de leads
1. Ve a la pestaña "SQL Editor"
2. Copia y pega este código:

```sql
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
```

3. Haz clic en "Run" (▶️)

### 4. Obtener las credenciales
1. Ve a "Settings" > "API"
2. Copia estos dos valores:
   - **Project URL** (algo como: `https://abc123.supabase.co`)
   - **anon public key** (empieza con `eyJhbGciOiJIUzI1NiI...`)

---

## 🎯 PARTE 2: Configurar Vercel (Hosting)

### 1. Crear cuenta en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up"
3. Regístrate con GitHub (es gratis)

### 2. Conectar tu repositorio GitHub
1. Asegúrate de que tu código esté en GitHub
2. En Vercel, haz clic en "Import Project"
3. Selecciona tu repositorio `LandingPage`

### 3. Configurar variables de entorno
1. En la pantalla de configuración, busca "Environment Variables"
2. Agrega estas dos variables:
   - **Nombre**: `SUPABASE_URL`
   - **Valor**: Tu Project URL de Supabase
   - **Nombre**: `SUPABASE_ANON_KEY`
   - **Valor**: Tu anon public key de Supabase

### 4. Hacer el deploy
1. Haz clic en "Deploy"
2. Espera 2-3 minutos
3. ¡Tu sitio estará live!

---

## 🎯 PARTE 3: Preparar tu código

### 1. Instalar las nuevas dependencias
```bash
npm install @supabase/supabase-js
```

### 2. Verificar que tienes estos archivos:
- ✅ `api/contact.js` - Función serverless para Vercel
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `package.json` - Dependencias actualizadas
- ✅ `database.js` - Configuración de Supabase

### 3. Subir los cambios a GitHub
```bash
git add .
git commit -m "Configuración Vercel + Supabase"
git push origin main
```

---

## 🎯 PARTE 4: Verificar que funciona

### 1. Probar el formulario
1. Ve a tu sitio en Vercel (algo como: `mr-beelector.vercel.app`)
2. Llena el formulario de contacto
3. Envía un mensaje de prueba

### 2. Verificar en Supabase
1. Ve a tu proyecto en Supabase
2. Ve a "Table Editor"
3. Selecciona la tabla "leads"
4. Deberías ver tu mensaje de prueba

---

## 🎯 PARTE 5: Ver tus leads (Dashboard)

### Para ver todos los mensajes recibidos:
1. Ve a Supabase > Table Editor > leads
2. Aquí verás todos los contactos con:
   - Nombre
   - Email
   - Teléfono
   - Interés
   - Mensaje
   - Fecha de registro

### Filtrar por fecha:
1. Haz clic en el filtro
2. Selecciona "fecha_registro"
3. Elige el rango de fechas

---

## 🎯 PARTE 6: Dominio personalizado (Opcional)

### Si quieres tu propio dominio:
1. Compra un dominio (ej: mrbeelector.com)
2. En Vercel > Settings > Domains
3. Agrega tu dominio
4. Sigue las instrucciones para configurar DNS

---

## 🚨 Solución de Problemas

### Error: "Environment variables not found"
1. Ve a Vercel > Settings > Environment Variables
2. Verifica que `SUPABASE_URL` y `SUPABASE_ANON_KEY` estén configuradas
3. Redeploy el proyecto

### Error: "Table doesn't exist"
1. Ve a Supabase > SQL Editor
2. Ejecuta nuevamente el script de creación de tabla
3. Verifica que la tabla "leads" existe

### El formulario no envía datos
1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Verifica que las variables de entorno estén configuradas

---

## 📊 Costos

### Todo es GRATIS hasta:
- **Supabase**: 500MB de base de datos, 50MB de archivos
- **Vercel**: 100GB de ancho de banda, builds ilimitados
- **GitHub**: Repositorios públicos ilimitados

### Esto es suficiente para:
- Miles de formularios por mes
- Cientos de miles de visitas
- Perfecto para un negocio local

---

## 🎉 ¡Felicitaciones!

Tu landing page ahora está:
- ✅ Live en internet 24/7
- ✅ Recibiendo y guardando leads
- ✅ Completamente gratis
- ✅ Escalable automáticamente
- ✅ Con SSL (https) incluido

### URL de tu sitio:
`https://tu-proyecto.vercel.app`

### Para actualizaciones futuras:
1. Haz cambios en tu código
2. Sube a GitHub: `git push origin main`
3. Vercel se actualiza automáticamente

---

**¿Necesitas ayuda?**
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs 