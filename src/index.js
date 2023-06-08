import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/rootReducer";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";
import "./Styles/TODOList.css";

// This file sets up the Redux store and renders the root
// component of the application, making the store accessible to all
// components wrapped within the Provider component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
