import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';


const ChangePassword = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Change Password'));
    });
    const [tabs, setTabs] = useState<string>('home');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    return (
        <div>
            <div className="pt-5">
                <div className='px-80'>
                    <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md mx-40 my-20 p-6 mb-5 bg-white dark:bg-black">
                        <h6 className="text-lg font-bold mb-8 text-center">Đổi mật khẩu</h6>
                        <div className="flex">
                            <div className="flex-1 grid-cols-1 gap-6">
                                <div className='mt-5'>
                                    <label htmlFor="name">Mật khẩu hiện tại</label>
                                    <input id="name" type="password" className="form-input" />
                                </div>
                                <div className='mt-5'>
                                    <label htmlFor="profession">Mật khẩu mới</label>
                                    <input id="profession" type="password" className="form-input"/>
                                </div>
                                <div className='mt-5'>
                                    <label htmlFor="phone">Xác nhận mật khẩu mới</label>
                                    <input id="phone" type="password" className="form-input" />
                                </div>
                                <div className="sm:col-span-2 mt-5">
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

export default ChangePassword;
