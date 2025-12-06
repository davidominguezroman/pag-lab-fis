import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";


import App from "./App";
import Inves from "./pages/mr/Inves";
import Mru from "./pages/mr/Mru";

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/mr", element: <Inves/>},
  {path: "/mr/Inves", element: <Inves/>},
  {path: "/mr/Mru", element: <Mru />}
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        
      <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>
  
);