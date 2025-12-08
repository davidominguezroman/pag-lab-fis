import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import "./style.css";

import App from "./App";
import Inves from "./pages/mr/Inves";
import Mru from "./pages/mr/Mru";
import Mrua from "./pages/mr/Mrua";
import Mcu from "./pages/mc/Mcu";
import Mcua from "./pages/mc/Mcua";

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/mr/Inves", element: <Inves/>},
  {path: "/mr/Mru", element: <Mru />},
  {path: "/mr/Mrua", element: <Mrua />},
  {path: "/mc/Mcu", element: <Mcu />},
  {path: "/mc/Mcua", element: <Mcua />},
], {
  basename: "/pag-lab-fis"
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>
  
);