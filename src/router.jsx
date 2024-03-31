import { createBrowserRouter } from "react-router-dom";

import CustomerRoutes from "@routes/customer.routes.jsx";
import Error404 from "@views/Error404.jsx";

const router = createBrowserRouter([
  ...CustomerRoutes,
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
