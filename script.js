// Menu Tab Functionality with Search
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            
            // Add active class with animation
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            
            // Hide all tab contents with fade out
            tabContents.forEach(tab => {
                tab.style.opacity = '0';
                setTimeout(() => {
                    tab.classList.remove('active');
                }, 300);
            });
            
            // Show selected tab content with fade in
            setTimeout(() => {
                const targetTab = this.getAttribute('data-target');
                const activeTab = document.getElementById(targetTab);
                activeTab.classList.add('active');
                setTimeout(() => {
                    activeTab.style.opacity = '1';
                }, 50);
            }, 300);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('menuSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const activeTab = document.querySelector('.tab-content.active');
            const menuItems = activeTab.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                const itemName = item.querySelector('h2').textContent.toLowerCase();
                const itemDescription = item.querySelector('p').textContent.toLowerCase();
                
                if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const galleryImages = document.querySelectorAll('.gallery-image');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentImageIndex = 0;
    let imagesArray = [];

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImageIndex = index;
            imagesArray = Array.from(galleryImages);
            openLightbox(this.src, this.alt);
        });
    });

    function openLightbox(src, alt) {
        lightbox.style.display = 'block';
        lightboxImg.src = src;
        lightboxCaption.textContent = alt;
        document.body.style.overflow = 'hidden';
    }

    function closeLightboxFunc() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function navigateImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex >= imagesArray.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = imagesArray.length - 1;
        }
        const nextImage = imagesArray[currentImageIndex];
        lightboxImg.src = nextImage.src;
        lightboxCaption.textContent = nextImage.alt;
    }

    closeLightbox.addEventListener('click', closeLightboxFunc);
    prevButton.addEventListener('click', () => navigateImage(-1));
    nextButton.addEventListener('click', () => navigateImage(1));
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });

    // Modal functionality for inquiries
    const inquiryModal = document.getElementById('inquiryModal');
    const inquireButtons = document.querySelectorAll('.inquire-btn');
    const closeModal = document.querySelector('.close-modal');
    const inquiryForm = document.getElementById('productInquiryForm');

    inquireButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-item');
            document.getElementById('inquiryProduct').value = productName;
            inquiryModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', function() {
        inquiryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                submitContactForm();
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });

        // Character count for message
        const messageTextarea = document.getElementById('message');
        const charCount = document.getElementById('charCount');
        if (messageTextarea && charCount) {
            messageTextarea.addEventListener('input', function() {
                charCount.textContent = this.value.length;
            });
        }
    }

    // Google Maps initialization
    if (typeof google !== 'undefined') {
        initMap();
    }
});

// Form Validation Functions
function validateContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + 'Error');
    
    // Clear previous error
    clearError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }

    // Phone validation
    if (field.id === 'phone' && value) {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value.replace(/\D/g, ''))) {
            showError(field, 'Please enter a valid 10-digit phone number');
            return false;
        }
    }

    // Minimum length validation
    if (field.hasAttribute('minlength') && value.length < field.getAttribute('minlength')) {
        showError(field, `Minimum ${field.getAttribute('minlength')} characters required`);
        return false;
    }

    return true;
}

function showError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Form Submission
function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    const formMessage = document.getElementById('formMessage');

    // Show loading state
    btnText.style.display = 'none';
    loadingSpinner.style.display = 'inline-block';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // In a real scenario, you would send data to a server here
        formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        formMessage.className = 'form-message success';
        form.reset();
        
        // Reset button state
        btnText.style.display = 'inline-block';
        loadingSpinner.style.display = 'none';
        submitBtn.disabled = false;
        
        // Clear character count
        const charCount = document.getElementById('charCount');
        if (charCount) charCount.textContent = '0';
    }, 2000);
}

// Google Maps Initialization
function initMap() {
    const bakeryLocation = { lat: 40.1106, lng: -75.2121 }; // Flourtown coordinates
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: bakeryLocation,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
            }
        ]
    });

    const marker = new google.maps.Marker({
        position: bakeryLocation,
        map: map,
        title: 'Sweet Delights Bakery',
        icon: {
            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDI4LjVDMjIuNDU1OCAyOC41IDI4LjUgMjIuNDU1OCAyOC41IDE1QzI4LjUgNy41NDQxNiAyMi40NTU4IDEuNSAxNSAxLjVDNy41NDQxNiAxLjUgMS41IDcuNTQ0MTYgMS41IDE1QzEuNSAyMi40NTU4IDcuNTQ0MTYgMjguNSAxNSAyOC41WiIgZmlsbD0iIzhENkU2MyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xMCAxMkMxMCAxMS40NDc3IDEwLjQ0NzcgMTEgMTEgMTFIMTlDMTkuNTUyMyAxMSAyMCAxMS40NDc3IDIwIDEyVjE4QzIwIDE4LjU1MjMgMTkuNTUyMyAxOSAxOSAxOUgxMUMxMC40NDc3IDE5IDEwIDE4LjU1MjMgMTAgMThWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
            scaledSize: new google.maps.Size(30, 30)
        }
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="map-info-window">
                <h3>Kea's Bakery</h3>
                <p>55  St Georges Street<br>Union Castle,Cape Town </p>
                <p>🕒 Mon-Fri: 6am-6pm<br>Sat: 7am-4pm<br>Sun: 8am-2pm</p>
            </div>
        `
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
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