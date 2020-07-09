import React from 'react';
import ComboBox from '../../Components/UI/ComboBox/ComboBox';

const CustomerSelector = (props) => {

  const newCustomerHandler = (cust) => {

  }

  return ( 
    <ComboBox customers={props.customers} newCustomer={(cust) => newCustomerHandler(cust)}/>
   );
}
 
export default CustomerSelector;