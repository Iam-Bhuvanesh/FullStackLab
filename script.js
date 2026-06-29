/* SyncFlow AI Dashboard JavaScript Code Engine */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initTheme();
    initClock();
    initStatsCounter();
    initSlider();
    initNotifications();
    initFormValidation();
    initScrollToTop();
});

/* 1. Theme Switcher (Light/Dark Mode) */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    // Check saved preference or default to light mode (industry white theme)
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle svg');
    const text = document.querySelector('#theme-toggle span');
    
    if (theme === 'dark') {
        // Sun icon for switching to light mode
        if (icon) {
            icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
        }
        if (text) text.textContent = 'Light Console';
    } else {
        // Moon icon for switching to dark mode
        if (icon) {
            icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        }
        if (text) text.textContent = 'Dark Console';
    }
}

/* 2. Clock & Date Display */
function initClock() {
    const clockEl = document.getElementById('current-time');
    if (!clockEl) return;
    
    function tick() {
        const now = new Date();
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', dateOptions);
        
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // convert 0 to 12
        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
        
        clockEl.textContent = `${dateString} | ${timeString}`;
    }
    
    tick();
    setInterval(tick, 1000);
}

/* 3. Dynamic Statistics Counter Animation */
function initStatsCounter() {
    // Define metrics to count up
    const counters = [
        { id: 'stat-total-users', target: 12450, prefix: '', suffix: '' },
        { id: 'stat-active-users', target: 3842, prefix: '', suffix: '' },
        { id: 'stat-revenue', target: 48250, prefix: '$', suffix: '' },
        { id: 'stat-transactions', target: 1894, prefix: '', suffix: '' },
        { id: 'stat-notifications', target: 12, prefix: '', suffix: '' },
        { id: 'stat-tasks', target: 8, prefix: '', suffix: '' }
    ];
    
    const duration = 1500; // ms
    
    counters.forEach(counter => {
        const el = document.getElementById(counter.id);
        if (!el) return;
        
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // EaseOut Quad
            const ease = progress * (2 - progress);
            const currentVal = Math.floor(ease * counter.target);
            
            el.textContent = counter.prefix + currentVal.toLocaleString() + counter.suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = counter.prefix + counter.target.toLocaleString() + counter.suffix;
            }
        }
        
        requestAnimationFrame(update);
    });
}

/* 4. Banner/Image Slider Logic */
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Bound index
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        
        // Update elements
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Auto slide rotation interval
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            resetAutoSlide();
        });
    });
    
    // Start slider
    showSlide(0);
    startAutoSlide();
}

/* 5. Notification Panel Drawers */
function initNotifications() {
    const notifyTrigger = document.getElementById('notification-trigger');
    const notifyPanel = document.getElementById('notification-panel');
    const notifyClose = document.getElementById('notification-close');
    const notifyClear = document.getElementById('notification-clear');
    const notifyBadge = document.getElementById('notification-badge');
    const notifyList = document.querySelector('.notification-list');
    
    if (!notifyTrigger || !notifyPanel) return;
    
    // Show Panel
    notifyTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        notifyPanel.classList.add('open');
    });
    
    // Hide Panel
    if (notifyClose) {
        notifyClose.addEventListener('click', () => {
            notifyPanel.classList.remove('open');
        });
    }
    
    // Hide panel if clicking outside
    document.addEventListener('click', (e) => {
        if (!notifyPanel.contains(e.target) && !notifyTrigger.contains(e.target)) {
            notifyPanel.classList.remove('open');
        }
    });
    
    // Clear list logic
    if (notifyClear) {
        notifyClear.addEventListener('click', () => {
            if (notifyList) {
                notifyList.innerHTML = `<li class="empty-notify">No new notifications. Your workspace is caught up!</li>`;
            }
            if (notifyBadge) {
                notifyBadge.style.display = 'none';
            }
            
            // Sync dynamic statistics card value
            const statValue = document.getElementById('stat-notifications');
            if (statValue) {
                statValue.textContent = '0';
            }
        });
    }
    
    // Set up dismiss action for individual notifications
    document.querySelectorAll('.btn-dismiss').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const item = e.target.closest('.notification-item');
            if (item) {
                item.style.opacity = '0';
                item.style.transform = 'translateX(50px)';
                setTimeout(() => {
                    item.remove();
                    // Update badges
                    const activeItems = document.querySelectorAll('.notification-item');
                    if (notifyBadge) {
                        if (activeItems.length > 0) {
                            notifyBadge.textContent = activeItems.length;
                            const statValue = document.getElementById('stat-notifications');
                            if (statValue) statValue.textContent = activeItems.length;
                        } else {
                            notifyBadge.style.display = 'none';
                            if (notifyList) {
                                notifyList.innerHTML = `<li class="empty-notify">No new notifications. Your workspace is caught up!</li>`;
                            }
                            const statValue = document.getElementById('stat-notifications');
                            if (statValue) statValue.textContent = '0';
                        }
                    }
                }, 300);
            }
        });
    });
}

