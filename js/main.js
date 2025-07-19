// ===========================
// INICIALIZACIÓN AOS
// ===========================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    disable: window.innerWidth < 768 ? true : false
});

// ===========================
// PRELOADER
// ===========================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const book = preloader.querySelector('.book');
    const leftPage = preloader.querySelector('.left');
    const rightPage = preloader.querySelector('.right');

    // Detener animación CSS
    book.style.animation = 'none';

    // Timeline de animación mejorada
    const tl = anime.timeline({
        easing: 'easeInOutQuad',
        complete: () => {
            preloader.style.display = 'none';
        }
    });

    // Abrir el libro
    tl.add({
        targets: leftPage,
        rotateY: -90,
        duration: 800
    }, 0)
    .add({
        targets: rightPage,
        rotateY: 90,
        duration: 800
    }, 0)
    // Cerrar el libro
    .add({
        targets: leftPage,
        rotateY: 0,
        duration: 800
    }, 800)
    .add({
        targets: rightPage,
        rotateY: 0,
        duration: 800
    }, 800)
    // Desvanecer
    .add({
        targets: preloader,
        opacity: 0,
        duration: 600
    }, 1600);
});
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// ===========================
// ANIMACIONES HERO
// ===========================
// Animación de libros flotantes
const floatingBooks = document.querySelectorAll('.floating-book');
floatingBooks.forEach((book, index) => {
    anime({
        targets: book,
        translateY: [
            { value: -20, duration: 2000 },
            { value: 20, duration: 2000 }
        ],
        rotate: [
            { value: -5, duration: 1000 },
            { value: 5, duration: 1000 }
        ],
        easing: 'easeInOutSine',
        loop: true,
        delay: index * 1000
    });
});

// ===========================
// ANIMACIÓN DE NÚMEROS
// ===========================
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                number.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target;
            }
        };
        updateNumber();
    });
};

// Observador para activar animación de números cuando sea visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            numberObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Si hay elementos con números, observarlos
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    numberObserver.observe(statsSection);
}

// ===========================
// BOTÓN VOLVER ARRIBA
// ===========================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// FORMULARIO DE CONTACTO
// ===========================
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');

// Configuración de la base de datos Oracle
const dbConfig = {
    url: 'jdbc:oracle:thin:@localhost:1521:xe',
    username: 'system',
    password: 'hola'
};

// Función para enviar datos a la base de datos
async function saveLeadToDatabase(formData) {
    try {
        console.log('Enviando lead a la base de datos:', formData);
        
        // Detectar si estamos en desarrollo o producción
        const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const apiUrl = isDev ? 'http://localhost:5000/api/contact' : '/api/contact';
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Error al guardar en la base de datos');
        }
        
        const result = await response.json();
        console.log('Respuesta del servidor:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Manejador del formulario de contacto
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = {
        nombre: e.target.nombre.value,
        email: e.target.email.value,
        telefono: e.target.telefono.value,
        interes: e.target.interes.value,
        mensaje: e.target.mensaje.value,
        fecha_registro: new Date().toISOString(),
        origen: 'formulario_contacto'
    };
    
    // Deshabilitar el botón mientras se procesa
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    try {
        // Guardar en la base de datos
        await saveLeadToDatabase(formData);
        
        // Mostrar mensaje de éxito
        showNotification('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.', 'success');
        
        // Limpiar formulario
        contactForm.reset();
        
        // Animación de éxito
        anime({
            targets: contactForm,
            scale: [1, 0.95, 1],
            duration: 600,
            easing: 'easeInOutQuad'
        });
        
    } catch (error) {
        // Mostrar mensaje de error
        showNotification('Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.', 'error');
    } finally {
        // Restaurar botón
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
});

// Manejador del formulario de newsletter
newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    const formData = {
        email: email,
        fecha_registro: new Date().toISOString(),
        origen: 'newsletter'
    };
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Suscribiendo...';
    
    try {
        await saveLeadToDatabase(formData);
        showNotification('¡Te has suscrito exitosamente a nuestro newsletter!', 'success');
        newsletterForm.reset();
    } catch (error) {
        showNotification('Error al suscribirse. Por favor, intenta nuevamente.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
});

// ===========================
// SISTEMA DE NOTIFICACIONES
// ===========================
function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Agregar al body
    document.body.appendChild(notification);
    
    // Animar entrada
    anime({
        targets: notification,
        translateX: [-300, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });
    
    // Remover después de 5 segundos
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, -300],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInQuad',
            complete: () => {
                notification.remove();
            }
        });
    }, 5000);
}

