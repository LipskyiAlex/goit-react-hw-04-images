// eslint-disable-next-line react-hooks/exhaustive-deps
import { useEffect } from 'react';
import css from './modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({largeImageURL,tags,onClose}) =>  {



 const  keyClose = e => {

    if (e.key === 'Escape') {
  
      onClose();
    }
  };



 const  handleClose = e => {

    e.stopPropagation();

    if (e.target === e.currentTarget) {
  
        onClose();
    }
  };

  useEffect(() => {

    window.addEventListener('keydown',keyClose);

   return () => {

    window.removeEventListener('keydown',keyClose);
   };
  }, [])

    return createPortal(
      <div className={css.overlay} onClick={e => handleClose(e)}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
}

export default Modal;
