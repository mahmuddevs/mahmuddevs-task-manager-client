import { createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/signin/SignIn";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <h3>Error</h3>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/sign-in',
                element: <SignIn />
            },
        ]
    }
])

export default router