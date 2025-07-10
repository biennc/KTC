import React from 'react'

type Props = {
    customerId: number,
    onDelete?: (id: number) => void
}

const url = 'https://server.aptech.io/online-shop/customers'

const DeleteCustomer = ({ customerId, onDelete }: Props) => {
    const handleDelete = async (id: number) => {
        try {
            if (!confirm('Are you sure you want to delete this customer?')) {
                console.log('Delete operation cancelled');
                return;
            }

            const res = await fetch(`${url}/${id}`, {
                method: 'DELETE'
            })
            if (!res.ok) {
                throw new Error("Network response was not ok")
            }
            const data = await res.json()
            console.log('Customer delete successfully ', data);
            if (onDelete && typeof onDelete === 'function') {
                onDelete(id)
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <button onClick={() => {handleDelete(customerId) }} className='bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors'>Delete</button>
        </div>
    )
}

export default DeleteCustomer