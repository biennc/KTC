import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schemas
const emailSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
});

const signInSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const signUpSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  agreeTerms: yup.boolean().oneOf([true], 'You must agree to the terms').required('You must agree to the terms'),
});

// Form data interfaces
interface EmailData {
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

const Auth: React.FC<{ onSubmit: (email: string) => void }> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EmailData>({
    resolver: yupResolver(emailSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data.email))} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Continue
      </button>
      <div className="py-3 space-y-3">
        <button className="w-full bg-white text-gray-900 font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors">
          <div className="w-5 h-5 bg-blue-600 rounded"></div>
          <span>Continue with Facebook</span>
        </button>

        <button className="w-full bg-white text-gray-900 font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors">
          <div className="w-5 h-5 bg-red-500 rounded-full"></div>
          <span>Continue with Google</span>
        </button>

        <button className="w-full bg-white text-gray-900 font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors">
          <div className="w-5 h-5 bg-black rounded"></div>
          <span>Continue with Apple</span>
        </button>
      </div>
      <div className="mt-8 text-center space-y-2">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                Sign up
              </button>
            </p>
            <button
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              Forgot your password?
            </button>
          </div>
    </form>
  );
};

// Sign-In Component
const Login: React.FC<{ initialEmail: string }> = ({ initialEmail }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: yupResolver(signInSchema),
    defaultValues: { email: initialEmail },
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginData) => {
    console.log('Sign In:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <div className="flex items-center mb-4">
        <img
          src="https://placehold.co/40x40"
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="text-lg font-medium">John Doe</span>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>
      <div className="mb-4">
        <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot your password?</a>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Continue
      </button>
    </form>
  );
};

const Signup: React.FC<{ initialEmail: string }> = ({ initialEmail }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: { email: initialEmail },
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: SignupData) => {
    console.log('Sign Up:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <p className="mb-4 text-gray-700">
        Looks like you don't have an account. Let's create a new account for {initialEmail}.
      </p>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('agreeTerms')}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-600">
            By selecting Agree and continue below, I agree to Terms of Service and Privacy Policy.
          </span>
        </label>
        {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Agree and continue
      </button>
    </form>
  );
};

const Form1: React.FC = () => {
  const [step, setStep] = useState<'email' | 'login' | 'signup'>('email');
  const [email, setEmail] = useState<string>('');

  const handleEmailSubmit = (enteredEmail: string) => {
    setEmail(enteredEmail);
    if (enteredEmail === 'existing@example.com') {
      setStep('login');
    } else {
      setStep('signup');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {step === 'email' && <Auth onSubmit={handleEmailSubmit} />}
      {step === 'login' && <Login initialEmail={email} />}
      {step === 'signup' && <Signup initialEmail={email} />}
    </div>
  );
};

export default Form1;