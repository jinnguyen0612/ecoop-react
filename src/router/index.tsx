import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import { AuthProvider } from '../context/auth';
import { RequireAuth } from '../context/RequireAuth';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        // element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
        element:
                <AuthProvider>
                    {
                        route.requireLogin?
                        <RequireAuth>
                            {
                                <DefaultLayout>{route.element}</DefaultLayout>
                            }
                        </RequireAuth>:
                        <BlankLayout>{route.element}</BlankLayout>
                    }
                </AuthProvider>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
