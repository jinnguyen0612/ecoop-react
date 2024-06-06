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
import { Employee, Option, Position } from '../../../interface/Employee';
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
import { faLock, faLockOpen, faPhone } from '@fortawesome/free-solid-svg-icons';
import IconMail from '../../../components/Icon/IconMail';
import axios from '../../../context/axios';
import Positions from './Positions';

const Employees = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Employee List'));
    }, [dispatch]);

    const [modalEmployee, setModalEmployee] = useState(false);


    const [items, setItems] = useState<Employee[]>([]);
    const [positions, setPositions] = useState<Option[]>([]);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState(-1);

    async function blockEmployee (ids: number[]){
        try {
            const response = await axios.post("/employee/block", {
                employees: ids
            });
            console.log("Block employees successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Block employees error:", error);
            throw error;
        }
    };

    const deleteRow = async (id: number | null = null) => {
        if (window.confirm('Are you sure want to block selected employee ?')) {
            try {
                let ids = [];
                if (id) {
                    ids = [id];
                } else {
                    let selectedRows = selectedRecords || [];
                    ids = selectedRows.map((d) => d.id);
                }
                await blockEmployee(ids);
                setLoad(false);
                setSearch('');
                setSelectedRecords([]);
                setPage(1);
            } catch (error) {
                console.error("Delete row error:", error);

            }
        }
    };



    const convertJsonArrayToPositionArray = (jsonArray: any[]): Option[] => {
        return jsonArray.map(json => ({
            value: json.id_department,
            label: json.name_department,
        }));
    };
    const convertJsonArrayToEmployeeArray = (jsonArray: any[]): Employee[] => {
        return jsonArray.map(json => ({
            id: json.id_employee,
            name: json.name,
            username: json.username,
            phone: json.phone,
            create_date: json.time_create.substring(0, 10),
            create_time: json.time_create.substring(11, 19),
            position: json.name_department,
            status: {
                tooltip: json.status === 1 ? 'Kích hoạt' : 'Vô hiệu hóa',
                color: json.status === 1 ? "success" : "danger"
            }
        }));
    };

    const getPositions = async () =>{
        try {
            const response = await axios.get("/department/get-all");
            setPositions(convertJsonArrayToPositionArray(response.data));
            setPosition(positions[0].value);
        } catch (error) {
            console.error("Repass error:", error);
        }
    }

    const getEmployees = async () =>{
        try {
            const response = await axios.get("/employee/get-all");
            setItems(convertJsonArrayToEmployeeArray(response.data));
        } catch (error) {
            console.error("Repass error:", error);
        }
    }

    const createEmployee = async () =>{
        try {
            const response = await axios.post("/employee/create",{
                name: name,
                username:username,
                phone: phone,
                id_department: position

            });
        } catch (error) {
            console.error("Repass error:", error);
        }
    }

    const handleSubmit = async () =>{
        await createEmployee();
        setLoad(false);
        setModalEmployee(false);
    }

    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(false);
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

    useEffect(() => {
        getEmployees();
        getPositions();
        setLoad(true);
    }, [load]);

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
                                                    <input type="text" placeholder="Họ và tên" className="form-input ltr:pl-10 rtl:pr-10" id="name" onChange={(e)=>setName(e.target.value)}/>
                                                </div>

                                                <div className="relative mb-4">
                                                    <Select
                                                        menuPlacement="auto"
                                                        maxMenuHeight={130}
                                                        className='z-30'
                                                        options={positions}
                                                        defaultValue={positions[0]}
                                                        isSearchable={true}
                                                        onChange={(selectedOption) => setPosition(selectedOption?selectedOption.value:-1)}
                                                        />
                                                </div>

                                                <div className="relative mb-4">
                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                        <IconMail className="w-5 h-5" />
                                                    </span>
                                                    <input type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="email" onChange={(e)=>setUsername(e.target.value)}/>
                                                </div>

                                                <div className="relative mb-4">
                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                        <FontAwesomeIcon icon={faPhone} color='grey' />
                                                    </span>
                                                    <input type="tel" placeholder="Số điện thoại" className="form-input ltr:pl-10 rtl:pr-10" id="phone" onChange={(e)=>setPhone(e.target.value)}/>
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
                                render: ({ id,status }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <button type="button" className={`flex hover:text-${status.color==="success"?"danger":"success"}`} onClick={() => deleteRow(id)}>
                                            {
                                                status.color==="success"?
                                                <FontAwesomeIcon icon={faLock}/>:
                                                <FontAwesomeIcon icon={faLockOpen}/>
                                            }
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
