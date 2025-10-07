import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import ErrorContextProvider from "./context/ErrorContext.jsx";
import  ContentContextProvider  from "./context/ContentContext.jsx";
import CollectionContextProvider from "./context/CollectionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorContextProvider>
      <AuthContextProvider>
        <ContentContextProvider>
          <CollectionContextProvider>
            <App />
          </CollectionContextProvider>
        </ContentContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  </StrictMode>
);
