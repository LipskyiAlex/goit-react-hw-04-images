import { useState } from 'react';
import Modal from 'components/modal/modal';
import css from './imageGalleryItem.module.css';

const  ImageGalleryItem = ({webformatURL,largeImageURL,tags}) =>  {


    
  const [modal, setModal] = useState(false);
 
  const toggleModal = () => {

      setModal(modal => modal = !modal);
  };


    return (
      <li className={css.imageGalleryItem} onClick={toggleModal}>
        <img
          className={css.imageGalleryItem_image}
          src={webformatURL}
          alt={tags}
          width="200"
        />
        {modal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={toggleModal}
          />
        )}
      </li>
    );
  }


export default ImageGalleryItem;
