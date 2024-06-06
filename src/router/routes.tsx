import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const SystemActions = lazy(() => import('../pages/System/Actions/SystemActions'));
const OrderActions = lazy(() => import('../pages/System/Actions/OrderActions'));
const Rules = lazy(() => import('../pages/System/Employees/Rules'));
const Positions = lazy(() => import('../pages/System/Employees/Positions'));
const Employees = lazy(() => import('../pages/System/Employees/Employees'));
const Notification = lazy(() => import('../pages/System/Notification'));
const Campain = lazy(() => import('../pages/Ecoop/Affiliate/Campain'));
const Collaborators = lazy(() => import('../pages/Ecoop/Collaborators/Collaborators'));
const Commission = lazy(() => import('../pages/Ecoop/Collaborators/Commission'));
const OrdersCollab = lazy(() => import('../pages/Ecoop/Collaborators/OrdersCollab'));
const StatisticsTax = lazy(() => import('../pages/Statistics/StatisticsTax'));
const StatisticsCommission = lazy(() => import('../pages/Statistics/StatisticsCommission'));
const StatisticsOrders = lazy(() => import('../pages/Statistics/StatisticsOrders'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const ChangePassword = lazy(() => import('../pages/Users/ChangePassword'));
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
        requireLogin: true,
        role:["Admin","Accounting"],
    },

    //System
    {
        path: '/actions/system',
        element: <SystemActions />,
        requireLogin: true,
        role:["Admin"],
    },
    {
        path: '/actions/orders',
        element: <OrderActions />,
        requireLogin: true,
        role:["Admin"],
    },
    // Employees
    {
        path: '/employees/rules',
        element: <Rules />,
        requireLogin: true,
        role:["Admin"]
    },
    {
        path: '/employees/positions',
        element: <Positions />,
        requireLogin: true,
        role:["Admin"],
    },
    {
        path: '/employees/list',
        element: <Employees />,
        requireLogin: true,
        role:["Admin"],
    },
    // Notification
    {
        path: '/notifications',
        element: <Notification />,
        requireLogin: true,
        role:["Admin"],
    },
    // Users page
    {
        path: '/users/profile',
        element: <AccountSetting />,
        requireLogin: true,
        role:["Admin","Accounting"],
    },
    {
        path: '/users/change-password',
        element: <ChangePassword />,
        requireLogin: true,
        role:["Admin","Accounting"],
    },
    //  Affilate
    {
        path: '/campain/list',
        element: <Campain />,
        requireLogin: true,
        role:["Admin","Accounting"],
    },
    //  Collaborators
    {
        path: '/collaborators/list',
        element: <Collaborators />,
        requireLogin: true,
        role:["Admin","Accounting"],
    },
    {
        path: 'collaborators/commission',
        element: <Commission />,
        requireLogin: true,
        role:["Admin","Accounting"],
    },
    {
        path: 'collaborators/orders',
        element: <OrdersCollab />,
        requireLogin: true,
        role:["Admin","Accounting"],
    },
    // Statistics
    {
        path: 'statistics/taxs',
        element: <StatisticsTax />,
        requireLogin: true,
        role:["Admin","Accounting"],
    },
    {
        path: 'statistics/commissions',
        element: <StatisticsCommission />,
        requireLogin: true,
        role:["Admin","Accounting"],
    },
    {
        path: 'statistics/orders',
        element: <StatisticsOrders />,
        requireLogin: true,
        role:["Admin","Accounting"],
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
        path: '/error404',
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
        requireLogin:false,
        layout: 'blank',
    },
    {
        path: '/auth/login',
        element: <LoginCover />,
        requireLogin:false,
        layout: 'blank',
    },
    {
        path: '/auth/cover-lockscreen',
        element: <UnlockCover />,
        requireLogin:false,
        layout: 'blank',
    },
    {
        path: '/auth/cover-password-reset',
        element: <RecoverIdCover />,
        requireLogin:false,
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
