import React from 'react';
import {Button} from 'react-bootstrap';
import {Check, X} from 'react-feather';

const RequestButtons = () => {
  return (
    <div className="d-flex align-items-center">
      <Button variant="outline-danger" style={{borderColor: 'transparent'}}><X></X></Button>
      <Button variant="outline-success" style={{borderColor: 'transparent', marginLeft: '4px'}}><Check></Check></Button>
    </div>
  );
}

export default RequestButtons;
