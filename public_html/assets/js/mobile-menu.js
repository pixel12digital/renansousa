// Mobile Menu Controller
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    // Função para abrir o menu mobile
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        hamburgerMenu.classList.add('active');
        body.classList.add('menu-open'); // Adiciona classe para esconder hamburger
        body.style.overflow = 'hidden'; // Previne scroll do body
    }

    // Função para fechar o menu mobile
    function closeMobileMenuFunc() {
        mobileMenu.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        body.classList.remove('menu-open'); // Remove classe
        body.style.overflow = ''; // Restaura scroll do body
    }

    // Event listeners
    hamburgerMenu.addEventListener('click', openMobileMenu);
    closeMobileMenu.addEventListener('click', closeMobileMenuFunc);

    // Fechar menu ao clicar em um link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenuFunc);
    });

    // Fechar menu ao clicar fora dele
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenuFunc();
        }
    });

    // Fechar menu com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenuFunc();
        }
    });

    // Fechar menu ao redimensionar a tela para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenuFunc();
        }
    });

    // Smooth scroll para links de navegação
    function smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Adicionar smooth scroll aos links do menu mobile
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
            }
        });
    });

    // Adicionar smooth scroll aos links do menu desktop também
    const desktopNavLinks = document.querySelectorAll('.nav-links a');
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
            }
        });
    });

    // Função para destacar o link ativo baseado na seção atual
    function highlightActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.mobile-nav-link, .nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Executar highlight ao scroll
    window.addEventListener('scroll', highlightActiveLink);
    
    // Executar highlight na carga inicial
    highlightActiveLink();

    // Animação de entrada para os links do menu mobile
    function animateMobileMenuLinks() {
        const links = document.querySelectorAll('.mobile-nav-link');
        links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    // Executar animação quando o menu abrir
    hamburgerMenu.addEventListener('click', function() {
        setTimeout(animateMobileMenuLinks, 100);
    });

    // Reset das animações quando o menu fechar
    function resetMobileMenuAnimations() {
        const links = document.querySelectorAll('.mobile-nav-link');
        links.forEach(link => {
            link.style.transition = 'none';
            link.style.opacity = '';
            link.style.transform = '';
        });
    }

    closeMobileMenu.addEventListener('click', resetMobileMenuAnimations);
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            resetMobileMenuAnimations();
        }
    });

    // Adicionar aria-labels para acessibilidade
    hamburgerMenu.setAttribute('aria-label', 'Abrir menu de navegação');
    closeMobileMenu.setAttribute('aria-label', 'Fechar menu de navegação');
    
    // Adicionar role para acessibilidade
    mobileMenu.setAttribute('role', 'dialog');
    mobileMenu.setAttribute('aria-modal', 'true');
    mobileMenu.setAttribute('aria-label', 'Menu de navegação');
}); 