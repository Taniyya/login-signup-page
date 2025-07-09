
// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');
const spinner = document.getElementById('spinner');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Utility functions
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function setInputState(input, state) {
    const wrapper = input.closest('.input-wrapper');
    wrapper.classList.remove('error', 'success');
    if (state) {
        wrapper.classList.add(state);
    }
}

function showLoading(button) {
    button.classList.add('loading');
    button.disabled = true;
}

function hideLoading(button) {
    button.classList.remove('loading');
    button.disabled = false;
}

// Password toggle functionality
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Real-time validation
emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    
    if (email === '') {
        clearError(emailError);
        setInputState(this, null);
    } else if (!validateEmail(email)) {
        showError(emailError, 'Please enter a valid email address');
        setInputState(this, 'error');
    } else {
        clearError(emailError);
        setInputState(this, 'success');
    }
});

passwordInput.addEventListener('input', function() {
    const password = this.value;
    
    if (password === '') {
        clearError(passwordError);
        setInputState(this, null);
    } else if (!validatePassword(password)) {
        showError(passwordError, 'Password must be at least 6 characters long');
        setInputState(this, 'error');
    } else {
        clearError(passwordError);
        setInputState(this, 'success');
    }
});

// Form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = document.getElementById('remember').checked;
    
    // Clear previous errors
    clearError(emailError);
    clearError(passwordError);
    
    // Validate form
    let isValid = true;
    
    if (email === '') {
        showError(emailError, 'Email is required');
        setInputState(emailInput, 'error');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailError, 'Please enter a valid email address');
        setInputState(emailInput, 'error');
        isValid = false;
    }
    
    if (password === '') {
        showError(passwordError, 'Password is required');
        setInputState(passwordInput, 'error');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordError, 'Password must be at least 6 characters long');
        setInputState(passwordInput, 'error');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    showLoading(loginBtn);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, accept any valid email/password combination
        if (validateEmail(email) && validatePassword(password)) {
            // Success - redirect or show success message
            showSuccessMessage('Login successful! Redirecting...');
            
            // Store remember me preference
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('userEmail', email);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('userEmail');
            }
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = '/dashboard.html'; // Change this to your dashboard URL
            }, 1500);
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        showError(emailError, 'Invalid email or password');
        setInputState(emailInput, 'error');
        setInputState(passwordInput, 'error');
    } finally {
        hideLoading(loginBtn);
    }
});

// Social login handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
        
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        this.disabled = true;
        
        // Simulate social login
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            alert(`${provider} login functionality would be implemented here.`);
        }, 1500);
    });
});

// Success message function
function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add keyframe animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Check for remembered user
document.addEventListener('DOMContentLoaded', function() {
    const rememberMe = localStorage.getItem('rememberMe');
    const userEmail = localStorage.getItem('userEmail');
    
    if (rememberMe === 'true' && userEmail) {
        emailInput.value = userEmail;
        document.getElementById('remember').checked = true;
        setInputState(emailInput, 'success');
    }
});

// Add focus effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('.input-wrapper').style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.closest('.input-wrapper').style.transform = 'scale(1)';
    });
});

// Add smooth scrolling for anchor links
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
=======
// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');
const spinner = document.getElementById('spinner');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Utility functions
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function setInputState(input, state) {
    const wrapper = input.closest('.input-wrapper');
    wrapper.classList.remove('error', 'success');
    if (state) {
        wrapper.classList.add(state);
    }
}

function showLoading(button) {
    button.classList.add('loading');
    button.disabled = true;
}

function hideLoading(button) {
    button.classList.remove('loading');
    button.disabled = false;
}

// Password toggle functionality
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Real-time validation
emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    
    if (email === '') {
        clearError(emailError);
        setInputState(this, null);
    } else if (!validateEmail(email)) {
        showError(emailError, 'Please enter a valid email address');
        setInputState(this, 'error');
    } else {
        clearError(emailError);
        setInputState(this, 'success');
    }
});

passwordInput.addEventListener('input', function() {
    const password = this.value;
    
    if (password === '') {
        clearError(passwordError);
        setInputState(this, null);
    } else if (!validatePassword(password)) {
        showError(passwordError, 'Password must be at least 6 characters long');
        setInputState(this, 'error');
    } else {
        clearError(passwordError);
        setInputState(this, 'success');
    }
});

// Form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = document.getElementById('remember').checked;
    
    // Clear previous errors
    clearError(emailError);
    clearError(passwordError);
    
    // Validate form
    let isValid = true;
    
    if (email === '') {
        showError(emailError, 'Email is required');
        setInputState(emailInput, 'error');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailError, 'Please enter a valid email address');
        setInputState(emailInput, 'error');
        isValid = false;
    }
    
    if (password === '') {
        showError(passwordError, 'Password is required');
        setInputState(passwordInput, 'error');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordError, 'Password must be at least 6 characters long');
        setInputState(passwordInput, 'error');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    showLoading(loginBtn);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, accept any valid email/password combination
        if (validateEmail(email) && validatePassword(password)) {
            // Success - redirect or show success message
            showSuccessMessage('Login successful! Redirecting...');
            
            // Store remember me preference
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('userEmail', email);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('userEmail');
            }
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = '/dashboard.html'; // Change this to your dashboard URL
            }, 1500);
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        showError(emailError, 'Invalid email or password');
        setInputState(emailInput, 'error');
        setInputState(passwordInput, 'error');
    } finally {
        hideLoading(loginBtn);
    }
});

// Social login handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
        
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        this.disabled = true;
        
        // Simulate social login
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            alert(`${provider} login functionality would be implemented here.`);
        }, 1500);
    });
});

// Success message function
function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add keyframe animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Check for remembered user
document.addEventListener('DOMContentLoaded', function() {
    const rememberMe = localStorage.getItem('rememberMe');
    const userEmail = localStorage.getItem('userEmail');
    
    if (rememberMe === 'true' && userEmail) {
        emailInput.value = userEmail;
        document.getElementById('remember').checked = true;
        setInputState(emailInput, 'success');
    }
});

// Add focus effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('.input-wrapper').style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.closest('.input-wrapper').style.transform = 'scale(1)';
    });
});

// Add smooth scrolling for anchor links
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
>>>>>>> 5ec6109516ab650a48c04292b6ce5d77eb17897c
