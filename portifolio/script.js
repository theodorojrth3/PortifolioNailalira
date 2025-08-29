// script.js

// Função para lidar com o envio do formulário
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio padrão do formulário
    
    // Obtém os valores dos campos
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Aqui você poderia enviar os dados para um servidor
    // Por enquanto, vamos apenas mostrar um alerta
    alert(`Obrigado, ${name}! Sua mensagem foi enviada. Entrarei em contato em breve.`);
    
    // Limpa o formulário
    this.reset();
});

// Função para adicionar animação suave ao rolar para as seções
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70, // Ajusta para o header fixo
            behavior: 'smooth'
        });
    });
});

// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animação dos links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Animação do burger
    burger.classList.toggle('toggle');
});

// Animação ao rolar
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .qualification, .gallery-item, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
};

// Inicializa as animações
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .qualification, .gallery-item, .testimonial-card');
    
    elements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
});

// Adiciona o evento de scroll
window.addEventListener('scroll', animateOnScroll);

// Animação inicial
setTimeout(animateOnScroll, 100);
// Carousel Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
let carouselInterval;

// Function to start the automatic carousel
function startCarousel() {
    carouselInterval = setInterval(() => {
        moveSlide(1);
    }, 3000); // Change slide every 3 seconds
}

// Function to stop the automatic carousel
function stopCarousel() {
    clearInterval(carouselInterval);
}

function moveSlide(direction) {
    // Reset the automatic carousel when user interacts
    stopCarousel();
    startCarousel();
    
    currentSlideIndex += direction;
    
    // Loop back to the beginning or end if necessary
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    updateCarousel();
}

function currentSlide(index) {
    // Reset the automatic carousel when user interacts
    stopCarousel();
    startCarousel();
    
    currentSlideIndex = index - 1;
    updateCarousel();
}

function updateCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
    startCarousel();
    
    // Pause carousel when user hovers over it
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);
});