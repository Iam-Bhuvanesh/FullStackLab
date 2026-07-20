/* SyncFlow AI Web Engine - Advanced HTML5 Form Elements, Drag & Drop, and Web Storage */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core Visual & Theme Engines
    initTheme();
    initCustomizer();
    initClock();
    initSlider();
    initNotifications();

    // 2. Assignment 1: Advanced HTML5 Form Elements & Validation
    initFormValidation();

    // 3. Assignment 4: HTML5 Drag and Drop API
    initDragAndDrop();

    // 4. Assignment 4: HTML5 Web Storage API (Local & Session Storage)
    initWebStorage();

    // 5. Navigation & Scroll Engine
    initScrollToTop();
    initNavSmoothScroll();
});

/* ==========================================================================
   1. Theme Switcher Engine (Light/Dark Console)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    // Default to Sleek Light Theme
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
        if (icon) {
            icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
        }
        if (text) text.textContent = 'Light Console';
    } else {
        if (icon) {
            icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        }
        if (text) text.textContent = 'Dark Console';
    }
}

/* Theme Customizer Drawer Panel */
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
    
    // Mode Buttons
    document.querySelectorAll('.theme-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            document.documentElement.setAttribute('data-theme', mode);
            localStorage.setItem('theme', mode);
            updateThemeIcon(mode);
        });
    });
    
    // Accent Buttons
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

    // Saved accent preference
    const savedAccent = localStorage.getItem('accent');
    if (savedAccent) {
        document.documentElement.setAttribute('data-accent', savedAccent);
    }
    
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
   2. Live Clock & Date Display
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
   3. Carousel Banner Slider Logic
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
        slideInterval = setInterval(nextSlide, 6000);
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
   4. Telemetry Notification Panel
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
                notifyList.innerHTML = `<li class="empty-notify" style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">No new notifications. Telemetry feeds are caught up!</li>`;
            }
            if (notifyBadge) {
                notifyBadge.style.display = 'none';
            }
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
                        if (activeItems.length > 0) {
                            notifyBadge.textContent = activeItems.length;
                        } else {
                            notifyBadge.style.display = 'none';
                            if (notifyList) {
                                notifyList.innerHTML = `<li class="empty-notify" style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">No new notifications. Telemetry feeds are caught up!</li>`;
                            }
                        }
                    }
                }, 300);
            }
        });
    });
}

/* ==========================================================================
   5. ASSIGNMENT 1: ADVANCED HTML5 FORM ELEMENTS & VALIDATION
   Requirements:
   - Name (text, placeholder, required)
   - Email (email input type, required)
   - Phone (tel input type, pattern)
   - Date of Birth (date input type)
   - Preferred Time (time input type)
   - Age (number input type, min/max)
   - Gender (radio buttons)
   - Skills/Interests (checkboxes)
   - Address (textarea)
   - Editable Area (contenteditable="true", spellcheck="true")
   - Form Controls (Submit, Reset, Cancel)
   ========================================================================== */
