/* Gourmet Delight Restaurant Application Engine - Advanced Forms, Drag & Drop, and Web Storage */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core Visual & Theme Engines
    initTheme();
    initCustomizer();
    initClock();
    initStatsCounter();
    initSlider();
    initNotifications();

    // 2. Advanced HTML5 Reservation Form Validation
    initFormValidation();

    // 3. HTML5 Drag and Drop API
    initDragAndDrop();

    // 4. HTML5 Web Storage API (Local & Session Storage)
    initWebStorage();

    // 5. Navigation & Scroll Engine
    initScrollToTop();
    initNavSmoothScroll();
});

/* ==========================================================================
   1. Theme Switcher Engine (Light/Dark Mode)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
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
    
    if (theme === 'dark' || theme === 'amoled') {
        if (icon) icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
        if (text) text.textContent = 'Light Theme';
    } else {
        if (icon) icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        if (text) text.textContent = 'Dark Theme';
    }
}

function initCustomizer() {
    const trigger = document.getElementById('customizer-trigger');
    const panel = document.getElementById('customizer-panel');
    const closeBtn = document.getElementById('customizer-close');
    const resetBtn = document.getElementById('customizer-reset');
    
    if (!trigger || !panel) return;
    
    trigger.addEventListener('click', () => {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            panel.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
        });
    }
    
    document.querySelectorAll('.theme-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            document.documentElement.setAttribute('data-theme', mode);
            localStorage.setItem('theme', mode);
            updateThemeIcon(mode);
        });
    });
    
    document.querySelectorAll('.accent-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const accent = btn.dataset.accent;
            if (accent === 'default') {
                document.documentElement.removeAttribute('data-accent');
                localStorage.removeItem('accent');
            } else {
                document.documentElement.setAttribute('data-accent', accent);
                localStorage.setItem('accent', accent);
            }
        });
    });

    const savedAccent = localStorage.getItem('accent');
    if (savedAccent) document.documentElement.setAttribute('data-accent', savedAccent);
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.removeAttribute('data-accent');
            localStorage.removeItem('theme');
            localStorage.removeItem('accent');
            updateThemeIcon('light');
        });
    }
}

/* ==========================================================================
   2. Real-Time Clock Display
   ========================================================================== */
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
        hours = hours ? hours : 12;
        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
        
        clockEl.textContent = `${dateString} | ${timeString}`;
    }
    
    tick();
    setInterval(tick, 1000);
}

/* ==========================================================================
   3. Dynamic Statistics Counter Animation
   ========================================================================== */
function initStatsCounter() {
    const counters = [
        { id: 'stat-tables', target: 15, prefix: '', suffix: ' Open' },
        { id: 'stat-orders', target: 182, prefix: '', suffix: '' },
        { id: 'stat-revenue', target: 12450, prefix: '$', suffix: '' },
        { id: 'stat-ratings', target: 4.9, prefix: '', suffix: ' ★', isDecimal: true }
    ];
    
    const duration = 1600; // ms
    
    counters.forEach(counter => {
        const el = document.getElementById(counter.id);
        if (!el) return;
        
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress * (2 - progress);
            
            if (counter.isDecimal) {
                const currentVal = (ease * counter.target).toFixed(1);
                el.textContent = counter.prefix + currentVal + counter.suffix;
            } else {
                const currentVal = Math.floor(ease * counter.target);
                el.textContent = counter.prefix + currentVal.toLocaleString() + counter.suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    });
}

/* ==========================================================================
   4. Automatic Image/Banner Slider
   ========================================================================== */
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        
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
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
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
    
    showSlide(0);
    startAutoSlide();
}

/* ==========================================================================
   5. Telemetry Notification Panel
   ========================================================================== */
