import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, Fragment, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconPlus from '../../../components/Icon/IconPlus';
import IconEdit from '../../../components/Icon/IconEdit';
import { Position, PositionRule, Rule } from '../../../interface/Employee';
import { Dialog, Transition, Tab } from '@headlessui/react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../context/axios';

const Positions: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Position List'));
    }, [dispatch]);

    const [modalPosition, setModalPosition] = useState(false);
    const [modalCheckRule, setModalCheckRule] = useState(false);

    const [items, setItems] = useState<PositionRule[]>([]);
    const [id,setId] = useState<number>();
    const [ids, setIds] = useState<number[]>([]);
    const [position, setPosition] = useState('');
    const [rules, setRules] = useState<Rule[]>([]);

    const convertJsonArrayToPositionArray = (jsonArray: any[]): PositionRule[] => {
        return jsonArray.map(json => ({
            id: json.id,
            position: json.name_department,
            rule: json.rules.map((ruleItem: any) => ({
                id: ruleItem.id_rule,
                rule: ruleItem.rule,
            })),
        }));
    };

    const convertJsonArrayToRule = (jsonArray: any[]): Rule[] => {
        return jsonArray.map(json => ({
            id: json.id_rule,
            rule: json.rule,
        }));
    };

    const [load, setLoad] = useState(false);
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

    const getPositions = async () => {
        try {
            const response = await axios.get('/department/get-with-rule');
            setItems(convertJsonArrayToPositionArray(response.data));
        } catch (error) {
            console.error('Repass error:', error);
        }
    };

    const getRules = async () => {
        try {
            const response = await axios.get('/rule/get-all');
            setRules(convertJsonArrayToRule(response.data));
        } catch (error) {
            console.error('Repass error:', error);
        }
    };

    const createPosition = async () => {
        try {
            const response = await axios.post('/department/create', {
                name: position,
            });
            console.log(response);
        } catch (error) {
            console.error('Repass error:', error);
        }
    };

    const handleSubmit = async () => {
        await createPosition();
        setLoad(false);
        setPosition('');
        setModalPosition(false);
    };

    const handleCheckRule = (id: number) => {
        const element = items.find(item => item.id === id);
        if (element) {
            const tmp = element.rule.map(rule => rule.id);
            setIds(tmp);
            setId(id);
        }
        setModalCheckRule(true);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const id = parseInt(value, 10);
        if (checked) {
            setIds(prevIds => [...prevIds, id]);
        } else {
            setIds(prevIds => prevIds.filter(existingId => existingId !== id));
        }
    };

    const handleConfirm = async () => {
        try {
            const response = await axios.post('/department/check-permission', {
                ids_department: id,
                ids_rule: ids
            });
            console.log(response);
        } catch (error) {
            console.error('Repass error:', error);
        }
        setLoad(false);
        setModalCheckRule(false);

    };

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
            return items.filter(item => item.position.toLowerCase().includes(search.toLowerCase()));
        });
    }, [search, items]);

    useEffect(() => {
        getPositions();
        setLoad(true);
    }, [load]);

    useEffect(() => {
        getRules();
    }, []);

    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setModalPosition(true)} className="btn btn-primary gap-2">
                            <IconPlus />
                            Add New
                        </button>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input
                            type="text"
                            className="form-input w-auto"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
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
                                    <Dialog.Panel className="panel my-20 md:my-40 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                            <h5>Thêm vai trò trang web</h5>
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
                                                    <input
                                                        type="text"
                                                        placeholder="Vai trò"
                                                        className="form-input ltr:pl-10 rtl:pr-10"
                                                        id="position"
                                                        value={position}
                                                        onChange={(e) => setPosition(e.target.value)}
                                                    />
                                                </div>

                                                <button type="button" onClick={handleSubmit} className="btn btn-primary w-full">
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

                <Transition appear show={modalCheckRule} as={Fragment}>
                    <Dialog as="div" open={modalCheckRule} onClose={() => setModalCheckRule(false)}>
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
                                    <Dialog.Panel className="panel my-10 md:my-20 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                            <h5>Chọn quyền</h5>
                                            <button type="button" onClick={() => setModalCheckRule(false)} className="text-white-dark hover:text-dark">
                                                <IconX className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="p-5">
                                            <form>
                                                <div className="grid grid-cols-2 gap-6">
                                                    {rules.map(item => (
                                                        <div className="space-y-2 space-x-1" key={item.id}>
                                                            <label className="inline-flex">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-checkbox peer"
                                                                    value={item.id}
                                                                    checked={ids.includes(item.id)}
                                                                    onChange={handleCheckboxChange}
                                                                />
                                                                <span className="peer-checked:text-primary">{item.rule}</span>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button type="button" onClick={handleConfirm} className="btn btn-primary w-full mt-2">
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
                                        <button type="button" className="flex hover:text-success" onClick={() => handleCheckRule(id)}>
                                            <FontAwesomeIcon icon={faBriefcase} />
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
