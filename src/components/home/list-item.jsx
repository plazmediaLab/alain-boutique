/**@jsx jsx */
import { useState, useContext, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { Link } from 'gatsby';
import { 
  handleClickToggleInfo, 
  rippleContent, 
  titleItemContainer ,
  formatter,
  productMode,
  productStatus
} from './actions-and-styles'; 
import moment from 'moment';
import 'moment/locale/es';
import useDbMethods from '../../hooks/useDbMethods';
import FetchingIcon from 'components/Resources/fetching-icon';
import UserContext from 'context/user/UserContext';


export default function ItemsSales({ item, filter }){

  // TODO · SI se borra un grupo que ya tenia productos, estos ya no se mostraran por que ya no esta ese grupo, solucionar ese detalle 08/13/2020 
  
  const [Y, setY] = useState('');

  const { activeProduct, deleteProduct, fetching, productSold } = useDbMethods();

  const userContext = useContext(UserContext);
  const { activeGroup } = userContext;

  const OpenToggleInfo = e => {

    handleClickToggleInfo(e)

    let toggle = e.target.parentNode.parentNode.querySelector('.toggle-info');
    let containerHeight = e.target.parentNode.parentNode.querySelector('.container-info');
    let heightY = containerHeight.offsetHeight + 16;

    setY(`${heightY}px`);

    const list = document.querySelectorAll('.toggle-info');
    list.forEach(x => {
      if(x.className !== toggle.className){
        x.className = 'toggle-info'
      };
    })

    if(toggle.className === 'toggle-info'){
      toggle.className = 'toggle-info on';
    }else if(toggle.className === 'toggle-info on'){
      toggle.className = 'toggle-info';
    };

  };

  return (
    <li
      key={ item.id }
      className="grid items-center w-full shadow-container rounded-card bg-white"
      css={css`
        grid-template-columns: auto 1fr;
        /* background-image: radial-gradient(#0099ff 1px, #fdfdfd 1px);
        background-position: 0 0, 25px 25px;
        background-size: 60px 60px;
        padding: 0;
        margin: 0; */

        .toggle-info{
          height: 0px;
          transition: height .2s ease-in-out;
          overflow: hidden;
        }
        .toggle-info.on{
          height: ${Y};
        }
      `}
    >
      <button 
        type="button"
        className="h-full rounded-none rounded-l-card bg-transparent text-p_blue-100 border-r border-background hover:text-green-500"
        css={css`
          padding: 0 .25rem;
        `}
        onClick={ () => productSold(item.id) }
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path></svg>
      </button>

      <div 
        className="bg-transparent rounded-r-card p-2 text-title-item font-light w-full"
        css={ titleItemContainer }
      >
        <section 
          className="toggle-active max-w-full overflow-hidden relative cursor-pointer"
          onClick={ e => OpenToggleInfo(e) }
          css={ rippleContent }
        >
          <p>{ item.name }</p>
          <p className="text-description text-carbon-200 font-normal truncate pr-6">{ item.comment }</p>
        </section>
        <p className={`text-title-item font-medium ${item.sale ? 'text-green-500' : 'text-p_blue-500'}`}>{ formatter.format(item.price) }</p>
        <svg className={`w-5 h-5 ml-1 ${productMode(item.mode)}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
        { filter === 'active' ? (
          null
        ) : (
          <svg className={`w-5 h-5 ml-1 ${productStatus(item.status)}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        )}
      </div>

      <div className="bg-transparent rounded-b-card pr-3 pl-8 col-span-2 text-description text-bluegray-400">
        <section className="toggle-info">
          <div className="container-info mb-3 mt-1">
            { item.value > 0 ? (
              <p className={`text-description text-${activeGroup.color} pb-2`}><span className="font-bold">Precio de:</span> { formatter.format(item.value) }</p>
            ) : null }
            { item.comment ? <p className="pb-4"><span className="font-bold">Comentario: </span>{ item.comment }</p> : null }
            <nav
              className="grid items-center col-gap-2 font-light"
              css={css`
                grid-template-columns: 1fr repeat(3, auto);
              `}
            >
              <div>
                <span
                  className="bg-background rounded-full px-2 text-bluegray-200 whitespace-no-wrap"
                  css={css`
                    padding-top: .1rem; 
                    padding-bottom: .1rem; 
                  `}
                >{ moment.utc(item.date.seconds * 1000).fromNow() }</span>
              </div>
              {/* <Link to={`/app/edit/${ uid }`}>Editar producto</Link> */}
              <Link 
                className="rounded py-1 px-2 border border-bluegray-100 text-p_blue-400"
                to={`/app/edit/${ item.id}`}
                state={{ productSent: true }}
              >
                <svg className="pencil-alt w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </Link>
              <button 
                className="rounded py-1 px-2 border border-bluegray-100 text-red-400"
                type="button"
                onClick={ () => deleteProduct(item.id) }
              >
                <svg className="trash w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
              <button 
                className={`rounded py-1 px-2 border border-bluegray-100 ${item.status === 'STOCK' ? 'text-p_blue-500' : '' } flex items-center`}
                type="button"
                onClick={ () => activeProduct(item.id) }
              >
                { fetching ? <FetchingIcon strokeC='#5480DE' classN="mr-2"/> : null }
                {item.status === 'STOCK' ? 'A venta' : 'A stock' }
              </button>
            </nav>
          </div>
        </section>
      </div>

    </li>
  );
};