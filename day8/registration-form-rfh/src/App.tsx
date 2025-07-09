import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './App.module.css';

const schema = yup.object({
  fullName: yup
    .string()
    .required('Full Name is required')
    .min(3, 'Full Name must be at least 3 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, 'Password must contain letters and numbers'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10,}$/, 'Phone number must be at least 10 digits'),
  gender: yup.string().required('Please select a gender'),
  dob: yup
    .string()
    .required('Date of birth is required')
    .test('age', 'You must be at least 18 years old', (value) => {
      if (!value) return false;
      const birth = new Date(value);
      const now = new Date();
      let age = now.getFullYear() - birth.getFullYear();
      const m = now.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
      return age >= 18;
    }),
  country: yup.string().required('Please select a country'),
  hobbies: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one hobby')
    .required(), // ép bắt buộc
  profilePic: yup
    .mixed<File | null>()
    .nullable()
    .test('fileType', 'Only JPEG/PNG images are allowed', (file) => {
      if (!file) return true;
      return ['image/jpeg', 'image/png'].includes(file.type);
    }),
  bio: yup.string().max(300, 'Bio must be 300 characters or less'),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // ép kiểu string để avoid AnyPresentValue
  const bioValue = (watch('bio') as string) || '';

  const onSubmit: SubmitHandler<FormData> = () => {
    alert('Registration successful!');
    reset();
  };

  return (
    <div className={styles.container}>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Full Name */}
        <div className={styles.formGroup}>
          <label>Full Name*</label>
          <input {...register('fullName')} />
          {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label>Email*</label>
          <input type="email" {...register('email')} />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className={styles.formGroup}>
          <label>Password*</label>
          <input type="password" {...register('password')} />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className={styles.formGroup}>
          <label>Confirm Password*</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
        </div>

        {/* Phone */}
        <div className={styles.formGroup}>
          <label>Phone Number*</label>
          <input type="tel" {...register('phone')} />
          {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
        </div>

        {/* Gender */}
        <div className={styles.formGroup}>
          <label>Gender*</label>
          <div className={styles.radioGroup}>
            <label><input type="radio" value="male" {...register('gender')} /> Male</label>
            <label><input type="radio" value="female" {...register('gender')} /> Female</label>
            <label><input type="radio" value="other" {...register('gender')} /> Other</label>
          </div>
          {errors.gender && <p className={styles.error}>{errors.gender.message}</p>}
        </div>

        {/* Date of Birth */}
        <div className={styles.formGroup}>
          <label>Date of Birth*</label>
          <input type="date" {...register('dob')} />
          {errors.dob && <p className={styles.error}>{errors.dob.message}</p>}
        </div>

        {/* Country */}
        <div className={styles.formGroup}>
          <label>Country*</label>
          <select {...register('country')}>
            <option value="">Select Country</option>
            <option value="us">USA</option>
            <option value="uk">UK</option>
            <option value="vn">Vietnam</option>
          </select>
          {errors.country && <p className={styles.error}>{errors.country.message}</p>}
        </div>

        {/* Hobbies */}
        <div className={styles.formGroup}>
          <label>Hobbies*</label>
          <label><input type="checkbox" value="Reading" {...register('hobbies')} /> Reading</label>
          <label><input type="checkbox" value="Traveling" {...register('hobbies')} /> Traveling</label>
          <label><input type="checkbox" value="Gaming" {...register('hobbies')} /> Gaming</label>
          {errors.hobbies && <p className={styles.error}>{errors.hobbies.message}</p>}
        </div>

        {/* Profile Picture */}
        <div className={styles.formGroup}>
          <label>Profile Picture</label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            {...register('profilePic', { valueAsFile: true })}
          />
          {errors.profilePic && <p className={styles.error}>{errors.profilePic.message}</p>}
        </div>

        {/* Bio */}
        <div className={styles.formGroup}>
          <label>Bio (max 300 chars)</label>
          <textarea {...register('bio')} maxLength={300} />
          <small>{300 - bioValue.length} characters remaining</small>
          {errors.bio && <p className={styles.error}>{errors.bio.message}</p>}
        </div>

        <button type="submit" className={styles.submitBtn}>Register</button>
      </form>
    </div>
);
}
