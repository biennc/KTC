import React, { useEffect, useState } from 'react'
import DeleteCustomer from './DeleteCustomer'
import UpdateCustomer from './UpdateCustomer';

type Props = {
  reload?: number,
  deleteComponent?: React.ComponentType<{ customerId: number; onDelete: (id: number) => void}>,
  updateComponent?: React.ComponentType<{
    customerId: number,
    onUpdated: (customer: any) => void,
    onClose: () => void
  }>
}

const url = 'https://server.aptech.io/online-shop/customers'

type Customer = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  address: string,
  birthday: string
}

const ListCustomers = ({reload = 0}: Props) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(url)
         if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = response.json()
        setCustomers(await data)
        
        setLoading(false)
        
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  },[reload])

   const handleOnSelect = (customer: any) => {
    setSelectedCustomer(customer);
  };

    const handleOnUpdated = (customer: any) => {
    setCustomers((prev) => prev.map((c: any) => (c.id === customer.id ? customer : c)));
    setSelectedCustomer(null);
  };

  return (
    <div className='container mx-auto bg-white rounded shadow mb-4 p-4'>
      {loading && <p>Loading...</p>}
      <table className='table-auto w-full border-collapse border border-gray-200 table-hover'>
        <thead>
          <tr>
            <th className='border border-gray-300 p-2'>ID</th>
            <th className='border border-gray-300 p-2'>Name</th>
            <th className='border border-gray-300 p-2'>Email</th>
            <th className='border border-gray-300 p-2'>Phone</th>
            <th className='border border-gray-300 p-2'>Address</th>
            <th className='border border-gray-300 p-2'>Birthday</th>
            <th className='border border-gray-300 p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer: any, index) => {
            return (
              <tr key={index} className='hover:bg-gray-200'>
                <td className='border border-gray-300 p-2 text-right'>{customer.id}</td>
                <td className='border border-gray-300 p-2 font-bold'>{customer.firstName + ' ' + customer.lastName}</td>
                <td className='border border-gray-300 p-2'>{customer.email}</td>
                <td className='border border-gray-300 p-2'>{customer.phoneNumber}</td>
                <td className='border border-gray-300 p-2 whitespace-nowrap'>{customer.address}</td>
                <td className='border border-gray-300 p-2 whitespace-nowrap'>{customer.birthday}</td>
                <td className='w-1 border border-gray-300 p-2 whitespace-nowrap'>
                  <div className='flex justify-end'>
                    <button className='bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition-colors mr-2'
                       onClick={() => handleOnSelect(customer)}
                    >
                      Edit
                    </button>
                    <DeleteCustomer
                      customerId={customer.id}
                      onDelete={(id) => {
                        setCustomers((prev) => prev.filter((customer: any) => customer.id !== id));
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
          {selectedCustomer && <UpdateCustomer customerId={selectedCustomer.id} onUpdated={handleOnUpdated} onClose={() => setSelectedCustomer(null)}/>}
    </div>
  )
}

export default ListCustomers