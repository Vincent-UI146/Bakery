// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize location map
    initMap();
    
    // Character counter for message textarea
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });

    function validateForm() {
        let isValid = true;
        
        // Reset all errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });

        // Name validation
        const name = document.getElementById('name').value.trim();
        if (!name) {
            showError('name', 'Please enter your full name');
            isValid = false;
        } else if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }

        // Email validation
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError('email', 'Please enter your email address');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Phone validation (optional)
        const phone = document.getElementById('phone').value.trim();
        if (phone && !/^[\d\s\-\+\(\)]{10,}$/.test(phone.replace(/\D/g, ''))) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }

        // Subject validation
        const subject = document.getElementById('subject').value;
        if (!subject) {
            showError('subject', 'Please select a subject for your message');
            isValid = false;
        }

        // Message validation
        const message = document.getElementById('message').value.trim();
        if (!message) {
            showError('message', 'Please enter your message');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }

        return isValid;
    }

    function validateField(field) {
        const fieldId = field.id;
        const value = field.value.trim();

        switch (fieldId) {
            case 'name':
                if (!value) {
                    showError(fieldId, 'Please enter your full name');
                    return false;
                } else if (value.length < 2) {
                    showError(fieldId, 'Name must be at least 2 characters long');
                    return false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    showError(fieldId, 'Please enter your email address');
                    return false;
                } else if (!emailRegex.test(value)) {
                    showError(fieldId, 'Please enter a valid email address');
                    return false;
                }
                break;
                
            case 'phone':
                if (value && !/^[\d\s\-\+\(\)]{10,}$/.test(value.replace(/\D/g, ''))) {
                    showError(fieldId, 'Please enter a valid phone number');
                    return false;
                }
                break;
                
            case 'subject':
                if (!value) {
                    showError(fieldId, 'Please select a subject for your message');
                    return false;
                }
                break;
                
            case 'message':
                if (!value) {
                    showError(fieldId, 'Please enter your message');
                    return false;
                } else if (value.length < 10) {
                    showError(fieldId, 'Message must be at least 10 characters long');
                    return false;
                }
                break;
        }
        
        clearError(field);
        return true;
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '#e74c3c';
        }
    }

    function clearError(field) {
        const fieldId = field.id;
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        field.style.borderColor = '#e0e0e0';
    }

    function submitForm() {
        // Show loading state
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
        submitBtn.disabled = true;

        // Collect form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            urgency: document.getElementById('urgency').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };

        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            // In a real application, you would send this data to your server
            console.log('Form submitted:', formData);
            
            // Simulate successful submission
            showFormMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
            showToast('Message sent successfully!');
            
            // Reset form
            contactForm.reset();
            charCount.textContent = '0';
            
            // Reset button state
            btnText.style.display = 'inline-block';
            loadingSpinner.style.display = 'none';
            submitBtn.disabled = false;
            
        }, 2000);
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
});

// Initialize map with specific location link
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Create a clickable location link with the specific Google Maps URL
    const locationHTML = `
        <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: #f5f5f5; border-radius: 8px;">
            <div style="text-align: center; padding: 30px;">
                <h3 style="color: #8d6e63; margin-bottom: 15px;">📍 Kea's Bakery Location</h3>
                <p style="margin: 10px 0; font-size: 16px;">
                    <strong>Address:</strong><br>
                    55 St Georges Street<br>
                    Union Castle, Cape Town, 8018
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                    <strong>Phone:</strong> (+27) 67 015 6614
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                    <strong>Hours:</strong><br>
                    Mon-Fri: 6am-6pm<br>
                    Sat: 7am-4pm<br>
                    Sun: 8am-2pm
                </p>
                <div style="margin-top: 20px;">
                    <a href="https://maps.app.goo.gl/bRfjqCrcDjPs2VBn6" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style="display: inline-block; background-color: #8d6e63; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; transition: background-color 0.3s; margin: 5px;">
                       📍 Open in Google Maps
                    </a>
                    <a href="https://maps.apple.com/?q=Kea's+Bakery+Cape+Town&ll=-33.9249,18.4241" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style="display: inline-block; background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; transition: background-color 0.3s; margin: 5px;">
                       🍎 Open in Apple Maps
                    </a>
                </div>
                <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e9; border-radius: 6px;">
                    <p style="margin: 0; color: #2e7d32; font-size: 14px;">
                        💡 <strong>Tip:</strong> Click the buttons above to get directions to our bakery
                    </p>
                </div>
            </div>
        </div>
    `;

    mapContainer.innerHTML = locationHTML;
}

