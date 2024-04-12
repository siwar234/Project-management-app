import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from "./JS/store/store";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "react-bootstrap/Spinner";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Suspense fallback={<div>
         loading </div>}>
        <App />
      </React.Suspense>
      <ToastContainer /> 
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
