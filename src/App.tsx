import {Suspense} from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import routes from '@/router';

function App() {
    const Router = createBrowserRouter(routes);
  
  return (
    <Suspense fallback="loading...">
        <RouterProvider router={Router} />
    </Suspense>
  )
}

export default App
