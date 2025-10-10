import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import ErrorContextProvider from "./context/ErrorContext.jsx";
import  ContentContextProvider  from "./context/ContentContext.jsx";
import CollectionContextProvider from "./context/CollectionContext.jsx";
import { CommentProvider } from "./context/CommentContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FollowContextProvider from "./context/FollowContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorContextProvider>
      <AuthContextProvider>
        <FollowContextProvider>
        <ContentContextProvider>
          <CollectionContextProvider>   
          <CommentProvider>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            </CommentProvider>     
          </CollectionContextProvider>
        </ContentContextProvider>
        </FollowContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  </StrictMode>
);
