import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';

import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faBuildingUser, faPeopleGroup, faPowerOff, faReceipt, faMoneyBill, faFileContract } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../context/auth';





const Sidebar = () => {
    const { logout,user } = useAuth();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex ml-7 justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo items-center shrink-0">
                            <img className="w-40 ml-[5px] flex-none" src="/assets/images/ecoop.png" alt="logo" />
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <NavLink to="/" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard
                                         className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            {
                                user.position==="Admin"?
                                <>
                                    <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                        <IconMinus className="w-4 h-5 flex-none hidden" />
                                        <span>{t('Quản trị phần mềm')}</span>
                                    </h2>

                                    <li className="nav-item">
                                        <ul>
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'actions' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('actions')}>
                                                <div className="flex items-center">
                                                    <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Quản lý tác vụ')}</span>
                                                </div>

                                                <div className={currentMenu !== 'actions' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'actions' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/actions/system">{t('Hệ thống')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/actions/orders">{t('Đơn hàng')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="menu nav-item">
                                                <button type="button" className={`${currentMenu === 'employees' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('employees')}>
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon icon={faBuildingUser} className="group-hover:!text-primary shrink-0"/>
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Quản lý nhân viên')}</span>
                                                    </div>

                                                    <div className={currentMenu !== 'employees' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                        <IconCaretDown />
                                                    </div>
                                                </button>

                                                <AnimateHeight duration={300} height={currentMenu === 'employees' ? 'auto' : 0}>
                                                    <ul className="sub-menu text-gray-500">
                                                        <li>
                                                            <NavLink to="/employees/rules">{t('Quyền')}</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink to="/employees/positions">{t('Chức vụ')}</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink to="/employees/list">{t('Nhân viên')}</NavLink>
                                                        </li>

                                                    </ul>
                                                </AnimateHeight>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/notifications" className="group">
                                                    <div className="flex items-center">
                                                        <IconMenuChat className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Thông báo hệ thống')}</span>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>:
                                <></>
                            }

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Ứng dụng Ecoop')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'ecoop' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('ecoop')}>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faPeopleGroup} className="group-hover:!text-primary shrink-0"/>
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Cộng tác viên')}</span>
                                    </div>

                                    <div className={currentMenu !== 'component' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'ecoop' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/collaborators/list">{t('Danh sách')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/collaborators/commission">{t('Tiền hoa hồng')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/collaborators/orders">{t('Đơn hàng')}</NavLink>
                                        </li>

                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'campain' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('campain')}>
                                    <div className="flex items-center">
                                        <IconMenuElements className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Chiến dịch Affiliate')}</span>
                                    </div>

                                    <div className={currentMenu !== 'element' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'campain' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/campain/list">{t('Danh sách')}</NavLink>
                                        </li>

                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Thống kê')}</span>
                            </h2>

                            <li className="nav-item">
                                <NavLink to="/statistics/taxs" className="group">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faReceipt} className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Thuế')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/statistics/commissions" className="group">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faMoneyBill} className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Hoa hồng')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/statistics/orders" className="group">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faFileContract} className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Đơn hàng')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Người dùng')}</span>
                            </h2>

                            <li className="nav-item">
                                <NavLink to="/users/profile" className="group">
                                    <div className="flex items-center">
                                        <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Thông tin cá nhân')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/users/change-password" className="group">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faKey} className="group-hover:!text-primary shrink-0"/>
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Đổi mật khẩu')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <button type="button" onClick={logout} className="group">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faPowerOff} className="group-hover:!text-primary shrink-0"/>
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Đăng xuất')}</span>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
