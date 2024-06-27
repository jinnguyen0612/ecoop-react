import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../context/auth';

const AccountSetting = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Account Setting'));
    });
    const [tabs, setTabs] = useState<string>('home');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };
    const { user } = useAuth();
    console.log(user);
    return (
        <div>
            <div className="pt-5">
                <div>
                    <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md mx-40 my-20 p-4 mb-5 bg-white dark:bg-black">
                        <h6 className="text-lg font-bold mb-8 text-center">Thông tin tài khoản</h6>
                        <div className="flex flex-col sm:flex-row">
                            <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                <img src="/assets//images/profile-34.jpeg" alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                            </div>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name">Tên tài khoản</label>
                                    <input id="name" value={user.name} type="text" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="profession">Chức vụ</label>
                                    <input id="profession" type="text" placeholder="Admin" className="form-input" disabled value={user.position} />
                                </div>
                                <div>
                                    <label htmlFor="phone">Số điện thoại</label>
                                    <input id="phone" value={user.phone} type="text" placeholder="+1 (530) 555-12121" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" value={user.username} type="email" placeholder="Jimmy@gmail.com" className="form-input" />
                                </div>
                                <div className="sm:col-span-2 mt-3">
                                    <button type="button" className="btn btn-primary">
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccountSetting;
