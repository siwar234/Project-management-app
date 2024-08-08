import React, { Suspense, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { currentUser } from "./JS/actions/user";
import { useDispatch } from 'react-redux';
import { baselightTheme } from "./theme/DefaultColors";

function App() {
  

//   useEffect(() => {
//     const logMemoryUsage = () => {
//         if (performance.memory) {
//             console.log('Memory Usage:', performance.memory);
//         } else {
//             console.log('Memory API not supported');
//         }
//     };

//     logMemoryUsage();
// }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  const routing = useRoutes(Router());
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      
      <CssBaseline />
      
        {routing}
     
    </ThemeProvider>
  );
}

export default App;

reportWebVitals();
