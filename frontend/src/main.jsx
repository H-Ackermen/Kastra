import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import ErrorContextProvider from "./context/ErrorContext.jsx";
import { ContentProvider } from "./context/ContentContext.jsx";
import CollectionContextProvider from "./context/CollectionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorContextProvider>
      <AuthContextProvider>
        <ContentProvider>
          <CollectionContextProvider>
            <App />
          </CollectionContextProvider>
        </ContentProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  </StrictMode>
);
