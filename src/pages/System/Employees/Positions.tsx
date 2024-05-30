import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, Fragment, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconPlus from '../../../components/Icon/IconPlus';
import IconEdit from '../../../components/Icon/IconEdit';
import { Position } from '../../../interface/Employee';
import { Dialog, Transition,Tab } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import IconX from '../../../components/Icon/IconX';
import IconUser from '../../../components/Icon/IconUser';
import IconLock from '../../../components/Icon/IconLock';
import IconFacebook from '../../../components/Icon/IconFacebook';
import IconGithub from '../../../components/Icon/IconGithub';

const Positions = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Position List'));
    }, [dispatch]);

    const [modalPosition, setModalPosition] = useState(false);


    const [items, setItems] = useState<Position[]>([
        {
            id: 1,
            position: 'Laurie Fox',
        },
        {
            id: 2,
            position: 'Lynx Volka',
        },
        {
            id: 3,
            position: 'Lauka Virie',
        },
        {
            id: 4,
            position: 'Laurie Fox',
        },
        {
            id: 5,
            position: 'Laurie Fox',
        },
    ]);

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
    const [records, setRecords] = useState<Position[]>(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<Position[]>([]);
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
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => item.position.toLowerCase().includes(search.toLowerCase()));
        });
    }, [search, items]);

    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                            <IconTrashLines />
                            Delete
                        </button>
                        <button onClick={() => setModalPosition(true)} className="btn btn-primary gap-2">
                            <IconPlus />
                            Add New
                        </button>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <Transition appear show={modalPosition} as={Fragment}>
                    <Dialog as="div" open={modalPosition} onClose={() => setModalPosition(false)}>
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
                                            <h5>Thêm quyền tài khoản</h5>
                                            <button type="button" onClick={() => setModalPosition(false)} className="text-white-dark hover:text-dark">
                                                <IconX className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="p-5">
                                            <form>
                                                <div className="relative mb-4">
                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                        <IconUser className="w-5 h-5" />
                                                    </span>
                                                    <input type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="login_email" />
                                                </div>
                                                <div className="relative mb-4">
                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                        <IconLock className="w-5 h-5" />
                                                    </span>
                                                    <input type="password" placeholder="Password" className="form-input ltr:pl-10 rtl:pr-10" id="login_password" />
                                                </div>
                                                <button type="button" className="btn btn-primary w-full">
                                                    Login
                                                </button>
                                            </form>
                                        </div>
                                        <div className="my-4 text-center text-xs text-white-dark dark:text-white-dark/70">OR</div>
                                        <div className="mb-5 flex items-center justify-center gap-3">
                                            <button type="button" className="btn btn-outline-primary flex gap-1">
                                                <IconFacebook className="w-5 h-5 shrink-0" />

                                                <span>Facebook</span>
                                            </button>
                                            <button type="button" className="btn btn-outline-danger flex gap-1">
                                                <IconGithub className="shrink-0" />
                                                <span>Github</span>
                                            </button>
                                        </div>
                                        <div className="border-t border-[#ebe9f1] p-5 dark:border-white/10">
                                            <p className="text-center text-sm text-white-dark dark:text-white-dark/70">
                                                Looking to
                                                <button type="button" className="text-[#515365] hover:underline ltr:ml-1 rtl:mr-1 dark:text-white-dark">
                                                    create an account?
                                                </button>
                                            </p>
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
                                accessor: 'position',
                                sortable: true,
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
                                            <IconTrashLines />
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

export default Positions;
