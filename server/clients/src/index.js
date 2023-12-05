import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import { userSlice } from "../src/redux/reducers/auth.data";
import store from "../src/redux/store";
/////////////////////////////////////////////////////
import { ThemeProvider, createTheme } from "@mui/material/styles";


// React-helmet-async
import { Helmet, HelmetProvider } from "react-helmet-async";

const theme = createTheme({
  typography: {
    button: {
      fontWeight: "bold",
      textTransform: "none",
    },
  },
});
if (Cookies.get("email") === undefined) {
  localStorage.removeItem("user");
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CookiesProvider>
        <HelmetProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </HelmetProvider>
      </CookiesProvider>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
