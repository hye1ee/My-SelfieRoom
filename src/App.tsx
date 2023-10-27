import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Head from "./pages/Head";
import Layout from "./pages/body/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Head />,
    },
    {
      path: "/@",
      element: <Layout />,
    },
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
