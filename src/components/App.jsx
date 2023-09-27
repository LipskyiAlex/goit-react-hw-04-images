import React, {useEffect, useReducer} from 'react';  
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

import imageAPI from './utilites/imagesApi';
import SearchBar from 'components/searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery';
import Loader from './loader/loader';
import Button from './button/button';
 
const Status = {

  'IDLE': 'idle',
  'PENDING': 'pending',
  'RESOLVED': 'resolved',
   'REJECTED': 'rejected'

}

function controlReducer (state,action) {
   
   switch(action.type) {

    case 'query': 

    return {...state, query: action.payload}

    case 'hits': 

    return {...state, hits: [...state.hits, ...action.payload]}

    case 'hitsReset': 

    return {...state,hits: []}

    case 'totalPages': 

    return {...state, totalPages: action.payload}

    case 'pageCounter': 

    return {...state, pageCounter: state.pageCounter + action.payload}

    case 'pageCounterReset': 

    return {...state, pageCounter: action.payload}

    case 'status': 

    return {...state, status: action.payload}
    default: 

    return state;
   }

}


const App = () =>{

      
   const [state,dispatch] = useReducer(controlReducer,{

    query: '',
    hits: [],
    totalPages: 0,
    pageCounter: 0,
    status: Status.IDLE
   })


     useEffect(() => {

              if(state.query === '') {

                return;
              }
              dispatch({type: 'status', payload: Status.PENDING})
             imageAPI(state.query,state.pageCounter)
             .then(data => {
              if(data.hits.length === 0) {

                toast("We've found nothing. Please try another query");
                dispatch({type: 'status', payload: Status.IDLE})
                return;
              }
              dispatch({type: 'hits',payload: data.hits});
              dispatch({type: 'totalPages', payload: Math.ceil(data.totalHits/12)});
              dispatch({type: 'status', payload: Status.RESOLVED});
             })
             .catch(error => {
              dispatch({type:'status', payload: Status.REJECTED});
              toast(error.message);
             })

     },[state.query,state.pageCounter])


  const handleQuery = query => {
        
          dispatch({type:'query', payload: query});
          dispatch({type: 'pageCounterReset', payload: 1});
          dispatch({type: 'hitsReset',payload: []});
          dispatch({type: 'totalPages', payload: 0})

  }
  const loadMorePages = () => {

    if (state.totalPages > state.pageCounter) {

        dispatch({type: 'status', payload:Status.PENDING});
        dispatch({type: 'pageCounter', payload: 1})
  } else {

    toast("This is all we've found");    //Разобратсья почему не работает
  }
}

    if ((state.status === Status.IDLE)) {
      return (
        <div className={css.app}>
          <SearchBar handleQuery={handleQuery} />
        </div>
      );
    }

    if ((state.status  ===Status.PENDING)) {
      return (
        <div className={css.app}>
          <SearchBar handleQuery={handleQuery} />
          <ImageGallery query={state.query} hits={state.hits} />
          <Loader />
          {state.pageCounter !== state.totalPages && state.totalPages > 1? (
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

    if ((state.status === Status.RESOLVED)) {
      return (
        <div className={css.app}>
          <SearchBar handleQuery={handleQuery} />
          <ImageGallery query={state.query} hits={state.hits} />
          {state.pageCounter !== state.totalPages && state.totalPages > 1 ? (
            <Button loadMorePages={loadMorePages} />
          ) : null}
        </div>
      );
    }
    if ((state.status === Status.REJECTED)) {
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