function initFormValidation() {
    const form = document.getElementById('user-registration-form');
    if (!form) return;
    
    const inputs = {
        name: document.getElementById('reg-name'),
        email: document.getElementById('reg-email'),
        phone: document.getElementById('reg-phone'),
        dob: document.getElementById('reg-dob'),
        time: document.getElementById('reg-time'),
        age: document.getElementById('reg-age'),
        address: document.getElementById('reg-address'),
        editableNotes: document.getElementById('reg-editable-notes')
    };

    const btnCancel = document.getElementById('btn-cancel-form');
    
    // Dynamic error clearing on input change
    Object.keys(inputs).forEach(key => {
        const field = inputs[key];
        if (!field) return;
        
        field.addEventListener('input', () => {
            clearFieldError(field);
        });
    });
    
    // Form Submit Event Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // 1. Validate Full Name
        if (!inputs.name.value || inputs.name.value.trim().length < 3) {
            showFieldError(inputs.name, 'Full Name is required (minimum 3 characters).');
            isValid = false;
        } else {
            clearFieldError(inputs.name);
        }
        
        // 2. Validate Work Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputs.email.value || !emailRegex.test(inputs.email.value.trim())) {
            showFieldError(inputs.email, 'Please enter a valid work email address (e.g., user@domain.com).');
            isValid = false;
        } else {
            clearFieldError(inputs.email);
        }
        
        // 3. Validate Phone Number (HTML5 pattern check: 10-15 digits)
        const phoneRegex = /^[\+]?[0-9\s\-]{10,15}$/;
        if (!inputs.phone.value || !phoneRegex.test(inputs.phone.value.trim())) {
            showFieldError(inputs.phone, 'Please enter a valid phone number (10 to 15 digits).');
            isValid = false;
        } else {
            clearFieldError(inputs.phone);
        }
        
        // 4. Validate Date of Birth
        if (!inputs.dob.value) {
            showFieldError(inputs.dob, 'Please select your Date of Birth.');
            isValid = false;
        } else {
            clearFieldError(inputs.dob);
        }

        // 5. Validate Preferred Appointment Time (Requirement 10)
        if (!inputs.time.value) {
            showFieldError(inputs.time, 'Please select your Preferred Appointment Time.');
            isValid = false;
        } else {
            clearFieldError(inputs.time);
        }
        
        // 6. Validate Age (Requirement 11: min=18, max=100)
        const ageVal = parseInt(inputs.age.value, 10);
        if (isNaN(ageVal) || ageVal < 18 || ageVal > 100) {
            showFieldError(inputs.age, 'Age must be a number between 18 and 100 years.');
            isValid = false;
        } else {
            clearFieldError(inputs.age);
        }

        // 7. Validate Address (Requirement 14)
        if (!inputs.address.value || inputs.address.value.trim().length < 8) {
            showFieldError(inputs.address, 'Please enter your full address (minimum 8 characters).');
            isValid = false;
        } else {
            clearFieldError(inputs.address);
        }
        
        if (isValid) {
            // Collect Form Values for Confirmation
            const genderVal = document.querySelector('input[name="gender"]:checked')?.value || 'Not specified';
            const selectedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);
            const notesVal = inputs.editableNotes ? inputs.editableNotes.innerText.trim() : '';

            const registrationData = {
                name: inputs.name.value.trim(),
                email: inputs.email.value.trim(),
                phone: inputs.phone.value.trim(),
                dob: inputs.dob.value,
                time: inputs.time.value,
                age: inputs.age.value,
                gender: genderVal,
                skills: selectedSkills,
                address: inputs.address.value.trim(),
                notes: notesVal
            };

            // Display Success Popup Modal
            showSuccessModal(registrationData);
            
            // Also store submitted registration into localStorage for reference
            localStorage.setItem('lastRegistration', JSON.stringify(registrationData));
        }
    });

    // Cancel Button Action Handler (Requirement 17)
    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            if (confirm('Are you sure you want to cancel the registration process? Form inputs will be cleared.')) {
                form.reset();
                Object.keys(inputs).forEach(key => {
                    if (inputs[key]) clearFieldError(inputs[key]);
                });
                if (inputs.editableNotes) {
                    inputs.editableNotes.innerText = 'Type your special requests or notes here... HTML5 spellcheck is enabled on this editable section!';
                }
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
    if (errorEl) {
        errorEl.style.display = 'none';
    }
}

