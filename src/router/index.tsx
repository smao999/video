import {lazy} from "react";
import {Navigate, RouteObject} from "react-router-dom";

import Layout from "@/layout";

const VideoPage = lazy(() => import('@/pages/videoClip'));
const FabricPage = lazy(() => import('@/pages/canvas'));
const Home = lazy(() => import('@/pages/home'));

const routes:Array<RouteObject & {children?: Array<{name?: string, isMenu?: boolean}>}> = [
    {
        path:'/',
        element: <Navigate to="/home" replace />,
    },
    {
        path:'/home',
        element: <Home />,
    },
    {
        path:'/',
        element: <Layout />,
        children: [
            {
                path: 'canvas',
                element: <FabricPage />,
                name: 'canvas',
                isMenu: true
            },
            {
                path: 'video',
                element: <VideoPage />,
                name: 'video',
                isMenu: true
            }
        ],
    },
    {
        path:'*',
        element: <div>404...</div>,
    },
]

export default routes;