// Initialize the map when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Remove the Google Maps API script since we're not using it anymore
    const googleMapsScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (googleMapsScript) {
        googleMapsScript.remove();
    }
    
    // Initialize our custom map
    initMap();
});
});

// Menu Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    let currentImageIndex = 0;
    let galleryImages = [];

    // Enhanced Tab Functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content with animation
            tabContents.forEach(tab => {
                tab.classList.remove('active');
                tab.style.opacity = '0';
            });
            
            setTimeout(() => {
                const activeTab = document.getElementById(target);
                activeTab.classList.add('active');
                setTimeout(() => {
                    activeTab.style.opacity = '1';
                }, 50);
            }, 300);
            
            // Reset search and filters when switching categories
            document.getElementById('menuSearch').value = '';
            document.getElementById('priceFilter').value = '';
            filterMenuItems();
        });
    });

    // Search Functionality
    document.getElementById('searchBtn').addEventListener('click', filterMenuItems);
    
    document.getElementById('menuSearch').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterMenuItems();
        }
    });

    // Price Filter
    document.getElementById('priceFilter').addEventListener('change', filterMenuItems);

    // Reset Filters
    document.getElementById('resetFilters').addEventListener('click', function() {
        document.getElementById('menuSearch').value = '';
        document.getElementById('priceFilter').value = '';
        filterMenuItems();
        showToast('Filters reset successfully');
    });

    // Filter Menu Items
    function filterMenuItems() {
        const searchTerm = document.getElementById('menuSearch').value.toLowerCase();
        const priceRange = document.getElementById('priceFilter').value;
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-target');
        const menuItems = document.querySelectorAll(`#${activeCategory} .menu-item`);
        
        menuItems.forEach(item => {
            const itemName = item.getAttribute('data-name').toLowerCase();
            const itemPrice = parseFloat(item.getAttribute('data-price'));
            const itemText = item.textContent.toLowerCase();
            
            let showItem = true;
            
            // Search filter
            if (searchTerm && !itemName.includes(searchTerm) && !itemText.includes(searchTerm)) {
                showItem = false;
            }
            
            // Price filter
            if (priceRange) {
                const [min, max] = priceRange.split('-').map(Number);
                if (max && (itemPrice < min || itemPrice > max)) {
                    showItem = false;
                } else if (!max && itemPrice < min) {
                    showItem = false;
                }
            }
            
            // Show/hide item with animation
            if (showItem) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    }

    // Lightbox Gallery
    document.querySelectorAll('.view-gallery-btn').forEach(button => {
        button.addEventListener('click', function() {
            const gallery = this.closest('.image-gallery');
            const image = gallery.querySelector('.gallery-image');
            const altText = image.getAttribute('alt');
            
            document.getElementById('lightbox-image').setAttribute('src', image.getAttribute('src'));
            document.querySelector('.lightbox-caption').textContent = altText;
            document.getElementById('lightbox').style.display = 'block';
            
            // Store all gallery images for navigation
            galleryImages = [];
            document.querySelectorAll('.gallery-image').forEach(img => {
                galleryImages.push({
                    src: img.getAttribute('src'),
                    alt: img.getAttribute('alt')
                });
            });
            
            currentImageIndex = galleryImages.findIndex(img => img.src === image.getAttribute('src'));
        });
    });

    // Lightbox Navigation
    document.querySelector('.close-lightbox').addEventListener('click', function() {
        document.getElementById('lightbox').style.display = 'none';
    });

    document.querySelector('.lightbox-nav.prev').addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    });

    document.querySelector('.lightbox-nav.next').addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    });

    function updateLightboxImage() {
        document.getElementById('lightbox-image').setAttribute('src', galleryImages[currentImageIndex].src);
        document.querySelector('.lightbox-caption').textContent = galleryImages[currentImageIndex].alt;
    }

    // Close lightbox on outside click
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });

    // Inquiry Modal
    document.querySelectorAll('.inquire-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-item');
            document.getElementById('inquiryProduct').value = productName;
            document.getElementById('inquiryModal').style.display = 'block';
        });
    });

    document.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('inquiryModal').style.display = 'none';
        resetInquiryForm();
    });

    // Close modal on outside click
    document.getElementById('inquiryModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            resetInquiryForm();
        }
    });

    // Add to Cart
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item');
            let itemPrice = parseFloat(this.getAttribute('data-price'));
            let quantity = 1;
            
            // Handle quantity selection for cookies
            const quantitySelect = this.closest('.menu-item').querySelector('.qty-select');
            if (quantitySelect) {
                quantity = parseInt(quantitySelect.value);
                // Update price based on quantity
                if (quantity === 6) {
                    itemPrice = itemPrice * 6;
                } else if (quantity === 12) {
                    // Use dozen price
                    const priceText = this.closest('.menu-item').querySelector('.price').textContent;
                    const dozenMatch = priceText.match(/R([\d.]+) dozen/);
                    if (dozenMatch) {
                        itemPrice = parseFloat(dozenMatch[1]);
                    }
                }
            }
            
            addToCart(itemName, itemPrice, quantity);
            showToast(`${itemName} added to cart!`);
        });
    });

    function addToCart(name, price, quantity = 1) {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.total = existingItem.quantity * existingItem.unitPrice;
        } else {
            cart.push({
                name: name,
                unitPrice: price / quantity,
                quantity: quantity,
                total: price
            });
        }
        
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            checkoutBtn.disabled = true;
            cartTotal.textContent = '0.00';
            return;
        }
        
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.total;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>R${item.total.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = total.toFixed(2);
        checkoutBtn.disabled = false;
        
        // Add remove functionality
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCartDisplay();
                showToast('Item removed from cart');
            });
        });
    }

    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length > 0) {
            // Store cart in sessionStorage for payment page
            sessionStorage.setItem('cart', JSON.stringify(cart));
            showToast('Redirecting to payment page...');
            // Redirect to payment page
            setTimeout(() => {
                window.location.href = 'payment.html';
            }, 1000);
        }
    });

    // Form Validation and Submission
    document.getElementById('productInquiryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateInquiryForm()) {
            submitInquiryForm();
        }
    });

    function validateInquiryForm() {
        let isValid = true;
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });
        
        // Name validation
        const name = document.getElementById('inquiryName').value.trim();
        if (!name) {
            showInquiryError('name', 'Name is required');
            isValid = false;
        }
        
        // Email validation
        const email = document.getElementById('inquiryEmail').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showInquiryError('email', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showInquiryError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        return isValid;
    }

    function showInquiryError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function submitInquiryForm() {
        const formData = {
            product: document.getElementById('inquiryProduct').value,
            name: document.getElementById('inquiryName').value.trim(),
            email: document.getElementById('inquiryEmail').value.trim(),
            phone: document.getElementById('inquiryPhone').value.trim(),
            quantity: document.getElementById('inquiryQuantity').value,
            date: document.getElementById('inquiryDate').value,
            message: document.getElementById('inquiryMessage').value.trim()
        };
        
        // Simulate form submission
        const submitBtn = document.querySelector('#productInquiryForm .btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
            // In a real application, this would send data to a server
            console.log('Inquiry submitted:', formData);
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Inquiry';
            
            const messageDiv = document.getElementById('inquiryMessage');
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Thank you for your inquiry! We will contact you soon.';
            messageDiv.style.display = 'block';
            
            // Reset form after successful submission
            setTimeout(() => {
                document.getElementById('inquiryModal').style.display = 'none';
                resetInquiryForm();
            }, 2000);
            
        }, 1500);
    }

    function resetInquiryForm() {
        document.getElementById('productInquiryForm').reset();
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });
        const messageDiv = document.getElementById('inquiryMessage');
        messageDiv.style.display = 'none';
    }

    // Toast Notification
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    // Initialize cart
    updateCartDisplay();
});

