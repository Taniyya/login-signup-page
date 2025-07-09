<<<<<<< HEAD
// DOM Elements
const signupForm = document.getElementById('signupForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const signupBtn = document.getElementById('signupBtn');
const spinner = document.getElementById('spinner');
const termsCheckbox = document.getElementById('terms');

// Error elements
const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Password strength elements
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

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

function validateName(name) {
    return name.trim().length >= 2;
}

function validatePassword(password) {
    return password.length >= 8;
}

function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 8) strength += 1;
    else feedback.push('At least 8 characters');
    
    if (/[a-z]/.test(password)) strength += 1;
    else feedback.push('Lowercase letter');
    
    if (/[A-Z]/.test(password)) strength += 1;
    else feedback.push('Uppercase letter');
    
    if (/[0-9]/.test(password)) strength += 1;
    else feedback.push('Number');
    
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    else feedback.push('Special character');
    
    return { strength, feedback };
}

function updatePasswordStrength(password) {
    const { strength, feedback } = checkPasswordStrength(password);
    
    // Update strength bar
    strengthFill.className = 'strength-fill';
    if (strength <= 2) {
        strengthFill.classList.add('weak');
        strengthText.textContent = 'Weak password';
        strengthText.style.color = '#e74c3c';
    } else if (strength <= 3) {
        strengthFill.classList.add('medium');
        strengthText.textContent = 'Medium password';
        strengthText.style.color = '#f39c12';
    } else {
        strengthFill.classList.add('strong');
        strengthText.textContent = 'Strong password';
        strengthText.style.color = '#27ae60';
    }
    
    return strength >= 3; // Consider medium or strong as valid
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

toggleConfirmPasswordBtn.addEventListener('click', function() {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Real-time validation
firstNameInput.addEventListener('input', function() {
    const name = this.value.trim();
    
    if (name === '') {
        clearError(firstNameError);
        setInputState(this, null);
    } else if (!validateName(name)) {
        showError(firstNameError, 'First name must be at least 2 characters');
        setInputState(this, 'error');
    } else {
        clearError(firstNameError);
        setInputState(this, 'success');
    }
});

lastNameInput.addEventListener('input', function() {
    const name = this.value.trim();
    
    if (name === '') {
        clearError(lastNameError);
        setInputState(this, null);
    } else if (!validateName(name)) {
        showError(lastNameError, 'Last name must be at least 2 characters');
        setInputState(this, 'error');
    } else {
        clearError(lastNameError);
        setInputState(this, 'success');
    }
});

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
        strengthFill.className = 'strength-fill';
        strengthText.textContent = 'Password strength';
        strengthText.style.color = '#666';
    } else {
        const isValid = updatePasswordStrength(password);
        if (!isValid) {
            showError(passwordError, 'Password must be at least 8 characters with mixed case, numbers, and symbols');
            setInputState(this, 'error');
        } else {
            clearError(passwordError);
            setInputState(this, 'success');
        }
    }
    
    // Check password confirmation
    if (confirmPasswordInput.value) {
        validatePasswordConfirmation();
    }
});

confirmPasswordInput.addEventListener('input', function() {
    validatePasswordConfirmation();
});

function validatePasswordConfirmation() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword === '') {
        clearError(confirmPasswordError);
        setInputState(confirmPasswordInput, null);
    } else if (password !== confirmPassword) {
        showError(confirmPasswordError, 'Passwords do not match');
        setInputState(confirmPasswordInput, 'error');
    } else {
        clearError(confirmPasswordError);
        setInputState(confirmPasswordInput, 'success');
    }
}

