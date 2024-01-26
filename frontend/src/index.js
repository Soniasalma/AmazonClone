import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'slick-carousel/slick/slick.css';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { app } from './firebase.config';
import CatContext from './hooks/CatContext';
import CatContextProvider from './hooks/CatContextProvider';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} app={app}>
      <PersistGate loading={null} persistor={persistor}>
        <CatContextProvider>
          <App />
        </CatContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
