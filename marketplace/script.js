// Global variables
let currentProducts = [];
let filteredProducts = [];
let currentFilter = 'all';
let currentPage = 1;
const productsPerPage = 12;

// Sample products data
const sampleProducts = [
    {
        id: 1,
        title: "Camiseta Orgânica EcoFashion",
        description: "Feita com algodão 100% orgânico, sem uso de pesticidas ou químicos nocivos.",
        price: "R$ 89,90",
        category: "moda",
        rating: 4.8,
        image: "fas fa-tshirt",
        company: "EcoFashion",
        sustainable: true
    },
    {
        id: 2,
        title: "Lâmpada LED Solar",
        description: "Iluminação sustentável com painel solar integrado. 8 horas de autonomia.",
        price: "R$ 149,90",
        category: "casa",
        rating: 4.6,
        image: "fas fa-lightbulb",
        company: "GreenHome",
        sustainable: true
    },
    {
        id: 3,
        title: "Azeite Orgânico Extra Virgem",
        description: "Produzido sem agrotóxicos, direto do produtor local. 500ml.",
        price: "R$ 34,90",
        category: "alimentos",
        rating: 4.9,
        image: "fas fa-apple-alt",
        company: "BioFoods",
        sustainable: true
    },
    {
        id: 4,
        title: "Shampoo Natural de Babosa",
        description: "Fórmula 100% natural, sem sulfatos, parabenos ou silicones.",
        price: "R$ 45,90",
        category: "beleza",
        rating: 4.7,
        image: "fas fa-spa",
        company: "NatureBeauty",
        sustainable: true
    },
    {
        id: 5,
        title: "Bicicleta Elétrica Verde",
        description: "Bateria de lítio recarregável, 50km de autonomia, feita com materiais reciclados.",
        price: "R$ 2.499,90",
        category: "mobilidade",
        rating: 4.5,
        image: "fas fa-bicycle",
        company: "EcoMobility",
        sustainable: true
    },
    {
        id: 6,
        title: "Notebook Solar Portátil",
        description: "Carregamento solar integrado, bateria de longa duração, chassis de plástico reciclado.",
        price: "R$ 3.299,90",
        category: "tecnologia",
        rating: 4.4,
        image: "fas fa-laptop",
        company: "GreenTech",
        sustainable: true
    },
    {
        id: 7,
        title: "Vestido de Linho Orgânico",
        description: "Corte clássico, tecido 100% linho orgânico, tingimento natural.",
        price: "R$ 189,90",
        category: "moda",
        rating: 4.8,
        image: "fas fa-tshirt",
        company: "EcoFashion",
        sustainable: true
    },
    {
        id: 8,
        title: "Composteira Doméstica",
        description: "Sistema de compostagem para resíduos orgânicos, 50L de capacidade.",
        price: "R$ 199,90",
        category: "casa",
        rating: 4.6,
        image: "fas fa-recycle",
        company: "GreenHome",
        sustainable: true
    },
    {
        id: 9,
        title: "Mel Orgânico de Eucalipto",
        description: "Produzido por abelhas em ambiente livre de agrotóxicos. 500g.",
        price: "R$ 28,90",
        category: "alimentos",
        rating: 4.9,
        image: "fas fa-apple-alt",
        company: "BioFoods",
        sustainable: true
    },
    {
        id: 10,
        title: "Creme Facial Natural",
        description: "Hidratante facial com ingredientes 100% naturais, vegano e cruelty-free.",
        price: "R$ 67,90",
        category: "beleza",
        rating: 4.7,
        image: "fas fa-spa",
        company: "NatureBeauty",
        sustainable: true
    },
    {
        id: 11,
        title: "Scooter Elétrica Compacta",
        description: "Veículo elétrico urbano, bateria removível, design sustentável.",
        price: "R$ 1.899,90",
        category: "mobilidade",
        rating: 4.3,
        image: "fas fa-motorcycle",
        company: "EcoMobility",
        sustainable: true
    },
    {
        id: 12,
        title: "Carregador Solar USB",
        description: "Carregador portátil com painel solar, compatível com todos os dispositivos USB.",
        price: "R$ 89,90",
        category: "tecnologia",
        rating: 4.5,
        image: "fas fa-solar-panel",
        company: "GreenTech",
        sustainable: true
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadProducts();
    loadFeaturedProducts();
    
    // Load products for all carousels
    setTimeout(() => {
        loadProducts();
    }, 100);
});

// Initialize app
function initializeApp() {
    currentProducts = [...sampleProducts];
    filteredProducts = [...sampleProducts];
    renderProducts();
    updateProductCount();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Search functionality
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts();
        });
    }

    // Form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    const companyForm = document.getElementById('companyForm');
    if (companyForm) {
        companyForm.addEventListener('submit', handleCompanyForm);
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginForm);
    }

    // Modal close on outside click
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Smooth scrolling for navigation links
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
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openLoginModal() {
    openModal('loginModal');
}

