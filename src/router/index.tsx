import {lazy} from "react";
import {Navigate, RouteObject} from "react-router-dom";

const VideoPage = lazy(() => import('@/pages/videoClip'));
const FabricPage = lazy(() => import('@/pages/fabric'));
import Layout from "@/layout";

const routes:Array<RouteObject & {children?: Array<{name?: string, isMenu?: boolean}>}> = [
    {
        path:'/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/video" replace />,
                isMenu: false
            },
            {
                path: 'fabric',
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
        ]
    },
]

export default routes;