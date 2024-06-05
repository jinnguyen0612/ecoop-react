import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect, Fragment } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconPlus from '../../../components/Icon/IconPlus';
import IconEdit from '../../../components/Icon/IconEdit';
import IconEye from '../../../components/Icon/IconEye';
import IconClock from '../../../components/Icon/IconClock';
import IconLock from '../../../components/Icon/IconLock';
import { Employee } from '../../../interface/Employee';
import { Dialog, Transition,Tab } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import IconX from '../../../components/Icon/IconX';
import IconUser from '../../../components/Icon/IconUser';
import IconFacebook from '../../../components/Icon/IconFacebook';
import IconGithub from '../../../components/Icon/IconGithub';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import IconMail from '../../../components/Icon/IconMail';

const Employees = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Employee List'));
    }, [dispatch]);

    const [modalEmployee, setModalEmployee] = useState(false);


    const [items, setItems] = useState<Employee[]>([
        {
            id: 1,
            username: 'Laurie Fox',
            phone: '09xxxxx421',
            create_date: '15 Dec 2020',
            create_time: '10:31 PM',
            position: 'Admin',
            status: { tooltip: 'Active', color: 'success' },
        },
        {
            id: 2,
            username: 'Lynx Volka',
            phone: '09xxxxx621',
            create_date: '15 Dec 2020',
            create_time: '10:05 PM',
            position: 'Kế toán',
            status: { tooltip: 'Inactive', color: 'danger' },
        },
        {
            id: 3,
            username: 'Lauka Virie ',
            phone: '09xxxxx321',
            create_date: '15 Dec 2020',
            create_time: '04:12 AM',
            position: 'Admin',
            status: { tooltip: 'Inactive', color: 'danger' },
        },
        {
            id: 4,
            username: 'Laurie Fox',
            phone: '09xxxxx462',
            create_date: '15 Dec 2020',
            create_time: '03:35 PM',
            position: 'Kế toán',
            status: { tooltip: 'Active', color: 'success' },
        },
        {
            id: 5,
            username: 'Laurie Fox',
            phone: '09xxxxx023',
            create_date: '15 Dec 2020',
            create_time: '07:45 AM',
            position: 'Admin',
            status: { tooltip: 'Inactive', color: 'danger' },
        },
    ]);

    const options = [
        { value: 'orange', label: 'Orange' },
        { value: 'purple', label: 'Purple' },
        { value: 'white', label: 'White' },
    ];

    const deleteRow = (id: number | null = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                const updatedItems = items.filter((user) => user.id !== id);
                setItems(updatedItems);
                setInitialRecords(updatedItems);
                setRecords(updatedItems);
                setSearch('');
                setSelectedRecords([]);
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d) => d.id);
                const result = items.filter((d) => !ids.includes(d.id));
                setItems(result);
                setInitialRecords(result);
                setRecords(result);
                setSearch('');
                setSelectedRecords([]);
                setPage(1);
            }
        }
    };

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'id'));
    const [records, setRecords] = useState<Employee[]>(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<Employee[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        let data2: Employee[] = [];
        if (sortStatus.columnAccessor === 'status') {
            data2 = sortBy(initialRecords, (item) => item.status.tooltip);
        } else {
            data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        }
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => {
                return (
                    item.username.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase()) ||
                    item.create_date.toLowerCase().includes(search.toLowerCase()) ||
                    item.create_time.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.tooltip.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search, items]);

    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                            <IconLock />
                            Lock
                        </button>
                        <button type='button' onClick={() => setModalEmployee(true)} className="btn btn-primary gap-2">
                            <IconPlus />
                            Add New
                        </button>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <Transition appear show={modalEmployee} as={Fragment}>
                    <Dialog as="div" open={modalEmployee} onClose={() => setModalEmployee(false)}>
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
                                    <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                            <h5>Thêm nhân viên</h5>
                                            <button type="button" onClick={() => setModalEmployee(false)} className="text-white-dark hover:text-dark">
                                                <IconX className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="p-5">
                                            <form>
                                                <div className="relative mb-4">
                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                        <IconUser className="w-5 h-5" />
                                                    </span>
                                                    <input type="text" placeholder="Họ và tên" className="form-input ltr:pl-10 rtl:pr-10" id="login_email" />
                                                </div>

                                                <div className="relative mb-4">
                                                    <Select  menuPlacement="auto"  maxMenuHeight={130} className='z-30' defaultValue={options[0]} options={options} isSearchable={true} />
                                                </div>

                                                <div className="relative mb-4">
                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                        <IconMail className="w-5 h-5" />
                                                    </span>
                                                    <input type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="login_email" />
                                                </div>

                                                <div className="relative mb-4">
                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                        <FontAwesomeIcon icon={faPhone} color='grey' />
                                                    </span>
                                                    <input type="tel" placeholder="Số điện thoại" className="form-input ltr:pl-10 rtl:pr-10" id="login_email" />
                                                </div>

                                                <button type="button" className="btn btn-primary w-full">
                                                    Thêm
                                                </button>
                                            </form>
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <div className="datatables pagination-padding">
                    <DataTable
                        className="whitespace-nowrap table-hover invoice-table"
                        records={records}
                        columns={[
                            {
                                accessor: 'id',
                                sortable: true,
                            },
                            {
                                accessor: 'username',
                                sortable: true,
                                render: ({ username }) => (
                                    <div className="flex items-center font-semibold">
                                        <div>{username}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'phone',
                                sortable: true,
                            },
                            {
                                accessor: 'create_date',
                                sortable: true,
                            },
                            {
                                accessor: 'create_time',
                                sortable: true,
                            },
                            {
                                accessor: 'position',
                                sortable: true,
                            },
                            {
                                accessor: 'status',
                                sortable: true,
                                render: ({ status }) => <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <NavLink to="#" className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </NavLink>
                                        <button type="button" className="flex hover:text-danger" onClick={() => deleteRow(id)}>
                                            <IconLock />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Employees;
