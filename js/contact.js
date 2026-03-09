// Contact form functionality
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('successMessage');
        this.fileUpload = document.getElementById('fileUpload');
        this.fileInput = document.getElementById('files');
        this.fileList = document.getElementById('fileList');
        this.selectedFiles = [];
        
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
            this.setupFileUpload();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    setupFileUpload() {
        if (!this.fileUpload || !this.fileInput) return;

        // Click to select files
        this.fileUpload.addEventListener('click', () => {
            this.fileInput.click();
        });

        // File selection
        this.fileInput.addEventListener('change', (e) => {
            this.handleFileSelection(e.target.files);
        });

        // Drag and drop
        this.fileUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.fileUpload.classList.add('drag-over');
        });

        this.fileUpload.addEventListener('dragleave', () => {
            this.fileUpload.classList.remove('drag-over');
        });

        this.fileUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            this.fileUpload.classList.remove('drag-over');
            this.handleFileSelection(e.dataTransfer.files);
        });
    }

    handleFileSelection(files) {
        const newFiles = Array.from(files);
        const maxFiles = 5;
        const maxSize = 10 * 1024 * 1024; // 10MB

        // Filter valid files
        const validFiles = newFiles.filter(file => {
            if (file.size > maxSize) {
                this.showError(`Le fichier "${file.name}" est trop volumineux (max 10MB)`);
                return false;
            }
            return true;
        });

        // Add to selected files (max 5)
        const remainingSlots = maxFiles - this.selectedFiles.length;
        const filesToAdd = validFiles.slice(0, remainingSlots);
        
        this.selectedFiles = [...this.selectedFiles, ...filesToAdd];
        this.updateFileList();

        if (validFiles.length > remainingSlots) {
            this.showError(`Maximum ${maxFiles} fichiers autorisés`);
        }
    }

    updateFileList() {
        if (!this.fileList) return;

        this.fileList.innerHTML = '';
        
        this.selectedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${file.name}</span>
                <button type="button" class="file-remove" data-index="${index}">
                    Supprimer
                </button>
            `;
            this.fileList.appendChild(fileItem);
        });

        // Bind remove buttons
        this.fileList.querySelectorAll('.file-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeFile(index);
            });
        });
    }

    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.updateFileList();
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Ce champ est obligatoire';
        }

        // Email validation
        if (field.type === 'email' && value && !FormValidator.validateEmail(value)) {
            isValid = false;
            errorMessage = 'Veuillez saisir une adresse email valide';
        }

        // Phone validation
        if (field.type === 'tel' && value && !FormValidator.validatePhone(value)) {
            isValid = false;
            errorMessage = 'Veuillez saisir un numéro de téléphone valide';
        }

        if (!isValid) {
            FormValidator.showError(field, errorMessage);
        } else {
            FormValidator.clearError(field);
        }

        return isValid;
    }

    clearFieldError(field) {
        FormValidator.clearError(field);
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showError('Veuillez corriger les erreurs dans le formulaire');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Simulate form submission
            await this.submitForm();
            this.showSuccess();
        } catch (error) {
            this.showError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            this.setLoadingState(false);
        }
    }

    async submitForm() {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(resolve, 1500);
        });
    }

    setLoadingState(loading) {
        if (!this.submitBtn) return;

        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');

        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('loading');
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) btnLoading.style.display = 'none';
        }
    }

    showSuccess() {
        if (this.form && this.successMessage) {
            this.form.style.display = 'none';
            this.successMessage.style.display = 'block';
            
            // Scroll to success message
            this.successMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });

            // Announce to screen readers
            const liveRegion = document.getElementById('live-region');
            if (liveRegion) {
                liveRegion.textContent = 'Votre demande a été envoyée avec succès. Nous vous répondrons sous 48h.';
            }
        }
    }

    showError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.form-error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error-message';
            errorDiv.style.cssText = `
                background-color: #fee2e2;
                color: #dc2626;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 16px;
                border: 1px solid #fecaca;
            `;
            this.form.insertBefore(errorDiv, this.form.firstChild);
        }

        errorDiv.textContent = message;
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorDiv && errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

// Auto-resize textareas
class TextareaAutoResize {
    constructor() {
        this.init();
    }

    init() {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            this.setupAutoResize(textarea);
        });
    }

    setupAutoResize(textarea) {
        textarea.addEventListener('input', () => {
            this.resize(textarea);
        });

        // Initial resize
        this.resize(textarea);
    }

    resize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
}

// Form field enhancements
class FormEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupFloatingLabels();
        this.setupPhoneFormatting();
    }

    setupFloatingLabels() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            const label = group.querySelector('label');
            
            if (!input || !label) return;

            // Add floating label class if input has value
            const checkValue = () => {
                if (input.value.trim() !== '') {
                    group.classList.add('has-value');
                } else {
                    group.classList.remove('has-value');
                }
            };

            input.addEventListener('input', checkValue);
            input.addEventListener('blur', checkValue);
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                group.classList.remove('focused');
            });

            // Initial check
            checkValue();
        });
    }

    setupPhoneFormatting() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                // Format French phone number
                if (value.length >= 10) {
                    value = value.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
                }
                
                e.target.value = value;
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
    new TextareaAutoResize();
    new FormEnhancements();
});