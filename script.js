// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Force mobile layout for floating cards
    function forceMobileLayout() {
        if (window.innerWidth <= 768) {
            const floatingCards = document.querySelectorAll('.floating-card');
            floatingCards.forEach(card => {
                card.style.position = 'relative';
                card.style.transform = 'none';
                card.style.top = 'auto';
                card.style.left = 'auto';
                card.style.right = 'auto';
                card.style.bottom = 'auto';
                card.style.animation = 'none';
            });
        }
    }
    
    // Apply on load and resize
    forceMobileLayout();
    window.addEventListener('resize', forceMobileLayout);
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Modal functionality
    const modal = document.getElementById('cadastroModal');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelarCadastro');
    const cadastroForm = document.getElementById('cadastroForm');
    
    // Open modal when clicking cadastro buttons
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('Cadastrar') || button.textContent.includes('Vender na Plataforma')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        }
    });
    
    // App Download Modal functionality
    const appModal = document.getElementById('appDownloadModal');
    const appCloseBtn = document.querySelector('.app-close');
    
    // Open app modal when clicking download/compra buttons
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('Explorar Produtos') || 
            button.textContent.includes('Começar a Comprar') ||
            button.textContent.includes('Comprar')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                appModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    // Close app modal functions
    function closeAppModal() {
        appModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    appCloseBtn.addEventListener('click', closeAppModal);
    
    // Close app modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === appModal) {
            closeAppModal();
        }
    });
    
    // Close app modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && appModal.style.display === 'block') {
            closeAppModal();
        }
    });
    
    // Close modal functions
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        cadastroForm.reset();
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Form validation and submission
    cadastroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(cadastroForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        const requiredFields = ['nomeResponsavel', 'nomeEmpresa', 'cnpj', 'areaAtuacao', 'faturamento', 'localizacao', 'email', 'telefone', 'termos'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!data[field] || data[field].trim() === '') {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#e1e5e9';
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = cadastroForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Cadastro enviado com sucesso! Entraremos em contato em breve.');
                closeModal();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
    
    // CNPJ formatting
    const cnpjInput = document.getElementById('cnpj');
    cnpjInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
        e.target.value = value;
    });
    
    // Phone formatting
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });
    
    // App store download links
    const googlePlayBtn = document.querySelector('.google-play');
    const appStoreBtn = document.querySelector('.app-store');
    
    googlePlayBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Simulate Google Play Store redirect
        alert('Redirecionando para o Google Play Store...\n\nEm breve o app estará disponível!');
        // In a real implementation, this would redirect to:
        // window.open('https://play.google.com/store/apps/details?id=com.ecomarket.app', '_blank');
    });
    
    appStoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Simulate App Store redirect
        alert('Redirecionando para a App Store...\n\nEm breve o app estará disponível!');
        // In a real implementation, this would redirect to:
        // window.open('https://apps.apple.com/app/ecomarket/id123456789', '_blank');
    });
    
    // Logo scroll to top functionality
    const logo = document.querySelector('.nav-logo');
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Login Modal functionality
    const loginModal = document.getElementById('loginModal');
    const loginCloseBtn = document.querySelector('.login-close');
    const cancelLoginBtn = document.getElementById('cancelarLogin');
    const loginForm = document.getElementById('loginForm');
    const abrirCadastroLink = document.getElementById('abrirCadastro');
    
    // Open login modal when clicking "Entrar" button
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('Entrar')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                loginModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    // Close login modal functions
    function closeLoginModal() {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        loginForm.reset();
    }
    
    loginCloseBtn.addEventListener('click', closeLoginModal);
    cancelLoginBtn.addEventListener('click', closeLoginModal);
    
    // Close login modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });
    
    // Close login modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal.style.display === 'block') {
            closeLoginModal();
        }
    });
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailLogin = document.getElementById('emailLogin').value;
        const senhaLogin = document.getElementById('senhaLogin').value;
        
        if (emailLogin && senhaLogin) {
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Entrando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Login realizado com sucesso! Bem-vindo ao EcoMarket!');
                closeLoginModal();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
    
    // Social login buttons
    document.querySelector('.google-btn').addEventListener('click', function() {
        alert('Redirecionando para login com Google...');
    });
    
    document.querySelector('.facebook-btn').addEventListener('click', function() {
        alert('Redirecionando para login com Facebook...');
    });
    
    // Link to open cadastro modal from login
    abrirCadastroLink.addEventListener('click', function(e) {
        e.preventDefault();
        closeLoginModal();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        const requiredFields = ['nomeContato', 'emailContato', 'assuntoContato', 'mensagemContato'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!data[field] || data[field].trim() === '') {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#e1e5e9';
            }
        });
        
        if (isValid) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
});
