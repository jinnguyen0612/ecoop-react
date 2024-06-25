import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { useAuth } from '../../context/auth';
import { use } from 'i18next';
import { jwtDecode } from 'jwt-decode';
import axios from '../../context/axios';

const ChangePasswordCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const getTokenFromURL = () => {
        const pathname = window.location.pathname;
        const parts = pathname.split('/');

        // Loại bỏ các phần tử rỗng
        const filteredParts = parts.filter(part => part.length > 0);

        // Lấy các phần tử cần thiết từ mảng
        const route = filteredParts[0]; // "/changePasswordCustomer/"
        const token1 = filteredParts[1]; // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        const token2 = filteredParts[2]; // eyJkYXRhIjp7ImlkX2NvbGxhYm9yYXRvciI6MTE3...
        const token3 = filteredParts[3];

        const token = `${token1}.${token2}.${token3}`;
        localStorage.setItem('access_token', token);

        let decode: any = jwtDecode(token);
        setEmail(decode.data.email_collaborator);
    };

    useEffect(() => {
        dispatch(setPageTitle('Change password | Ecoop App'));
    }, [dispatch]);

    useEffect(() => {
        getTokenFromURL();
    }, []);

    const submitInfo = async () => {
        try {
            if (password === confirmPassword) {
                const response = await axios.put(`${axios.defaults.baseURL}/collaborator/renew-password`, {
                    payload: {
                        email: email,
                        password: password,
                    },
                });

                if (response) {
                    navigate('/success');
                }
            } else {
                alert('Password không khớp');
            }
        } catch (error: any) {
            if (error?.response?.status >= 500) {
                alert('Lỗi hệ thống');
            } else {
                alert(error?.response?.data?.message);
            }
        }
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(255,147,94,1)_0%,rgba(255,81,23,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link to="#" className="w-48 block lg:w-72 ms-10">
                                <img src="/assets/images/ecoop.png" alt="Logo" className="w-full" />
                            </Link>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/login.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link to="/" className="w-8 block lg:hidden">
                                <img src="/assets/images/logo.svg" alt="Logo" className="mx-auto w-10" />
                            </Link>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Đổi mật khẩu</h1>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitInfo}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Email"
                                            type="email"
                                            placeholder="Enter Email"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Mật khẩu mới</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Password"
                                            type="password"
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Xác nhận mật khẩu</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Password"
                                            type="password"
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-gradient !mt-8 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Đổi mật khẩu
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordCustomer;