function openCompanyModal() {
    openModal('companyModal');
}

function openAppModal() {
    openModal('appModal');
}

function openRegisterModal() {
    closeModal('loginModal');
    // Here you would typically open a register modal
    alert('Funcionalidade de cadastro será implementada em breve!');
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Product filtering
function filterProducts(category) {
    currentFilter = category;
    
    if (category === 'all') {
        filteredProducts = [...currentProducts];
    } else {
        filteredProducts = currentProducts.filter(product => product.category === category);
    }
    
    currentPage = 1;
    renderProducts();
    updateProductCount();
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[onclick="filterProducts('${category}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('mainSearch') || document.getElementById('productSearch');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    if (searchTerm === '') {
        filteredProducts = [...currentProducts];
    } else {
        filteredProducts = currentProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.company.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    renderProducts();
    updateProductCount();
}

// Load products
function loadProducts() {
    renderProducts();
    updateProductCount();
}

// Load featured products
function loadFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredProductsGrid');
    if (!featuredGrid) return;
    
    // Get first 6 products as featured
    const featuredProducts = currentProducts.slice(0, 6);
    
    const productHTML = featuredProducts.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">
                <i class="${product.image}"></i>
                <div class="product-badge">DESTAQUE</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">${product.price}</span>
                    <span class="original-price">R$ ${(parseFloat(product.price.replace('R$ ', '').replace(',', '.')) * 1.3).toFixed(2).replace('.', ',')}</span>
                    <span class="discount-badge">${Math.floor(Math.random() * 50) + 10}% OFF</span>
                </div>
                <div class="product-installments">12x R$ ${(parseFloat(product.price.replace('R$ ', '').replace(',', '.')) / 12).toFixed(2).replace('.', ',')} sem juros</div>
                <div class="product-shipping">Frete grátis</div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="btn-wishlist" onclick="event.stopPropagation(); addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    featuredGrid.innerHTML = productHTML;
}

// Render products in Mercado Livre style
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const relatedProductsGrid = document.getElementById('relatedProductsGrid');
    const cartProductsGrid = document.getElementById('cartProductsGrid');
    
    const grids = [productsGrid, relatedProductsGrid, cartProductsGrid].filter(Boolean);
    
    if (grids.length === 0) return;

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    if (productsToShow.length === 0) {
        grids.forEach(grid => {
            grid.innerHTML = `
                <div style="flex: 1; text-align: center; padding: 3rem; color: #666;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>Nenhum produto encontrado</h3>
                    <p>Tente ajustar seus filtros ou termo de busca.</p>
                </div>
            `;
        });
        return;
    }

    const productHTML = productsToShow.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">
                <i class="${product.image}"></i>
                <div class="product-badge">${Math.floor(Math.random() * 50) + 10}% OFF</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">${product.price}</span>
                    <span class="original-price">R$ ${(parseFloat(product.price.replace('R$ ', '').replace(',', '.')) * 1.3).toFixed(2).replace('.', ',')}</span>
                    <span class="discount-badge">${Math.floor(Math.random() * 50) + 10}% OFF</span>
                </div>
                <div class="product-installments">12x R$ ${(parseFloat(product.price.replace('R$ ', '').replace(',', '.')) / 12).toFixed(2).replace('.', ',')} sem juros</div>
                <div class="product-shipping">Frete grátis</div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="btn-wishlist" onclick="event.stopPropagation(); addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    grids.forEach(grid => {
        grid.innerHTML = productHTML;
    });
}

// Load more products
function loadMoreProducts() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
        
        // Hide load more button if all products are shown
        const loadMoreBtn = document.querySelector('.btn-load-more');
        if (currentPage >= totalPages && loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// Update product count
function updateProductCount() {
    const count = filteredProducts.length;
    const total = currentProducts.length;
    
    // Update any product count displays
    console.log(`Showing ${count} of ${total} products`);
}

// Product actions
function viewProduct(productId) {
    const product = currentProducts.find(p => p.id === productId);
    if (product) {
        alert(`Visualizando: ${product.title}\n\nPreço: ${product.price}\n\n${product.description}`);
    }
}

function addToCart(productId) {
    const product = currentProducts.find(p => p.id === productId);
    if (product) {
        // Here you would typically add to cart logic
        showMessage(`"${product.title}" adicionado ao carrinho!`, 'success');
    }
}

function addToWishlist(productId) {
    const product = currentProducts.find(p => p.id === productId);
    if (product) {
        // Here you would typically add to wishlist logic
        showMessage(`"${product.title}" adicionado à lista de desejos!`, 'success');
    }
}

// Form handlers
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };
    
    // Simulate form submission
    showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    document.getElementById('contactForm').reset();
}

