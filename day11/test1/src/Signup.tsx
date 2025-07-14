
import { type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUsers } from './UserProvider';
import  { type UserData } from './UserProvider';

const signUpSchema = yup.object().shape({
  name: yup.string().min(2, "Minimum 2 characters").required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .test('age', 'Age must be positive', (value) => {
      if (value === undefined) return true;
      return value > 0;
    })
    .notRequired(),
});

export const Signup: React.FC<{ initialEmail: string }> = ({ initialEmail }) => {
  const { addUser } = useUsers();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: { email: initialEmail },
  });

  const onSubmit = (data: UserData) => {
    try {
      const newUser = addUser(data);

      console.log('User added successfully:', newUser);
      reset();
      alert(`User "${newUser.name}" has been added successfully!`);
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <p className="mb-4 text-gray-700">
        Looks like you don't have an account. Let's create a new account for {initialEmail}.
      </p>

      <div className="">
        <div className="mb-4 flex-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            placeholder="John"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
      </div>

      <div className="">
        <div className="mb-4 flex-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="example@gmail.com"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div className="mb-4 flex-1">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input
            id="age"
            type="number"
            {...register('age')}
            placeholder="enter your age"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
};