// Payment Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize payment page
    initializePaymentPage();
    
    // Load cart from session storage
    const cart = loadCartFromStorage();
    
    // Display order summary
    displayOrderSummary(cart);
    
    // Set up event listeners
    setupEventListeners();
});

function initializePaymentPage() {
    // Set minimum date for collection to today
    const today = new Date();
    const dateInput = document.getElementById('collectionDate');
    if (dateInput) {
        dateInput.min = today.toISOString().split('T')[0];
    }
}

function loadCartFromStorage() {
    try {
        const cartData = sessionStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        return [];
    }
}

function displayOrderSummary(cart) {
    const orderItems = document.getElementById('orderItems');
    const subtotalElement = document.getElementById('subtotal');
    const deliveryElement = document.getElementById('delivery');
    const totalElement = document.getElementById('totalAmount');
    
    if (!orderItems) return;
    
    // Clear existing items
    orderItems.innerHTML = '';
    
    let subtotal = 0;
    
    if (cart.length === 0) {
        // Show empty cart message instead of redirecting
        orderItems.innerHTML = `
            <div class="order-item">
                <div>
                    <strong>No items in cart</strong>
                    <div>Please add items from the menu to proceed with payment</div>
                </div>
            </div>
        `;
        
        // Disable payment button
        const payButton = document.getElementById('payButton');
        if (payButton) {
            payButton.disabled = true;
            payButton.textContent = 'Add Items to Cart First';
        }
        
        // Set totals to zero
        subtotalElement.textContent = 'R0.00';
        deliveryElement.textContent = 'R0.00';
        totalElement.textContent = 'R0.00';
        
        return;
    }
    
    // Add each item to the order summary
    cart.forEach(item => {
        subtotal += item.total;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <div>Qty: ${item.quantity}</div>
            </div>
            <div>R${item.total.toFixed(2)}</div>
        `;
        orderItems.appendChild(itemElement);
    });
    
    // Calculate totals
    const deliveryFee = subtotal > 200 ? 0 : 35; // Free delivery over R200
    const total = subtotal + deliveryFee;
    
    // Update display
    subtotalElement.textContent = `R${subtotal.toFixed(2)}`;
    deliveryElement.textContent = deliveryFee === 0 ? 'FREE' : `R${deliveryFee.toFixed(2)}`;
    totalElement.textContent = `R${total.toFixed(2)}`;
    
    // Store totals for later use
    sessionStorage.setItem('orderSubtotal', subtotal.toFixed(2));
    sessionStorage.setItem('orderTotal', total.toFixed(2));
    
    // Enable payment button if it was disabled
    const payButton = document.getElementById('payButton');
    if (payButton && payButton.disabled) {
        payButton.disabled = false;
        const btnText = payButton.querySelector('.btn-text');
        if (btnText) {
            btnText.textContent = 'Complete Payment';
        }
    }
}

function setupEventListeners() {
    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update visual selection
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Check the radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
            
            // Show corresponding payment form
            showPaymentForm(this.getAttribute('data-method'));
        });
    });
    
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
        });
    }
    
    // Expiry date formatting
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
            
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            e.target.value = value;
        });
    }
    
    // CVV input restriction
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/gi, '');
        });
    }
    
    // Pay button click
    const payButton = document.getElementById('payButton');
    if (payButton) {
        payButton.addEventListener('click', processPayment);
    }
}

function showPaymentForm(method) {
    // Hide all payment forms
    const paymentForms = document.querySelectorAll('.payment-form');
    paymentForms.forEach(form => {
        form.classList.remove('active');
    });
    
    // Show selected payment form
    const selectedForm = document.getElementById(`${method}Form`);
    if (selectedForm) {
        selectedForm.classList.add('active');
    }
    
    // Update pay button text based on method
    const payButton = document.getElementById('payButton');
    if (payButton && !payButton.disabled) {
        const btnText = payButton.querySelector('.btn-text');
        if (btnText) {
            if (method === 'cash') {
                btnText.textContent = 'Confirm Order';
            } else {
                btnText.textContent = 'Complete Payment';
            }
        }
    }
}

function processPayment() {
    // Check if cart is empty
    const cart = loadCartFromStorage();
    if (cart.length === 0) {
        showToast('Your cart is empty. Please add items from the menu first.', 'error');
        return;
    }
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Get selected payment method
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedMethod) {
        showToast('Please select a payment method', 'error');
        return;
    }
    
    const paymentMethod = selectedMethod.value;
    
    // Show loading state
    const payButton = document.getElementById('payButton');
    const btnText = payButton.querySelector('.btn-text');
    const spinner = payButton.querySelector('.loading-spinner');
    
    btnText.style.display = 'none';
    spinner.style.display = 'inline-block';
    payButton.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // In a real application, this would communicate with a payment gateway
        const paymentSuccess = simulatePaymentProcessing(paymentMethod);
        
        if (paymentSuccess) {
            completeOrder(paymentMethod);
        } else {
            // Show error
            showToast('Payment failed. Please try again or use a different method.', 'error');
            
            // Reset button state
            btnText.style.display = 'inline-block';
            spinner.style.display = 'none';
            payButton.disabled = false;
        }
    }, 3000);
}

function validateForm() {
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    // Validate customer information
    const customerName = document.getElementById('customerName').value.trim();
    if (!customerName) {
        showError('customerName', 'Please enter your full name');
        isValid = false;
    }
    
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail) {
        showError('customerEmail', 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(customerEmail)) {
        showError('customerEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    const customerPhone = document.getElementById('customerPhone').value.trim();
    if (!customerPhone) {
        showError('customerPhone', 'Please enter your phone number');
        isValid = false;
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(customerPhone.replace(/\D/g, ''))) {
        showError('customerPhone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate payment method specific fields
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedMethod) {
        showToast('Please select a payment method', 'error');
        isValid = false;
    } else {
        const method = selectedMethod.value;
        
        if (method === 'card') {
            // Validate card details
            const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
            if (!cardNumber || cardNumber.length < 16) {
                showError('cardNumber', 'Please enter a valid card number');
                isValid = false;
            }
            
            const expiryDate = document.getElementById('expiryDate').value;
            if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
                showError('expiryDate', 'Please enter a valid expiry date (MM/YY)');
                isValid = false;
            } else {
                // Check if card is expired
                const [month, year] = expiryDate.split('/');
                const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
                const today = new Date();
                if (expiry < today) {
                    showError('expiryDate', 'This card has expired');
                    isValid = false;
                }
            }
            
            const cvv = document.getElementById('cvv').value;
            if (!cvv || cvv.length < 3) {
                showError('cvv', 'Please enter a valid CVV');
                isValid = false;
            }
            
            const cardName = document.getElementById('cardName').value.trim();
            if (!cardName) {
                showError('cardName', 'Please enter the name on your card');
                isValid = false;
            }
        } else if (method === 'eft') {
            const bankSelect = document.getElementById('bankSelect').value;
            if (!bankSelect) {
                showError('bankSelect', 'Please select your bank');
                isValid = false;
            }
        } else if (method === 'cash') {
            const collectionTime = document.getElementById('collectionTime').value;
            if (!collectionTime) {
                showError('collectionTime', 'Please select a collection time');
                isValid = false;
            }
        }
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = '#e74c3c';
    }
}

function simulatePaymentProcessing(method) {
    // In a real application, this would communicate with a payment gateway
    // For demo purposes, we'll simulate a 90% success rate
    return Math.random() > 0.1; // 90% success rate
}

function completeOrder(paymentMethod) {
    // Generate order confirmation
    const orderNumber = 'KB' + Date.now().toString().slice(-6);
    const customerEmail = document.getElementById('customerEmail').value;
    
    // Calculate ready time (30 minutes from now)
    const readyTime = new Date(Date.now() + 30 * 60000);
    const formattedTime = readyTime.toLocaleTimeString('en-ZA', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    // Store order details (in a real app, this would go to a database)
    const orderDetails = {
        orderNumber: orderNumber,
        customerName: document.getElementById('customerName').value,
        customerEmail: customerEmail,
        customerPhone: document.getElementById('customerPhone').value,
        paymentMethod: paymentMethod,
        items: loadCartFromStorage(),
        total: sessionStorage.getItem('orderTotal'),
        collectionTime: paymentMethod === 'cash' ? document.getElementById('collectionTime').value : formattedTime,
        timestamp: new Date().toISOString()
    };
    
    // Store order in session storage for confirmation page
    sessionStorage.setItem('lastOrder', JSON.stringify(orderDetails));
    
    // Show confirmation
    document.getElementById('paymentInterface').style.display = 'none';
    document.getElementById('orderConfirmation').classList.add('active');
    
    // Update confirmation details
    document.getElementById('confirmationNumber').textContent = orderNumber;
    document.getElementById('customerEmail').textContent = customerEmail;
    document.getElementById('readyTime').textContent = formattedTime;
    
    // Clear cart
    sessionStorage.removeItem('cart');
    
    // Show success message
    showToast('Order confirmed successfully!');
}

function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 5000);
}