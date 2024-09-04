import { lazy } from 'react'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import PageNotFound from './Errors/PageNotFound'
const Login = lazy(() => import("./Components/Login/Login"));
const Page = lazy(() => import("./Pages/Page"));
const PageView = lazy(() => import("./Pages/MenuScreen/PageView"));
const StaticMenu = lazy(() => import("./Pages/StaticMenu"));

function App() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/pages",
      element: <Page />,
      children: [
        {
          path: "/pages/static",
          element: <StaticMenu />
        },
        {
          path: "/pages/view/*",
          element: <PageView />
        },
      ]
    },
    {
      path: "*", element: <PageNotFound />
    }
  ]

  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}

export default App
