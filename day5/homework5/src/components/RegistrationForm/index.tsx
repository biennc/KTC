import { useState, type ChangeEvent, type FormEvent, type FocusEvent } from 'react';
// import styles from './styles.module.css';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  dob: string;
  country: string;
  hobbies: string[];
  profilePic: File | null;
  bio: string;
}

interface Errors {
  [key: string]: string;
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    dob: '',
    country: '',
    hobbies: [],
    profilePic: null,
    bio: ''
  });

  const [errors, setErrors] = useState<Errors>({});
  const [remainingChars, setRemainingChars] = useState(300);
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'bio') {
      setRemainingChars(300 - value.length);
    }
    
    // Validate on change if field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      let newHobbies = [...prev.hobbies];
      if (checked) {
        newHobbies.push(value);
      } else {
        newHobbies = newHobbies.filter(h => h !== value);
      }
      return { ...prev, hobbies: newHobbies };
    });
    
    if (touched.hobbies) {
      validateHobbies();
    }
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, gender: e.target.value }));
    
    if (touched.gender) {
      validateGender();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, profilePic: e.target.files![0] }));
      
      if (touched.profilePic) {
        validateProfilePic();
      }
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (value.trim().length < 3) {
          error = 'Full name must be at least 3 characters';
        }
        break;
        
      case 'email':
        { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email';
        }
        break; }
        
      case 'password':
        { const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!passwordRegex.test(value)) {
          error = 'Password must contain letters and numbers';
        }
        break; }
        
      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
        
      case 'phone':
        { const phoneRegex = /^\d+$/;
        if (!value) {
          error = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          error = 'Phone number must contain only digits';
        } else if (value.length < 10) {
          error = 'Phone number must be at least 10 digits';
        }
        break; }
        
      case 'dob':
        if (!value) {
          error = 'Date of birth is required';
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          
          if (age < 18) {
            error = 'You must be at least 18 years old';
          }
        }
        break;
        
      case 'country':
        if (!value) {
          error = 'Please select a country';
        }
        break;
        
      case 'bio':
        if (value.length > 300) {
          error = 'Bio must be 300 characters or less';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateGender = () => {
    const error = !formData.gender ? 'Please select a gender' : '';
    setErrors(prev => ({ ...prev, gender: error }));
    return !error;
  };

  const validateHobbies = () => {
    const error = formData.hobbies.length === 0 ? 'Please select at least one hobby' : '';
    setErrors(prev => ({ ...prev, hobbies: error }));
    return !error;
  };

  const validateProfilePic = () => {
    let error = '';
    if (formData.profilePic) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(formData.profilePic.type)) {
        error = 'Please upload a valid image (JPEG or PNG)';
      }
    }
    setErrors(prev => ({ ...prev, profilePic: error }));
    return !error;
  };

  const validateForm = () => {
    let isValid = true;
    
    // Validate all fields
    isValid = validateField('fullName', formData.fullName) && isValid;
    isValid = validateField('email', formData.email) && isValid;
    isValid = validateField('password', formData.password) && isValid;
    isValid = validateField('confirmPassword', formData.confirmPassword) && isValid;
    isValid = validateField('phone', formData.phone) && isValid;
    isValid = validateField('dob', formData.dob) && isValid;
    isValid = validateField('country', formData.country) && isValid;
    isValid = validateField('bio', formData.bio) && isValid;
    isValid = validateGender() && isValid;
    isValid = validateHobbies() && isValid;
    isValid = validateProfilePic() && isValid;
    
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as {[key: string]: boolean});
    setTouched(allTouched);
    
    if (validateForm()) {
      alert('Registration successful!');
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        dob: '',
        country: '',
        hobbies: [],
        profilePic: null,
        bio: ''
      });
      setRemainingChars(300);
      setErrors({});
    }
  };

  return (
    <div className={styles.container}>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Full Name */}
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name*</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.fullName ? styles.invalid : ''}
            required
          />
          {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? styles.invalid : ''}
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
        </div>

        {/* Password */}
        <div className={styles.formGroup}>
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password ? styles.invalid : ''}
          />
          {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.confirmPassword ? styles.invalid : ''}
          />
          {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
        </div>

        {/* Phone Number */}
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number*</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phone ? styles.invalid : ''}
          />
          {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
        </div>

        {/* Gender */}
        <div className={styles.formGroup}>
          <label>Gender*</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleRadioChange}
              /> Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleRadioChange}
              /> Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleRadioChange}
              /> Other
            </label>
          </div>
          {errors.gender && <span className={styles.errorMessage}>{errors.gender}</span>}
        </div>

        {/* Date of Birth */}
        <div className={styles.formGroup}>
          <label htmlFor="dob">Date of Birth*</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.dob ? styles.invalid : ''}
          />
          {errors.dob && <span className={styles.errorMessage}>{errors.dob}</span>}
        </div>

        {/* Country */}
        <div className={styles.formGroup}>
          <label htmlFor="country">Country*</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.country ? styles.invalid : ''}
          >
            <option value="">Select Country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="vn">Vietnam</option>
            <option value="other">Other</option>
          </select>
          {errors.country && <span className={styles.errorMessage}>{errors.country}</span>}
        </div>

        {/* Hobbies */}
        <div className={styles.formGroup}>
          <label>Hobbies* (Select at least one)</label>
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="reading"
                checked={formData.hobbies.includes('reading')}
                onChange={handleCheckboxChange}
              /> Reading
            </label>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="sports"
                checked={formData.hobbies.includes('sports')}
                onChange={handleCheckboxChange}
              /> Sports
            </label>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="travel"
                checked={formData.hobbies.includes('travel')}
                onChange={handleCheckboxChange}
              /> Travel
            </label>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="music"
                checked={formData.hobbies.includes('music')}
                onChange={handleCheckboxChange}
              /> Music
            </label>
          </div>
          {errors.hobbies && <span className={styles.errorMessage}>{errors.hobbies}</span>}
        </div>

        {/* Profile Picture */}
        <div className={styles.formGroup}>
          <label htmlFor="profilePic">Profile Picture</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={handleFileChange}
            accept="image/jpeg, image/png"
          />
          {errors.profilePic && <span className={styles.errorMessage}>{errors.profilePic}</span>}
        </div>

        {/* Bio */}
        <div className={styles.formGroup}>
          <label htmlFor="bio">Bio / About You</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={300}
            className={errors.bio ? styles.invalid : ''}
          />
          <span className={styles.charCount}>
            <span>{remainingChars}</span> characters remaining
          </span>
          {errors.bio && <span className={styles.errorMessage}>{errors.bio}</span>}
        </div>

        <button type="submit" className={styles.submitBtn}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;