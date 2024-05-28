import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const List = lazy(() => import('../pages/List'));
const SystemActions = lazy(() => import('../pages/System/Actions/SystemActions'));
const OrderActions = lazy(() => import('../pages/System/Actions/OrderActions'));
const Rules = lazy(() => import('../pages/System/Employees/Rules'));
const Positions = lazy(() => import('../pages/System/Employees/Positions'));
const Employees = lazy(() => import('../pages/System/Employees/Employees'));
const Notification = lazy(() => import('../pages/System/Notification'));
const Collaborators = lazy(() => import('../pages/Ecoop/Collaborators/Collaborators'));
const Commission = lazy(() => import('../pages/Ecoop/Collaborators/Commission'));
const OrdersCollab = lazy(() => import('../pages/Ecoop/Collaborators/OrdersCollab'));
const StatisticsTax = lazy(() => import('../pages/Statistics/StatisticsTax'));
const StatisticsCommission = lazy(() => import('../pages/Statistics/StatisticsCommission'));
const StatisticsOrders = lazy(() => import('../pages/Statistics/StatisticsOrders'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const KnowledgeBase = lazy(() => import('../pages/Pages/KnowledgeBase'));
const ContactUsBoxed = lazy(() => import('../pages/Pages/ContactUsBoxed'));
const ContactUsCover = lazy(() => import('../pages/Pages/ContactUsCover'));
const Faq = lazy(() => import('../pages/Pages/Faq'));
const ComingSoonBoxed = lazy(() => import('../pages/Pages/ComingSoonBoxed'));
const ComingSoonCover = lazy(() => import('../pages/Pages/ComingSoonCover'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Maintenence = lazy(() => import('../pages/Pages/Maintenence'));
const UnlockBoxed = lazy(() => import('../pages/Authentication/UnlockBox'));
const RecoverIdBoxed = lazy(() => import('../pages/Authentication/RecoverIdBox'));
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const UnlockCover = lazy(() => import('../pages/Authentication/UnlockCover'));
const About = lazy(() => import('../pages/About'));
const Error = lazy(() => import('../components/Error'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
    },


    {
        path: '/apps/invoice/list',
        element: <List />,
    },
    //System
    {
        path: '/actions/system',
        element: <SystemActions />,
    },
    {
        path: '/actions/orders',
        element: <OrderActions />,
    },
    // Employees
    {
        path: '/employees/rules',
        element: <Rules />,
    },
    {
        path: '/employees/positions',
        element: <Positions />,
    },
    {
        path: '/employees/list',
        element: <Employees />,
    },
    // Notification
    {
        path: '/notifications',
        element: <Notification />,
    },
    // Users page
    {
        path: '/users/profile',
        element: <AccountSetting />,
    },
    //  Collaborators
    {
        path: '/collaborators/list',
        element: <Collaborators />,
    },
    {
        path: 'collaborators/commission',
        element: <Commission />,
    },
    {
        path: 'collaborators/orders',
        element: <OrdersCollab />,
    },
    // Statistics
    {
        path: 'statistics/taxs',
        element: <StatisticsTax />,
    },
    {
        path: 'statistics/commissions',
        element: <StatisticsCommission />,
    },
    {
        path: 'statistics/orders',
        element: <StatisticsOrders />,
    },
    // pages
    {
        path: '/pages/knowledge-base',
        element: <KnowledgeBase />,
    },
    {
        path: '/pages/contact-us-boxed',
        element: <ContactUsBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/contact-us-cover',
        element: <ContactUsCover />,
        layout: 'blank',
    },
    {
        path: '/pages/faq',
        element: <Faq />,
    },
    {
        path: '/pages/coming-soon-boxed',
        element: <ComingSoonBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/coming-soon-cover',
        element: <ComingSoonCover />,
        layout: 'blank',
    },
    {
        path: '/pages/error404',
        element: <ERROR404 />,
        layout: 'blank',
    },
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: <ERROR503 />,
        layout: 'blank',
    },
    {
        path: '/pages/maintenence',
        element: <Maintenence />,
        layout: 'blank',
    },
    //Authentication
    {
        path: '/auth/boxed-lockscreen',
        element: <UnlockBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-password-reset',
        element: <RecoverIdBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/login',
        element: <LoginCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-lockscreen',
        element: <UnlockCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-password-reset',
        element: <RecoverIdCover />,
        layout: 'blank',
    },
    {
        path: '/about',
        element: <About />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <ERROR404 />,
        layout: 'blank',
    },
];

export { routes };
