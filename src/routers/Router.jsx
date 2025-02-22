import { createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/signin/SignIn";
import Error from "../pages/error/Error";
import Manager from "../pages/manager/Manager";
import Private from "./Private";
import PrivateAlt from "./PrivateAlt";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/task-manager',
                element: <Private><Manager /></Private>
            },
            {
                path: '/sign-in',
                element: <PrivateAlt><SignIn /></PrivateAlt>
            },
        ]
    }
])

export default router