function initNotifications() {
    const notifyTrigger = document.getElementById('notification-trigger');
    const notifyPanel = document.getElementById('notification-panel');
    const notifyClose = document.getElementById('notification-close');
    const notifyClear = document.getElementById('notification-clear');
    const notifyBadge = document.getElementById('notification-badge');
    const notifyList = document.querySelector('.notification-list');
    
    if (!notifyTrigger || !notifyPanel) return;
    
    notifyTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        notifyPanel.classList.add('open');
        notifyPanel.setAttribute('aria-hidden', 'false');
    });
    
    if (notifyClose) {
        notifyClose.addEventListener('click', () => {
            notifyPanel.classList.remove('open');
            notifyPanel.setAttribute('aria-hidden', 'true');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (!notifyPanel.contains(e.target) && !notifyTrigger.contains(e.target)) {
            notifyPanel.classList.remove('open');
            notifyPanel.setAttribute('aria-hidden', 'true');
        }
    });
    
    if (notifyClear) {
        notifyClear.addEventListener('click', () => {
            if (notifyList) {
                notifyList.innerHTML = `<li class="empty-notify" style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">No new notifications. All culinary alerts cleared!</li>`;
            }
            if (notifyBadge) notifyBadge.style.display = 'none';
        });
    }
    
    document.querySelectorAll('.btn-dismiss').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const item = e.target.closest('.notification-item');
            if (item) {
                item.style.opacity = '0';
                item.style.transform = 'translateX(50px)';
                setTimeout(() => {
                    item.remove();
                    const activeItems = document.querySelectorAll('.notification-item');
                    if (notifyBadge) {
                        if (activeItems.length > 0) notifyBadge.textContent = activeItems.length;
                        else notifyBadge.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
}

/* ==========================================================================
   6. Advanced Form Elements & Client Validation
   ========================================================================== */
function initFormValidation() {
    const form = document.getElementById('restaurant-reservation-form');
    if (!form) return;
    
    const inputs = {
        name: document.getElementById('res-name'),
        email: document.getElementById('res-email'),
        phone: document.getElementById('res-phone'),
        date: document.getElementById('res-date'),
        time: document.getElementById('res-time'),
        guests: document.getElementById('res-guests'),
        address: document.getElementById('res-address'),
        editableNotes: document.getElementById('res-editable-notes')
    };

    const btnCancel = document.getElementById('btn-cancel-res');
    
    Object.keys(inputs).forEach(key => {
        const field = inputs[key];
        if (!field) return;
        
        field.addEventListener('input', () => {
            clearFieldError(field);
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // 1. Name
        if (!inputs.name.value || inputs.name.value.trim().length < 3) {
            showFieldError(inputs.name, 'Customer Name is required (minimum 3 characters).');
            isValid = false;
        } else clearFieldError(inputs.name);
        
        // 2. Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputs.email.value || !emailRegex.test(inputs.email.value.trim())) {
            showFieldError(inputs.email, 'Enter a valid email address.');
            isValid = false;
        } else clearFieldError(inputs.email);
        
        // 3. Phone (10-15 digits)
        const phoneRegex = /^[\+]?[0-9\s\-]{10,15}$/;
        if (!inputs.phone.value || !phoneRegex.test(inputs.phone.value.trim())) {
            showFieldError(inputs.phone, 'Enter a valid phone number (10 to 15 digits).');
            isValid = false;
        } else clearFieldError(inputs.phone);
        
        // 4. Date
        if (!inputs.date.value) {
            showFieldError(inputs.date, 'Please select your Reservation Date.');
            isValid = false;
        } else clearFieldError(inputs.date);

        // 5. Time
        if (!inputs.time.value) {
            showFieldError(inputs.time, 'Please select your Preferred Dining Time.');
            isValid = false;
        } else clearFieldError(inputs.time);
        
        // 6. Guests / Age (1-100)
        const guestVal = parseInt(inputs.guests.value, 10);
        if (isNaN(guestVal) || guestVal < 1 || guestVal > 100) {
            showFieldError(inputs.guests, 'Age / Guest count must be between 1 and 100.');
            isValid = false;
        } else clearFieldError(inputs.guests);

        // 7. Address
        if (!inputs.address.value || inputs.address.value.trim().length < 8) {
            showFieldError(inputs.address, 'Please enter location / address details.');
            isValid = false;
        } else clearFieldError(inputs.address);
        
        if (isValid) {
            const genderVal = document.querySelector('input[name="gender"]:checked')?.value || 'Male';
            const selectedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);
            const notesVal = inputs.editableNotes ? inputs.editableNotes.innerText.trim() : '';

            showSuccessModal({
                name: inputs.name.value.trim(),
                email: inputs.email.value.trim(),
                phone: inputs.phone.value.trim(),
                date: inputs.date.value,
                time: inputs.time.value,
                guests: inputs.guests.value,
                gender: genderVal,
                skills: selectedSkills,
                address: inputs.address.value.trim(),
                notes: notesVal
            });
            
            form.reset();
        }
    });

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            if (confirm('Cancel reservation process and reset form fields?')) {
                form.reset();
                Object.keys(inputs).forEach(key => {
                    if (inputs[key]) clearFieldError(inputs[key]);
                });
            }
        });
    }
}

function showFieldError(inputElement, msg) {
    const parent = inputElement.closest('.form-group');
    if (!parent) return;
    
    parent.classList.add('has-error');
    parent.classList.remove('has-success');
    
    let errorEl = parent.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'error-message';
        errorEl.style.color = 'var(--danger)';
        errorEl.style.fontSize = '0.78rem';
        errorEl.style.marginTop = '0.35rem';
        errorEl.style.fontWeight = '500';
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
    if (errorEl) errorEl.style.display = 'none';
}

function showSuccessModal(data) {
    const modal = document.createElement('div');
    modal.className = 'success-modal-overlay';
    
    modal.innerHTML = `
        <div class="success-modal-card">
            <div class="success-icon">🍷</div>
            <h2>Table Reserved Successfully!</h2>
            <p>Thank you <strong>${data.name}</strong>. Your reservation at Gourmet Delight is confirmed.</p>
            <div style="text-align:left; background:var(--bg-base); border:1px solid var(--border-color); padding:1rem; border-radius:8px; margin-bottom:1.25rem; font-size:0.82rem; line-height:1.6;">
                <div><strong>Email:</strong> ${data.email}</div>
                <div><strong>Phone:</strong> ${data.phone}</div>
                <div><strong>Date & Time:</strong> ${data.date} at ${data.time}</div>
                <div><strong>Guests & Gender:</strong> ${data.guests} Guests (${data.gender})</div>
                <div><strong>Preferences:</strong> ${data.skills.join(', ')}</div>
            </div>
            <button class="btn btn-primary btn-close-modal" style="width:100%;">Return to Restaurant Portal</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => { modal.classList.add('active'); }, 10);
    modal.querySelector('.btn-close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => { modal.remove(); }, 300);
    });
}

/* ==========================================================================
   7. HTML5 Drag and Drop API
   ========================================================================== */
function initDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable-card');
    const dropTargets = document.querySelectorAll('.drop-target-area');
    const statusText = document.getElementById('dnd-status-text');

    if (draggables.length === 0 || dropTargets.length === 0) return;

    let draggedItem = null;

    draggables.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            item.classList.add('dragging');
            const title = item.dataset.title || 'Dish';
            e.dataTransfer.setData('text/plain', item.id);
            if (statusText) statusText.textContent = `Status: Dragging "${title}"... Drop into any order dropzone!`;
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            draggedItem = null;
            dropTargets.forEach(target => target.classList.remove('drag-over'));
            updateDropzoneCounts();
        });
    });

    dropTargets.forEach(target => {
        target.addEventListener('dragover', (e) => {
            e.preventDefault();
            target.classList.add('drag-over');
        });

        target.addEventListener('dragenter', (e) => {
            e.preventDefault();
            target.classList.add('drag-over');
        });

        target.addEventListener('dragleave', (e) => {
            if (!target.contains(e.relatedTarget)) {
                target.classList.remove('drag-over');
            }
        });

        target.addEventListener('drop', (e) => {
            e.preventDefault();
            target.classList.remove('drag-over');

            if (draggedItem) {
                const placeholder = target.querySelector('.drop-placeholder');
                if (placeholder) placeholder.style.display = 'none';

                target.appendChild(draggedItem);
                
                const title = draggedItem.dataset.title || 'Dish';
                const targetZoneName = target.dataset.zone || 'Dropzone';

                if (statusText) statusText.textContent = `Success! Dropped "${title}" into ${targetZoneName}.`;
                updateDropzoneCounts();
            }
        });
    });

    function updateDropzoneCounts() {
        const sourceZone = document.getElementById('drop-target-source');
        const activeZone = document.getElementById('drop-target-active');
        const archiveZone = document.getElementById('drop-target-archive');

        const countSource = document.getElementById('count-source');
        const countActive = document.getElementById('count-target1');
        const countArchive = document.getElementById('count-target2');

        const phActive = document.getElementById('placeholder-active');
        const phArchive = document.getElementById('placeholder-archive');

        if (sourceZone && countSource) countSource.textContent = `${sourceZone.querySelectorAll('.draggable-card').length} Items`;
        if (activeZone && countActive) {
            const count = activeZone.querySelectorAll('.draggable-card').length;
            countActive.textContent = `${count} Items`;
            if (phActive) phActive.style.display = count === 0 ? 'block' : 'none';
        }
        if (archiveZone && countArchive) {
            const count = archiveZone.querySelectorAll('.draggable-card').length;
            countArchive.textContent = `${count} Items`;
            if (phArchive) phArchive.style.display = count === 0 ? 'block' : 'none';
        }
    }
}

/* ==========================================================================
   8. HTML5 Web Storage API (Local & Session Storage)
   ========================================================================== */
function initWebStorage() {
    const inputLocalName = document.getElementById('local-user-name');
    const selectLocalRole = document.getElementById('local-user-role');

    const btnSaveLocal = document.getElementById('btn-save-local');
    const btnReadLocal = document.getElementById('btn-read-local');
    const btnClearLocal = document.getElementById('btn-clear-local');

    const inputSessionToken = document.getElementById('session-token');
    const inputSessionWorkspace = document.getElementById('session-workspace');

    const btnSaveSession = document.getElementById('btn-save-session');
    const btnReadSession = document.getElementById('btn-read-session');
    const btnClearSession = document.getElementById('btn-clear-session');

    const terminalOutput = document.getElementById('storage-display-output');
    const btnClearOutput = document.getElementById('btn-clear-output');

    if (inputSessionToken && !inputSessionToken.value) {
        inputSessionToken.value = 'GD-SESS-' + Math.floor(10000 + Math.random() * 90000) + '-IT';
    }

    if (btnSaveLocal) {
        btnSaveLocal.addEventListener('click', () => {
            const profileData = {
                name: inputLocalName ? inputLocalName.value.trim() : '',
                role: selectLocalRole ? selectLocalRole.value : '',
                timestamp: new Date().toLocaleString()
            };
            if (!profileData.name) return alert('Enter user name before saving to Local Storage.');
            localStorage.setItem('gourmetUserProfile', JSON.stringify(profileData));
            logToTerminal(`[LOCAL STORAGE SUCCESS] Data saved to localStorage:\n` + JSON.stringify(profileData, null, 2));
        });
    }

    if (btnReadLocal) {
        btnReadLocal.addEventListener('click', () => {
            const rawData = localStorage.getItem('gourmetUserProfile');
            if (rawData) {
                const parsed = JSON.parse(rawData);
                logToTerminal(`[LOCAL STORAGE RETRIEVED] Key "gourmetUserProfile":\n` + JSON.stringify(parsed, null, 2));
                if (inputLocalName) inputLocalName.value = parsed.name || '';
            } else logToTerminal(`[LOCAL STORAGE READ] No data found in localStorage.`);
        });
    }

    if (btnClearLocal) {
        btnClearLocal.addEventListener('click', () => {
            localStorage.removeItem('gourmetUserProfile');
            if (inputLocalName) inputLocalName.value = '';
            logToTerminal(`[LOCAL STORAGE CLEARED] Successfully removed "gourmetUserProfile".`);
        });
    }

    if (btnSaveSession) {
        btnSaveSession.addEventListener('click', () => {
            const sessionData = {
                sessionToken: inputSessionToken ? inputSessionToken.value : '',
                tableSessionId: inputSessionWorkspace ? inputSessionWorkspace.value.trim() : '',
                created: new Date().toLocaleTimeString()
            };
            if (!sessionData.tableSessionId) return alert('Enter Table Session ID before saving.');
            sessionStorage.setItem('activeDiningSession', JSON.stringify(sessionData));
            logToTerminal(`[SESSION STORAGE SUCCESS] Saved to sessionStorage:\n` + JSON.stringify(sessionData, null, 2));
        });
    }

    if (btnReadSession) {
        btnReadSession.addEventListener('click', () => {
            const rawData = sessionStorage.getItem('activeDiningSession');
            if (rawData) {
                const parsed = JSON.parse(rawData);
                logToTerminal(`[SESSION STORAGE RETRIEVED] Key "activeDiningSession":\n` + JSON.stringify(parsed, null, 2));
            } else logToTerminal(`[SESSION STORAGE READ] No session data found.`);
        });
    }

    if (btnClearSession) {
        btnClearSession.addEventListener('click', () => {
            sessionStorage.removeItem('activeDiningSession');
            if (inputSessionWorkspace) inputSessionWorkspace.value = '';
            logToTerminal(`[SESSION STORAGE CLEARED] Successfully removed "activeDiningSession".`);
        });
    }

    if (btnClearOutput) {
        btnClearOutput.addEventListener('click', () => {
            if (terminalOutput) terminalOutput.textContent = `// Terminal Cleared. Click "Retrieve Data" to inspect entries.`;
        });
    }

    function logToTerminal(msg) {
        if (terminalOutput) terminalOutput.textContent = msg;
    }
}

/* ==========================================================================
   9. Scroll-To-Top & Active Nav Highlight
   ========================================================================== */
function initScrollToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) btn.classList.add('visible');
        else btn.classList.remove('visible');
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initNavSmoothScroll() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });
}