// Form submission
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsAccepted = termsCheckbox.checked;
    
    // Clear previous errors
    clearError(firstNameError);
    clearError(lastNameError);
    clearError(emailError);
    clearError(passwordError);
    clearError(confirmPasswordError);
    
    // Validate form
    let isValid = true;
    
    if (firstName === '') {
        showError(firstNameError, 'First name is required');
        setInputState(firstNameInput, 'error');
        isValid = false;
    } else if (!validateName(firstName)) {
        showError(firstNameError, 'First name must be at least 2 characters');
        setInputState(firstNameInput, 'error');
        isValid = false;
    }
    
    if (lastName === '') {
        showError(lastNameError, 'Last name is required');
        setInputState(lastNameInput, 'error');
        isValid = false;
    } else if (!validateName(lastName)) {
        showError(lastNameError, 'Last name must be at least 2 characters');
        setInputState(lastNameInput, 'error');
        isValid = false;
    }
    
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
    } else if (!updatePasswordStrength(password)) {
        showError(passwordError, 'Password must be at least 8 characters with mixed case, numbers, and symbols');
        setInputState(passwordInput, 'error');
        isValid = false;
    }
    
    if (confirmPassword === '') {
        showError(confirmPasswordError, 'Please confirm your password');
        setInputState(confirmPasswordInput, 'error');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError(confirmPasswordError, 'Passwords do not match');
        setInputState(confirmPasswordInput, 'error');
        isValid = false;
    }
    
    if (!termsAccepted) {
        alert('Please accept the Terms of Service and Privacy Policy');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    showLoading(signupBtn);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success - show success message and redirect
        showSuccessMessage('Account created successfully! Welcome aboard!');
        
        // Store user data (in a real app, this would be handled by the backend)
        const userData = {
            firstName,
            lastName,
            email,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        showError(emailError, 'An error occurred. Please try again.');
        setInputState(emailInput, 'error');
    } finally {
        hideLoading(signupBtn);
    }
});

// Social signup handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
        
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        this.disabled = true;
        
        // Simulate social signup
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            alert(`${provider} signup functionality would be implemented here.`);
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

// Add focus effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('.input-wrapper').style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.closest('.input-wrapper').style.transform = 'scale(1)';
    });
});

// Terms and conditions link handlers
document.querySelectorAll('.terms-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Terms of Service and Privacy Policy would be displayed here.');
    });
});

// Initialize password strength on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial password strength
    strengthFill.className = 'strength-fill';
    strengthText.textContent = 'Password strength';
    strengthText.style.color = '#666';
});
=======
// DOM Elements
const signupForm = document.getElementById('signupForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const signupBtn = document.getElementById('signupBtn');
const spinner = document.getElementById('spinner');
const termsCheckbox = document.getElementById('terms');

// Error elements
const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Password strength elements
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

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

function validateName(name) {
    return name.trim().length >= 2;
}

function validatePassword(password) {
    return password.length >= 8;
}

function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 8) strength += 1;
    else feedback.push('At least 8 characters');
    
    if (/[a-z]/.test(password)) strength += 1;
    else feedback.push('Lowercase letter');
    
    if (/[A-Z]/.test(password)) strength += 1;
    else feedback.push('Uppercase letter');
    
    if (/[0-9]/.test(password)) strength += 1;
    else feedback.push('Number');
    
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    else feedback.push('Special character');
    
    return { strength, feedback };
}

function updatePasswordStrength(password) {
    const { strength, feedback } = checkPasswordStrength(password);
    
    // Update strength bar
    strengthFill.className = 'strength-fill';
    if (strength <= 2) {
        strengthFill.classList.add('weak');
        strengthText.textContent = 'Weak password';
        strengthText.style.color = '#e74c3c';
    } else if (strength <= 3) {
        strengthFill.classList.add('medium');
        strengthText.textContent = 'Medium password';
        strengthText.style.color = '#f39c12';
    } else {
        strengthFill.classList.add('strong');
        strengthText.textContent = 'Strong password';
        strengthText.style.color = '#27ae60';
    }
    
    return strength >= 3; // Consider medium or strong as valid
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

toggleConfirmPasswordBtn.addEventListener('click', function() {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Real-time validation
firstNameInput.addEventListener('input', function() {
    const name = this.value.trim();
    
    if (name === '') {
        clearError(firstNameError);
        setInputState(this, null);
    } else if (!validateName(name)) {
        showError(firstNameError, 'First name must be at least 2 characters');
        setInputState(this, 'error');
    } else {
        clearError(firstNameError);
        setInputState(this, 'success');
    }
});

lastNameInput.addEventListener('input', function() {
    const name = this.value.trim();
    
    if (name === '') {
        clearError(lastNameError);
        setInputState(this, null);
    } else if (!validateName(name)) {
        showError(lastNameError, 'Last name must be at least 2 characters');
        setInputState(this, 'error');
    } else {
        clearError(lastNameError);
        setInputState(this, 'success');
    }
});

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
        strengthFill.className = 'strength-fill';
        strengthText.textContent = 'Password strength';
        strengthText.style.color = '#666';
    } else {
        const isValid = updatePasswordStrength(password);
        if (!isValid) {
            showError(passwordError, 'Password must be at least 8 characters with mixed case, numbers, and symbols');
            setInputState(this, 'error');
        } else {
            clearError(passwordError);
            setInputState(this, 'success');
        }
    }
    
    // Check password confirmation
    if (confirmPasswordInput.value) {
        validatePasswordConfirmation();
    }
});

