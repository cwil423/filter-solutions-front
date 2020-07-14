import React from 'react';

const ListDisplay = (props) => {
  return ( 
    <React.Fragment>
      <h1>{props.title}</h1>
      <ol>
      {props.data.map(name => <li key={Math.random()}>{name.name}</li>)}
      </ol>
    </React.Fragment>

   );
}
 
export default ListDisplay;