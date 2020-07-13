import React from 'react';

const initialState = {
  customersToBeDeliveredTo: [],
  allCustomers: [],
  customerOrder: []

};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_CUSTOMER':
      return {
        ...state,
        customersToBeDeliveredTo: action.newNames,
        
      };
    case 'ALL_CUSTOMERS':
      return {
        ...state,
        allCustomers: action.allCustomers
      };
    case 'SET_CUSTOMER_ORDER':
      return {
        ...state,
        customerOrder: action.customerOrder
      }
  }
  return state;
}

export default reducer;