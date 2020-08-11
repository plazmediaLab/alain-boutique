/**@jsx jsx */
import { jsx, css } from '@emotion/core';
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


export default function ItemsSales({ item, filter }){

  const { activeProduct, deleteProduct } = useDbMethods();

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

        .on-toggle{

        }
      `}
    >
      <button 
        type="button"
        className="h-full rounded-none rounded-l-card bg-transparent text-p_blue-100 border-r border-background hover:text-green-500"
        css={css`
          padding: 0 .25rem;
        `}
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path></svg>
      </button>

      <div 
        className="bg-transparent rounded-r-card p-2 text-title-item font-light w-full"
        css={ titleItemContainer }
      >
        <section 
          className="max-w-full overflow-hidden relative cursor-pointer"
          onClick={ handleClickToggleInfo }
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

      <div className="on-toggle bg-transparent rounded-b-card pr-3 pb-3 pt-1 pl-8 col-span-2 text-description text-bluegray-400">
        { item.comment ? <p className="pb-6"><span className="font-bold">Comentario: </span>{ item.comment }</p> : null }
        <section
          className="grid items-center col-gap-2 font-light"
          css={css`
            grid-template-columns: 1fr auto auto;
          `}
        >
          <div>
            <span
              className="bg-background rounded-full px-2 text-bluegray-200 whitespace-no-wrap"
              css={css`
                padding-top: .1rem; 
                padding-bottom: .1rem; 
              `}
            >{ moment.utc(item.date.seconds*1000).fromNow() }</span>
          </div>
          <button 
            className="rounded py-1 px-2 border border-bluegray-100 text-red-600"
            type="button"
            onClick={ () => deleteProduct(item.id) }
          >
            Eliminar
          </button>
          <button 
            className={`rounded py-1 px-2 border border-bluegray-100 ${item.status === 'STOCK' ? 'text-p_blue-500' : '' }`}
            type="button"
            onClick={ () => activeProduct(item.id) }
          >
            {item.status === 'STOCK' ? 'A venta' : 'A stock' }
          </button>
        </section>
      </div>

    </li>
  );
};