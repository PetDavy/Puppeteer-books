import React, { useState } from 'react';
import { Loader } from '../Loader';
import { getCheckoutUrl } from '../../api/api';
import { BookInfoType } from '../../api/types';

import './Confirm.scss';

interface ConfirmProps {
  bookInfo: BookInfoType|null;
  closeConfirm: () => void;
}

export function Confirm({bookInfo, closeConfirm}: ConfirmProps) {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  
  const handleConfirmClick = async() => {
    if (!bookInfo) {
      return;
    }

    setIsLoadingCheckout(true);

    const { checkoutUrl } = await getCheckoutUrl(bookInfo.title);

    if (!checkoutUrl) {
      setIsLoadingCheckout(false);
    } else {
      window.location.href = checkoutUrl;
    }
  }

  return (
    <div className="Confirm">
      <div className="Confirm__modal">
        {bookInfo && !isLoadingCheckout ? (
          <>
            <h1 className="Confirm__book-title">{bookInfo.title}</h1>
            <p className="Confirm__book-author">
              by <i>{bookInfo.author}</i>
            </p>
            <small className='Confirm__book-descroption'>{bookInfo.description}</small>
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
      <div className="Confirm__overlay" onClick={closeConfirm} />
    </div>
  )
}