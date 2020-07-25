import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import UserContext from '../../context/user/UserContext';
import styled from '@emotion/styled';

const BtnClose = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    padding: .5rem;
`;

export default function ModalItem({ children }){

  const userContext = useContext(UserContext);
  const { modalOpen, closeModal } = userContext;

  const [widthModal, setWidthModal] = useState('');

  // var subtitle;

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
      padding               : '2rem 1rem 1rem',
      boxShadow             : '0px 7px 15px -3px rgba(0,0,0,0.45), 0px 5px 4px -2px rgba(0,0,0,0.3)',
      position              : 'relative'
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
      <BtnClose
        type="button"
        className="text-bluegray-200 hover:text-red-600"
        onClick={ closeModal }
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
      </BtnClose>
      { children }
    </Modal>
  );
};