import React, {useState, useEffect, useRef} from 'react';  
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

import imageAPI from './utilites/imagesApi';
import SearchBar from 'components/searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery';
import Loader from './loader/loader';
import Button from './button/button';

const App = () =>{

     const [query,setQuery] = useState('');
     const [hits,setHits] = useState([]);
     const [totalPages,setTotalPages] = useState(0);
     const [pageCounter,setPageCounter] = useState(0);
     const [status, setStatus] = useState('idle');
     

     useEffect(() => {

              if(query === '') {

                return;
              }
             setStatus("pending");
             imageAPI(query,pageCounter)
             .then(data => {
              setHits(hits => [...hits,...data.hits]);
              setTotalPages(Math.ceil(data.totalHits/12));
              setStatus('resolved');
             })
             .catch(error => {
              setStatus("rejected");
              toast(error.message);
             })

     },[query,pageCounter])


  const handleQuery = query => {
        
          setQuery(query);
          setPageCounter(1);
          setHits([]);
  };

  const loadMorePages = () => {

    if (totalPages > pageCounter) {

        setStatus('pending');
        setPageCounter(pageCounter => pageCounter + 1);
  } else {

    toast("This is all we've found");
  }
}

    if ((status === 'idle')) {
      return (
        <div className={css.app}>
          <SearchBar handleQuery={handleQuery} />
        </div>
      );
    }

    if ((status  ==='pending')) {
      return (
        <div className={css.app}>
          <SearchBar handleQuery={handleQuery} />
          <ImageGallery query={query} hits={hits} />
          <Loader />
          {pageCounter !== totalPages ? (
            <Button loadMorePages={loadMorePages} />
          ) : null}

          <ToastContainer
            position="top-center"
            autoClose={3000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      );
    }

    if ((status === 'resolved')) {
      return (
        <div className={css.app}>
          <SearchBar handleQuery={handleQuery} />
          <ImageGallery query={query} hits={hits} />
          {pageCounter !== totalPages ? (
            <Button loadMorePages={loadMorePages} />
          ) : null}
        </div>
      );
    }
    if ((status === 'rejected')) {
      return (
        <div className={css.app}>
          <SearchBar handleQuery={handleQuery} />
          <h1>Something went wrong</h1>

          <ToastContainer
            position="top-center"
            autoClose={3000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      );
    }
  }

export default App;