function handleCompanyForm(e) {
    e.preventDefault();
    
    const formData = {
        responsible: document.getElementById('companyResponsible').value,
        companyName: document.getElementById('companyName').value,
        cnpj: document.getElementById('companyCNPJ').value,
        area: document.getElementById('companyArea').value,
        revenue: document.getElementById('companyRevenue').value,
        location: document.getElementById('companyLocation').value,
        email: document.getElementById('companyEmail').value,
        phone: document.getElementById('companyPhone').value,
        description: document.getElementById('companyDescription').value,
        terms: document.getElementById('companyTerms').checked
    };
    
    // Simulate form submission
    showMessage('Cadastro da empresa enviado com sucesso! Analisaremos sua solicitação e entraremos em contato em breve.', 'success');
    document.getElementById('companyForm').reset();
    closeModal('companyModal');
}

function handleLoginForm(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login
    if (email && password) {
        showMessage('Login realizado com sucesso!', 'success');
        closeModal('loginModal');
    } else {
        showMessage('Por favor, preencha todos os campos.', 'error');
    }
}

// Utility functions
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the page
    const body = document.body;
    body.insertBefore(messageDiv, body.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Category filter buttons (if you want to add them)
function createFilterButtons() {
    const categories = [
        { id: 'all', name: 'Todos' },
        { id: 'moda', name: 'Moda' },
        { id: 'casa', name: 'Casa' },
        { id: 'alimentos', name: 'Alimentos' },
        { id: 'beleza', name: 'Beleza' },
        { id: 'mobilidade', name: 'Mobilidade' },
        { id: 'tecnologia', name: 'Tecnologia' }
    ];
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-buttons';
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = category.name;
        button.onclick = () => filterProducts(category.id);
        if (category.id === 'all') button.classList.add('active');
        filterContainer.appendChild(button);
    });
    
    const productsSection = document.querySelector('.products .container');
    if (productsSection) {
        const productsHeader = productsSection.querySelector('.products-header');
        productsHeader.insertAdjacentElement('afterend', filterContainer);
    }
}

// Initialize filter buttons
document.addEventListener('DOMContentLoaded', function() {
    createFilterButtons();
});

// Add some interactive animations
function addAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .category-card, .product-card, .partner-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    addAnimations();
});

// Add loading states
function showLoading(element) {
    if (element) {
        element.innerHTML = '<div class="loading"></div>';
    }
}

// Add to cart functionality (simplified)
let cart = [];
let wishlist = [];

function addToCart(productId) {
    const product = currentProducts.find(p => p.id === productId);
    if (product && !cart.find(item => item.id === productId)) {
        cart.push(product);
        showMessage(`"${product.title}" adicionado ao carrinho!`, 'success');
        updateCartCount();
    } else if (cart.find(item => item.id === productId)) {
        showMessage('Produto já está no carrinho!', 'error');
    }
}

function addToWishlist(productId) {
    const product = currentProducts.find(p => p.id === productId);
    if (product && !wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        showMessage(`"${product.title}" adicionado à lista de desejos!`, 'success');
    } else if (wishlist.find(item => item.id === productId)) {
        showMessage('Produto já está na lista de desejos!', 'error');
    }
}

function updateCartCount() {
    // Update cart count in UI if cart icon exists
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Add touch support for mobile
function addTouchSupport() {
    // Add touch event listeners for better mobile experience
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize touch support
document.addEventListener('DOMContentLoaded', function() {
    addTouchSupport();
});

// Add search suggestions
function addSearchSuggestions() {
    const searchInput = document.getElementById('productSearch');
    if (!searchInput) return;
    
    const suggestions = [
        'camiseta orgânica',
        'lâmpada solar',
        'alimento orgânico',
        'cosmético natural',
        'bicicleta elétrica',
        'notebook solar'
    ];
    
    searchInput.addEventListener('focus', function() {
        // Show suggestions dropdown (simplified)
        console.log('Sugestões de busca:', suggestions);
    });
}

// Initialize search suggestions
document.addEventListener('DOMContentLoaded', function() {
    addSearchSuggestions();
});

// Add product comparison functionality
function compareProducts(productIds) {
    if (productIds.length < 2) {
        showMessage('Selecione pelo menos 2 produtos para comparar', 'error');
        return;
    }
    
    if (productIds.length > 4) {
        showMessage('Máximo de 4 produtos para comparação', 'error');
        return;
    }
    
    // Here you would implement product comparison modal
    showMessage('Funcionalidade de comparação será implementada em breve!', 'success');
}

// Add product rating functionality
function rateProduct(productId, rating) {
    const product = currentProducts.find(p => p.id === productId);
    if (product) {
        product.rating = rating;
        showMessage(`Avaliação de ${rating} estrelas registrada!`, 'success');
        renderProducts(); // Re-render to update rating display
    }
}

// Add social sharing functionality
function shareProduct(productId, platform) {
    const product = currentProducts.find(p => p.id === productId);
    if (!product) return;
    
    const shareUrl = window.location.href;
    const shareText = `Confira este produto sustentável: ${product.title} - ${product.price}`;
    
    let shareLink = '';
    
    switch (platform) {
        case 'facebook':
            shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
            break;
        case 'twitter':
            shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
            break;
        case 'whatsapp':
            shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
            break;
    }
    
    if (shareLink) {
        window.open(shareLink, '_blank', 'width=600,height=400');
    }
}

// Add newsletter subscription
function subscribeNewsletter(email) {
    if (!email || !isValidEmail(email)) {
        showMessage('Por favor, insira um e-mail válido', 'error');
        return;
    }
    
    // Simulate newsletter subscription
    showMessage('Inscrição na newsletter realizada com sucesso!', 'success');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add accessibility features
function addAccessibilityFeatures() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', 'Botão de ação');
        }
    });
    
    // Add focus management for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown', function() {
            const firstInput = modal.querySelector('input, button');
            if (firstInput) {
                firstInput.focus();
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    addAccessibilityFeatures();
});

