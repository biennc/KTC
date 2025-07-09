
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { InferType } from 'yup';

const signUpSchema = yup.object({
  firstName: yup.string().min(2, "First Name must be at least 2 characters").required('First Name is required'),
  lastName: yup.string().min(2, "Last Name must be at least 2 characters").required('Last Name is required'),
  phoneNumber: yup
    .string()
    .matches(/^0[0-9]{9,14}$/, "Phone number must start with 0 and have 10-15 digits")
    .required('Phone number is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]*$/,
      'Must contain 1 uppercase, 1 lowercase, 1 number and no spaces'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  newLetter: yup.boolean().notRequired().default(false),
  agreeTerms: yup.boolean().oneOf([true], 'You must agree to the terms').required('You must agree to the terms'),
});

type SignupData = InferType<typeof signUpSchema>;

const Form2: React.FC<{ initialEmail: string }> = ({ initialEmail }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: { email: initialEmail },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: SignupData) => {
    console.log('Sign Up Data:', {
      ...data,
      password: '***',
      confirmPassword: '***'
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <p className="mb-4 text-gray-700">
        Looks like you don't have an account. Let's create a new account for {initialEmail}.
      </p>

      <div className="flex flex-row">
        <div className="mb-4 flex-1">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="first-name"
            type="text"
            {...register('firstName')}
            placeholder="John"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
        </div>

        <div className="mb-4 px-3 flex-1">
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="last-name"
            type="text"
            {...register('lastName')}
            placeholder="Doe"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="flex flex-row">
        <div className="mb-4 flex-1">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number</label>
          <input
            id="phone"
            type="tel"
            {...register('phoneNumber')}
            placeholder="0987654321"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
        </div>
        <div className="mb-4 px-3 flex-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john.doe@example.com"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div className="flex flex-row">
        <div className="mb-4 flex-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Secret123"
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
        <div className="mb-4 px-3 flex-1">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              placeholder="Secret123"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            {...register('newLetter')}
            className="h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-600">
            Yes. I want to receive Lottery Display emails
          </span>
        </label>
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

export default Form2;
