import {Suspense} from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import routes from '@/router';

function App() {
    const Router = createBrowserRouter(routes, {basename: '/video'});

  return (
    <Suspense fallback={<div>loading...</div>}>
        <RouterProvider router={Router} />
    </Suspense>
  )
}

export default App