// ===========================
// ANIMACIONES DE SCROLL
// ===========================
// Parallax effect para la hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ===========================
// ANIMACIONES DE GALERÍA
// ===========================
const galleryImages = document.querySelectorAll('.gallery-img');
galleryImages.forEach((img, index) => {
    img.addEventListener('mouseenter', () => {
        anime({
            targets: img,
            scale: 1.1,
            rotateZ: index % 2 === 0 ? 2 : -2,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    img.addEventListener('mouseleave', () => {
        anime({
            targets: img,
            scale: 1,
            rotateZ: 0,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// ===========================
// VALIDACIÓN DE FORMULARIOS
// ===========================
// Validación en tiempo real
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
});

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const name = input.name;
    
    let isValid = true;
    let errorMessage = '';
    
    // Validaciones específicas
    if (value === '') {
        isValid = false;
        errorMessage = 'Este campo es requerido';
    } else if (type === 'email' && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Por favor, ingresa un email válido';
    } else if (name === 'telefono' && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Por favor, ingresa un teléfono válido';
    }
    
    // Mostrar/ocultar error
    showInputError(input, isValid, errorMessage);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

function showInputError(input, isValid, errorMessage) {
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.error-message');
    
    if (!isValid) {
        input.style.borderColor = '#e74c3c';
        
        if (!existingError) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            errorDiv.style.color = '#e74c3c';
            errorDiv.style.fontSize = '0.8rem';
            errorDiv.style.marginTop = '5px';
            formGroup.appendChild(errorDiv);
            
            anime({
                targets: errorDiv,
                opacity: [0, 1],
                translateY: [-10, 0],
                duration: 300
            });
        }
    } else {
        input.style.borderColor = '#e0e0e0';
        
        if (existingError) {
            anime({
                targets: existingError,
                opacity: [1, 0],
                translateY: [0, -10],
                duration: 300,
                complete: () => {
                    existingError.remove();
                }
            });
        }
    }
}

// ===========================
// ESTILOS PARA NOTIFICACIONES
// ===========================
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 15px;
    max-width: 400px;
    z-index: 9999;
}

.notification i {
    font-size: 1.5rem;
}

.notification-success {
    border-left: 5px solid #27ae60;
}

.notification-success i {
    color: #27ae60;
}

.notification-error {
    border-left: 5px solid #e74c3c;
}

.notification-error i {
    color: #e74c3c;
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
</style>
`;

// Agregar estilos al head
document.head.insertAdjacentHTML('beforeend', notificationStyles);

// ===========================
// CONTROL DE VIDEO HERO CON AUDIO
// ===========================
function initHeroVideo() {
    const video = document.querySelector('.hero-video');
    const playPauseBtn = document.getElementById('videoToggle');
    const audioIndicator = document.getElementById('audioIndicator');
    const audioToggle = document.getElementById('audioToggle');
    const autoplayNotice = document.getElementById('autoplayNotice');
    const videoContainer = document.querySelector('.hero-video-container');
    
    if (video && playPauseBtn) {
        let audioEnabled = false;
        let videoPlaying = false;
        
        // Configurar video para intentar autoplay con audio
        video.muted = false;  // Intentar con audio primero
        video.volume = 0.7;   // Volumen moderado
        
        // Función para mostrar controles de audio
        const showAudioControls = () => {
            if (audioIndicator) {
                audioIndicator.classList.add('show');
                videoContainer.classList.add('video-controls-animated');
            }
        };
        
        // Función para mostrar notificación de autoplay bloqueado
        const showAutoplayNotice = () => {
            if (autoplayNotice) {
                autoplayNotice.classList.add('show');
                
                // Ocultar después de 5 segundos
                setTimeout(() => {
                    autoplayNotice.classList.remove('show');
                }, 5000);
            }
        };
        
        // Función para ocultar controles de audio
        const hideAudioControls = () => {
            if (audioIndicator) {
                audioIndicator.classList.remove('show');
            }
            if (autoplayNotice) {
                autoplayNotice.classList.remove('show');
            }
        };
        
        // Intentar autoplay con audio agresivo
        const attemptAutoplayWithAudio = async () => {
            try {
                // Primer intento: reproducir con audio
                await video.play();
                videoPlaying = true;
                audioEnabled = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                
                console.log('✅ Video iniciado con audio automáticamente');
                
                // Mostrar indicador brevemente para confirmar que tiene audio
                showAudioControls();
                setTimeout(() => {
                    if (audioEnabled && !video.muted) {
                        hideAudioControls();
                    }
                }, 3000);
                
            } catch (error) {
                console.log('❌ Autoplay con audio bloqueado:', error.message);
                
                try {
                    // Segundo intento: reproducir sin audio
                    video.muted = true;
                    await video.play();
                    videoPlaying = true;
                    audioEnabled = false;
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    
                    console.log('⚠️ Video iniciado sin audio (muted)');
                    
                    // Mostrar controles para activar audio
                    showAudioControls();
                    showAutoplayNotice();
                    
                } catch (mutedError) {
                    console.log('❌ Autoplay completamente bloqueado:', mutedError.message);
                    videoPlaying = false;
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                    showAutoplayNotice();
                }
            }
        };
        
        // Función para alternar audio
        const toggleAudio = () => {
            if (video.muted) {
                video.muted = false;
                audioEnabled = true;
                audioToggle.innerHTML = '<i class="fas fa-volume-up"></i><span>Audio activado</span>';
                console.log('🔊 Audio activado');
                
                // Ocultar controles después de mostrar confirmación
                setTimeout(() => {
                    hideAudioControls();
                }, 2000);
                
                // Animación de éxito
                anime({
                    targets: audioToggle,
                    scale: [1, 1.2, 1],
                    duration: 400,
                    easing: 'easeOutQuad'
                });
                
            } else {
                video.muted = true;
                audioEnabled = false;
                audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i><span>Audio desactivado</span>';
                console.log('🔇 Audio desactivado');
                
                setTimeout(() => {
                    audioToggle.innerHTML = '<i class="fas fa-volume-up"></i><span>Activar audio</span>';
                }, 1500);
            }
        };
        
        // Función para alternar play/pause
        const toggleVideo = () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                videoPlaying = true;
                
                // Si es la primera reproducción y no hay audio, mostrar controles
                if (video.muted && !audioEnabled) {
                    showAudioControls();
                }
                
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                videoPlaying = false;
            }
            
            // Animación del botón
            anime({
                targets: playPauseBtn,
                scale: [1, 1.2, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        };
        
        // Event listeners
        playPauseBtn.addEventListener('click', toggleVideo);
        video.addEventListener('click', toggleVideo);
        
        // Listener para el botón de audio
        if (audioToggle) {
            audioToggle.addEventListener('click', toggleAudio);
        }
        
        // Listener para la notificación de autoplay
        if (autoplayNotice) {
            autoplayNotice.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }
                if (video.muted) {
                    toggleAudio();
                }
                autoplayNotice.classList.remove('show');
            });
        }
        
        // Manejo del final del video
        video.addEventListener('ended', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            setTimeout(() => {
                video.currentTime = 0;
                if (!video.paused) {
                    video.play();
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }
            }, 1000);
        });
        
        // Auto-pause cuando está fuera de vista (optimización de rendimiento)
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !video.paused) {
                    video.pause();
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                    videoPlaying = false;
                }
            });
        }, { threshold: 0.25 });
        
        videoObserver.observe(video);
        
        // Intentar iniciar video con un pequeño delay
        setTimeout(() => {
            attemptAutoplayWithAudio();
        }, 500);
        
        // Fallback: Intentar activar audio en cualquier interacción del usuario
        const enableAudioOnInteraction = () => {
            if (video.muted && videoPlaying) {
                showAudioControls();
            }
        };
        
        // Escuchar interacciones del usuario en toda la página
        document.addEventListener('click', enableAudioOnInteraction, { once: true });
        document.addEventListener('keydown', enableAudioOnInteraction, { once: true });
        document.addEventListener('scroll', enableAudioOnInteraction, { once: true });
    }
}

// ===========================
// INICIALIZACIÓN
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('MR.BEELECTOR - Landing Page cargada exitosamente');
    
    // Inicializar video hero
    initHeroVideo();
    
    // Detectar preferencia de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        AOS.refresh();
        console.log('Animaciones reducidas por preferencia del usuario');
    }
    
    // ===========================
    // ANIMACIÓN MEJORADA PARA BOTONES GRANDES
    // ===========================
    const largeBtns = document.querySelectorAll('.btn-large');
    largeBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            anime({
                targets: btn,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            anime({
                targets: btn,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        btn.addEventListener('mousedown', () => {
            anime({
                targets: btn,
                scale: 0.95,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });
        
        btn.addEventListener('mouseup', () => {
            anime({
                targets: btn,
                scale: 1.05,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });
    });
});