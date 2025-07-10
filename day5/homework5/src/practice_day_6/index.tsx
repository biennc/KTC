import React from 'react'
import ListCustomers from './ListCustomers'
import CreateCustomer from './CreateCustomer'

type Props = {}

const Customers = (props: Props) => {
  return (
    <div>
        <CreateCustomer />
        <ListCustomers />
    </div>
  )
}

export default Customers