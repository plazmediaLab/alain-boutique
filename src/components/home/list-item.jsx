import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled'
import useDbMethods from '../../hooks/useDbMethods';
import moment from 'moment';
import 'moment/locale/es';

const LiItem = styled(motion.div)`
  grid-template-columns: 1fr auto auto auto;
`;
const ContentHidden = styled(motion.section)`
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.15), inset 0px 2px 8px rgba(0, 0, 0, 0.26);
`;
const Comment = styled.p`
  @media (min-width: 640px) {
    width: 70%!important;
  }
`;

export default function ListItem({ item, expanded, setExpanded, hiddeIcon }){

  const [activeStatus, setActiveStatus] = useState(false);

  const { deleteProduct, activeProduct,  } = useDbMethods();

  const isOpen = item === expanded;

  const productMode = mode => {
    return mode === 'NEW' ? 'text-green-400' : 'text-bluegray-200' 
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  useEffect(() => {
    if(item.status === 'ACTIVE'){
      setActiveStatus(true)
    }else{
      setActiveStatus(false)
    }
  }, [item.status]);

  return (
    <>
      <LiItem
        initial={false}
        // animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        className={`bg-white w-full py-2 px-3 text-carbon-500 text-lg grid gap-2 items-center shadow-sm ${!isOpen ? 'mb-1' : ''} cursor-pointer`}
        onClick={() => setExpanded(isOpen ? false : item)}
      >
        <div>
          <p className="text-carbon-500 font-light">{ item.name }</p>
          <Comment className="text-sm text-carbon-200 truncate w-48">{ item.comment }</Comment>
        </div>
        <p className="text-base text-p_blue-500">{ formatter.format(item.price) }</p>
        { hiddeIcon ? (
          activeStatus && hiddeIcon ? (
            <svg className="w-5 h-5 ml-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path><path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path></svg>
          ) : (
            <svg className="w-5 h-5 ml-1 text-bluegray-200" fill="currentColor" viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path></svg>
          ) 
        ) : null }
        <svg className={`w-5 h-5 ml-1 ${productMode(item.mode)}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
      </LiItem>
      <AnimatePresence initial={false}>
        {isOpen && (
          <ContentHidden
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="bg-p_blue-500 text-white overflow-hidden mb-1"
          >

            <motion.div
              variants={{ collapsed: { scale: 0.7 }, open: { scale: 1 } }}
              transition={{ duration: 0.2 }}
              className="p-2 pl-6"
            >
              { item.comment ? <p className="font-light text-sm mb-2 "><span className="inline-block font-semibold">Comentario:</span> { item.comment }</p> : null}
              <div className="grid grid-rows-2 gap-2 grid-flow-col sm:grid-rows-1 sm:justify-between">
                <section className="text-xs flex">
                  <p className="bg-white text-p_blue-500 rounded-full py-1 px-2 mr-1 flex items-center font-medium">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path></svg>
                    Valor: &nbsp;{ formatter.format(item.value) }
                  </p>
                  <p className="bg-p_blue-300 rounded-full py-1 px-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                    { moment.utc(item.date.seconds*1000).fromNow() }
                  </p>
                </section>
                <section className="grid grid-cols-3 gap-2 justify-start sm:justify-end">
                  <button
                    className="btn-gen text-red-600 sm:px-3"
                    onClick={ () => deleteProduct(item.id) }
                  >Eliminar</button>
                  <button
                    className="btn-gen text-yellow-600" 
                  >Editar</button>
                  { item.status === 'STOCK' ?
                    ( 
                      <button
                        className="btn-gen text-p_blue-500 sm:px-3"
                        onClick={ () => activeProduct(item.id) }
                      >Activar venta</button>
                      ):
                    (
                      <button
                        className="btn-gen text-carbon-300 sm:px-3"
                        onClick={ () => activeProduct(item.id) }
                      >A stock</button>
                    )
                  }
                </section>
              </div>
            </motion.div>

          </ContentHidden>
        )}
      </AnimatePresence>
    </>
  );
};