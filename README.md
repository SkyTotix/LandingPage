# MR.BEELECTOR - Landing Page

## 🚀 Descripción

Landing page moderna y atractiva para la librería MR.BEELECTOR, diseñada para invitar a las personas a visitar el espacio físico. La página incluye animaciones elegantes, diseño responsive y un formulario de captura de leads integrado.

## 🎨 Características

- **Diseño Moderno y Atractivo**: Interfaz visual que refleja la esencia acogedora de una librería
- **Animaciones Suaves**: Utilizando AOS (Animate On Scroll) y Anime.js
- **Totalmente Responsive**: Optimizado para todos los dispositivos
- **Formulario de Contacto**: Captura de leads con validación en tiempo real
- **Integración con Base de Datos**: Preparado para conectar con Oracle Database
- **SEO Optimizado**: Estructura semántica y metadatos apropiados
- **Rendimiento Optimizado**: Carga rápida y animaciones eficientes

## 📋 Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local para desarrollo (opcional)
- Base de datos Oracle XE (para almacenamiento de leads)

## 🛠️ Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   git clone [url-del-repositorio]
   cd MR.BEELECTOR-Landing
   ```

2. **Estructura de archivos**
   ```
   MR.BEELECTOR-Landing/
   ├── index.html
   ├── css/
   │   └── styles.css
   ├── js/
   │   └── main.js
   ├── images/
   │   ├── logo.png
   │   ├── logo-white.png
   │   ├── hero-bookstore.jpg
   │   ├── gallery1.jpg
   │   ├── gallery2.jpg
   │   ├── gallery3.jpg
   │   ├── gallery4.jpg
   │   ├── book1.png
   │   ├── book2.png
   │   └── book3.png
   └── README.md
   ```

3. **Agregar imágenes**
   - Coloca tu logo en `images/logo.png` y `images/logo-white.png`
   - Agrega fotos de tu librería en la carpeta `images/`
   - Las imágenes de libros flotantes pueden ser iconos PNG transparentes

## 🎯 Configuración

### 1. Personalizar información de contacto

Edita el archivo `index.html` y busca la sección de contacto para actualizar:
- Dirección
- Teléfono
- Email
- Horarios
- Enlaces a redes sociales

### 2. Configurar la base de datos

Para conectar con tu base de datos Oracle, necesitarás crear un backend. El frontend está preparado para enviar datos a un endpoint `/api/leads`.

**Estructura de la tabla sugerida:**
```sql
CREATE TABLE leads (
    id NUMBER PRIMARY KEY,
    nombre VARCHAR2(100),
    email VARCHAR2(100),
    telefono VARCHAR2(20),
    interes VARCHAR2(50),
    mensaje CLOB,
    fecha_registro TIMESTAMP,
    origen VARCHAR2(50)
);
```

### 3. Personalizar colores

Edita las variables CSS en `css/styles.css`:
```css
:root {
    --primary-color: #D2691E; /* Color principal */
    --secondary-color: #8B4513; /* Color secundario */
    --accent-color: #FFD700; /* Color de acento */
}
```

### 4. Actualizar contenido

- **Hero Section**: Modifica el título y subtítulo principal
- **Sobre Nosotros**: Actualiza la historia de tu librería
- **Eventos**: Personaliza los eventos próximos
- **Experiencias**: Adapta las experiencias que ofreces

## 🚀 Uso

### Desarrollo local

1. Abre `index.html` directamente en tu navegador, o
2. Usa un servidor local como Live Server en VS Code

### Producción

1. Sube todos los archivos a tu servidor web
2. Configura el backend para manejar los formularios
3. Asegúrate de que las rutas de las imágenes sean correctas

## 📱 Características Responsive

La página se adapta automáticamente a:
- **Desktop**: Diseño completo con todas las animaciones
- **Tablet**: Layout ajustado con menú hamburguesa
- **Móvil**: Diseño optimizado para pantallas pequeñas

## 🎭 Animaciones

### AOS (Animate On Scroll)
- Fade up/down/left/right
- Zoom in
- Flip animations

### Anime.js
- Animaciones del preloader
- Libros flotantes
- Efectos hover en galería
- Validación de formularios

## 🔧 Personalización Avanzada

### Agregar nuevas secciones

1. Añade el HTML en `index.html`
2. Estiliza en `css/styles.css`
3. Añade interactividad en `js/main.js`

### Modificar animaciones

Las animaciones se pueden ajustar en:
- `data-aos` atributos en HTML
- Configuración de AOS en `main.js`
- Parámetros de Anime.js en `main.js`

## 📊 SEO y Metadatos

Asegúrate de actualizar en `index.html`:
- `<title>` tag
- Meta descriptions
- Open Graph tags (para redes sociales)
- Favicon

## 🐛 Solución de Problemas

### Las animaciones no funcionan
- Verifica que los CDN estén cargando correctamente
- Revisa la consola del navegador por errores

### El formulario no envía datos
- Necesitas implementar el backend
- Por ahora, los datos se muestran en la consola

### Imágenes no se muestran
- Verifica las rutas en el atributo `src`
- Asegúrate de que las imágenes estén en la carpeta correcta

## 📚 Recursos Adicionales

- [AOS Documentation](https://michalsnik.github.io/aos/)
- [Anime.js Documentation](https://animejs.com/documentation/)
- [Font Awesome Icons](https://fontawesome.com/icons)

## 📄 Licencia

Este proyecto está diseñado específicamente para MR.BEELECTOR. Todos los derechos reservados.

## 🤝 Soporte

Si tienes preguntas o necesitas ayuda con la personalización, no dudes en contactar.

---

**Desarrollado con ❤️ para MR.BEELECTOR - Donde las historias cobran vida** 