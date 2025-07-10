
import React, { useState } from 'react';

type Props = {
    onCustomerAdded?: (customer: any) => void;
};

const url = 'https://server.aptech.io/online-shop/customers'

const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthday: '',
};

const CreateCustomer = ({ onCustomerAdded }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!response.ok) {
                throw new Error('Failed to add customer');
            }
            const data = response.json()
            setSuccess('Customer added successfully!');
            setForm(initialForm);
            setShowModal(false);
            if (onCustomerAdded && typeof onCustomerAdded === "function") {
                onCustomerAdded(data)
            }
        } catch (err: any) {
            setError(err.message || 'Error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center'>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
                onClick={() => setShowModal(true)}
            >
                Add New Customer
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                name="firstName"
                                placeholder="First Name"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                name="lastName"
                                placeholder="Last Name"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                name="address"
                                placeholder="Address"
                                value={form.address}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                name="birthday"
                                type="date"
                                placeholder="Birthday"
                                value={form.birthday}
                                onChange={handleChange}
                                required
                            />
                            {error && <div className="text-red-600 text-sm">{error}</div>}
                            {success && <div className="text-green-600 text-sm">{success}</div>}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Adding...' : 'Add Customer'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateCustomer;