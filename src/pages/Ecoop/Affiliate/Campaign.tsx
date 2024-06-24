import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import IconLayoutGrid from '../../../components/Icon/IconLayoutGrid';
import IconSearch from '../../../components/Icon/IconSearch';
import IconFacebook from '../../../components/Icon/IconFacebook';
import IconInstagram from '../../../components/Icon/IconInstagram';
import IconLinkedin from '../../../components/Icon/IconLinkedin';
import IconTwitter from '../../../components/Icon/IconTwitter';
import IconX from '../../../components/Icon/IconX';
import axios from '../../../context/axios';
import { CampaignItem, Product } from '../../../interface/Campaign';
import { Link } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { IRootState } from '../../../store';
import { stringify } from 'querystring';



const Campaign = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Campaign'));
    });
    const [addCampaignModal, setAddCampaignModal] = useState<any>(false);
    const [checkProductModal, setCheckProductModal] = useState(false);

    const [defaultParams] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: '',
        location: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [dateStart, setDateStart] = useState<any>('2022-07-05 12:00');
    const [dateEnd, setDateEnd] = useState<any>('2022-07-05 12:00');
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;


    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [ids, setIds] = useState<string[]>([]);
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState<any>('');
    const [campaignList,setCampaignList] = useState<CampaignItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);


    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const convertJsonArrayToCampaignArray = (jsonArray: any[]): CampaignItem[] => {
        return jsonArray.map(json => ({
            id: json.id,
            name: json.name,
            image:json.image,
            description: json.description,
            url: json.url,
            products: json.products.map((product: any) => product.id),
            commission: json.commission,
            tax: json.tax,
            start: json.start,
            end: json.end,
        }));
    };

    const getProducts = async () =>{
        try {
            const response = await axios.get("/webhook/products");
            setProducts(response.data.products)
        } catch (error) {
            console.error("Repass error:", error);
        }
    }

    const getCampaign = async () =>{
        try {
            const response = await axios.get("/campaign/all-campaign");
            setCampaignList(convertJsonArrayToCampaignArray(response.data.data))
        } catch (error) {
            console.error("Repass error:", error);
        }
    }

    const [filteredItems, setFilteredItems] = useState<any>(campaignList);

    useEffect(() => {
        setFilteredItems(() => {
            return campaignList.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, campaignList]);

    const saveUser = () => {
        if (!params.name) {
            showMessage('Name is required.', 'error');
            return true;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return true;
        }
        if (!params.phone) {
            showMessage('Phone is required.', 'error');
            return true;
        }
        if (!params.role) {
            showMessage('Occupation is required.', 'error');
            return true;
        }

        if (params.id) {
            //update user
            let user: any = filteredItems.find((d: any) => d.id === params.id);
            user.name = params.name;
            user.email = params.email;
            user.phone = params.phone;
            user.role = params.role;
            user.location = params.location;
        } else {
            //add user
            let maxUserId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let user = {
                id: maxUserId + 1,
                path: 'profile-35.png',
                name: params.name,
                email: params.email,
                phone: params.phone,
                role: params.role,
                location: params.location,
                posts: 20,
                followers: '5K',
                following: 500,
            };
            filteredItems.splice(0, 0, user);
            //   searchContacts();
        }

        showMessage('User has been saved successfully.');
        setAddCampaignModal(false);
    };

    const editCampaign = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        console.log(params);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
            console.log(params);
        }
        setAddCampaignModal(true);
    };

    const checkProduct = (campaign: any = null) => {
        if (campaign) {
            let json1 = JSON.parse(JSON.stringify(campaign));
            setParams(json1);
            setIds(json1.products);
            setCheckProductModal(true); // Chỉ hiển thị modal khi có campaign được cung cấp
        }
    };


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const id = value;

        let updatedIds: string[];

        if (checked) {
            updatedIds = [...ids, id];
        } else {
            updatedIds = ids.filter(existingId => existingId !== id);
        }

        setIds(updatedIds);
    };



    const deleteUser = (user: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
        showMessage('User has been deleted successfully.');
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    useEffect(() => {
        getCampaign();
        setLoad(true);
    }, [load]);

    useEffect(()=>{
        getProducts();
    },[])

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Campaigns</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editCampaign()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Add Campaign
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Contacts" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>


            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-5 w-full">
                {filteredItems.map((campaign: any) => {
                    return (
                        <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative" key={campaign.id}>
                            <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative">
                                <div
                                    className="bg-white/40 rounded-t-md bg-center bg-cover p-6 pb-0 bg-"
                                    style={{
                                        backgroundImage: `url('/assets/images/notification-bg.png')`,
                                        backgroundRepeat: 'no-repeat',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <img className="object-contain w-4/5 max-h-40 mx-auto" src={`https://cdn.shopify.com/s/files/1/2303/2711/files/2_e822dae0-14df-4cb8-b145-ea4dc0966b34.jpg?v=1617059123`} alt="contact_image" />
                                </div>
                                <div className="px-6 pb-24 -mt-10 relative">
                                    <div className="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                                        <div className="text-xl">{campaign.name}</div>
                                        <div className="text-white-dark">{campaign.role}</div>
                                        <div className="flex items-center justify-between flex-wrap mt-6 gap-3">
                                            <div className="flex-auto">
                                                <div>Bắt đầu</div>
                                                <div className="text-info">{formatDate(campaign.start)}</div>
                                                <div className="text-info">{formatTime(campaign.start)}</div>
                                            </div>
                                            <div className="flex-auto">
                                                <div>Kết thúc</div>
                                                <div className="text-info">{formatDate(campaign.end)}</div>
                                                <div className="text-info">{formatTime(campaign.end)}</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                        <div className="flex items-center">
                                            <div className="flex-none ltr:mr-2 rtl:ml-2">Hoa hồng :</div>
                                            <div className="text-white-dark">{campaign.commission}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex-none ltr:mr-2 rtl:ml-2">Thuế :</div>
                                            <div className="text-white-dark">{campaign.tax}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex-none ltr:mr-2 rtl:ml-2">Mô tả :</div>
                                            <div className="text-white-dark">{campaign.description}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex-none ltr:mr-2 rtl:ml-2">Url :</div>
                                            <Link to={campaign.url} className="truncate text-info">{campaign.url}</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
                                    <button type="button" className="btn btn-outline-primary w-1/2" onClick={() => editCampaign(campaign)}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn btn-outline-success w-1/2" onClick={() => checkProduct(campaign)}>
                                        Products
                                    </button>
                                    <button type="button" className="btn btn-outline-danger w-1/2" onClick={() => deleteUser(campaign)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


            <Transition appear show={addCampaignModal} as={Fragment}>
                <Dialog as="div" open={addCampaignModal} onClose={() => setAddCampaignModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddCampaignModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Chỉnh sửa chiến dịch' : 'Thêm chiến dịch'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Tên chiến dịch</label>
                                                <input id="name" type="text" placeholder="Enter Name" className="form-input" value={params.name} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Ngày bắt đầu</label>
                                                <Flatpickr
                                                    data-enable-time
                                                    options={{
                                                        enableTime: true,
                                                        dateFormat: 'd-m-Y H:i',
                                                        position: isRtl ? 'auto right' : 'auto left',
                                                    }}
                                                    value={dateStart}
                                                    className="form-input"
                                                    onChange={(dateStart) => setDateStart(dateStart)}
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Ngày kết thúc</label>
                                                <Flatpickr
                                                    data-enable-time
                                                    options={{
                                                        enableTime: true,
                                                        dateFormat: 'd-m-Y H:i',
                                                        position: isRtl ? 'auto right' : 'auto left',
                                                    }}
                                                    value={dateEnd}
                                                    className="form-input"
                                                    onChange={(dateEnd) => setDateEnd(dateEnd)}
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="ctnFile">Hình ảnh chiến dịch</label>
                                                <input
                                                    id="ctnFile"
                                                    type="file"
                                                    className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Hoa hồng</label>
                                                <input id="phone" type="text" placeholder="" className="form-input" value={params.phone} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Thuế</label>
                                                <input id="role" type="text" placeholder="" className="form-input" value={params.role} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="address">Mô tả</label>
                                                <textarea
                                                    id="location"
                                                    rows={3}
                                                    placeholder="Điền mô tả chiến dịch"
                                                    className="form-textarea resize-none min-h-[130px]"
                                                    value={params.location}
                                                    onChange={(e) => changeValue(e)}
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddCampaignModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    {params.id ? 'Chỉnh sửa' : 'Thêm'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={checkProductModal} as={Fragment}>
                <Dialog as="div" open={checkProductModal} onClose={() => setCheckProductModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="login_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                        <div className="flex min-h-screen items-start justify-center px-4 mt-20">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel my-10 md:my-20 w-full max-w-lg overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                        <h5>Chọn quyền</h5>
                                        <button type="button" onClick={() => setCheckProductModal(false)} className="text-white-dark hover:text-dark">
                                            <IconX className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="p-5">
                                        <form>
                                            <div className="grid grid-cols-2 gap-6 max-h-60 overflow-y-auto">
                                                {products.map(item => (
                                                    <div className="space-y-2 space-x-1" key={item.id.toString()}>
                                                        <label className="inline-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox peer"
                                                                value={item.id.toString()}
                                                                checked={ids.includes(item.id.toString())}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <span className="peer-checked:text-primary">{item.name}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>

                                            <button type="button" className="btn btn-primary w-full mt-2">
                                                Xác nhận
                                            </button>
                                        </form>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </div>
    );
};

export default Campaign;
