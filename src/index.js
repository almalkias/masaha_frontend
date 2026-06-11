import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { CartProvider } from "./components/contexts/CartContext";
import { AuthProvider } from "./components/contexts/AuthContext";
import { FavouritePaintProvider } from "./components/contexts/FavouritePaintContext";
import { LoadingProvider } from "./components/contexts/LoadingContext";
import "./i18n";


axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <FavouritePaintProvider>
              <App />
            </FavouritePaintProvider>
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