function showSuccessModal(data) {
    const modal = document.createElement('div');
    modal.className = 'success-modal-overlay';
    
    modal.innerHTML = `
        <div class="success-modal-card">
            <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h2>Registration Successful!</h2>
            <p>Welcome <strong>${data.name}</strong>. Your HTML5 Form data has been verified and registered successfully.</p>
            <div style="text-align:left; background:var(--bg-base); border:1px solid var(--border-color); padding:1rem; border-radius:8px; margin-bottom:1.25rem; font-size:0.82rem; line-height:1.6;">
                <div><strong>Email:</strong> ${data.email}</div>
                <div><strong>Phone:</strong> ${data.phone}</div>
                <div><strong>DOB & Preferred Time:</strong> ${data.dob} at ${data.time}</div>
                <div><strong>Age & Gender:</strong> ${data.age} yrs (${data.gender})</div>
                <div><strong>Selected Skills:</strong> ${data.skills.join(', ') || 'None selected'}</div>
            </div>
            <button class="btn btn-primary btn-close-modal" style="width:100%;">Close & Proceed</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
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

/* ==========================================================================
   6. ASSIGNMENT 4: HTML5 DRAG AND DROP API IMPLEMENTATION
   Requirements:
   - Draggable Source Cards (draggable="true")
   - Drop Target Areas
   - Implement dragstart, dragover, dragenter, dragleave, drop events
   ========================================================================== */
function initDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable-card');
    const dropTargets = document.querySelectorAll('.drop-target-area');
    const statusText = document.getElementById('dnd-status-text');

    if (draggables.length === 0 || dropTargets.length === 0) return;

    let draggedItem = null;

    // 1. Draggable Elements Events
    draggables.forEach(item => {
        // dragstart Event
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            item.classList.add('dragging');
            
            // Set Data Transfer payload (HTML5 Standard API)
            const title = item.dataset.title || item.querySelector('h4').textContent;
            e.dataTransfer.setData('text/plain', item.id);
            e.dataTransfer.effectAllowed = 'move';

            if (statusText) {
                statusText.textContent = `Status: Dragging "${title}" module... Drop it into any target zone!`;
            }
        });

        // dragend Event
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            draggedItem = null;
            
            dropTargets.forEach(target => target.classList.remove('drag-over'));
            updateDropzoneCounts();
        });
    });

    // 2. Drop Target Areas Events
    dropTargets.forEach(target => {
        // dragover Event (Mandatory to allow drop by preventing default)
        target.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            target.classList.add('drag-over');
        });

        // dragenter Event
        target.addEventListener('dragenter', (e) => {
            e.preventDefault();
            target.classList.add('drag-over');
        });

        // dragleave Event
        target.addEventListener('dragleave', (e) => {
            if (!target.contains(e.relatedTarget)) {
                target.classList.remove('drag-over');
            }
        });

        // drop Event
        target.addEventListener('drop', (e) => {
            e.preventDefault();
            target.classList.remove('drag-over');

            if (draggedItem) {
                // Remove placeholder if present
                const placeholder = target.querySelector('.drop-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }

                // Append the dragged element into the target container
                target.appendChild(draggedItem);
                
                const title = draggedItem.dataset.title || 'Module';
                const targetZoneName = target.dataset.zone || 'Target Dropzone';

                if (statusText) {
                    statusText.textContent = `Success! Dropped "${title}" into ${targetZoneName}.`;
                }

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

        if (sourceZone && countSource) {
            const items = sourceZone.querySelectorAll('.draggable-card').length;
            countSource.textContent = `${items} Modules`;
        }

        if (activeZone && countActive) {
            const items = activeZone.querySelectorAll('.draggable-card').length;
            countActive.textContent = `${items} Modules`;
            if (phActive) phActive.style.display = items === 0 ? 'block' : 'none';
        }

        if (archiveZone && countArchive) {
            const items = archiveZone.querySelectorAll('.draggable-card').length;
            countArchive.textContent = `${items} Modules`;
            if (phArchive) phArchive.style.display = items === 0 ? 'block' : 'none';
        }
    }
}

/* ==========================================================================
   7. ASSIGNMENT 4: WEB STORAGE API (LOCAL STORAGE & SESSION STORAGE)
   Requirements:
   - Local Storage (Save, Retrieve, Clear)
   - Session Storage (Save, Retrieve, Clear)
   - Retrieve data button output display
   ========================================================================== */
function initWebStorage() {
    // Local Storage Elements
    const inputLocalName = document.getElementById('local-user-name');
    const selectLocalRole = document.getElementById('local-user-role');
    const selectLocalTheme = document.getElementById('local-theme-pref');

    const btnSaveLocal = document.getElementById('btn-save-local');
    const btnReadLocal = document.getElementById('btn-read-local');
    const btnClearLocal = document.getElementById('btn-clear-local');

    // Session Storage Elements
    const inputSessionToken = document.getElementById('session-token');
    const inputSessionWorkspace = document.getElementById('session-workspace');
    const inputSessionNote = document.getElementById('session-note');

    const btnSaveSession = document.getElementById('btn-save-session');
    const btnReadSession = document.getElementById('btn-read-session');
    const btnClearSession = document.getElementById('btn-clear-session');

    // Terminal Screen Output
    const terminalOutput = document.getElementById('storage-display-output');
    const btnClearOutput = document.getElementById('btn-clear-output');

    // Generate random session token on load
    if (inputSessionToken && !inputSessionToken.value) {
        inputSessionToken.value = 'SF-SESS-' + Math.floor(10000 + Math.random() * 90000) + '-IT';
    }

    // --- 1. LOCAL STORAGE LOGIC ---
    if (btnSaveLocal) {
        btnSaveLocal.addEventListener('click', () => {
            const profileData = {
                name: inputLocalName ? inputLocalName.value.trim() : '',
                role: selectLocalRole ? selectLocalRole.value : '',
                themePreference: selectLocalTheme ? selectLocalTheme.value : '',
                timestamp: new Date().toLocaleString()
            };

            if (!profileData.name) {
                alert('Please enter a user name before saving to Local Storage.');
                return;
            }

            // Save to localStorage API
            localStorage.setItem('userProfile', JSON.stringify(profileData));
            logToTerminal(`[LOCAL STORAGE SUCCESS] Data saved permanently to localStorage under key "userProfile":\n` + JSON.stringify(profileData, null, 2));
        });
    }

    if (btnReadLocal) {
        btnReadLocal.addEventListener('click', () => {
            const rawData = localStorage.getItem('userProfile');
            if (rawData) {
                const parsed = JSON.parse(rawData);
                logToTerminal(`[LOCAL STORAGE RETRIEVED] Reading key "userProfile" from localStorage:\n` + JSON.stringify(parsed, null, 2));
                
                // Populate input fields
                if (inputLocalName) inputLocalName.value = parsed.name || '';
                if (selectLocalRole) selectLocalRole.value = parsed.role || 'Full Stack Developer';
                if (selectLocalTheme) selectLocalTheme.value = parsed.themePreference || 'Sleek Light';
            } else {
                logToTerminal(`[LOCAL STORAGE READ] No data found for key "userProfile". Try entering details and clicking "Save Local Data" first.`);
            }
        });
    }

    if (btnClearLocal) {
        btnClearLocal.addEventListener('click', () => {
            localStorage.removeItem('userProfile');
            if (inputLocalName) inputLocalName.value = '';
            logToTerminal(`[LOCAL STORAGE CLEARED] Successfully removed key "userProfile" from localStorage.`);
        });
    }

    // --- 2. SESSION STORAGE LOGIC ---
    if (btnSaveSession) {
        btnSaveSession.addEventListener('click', () => {
            const sessionData = {
                sessionToken: inputSessionToken ? inputSessionToken.value : '',
                workspaceId: inputSessionWorkspace ? inputSessionWorkspace.value.trim() : '',
                sessionNote: inputSessionNote ? inputSessionNote.value.trim() : '',
                created: new Date().toLocaleTimeString()
            };

            if (!sessionData.workspaceId) {
                alert('Please enter an Active Workspace ID before saving to Session Storage.');
                return;
            }

            // Save to sessionStorage API
            sessionStorage.setItem('activeSession', JSON.stringify(sessionData));
            logToTerminal(`[SESSION STORAGE SUCCESS] Data saved temporarily to sessionStorage under key "activeSession":\n` + JSON.stringify(sessionData, null, 2));
        });
    }

    if (btnReadSession) {
        btnReadSession.addEventListener('click', () => {
            const rawData = sessionStorage.getItem('activeSession');
            if (rawData) {
                const parsed = JSON.parse(rawData);
                logToTerminal(`[SESSION STORAGE RETRIEVED] Reading key "activeSession" from sessionStorage:\n` + JSON.stringify(parsed, null, 2));
                
                // Populate input fields
                if (inputSessionToken) inputSessionToken.value = parsed.sessionToken || '';
                if (inputSessionWorkspace) inputSessionWorkspace.value = parsed.workspaceId || '';
                if (inputSessionNote) inputSessionNote.value = parsed.sessionNote || '';
            } else {
                logToTerminal(`[SESSION STORAGE READ] No session data found for key "activeSession". Enter details and click "Save Session Data".`);
            }
        });
    }

    if (btnClearSession) {
        btnClearSession.addEventListener('click', () => {
            sessionStorage.removeItem('activeSession');
            if (inputSessionWorkspace) inputSessionWorkspace.value = '';
            if (inputSessionNote) inputSessionNote.value = '';
            logToTerminal(`[SESSION STORAGE CLEARED] Successfully removed key "activeSession" from sessionStorage.`);
        });
    }

    // Terminal clear button
    if (btnClearOutput) {
        btnClearOutput.addEventListener('click', () => {
            if (terminalOutput) {
                terminalOutput.textContent = `// Web Storage Terminal Cleared. Click "Retrieve Data" to inspect stored entries.`;
            }
        });
    }

    function logToTerminal(msg) {
        if (terminalOutput) {
            terminalOutput.textContent = msg;
        }
    }
}

/* ==========================================================================
   8. Navigation Smooth Scroll & Active Highlight
   ========================================================================== */
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

/* Scroll-to-Top Button Handler */
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
