import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import { AuthProvider } from '../context/auth';
import { RequireAuth } from '../context/RequireAuth';
import { CheckLogin } from '../context/CheckLogin';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        // element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
        element:
                <AuthProvider>
                    {
                        route.requireLogin==undefined?
                        <BlankLayout>{route.element}</BlankLayout>
                        :
                        route.requireLogin==true?
                        <RequireAuth roles={route.role}>
                            {
                                <DefaultLayout>{route.element}</DefaultLayout>
                            }
                        </RequireAuth>
                        :
                        route.requireLogin==false?
                        <CheckLogin>
                            {
                                <BlankLayout>{route.element}</BlankLayout>
                            }
                        </CheckLogin>:
                        <BlankLayout>{route.element}</BlankLayout>
                    }
                </AuthProvider>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