/* 6. Form Validations and Custom Feedback alerts */
function initFormValidation() {
    const form = document.querySelector('.styled-form');
    if (!form) return;
    
    const inputs = {
        name: document.getElementById('reg-name'),
        email: document.getElementById('reg-email'),
        phone: document.getElementById('reg-phone'),
        password: document.getElementById('reg-password'),
        dob: document.getElementById('reg-dob'),
        address: document.getElementById('reg-address')
    };
    
    // Listen for inputs to clear error styling dynamically
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        if (!input) return;
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // 1. Validate Name
        if (!inputs.name.value || inputs.name.value.trim().length < 3) {
            showFieldError(inputs.name, 'Full Name must be at least 3 characters.');
            isValid = false;
        } else {
            clearFieldError(inputs.name);
        }
        
        // 2. Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputs.email.value.trim())) {
            showFieldError(inputs.email, 'Enter a valid workspace email address.');
            isValid = false;
        } else {
            clearFieldError(inputs.email);
        }
        
        // 3. Validate Phone Number (Generic 10-digit number validation)
        const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
        if (!phoneRegex.test(inputs.phone.value.trim())) {
            showFieldError(inputs.phone, 'Enter a valid phone number (10-15 digits).');
            isValid = false;
        } else {
            clearFieldError(inputs.phone);
        }
        
        // 4. Validate Password Complexity
        const pw = inputs.password.value;
        const hasUpper = /[A-Z]/.test(pw);
        const hasLower = /[a-z]/.test(pw);
        const hasDigit = /[0-9]/.test(pw);
        const hasSpecial = /[^A-Za-z0-9]/.test(pw);
        
        if (pw.length < 8 || !hasUpper || !hasLower || !hasDigit || !hasSpecial) {
            showFieldError(inputs.password, 'Password must be at least 8 characters, containing 1 capital letter, 1 lowercase letter, 1 digit, and 1 symbol.');
            isValid = false;
        } else {
            clearFieldError(inputs.password);
        }
        
        // 5. Validate Date of Birth
        if (!inputs.dob.value) {
            showFieldError(inputs.dob, 'Please choose your date of birth.');
            isValid = false;
        } else {
            clearFieldError(inputs.dob);
        }
        
        // 6. Validate Address length
        if (!inputs.address.value || inputs.address.value.trim().length < 10) {
            showFieldError(inputs.address, 'Company address details must be at least 10 characters.');
            isValid = false;
        } else {
            clearFieldError(inputs.address);
        }
        
        if (isValid) {
            // Trigger beautiful onboard confirmation modal
            showSuccessBanner(inputs.name.value);
            form.reset();
        }
    });
}

function showFieldError(inputElement, msg) {
    const parent = inputElement.closest('.form-group');
    if (!parent) return;
    
    // Add error marker
    parent.classList.add('has-error');
    parent.classList.remove('has-success');
    
    // Find or create error paragraph
    let errorEl = parent.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'error-message';
        parent.appendChild(errorEl);
    }
    errorEl.textContent = msg;
    errorEl.style.display = 'block';
}

function clearFieldError(inputElement) {
    const parent = inputElement.closest('.form-group');
    if (!parent) return;
    
    parent.classList.remove('has-error');
    parent.classList.add('has-success');
    
    const errorEl = parent.querySelector('.error-message');
    if (errorEl) {
        errorEl.style.display = 'none';
    }
}

function showSuccessBanner(name) {
    // Create floating custom modal banner
    const modal = document.createElement('div');
    modal.className = 'success-modal-overlay';
    
    modal.innerHTML = `
        <div class="success-modal-card">
            <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h2>Workspace Configured!</h2>
            <p>Welcome <strong>${name}</strong>. SyncFlow AI has created your workspace telemetry pipeline. Your temporary API secret keys have been dispatched to your email.</p>
            <button class="btn btn-primary btn-close-modal">Proceed to Console</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add fade-in active state
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    modal.querySelector('.btn-close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
}

/* 7. Scroll-To-Top Button Controller */
function initScrollToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
