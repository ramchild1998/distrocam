import React, { useState } from 'react';
import { Button } from 'reactstrap';
import CustomModal from './CustomModal';

const AddProductButton = () => {
    const [modalOpen, setModalOpen] = useState(false);
    

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

  return (
    <>
        <Button className='float-end my-3' color="primary" onClick={toggleModal}>Add</Button>
        <CustomModal isOpen={modalOpen} toggle={toggleModal}/>
    </>
  );
};

export default AddProductButton;