confirmPasswordInput.addEventListener('input', function() {
    validatePasswordConfirmation();
});

function validatePasswordConfirmation() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword === '') {
        clearError(confirmPasswordError);
        setInputState(confirmPasswordInput, null);
    } else if (password !== confirmPassword) {
        showError(confirmPasswordError, 'Passwords do not match');
        setInputState(confirmPasswordInput, 'error');
    } else {
        clearError(confirmPasswordError);
        setInputState(confirmPasswordInput, 'success');
    }
}

// Form submission
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsAccepted = termsCheckbox.checked;
    
    // Clear previous errors
    clearError(firstNameError);
    clearError(lastNameError);
    clearError(emailError);
    clearError(passwordError);
    clearError(confirmPasswordError);
    
    // Validate form
    let isValid = true;
    
    if (firstName === '') {
        showError(firstNameError, 'First name is required');
        setInputState(firstNameInput, 'error');
        isValid = false;
    } else if (!validateName(firstName)) {
        showError(firstNameError, 'First name must be at least 2 characters');
        setInputState(firstNameInput, 'error');
        isValid = false;
    }
    
    if (lastName === '') {
        showError(lastNameError, 'Last name is required');
        setInputState(lastNameInput, 'error');
        isValid = false;
    } else if (!validateName(lastName)) {
        showError(lastNameError, 'Last name must be at least 2 characters');
        setInputState(lastNameInput, 'error');
        isValid = false;
    }
    
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
    } else if (!updatePasswordStrength(password)) {
        showError(passwordError, 'Password must be at least 8 characters with mixed case, numbers, and symbols');
        setInputState(passwordInput, 'error');
        isValid = false;
    }
    
    if (confirmPassword === '') {
        showError(confirmPasswordError, 'Please confirm your password');
        setInputState(confirmPasswordInput, 'error');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError(confirmPasswordError, 'Passwords do not match');
        setInputState(confirmPasswordInput, 'error');
        isValid = false;
    }
    
    if (!termsAccepted) {
        alert('Please accept the Terms of Service and Privacy Policy');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    showLoading(signupBtn);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success - show success message and redirect
        showSuccessMessage('Account created successfully! Welcome aboard!');
        
        // Store user data (in a real app, this would be handled by the backend)
        const userData = {
            firstName,
            lastName,
            email,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        showError(emailError, 'An error occurred. Please try again.');
        setInputState(emailInput, 'error');
    } finally {
        hideLoading(signupBtn);
    }
});

// Social signup handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
        
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        this.disabled = true;
        
        // Simulate social signup
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            alert(`${provider} signup functionality would be implemented here.`);
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

// Add focus effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('.input-wrapper').style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.closest('.input-wrapper').style.transform = 'scale(1)';
    });
});

// Terms and conditions link handlers
document.querySelectorAll('.terms-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Terms of Service and Privacy Policy would be displayed here.');
    });
});

// Initialize password strength on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial password strength
    strengthFill.className = 'strength-fill';
    strengthText.textContent = 'Password strength';
    strengthText.style.color = '#666';
});
>>>>>>> 5ec6109516ab650a48c04292b6ce5d77eb17897c
