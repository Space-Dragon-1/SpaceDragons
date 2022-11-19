import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery';
import 'popper.js/dist/umd/popper';
import './styles/style.default.css';
import './vendor/fontawesome/css/all.css';
import { StoreProvider } from './Store';
//import "./js/front";
//import "./vendor/choices.js/public/assets/scripts/choices";
//import "./vendor/choices.js/public/assets/styles/choices.min.css";
//import "./vendor/glightbox/css/glightbox.min.css";
//import "./vendor/glightbox/js/glightbox";
//import "./vendor/nouislider/nouislider";
//import "./vendor/nouislider/nouislider.min.css";
//import "./vendor/swiper/swiper-bundle";
//import "./vendor/swiper/swiper-bundle.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
