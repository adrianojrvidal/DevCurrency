// React Router
import { createBrowserRouter } from "react-router-dom";

// Páginas
import { Home } from "./pages/home";
import { Notfound } from "./pages/notfound";
import { Detail } from "./pages/detail";

// Layout
import { Layout } from "./components/layout";

// Rotas
const router = createBrowserRouter ([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "*",
        element: <Notfound />
      },
      {
        path: "/detail/:cripto",
        element: <Detail />
      }
    ]
  }
])

export { router };