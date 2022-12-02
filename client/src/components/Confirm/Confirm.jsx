import { useState } from 'react';

import { Loader } from '../Loader';

import { getCheckoutUrl } from '../../api/api';
import './Confirm.scss';

export function Confirm({bookInfo: {title, author, description}, closeConfirm}) {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  
  async function handleConfirmClick(event) {
    setIsLoadingCheckout(true);
    event.stopPropagation();    

    const { checkoutUrl } = await getCheckoutUrl(title);
    window.location.href = checkoutUrl;
  }

  return (
    <div className="Confirm" onClick={closeConfirm}>
      <div className="Confirm__modal">
        {title && !isLoadingCheckout ? (
          <>
            <h1 className="Confirm__book-title">{title}</h1>
            <p className="Confirm__book-author">
              by <i>{author}</i>
            </p>
            <small className='Confirm__book-descroption'>{description}</small>
            <div className="Confirm__buttons">
              <button className="Confirm__button" onClick={handleConfirmClick}>
                Confirm
              </button>
            </div>
          </>
        ): (
          <>
            <Loader />
            <p className='Confirm__info'>
              We Are Looking For Your Book <br />
              It may take a wile
            </p>
          </>
        )}
      </div>
    </div>
  )
}