// Service card functions
function showRecentProducts() {
    showMessage('Mostrando produtos visualizados recentemente...', 'success');
    // Here you would implement recent products logic
}

function showPaymentMethods() {
    showMessage('Métodos de pagamento: Cartão de crédito, débito, PIX, boleto bancário', 'success');
}

function showGuarantee() {
    showMessage('Garantia: Você pode devolver qualquer produto em até 30 dias após a compra, sem custos!', 'success');
}

function showOfficialStores() {
    showMessage('Lojas oficiais: EcoFashion, GreenHome, BioFoods, NatureBeauty, EcoMobility, GreenTech', 'success');
}

function showCoupons() {
    showMessage('Cupons disponíveis: ECO10 (10% OFF), SUSTENTA15 (15% OFF), VERDE20 (20% OFF)', 'success');
}

// Carousel functionality
function scrollCarousel(gridId, direction) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    const scrollAmount = 300;
    const currentScroll = grid.scrollLeft;
    const newScroll = direction === 'left' 
        ? Math.max(0, currentScroll - scrollAmount)
        : currentScroll + scrollAmount;
    
    grid.scrollTo({
        left: newScroll,
        behavior: 'smooth'
    });
}

// Enhanced filter products
function filterProducts(category) {
    currentFilter = category;
    
    if (category === 'all') {
        filteredProducts = [...currentProducts];
    } else if (category === 'ofertas') {
        filteredProducts = currentProducts.filter(product => 
            Math.random() > 0.5 // Random offers
        );
    } else if (category === 'baratos') {
        filteredProducts = currentProducts.filter(product => 
            parseFloat(product.price.replace('R$ ', '').replace(',', '.')) < 100
        );
    } else if (category === 'mais-vendidos') {
        filteredProducts = currentProducts.filter(product => 
            product.rating > 4.5
        );
    } else {
        filteredProducts = currentProducts.filter(product => product.category === category);
    }
    
    currentPage = 1;
    renderProducts();
    updateProductCount();
    
    // Scroll to products section
    scrollToSection('categorias');
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[onclick="filterProducts('${category}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Touch support for mobile
function addTouchSupport() {
    // Add touch event listeners for better mobile experience
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Swipe support for carousels
    const carousels = document.querySelectorAll('.products-container');
    carousels.forEach(carousel => {
        let startX = 0;
        let scrollLeft = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
}

// Initialize touch support
document.addEventListener('DOMContentLoaded', function() {
    addTouchSupport();
});


// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.openLoginModal = openLoginModal;
window.openCompanyModal = openCompanyModal;
window.openAppModal = openAppModal;
window.scrollToSection = scrollToSection;
window.filterProducts = filterProducts;
window.searchProducts = searchProducts;
window.loadMoreProducts = loadMoreProducts;
window.viewProduct = viewProduct;
window.addToCart = addToCart;
window.addToWishlist = addToWishlist;
window.compareProducts = compareProducts;
window.rateProduct = rateProduct;
window.shareProduct = shareProduct;
window.subscribeNewsletter = subscribeNewsletter;
window.showRecentProducts = showRecentProducts;
window.showPaymentMethods = showPaymentMethods;
window.showGuarantee = showGuarantee;
window.showOfficialStores = showOfficialStores;
window.showCoupons = showCoupons;
window.scrollCarousel = scrollCarousel;
window.toggleMobileMenu = toggleMobileMenu;
