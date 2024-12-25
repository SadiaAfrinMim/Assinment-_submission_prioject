import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import router from "./Router/Router";
import Authprovider from "./Authprovider/Authprovider";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  
   <Authprovider>
   <HelmetProvider>
   <Toaster
  position="top-right"  // Position of the toast
  reverseOrder={false}  // Whether the toast should appear in reverse order
  toastOptions={{
    duration: 4000,  // Duration of the toast
  }}
/>

   
   <RouterProvider router={router} />
   
   </HelmetProvider>
 
   
   </Authprovider>
  </React.StrictMode>
);
