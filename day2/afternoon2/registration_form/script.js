document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const bio = document.getElementById('bio');
    const remainingChars = document.getElementById('remainingChars');

    bio.addEventListener('input', function() {
        const remaining = 300 - bio.value.length;
        remainingChars.textContent = remaining;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        
        // Validate all fields
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isPhoneValid = validatePhone();
        const isGenderValid = validateGender();
        const isDobValid = validateDob();
        const isCountryValid = validateCountry();
        const isHobbiesValid = validateHobbies();
        const isProfilePicValid = validateProfilePic();
        const isBioValid = validateBio();
        
        if (isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && 
            isPhoneValid && isGenderValid && isDobValid && isCountryValid && 
            isHobbiesValid && isProfilePicValid && isBioValid) {
            alert('Registration successful!');
            form.reset();
            remainingChars.textContent = '300';
        }
    });

    function validateFullName() {
        const fullName = document.getElementById('fullName');
        const error = document.getElementById('fullNameError');
        
        if (fullName.value.trim() === '') {
            showError(fullName, error, 'Full name is required');
            return false;
        } else if (fullName.value.trim().length < 3) {
            showError(fullName, error, 'Full name must be at least 3 characters');
            return false;
        }
        
        showSuccess(fullName, error);
        return true;
    }

    function validateEmail() {
        const email = document.getElementById('email');
        const error = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.value.trim() === '') {
            showError(email, error, 'Email is required');
            return false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, error, 'Please enter a valid email');
            return false;
        }
        
        showSuccess(email, error);
        return true;
    }

    function validatePassword() {
        const password = document.getElementById('password');
        const error = document.getElementById('passwordError');
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        
        if (password.value === '') {
            showError(password, error, 'Password is required');
            return false;
        } else if (password.value.length < 8) {
            showError(password, error, 'Password must be at least 8 characters');
            return false;
        } else if (!passwordRegex.test(password.value)) {
            showError(password, error, 'Password must contain letters and numbers');
            return false;
        }
        
        showSuccess(password, error);
        return true;
    }

    function validateConfirmPassword() {
        const confirmPassword = document.getElementById('confirmPassword');
        const password = document.getElementById('password');
        const error = document.getElementById('confirmPasswordError');
        
        if (confirmPassword.value === '') {
            showError(confirmPassword, error, 'Please confirm your password');
            return false;
        } else if (confirmPassword.value !== password.value) {
            showError(confirmPassword, error, 'Passwords do not match');
            return false;
        }
        
        showSuccess(confirmPassword, error);
        return true;
    }

    function validatePhone() {
        const phone = document.getElementById('phone');
        const error = document.getElementById('phoneError');
        const phoneRegex = /^\d+$/;
        
        if (phone.value.trim() === '') {
            showError(phone, error, 'Phone number is required');
            return false;
        } else if (!phoneRegex.test(phone.value)) {
            showError(phone, error, 'Phone number must contain only digits');
            return false;
        } else if (phone.value.length < 10) {
            showError(phone, error, 'Phone number must be at least 10 digits');
            return false;
        }
        
        showSuccess(phone, error);
        return true;
    }

    function validateGender() {
        const gender = document.querySelector('input[name="gender"]:checked');
        const error = document.getElementById('genderError');
        
        if (!gender) {
            showError(null, error, 'Please select a gender');
            return false;
        }
        
        showSuccess(null, error);
        return true;
    }

    function validateDob() {
        const dob = document.getElementById('dob');
        const error = document.getElementById('dobError');
        
        if (dob.value === '') {
            showError(dob, error, 'Date of birth is required');
            return false;
        }
        
        const birthDate = new Date(dob.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        if (age < 18) {
            showError(dob, error, 'You must be at least 18 years old');
            return false;
        }
        
        showSuccess(dob, error);
        return true;
    }

    function validateCountry() {
        const country = document.getElementById('country');
        const error = document.getElementById('countryError');
        
        if (country.value === '') {
            showError(country, error, 'Please select a country');
            return false;
        }
        
        showSuccess(country, error);
        return true;
    }

    function validateHobbies() {
        const hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
        const error = document.getElementById('hobbiesError');
        
        if (hobbies.length === 0) {
            showError(null, error, 'Please select at least one hobby');
            return false;
        }
        
        showSuccess(null, error);
        return true;
    }

    function validateProfilePic() {
        const profilePic = document.getElementById('profilePic');
        const error = document.getElementById('profilePicError');
        
        if (profilePic.files.length > 0) {
            const file = profilePic.files[0];
            const validTypes = ['image/jpeg', 'image/png'];
            
            if (!validTypes.includes(file.type)) {
                showError(profilePic, error, 'Please upload a valid image (JPEG or PNG)');
                return false;
            }
        }
        
        showSuccess(profilePic, error);
        return true;
    }

    function validateBio() {
        const bio = document.getElementById('bio');
        const error = document.getElementById('bioError');
        
        if (bio.value.length > 300) {
            showError(bio, error, 'Bio must be 300 characters or less');
            return false;
        }
        
        showSuccess(bio, error);
        return true;
    }

    // functions
    function showError(field, errorElement, message) {
        if (field) {
            field.classList.add('invalid');
            field.classList.remove('valid');
        }
        errorElement.textContent = message;
    }

    function showSuccess(field, errorElement) {
        if (field) {
            field.classList.add('valid');
            field.classList.remove('invalid');
        }
        errorElement.textContent = '';
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        const fields = document.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.classList.remove('invalid');
            field.classList.remove('valid');
        });
    }
});