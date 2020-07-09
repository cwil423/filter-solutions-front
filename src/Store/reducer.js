import React from 'react';

const initialState = {
  masterCustomers: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_CUSTOMER':
      return{
        masterCustomers: action.newNames
      };
  }
  return state;
}

export default reducer;