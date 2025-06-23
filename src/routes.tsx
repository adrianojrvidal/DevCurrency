// React Router
import { createBrowserRouter } from "react-router-dom";

// Páginas
import { Home } from "./pages/home";
import { Notfound } from "./pages/notfound";
import { Detail } from "./pages/detail";

// Rotas
const router = createBrowserRouter ([
  {
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/notfound",
        element: <Notfound />
      },
      {
        path: "/detail",
        element: <Detail />
      }
    ]
  }
])

export { router };