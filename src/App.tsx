import { lazy } from 'react'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import PageNotFound from './Errors/PageNotFound'
const Page = lazy(() => import("./Pages/Page"))
const PageView = lazy(() => import("./Pages/MenuScreen/PageView"))

function App() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Page />,
      children: [
        {
          path: "/page-view",
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
