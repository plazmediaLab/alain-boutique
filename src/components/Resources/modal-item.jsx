import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import UserContext from '../../context/user/UserContext';

export default function ModalItem({ children }){

  const userContext = useContext(UserContext);
  const { modalOpen, closeModal } = userContext;

  const [widthModal, setWidthModal] = useState('');

  var subtitle;

  useEffect(() => {
    if(window.innerWidth > 640){
      setWidthModal('400px')
    }else if(window.innerWidth > 500){
      setWidthModal('70%')
    }else{
      setWidthModal('90%')
    };
    window.addEventListener('resize', () => {
      if(window.innerWidth > 640){
        setWidthModal('400px')
      }else if(window.innerWidth > 500){
        setWidthModal('70%')
      }else{
        setWidthModal('90%')
      }; 
    });
  }, [/* dependencia */]);

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      // marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : `${widthModal}`,
      padding               : '1rem'
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,.5)",
    }
  };
 
  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      { children }
    </Modal>
  );
};