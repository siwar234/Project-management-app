import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from "./JS/store/store";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Suspense fallback={<div><Spinner animation="border"  style={{width:'500px',height:"800px"}}/></div>}>
        <App />
      </React.Suspense>
    </BrowserRouter>
    <ToastContainer /> 
  </Provider>,
  document.getElementById('root')
);
