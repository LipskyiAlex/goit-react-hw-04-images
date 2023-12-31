
import { useEffect } from 'react';
import css from './modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({largeImageURL,tags,onClose}) =>  {


 const  handleClose = e => {

    e.stopPropagation();

    if (e.target === e.currentTarget) {
  
        onClose();
    }
  };

  useEffect(() => {

    const  keyClose = e => {

      if (e.key === 'Escape') {
    
        onClose();
      }
    };

    window.addEventListener('keydown',keyClose);

   return () => {

    window.removeEventListener('keydown',keyClose);
   };
  }, [onClose])

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
