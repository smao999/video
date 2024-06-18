import {lazy} from "react";
import {Navigate, RouteObject} from "react-router-dom";

const VideoPage = lazy(() => import('@/pages/videoClip'));
const FabricPage = lazy(() => import('@/pages/fabric'));

const routes:Array<RouteObject> = [
    {
        path:'/',
        element: <Navigate to={'video'} replace />
    },
    {
        path: '/video',
        element: <VideoPage />
    },
    {
        path: '/fabric',
        element: <FabricPage />
    }
]

export default routes;