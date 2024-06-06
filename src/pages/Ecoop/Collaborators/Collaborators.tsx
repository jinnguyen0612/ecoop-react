import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconEdit from '../../../components/Icon/IconEdit';
import IconPlus from '../../../components/Icon/IconPlus';
import IconEye from '../../../components/Icon/IconEye';
import { useAuth } from '../../../context/auth';


const Collaborators = () => {
    const { user } = useAuth();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Laurie Fox',
            avt: 'https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg',
            email: 'lauriefox@company.com',
            phone:'09xxxxx421',
            presenter:'09xxxxx999',
            create: '15 Dec 2020',
            status: { tooltip: 'Kích hoạt', color: 'success' },
        },
        {
            id: 2,
            name: 'Thiện',
            avt: 'https://i.pinimg.com/736x/63/f8/fb/63f8fbab7ef0b960dff3913c0c27a9e1.jpg',
            email: 'lauriefox@company.com',
            phone:'09xxxxx421',
            presenter:'09xxxxx999',
            create: '15 Dec 2020',
            status: { tooltip: 'Vô hiệu hóa', color: 'danger' },
        },
        {
            id: 3,
            name: 'Laurie Fox',
            avt: 'https://i.pinimg.com/236x/4c/09/c5/4c09c5c45092c4873977b5c0548ebf5d.jpg',
            email: 'lauriefox@company.com',
            phone:'09xxxxx421',
            presenter:'09xxxxx999',
            create: '15 Dec 2020',
            status: { tooltip: 'Kích hoạt', color: 'success' },
        },
        {
            id: 4,
            name: 'Laurie Fox',
            avt: 'https://i.pinimg.com/736x/b7/6f/3d/b76f3dbfe55f31363b2518fe16d8b312.jpg',
            email: 'lauriefox@company.com',
            phone:'09xxxxx421',
            presenter:'09xxxxx999',
            create: '15 Dec 2020',
            status: { tooltip: 'Kích hoạt', color: 'success' },
        },
    ]);

    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                setRecords(items.filter((user) => user.id !== id));
                setInitialRecords(items.filter((user) => user.id !== id));
                setItems(items.filter((user) => user.id !== id));
                setSearch('');
                setSelectedRecords([]);
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                const result = items.filter((d) => !ids.includes(d.id as never));
                setRecords(result);
                setInitialRecords(result);
                setItems(result);
                setSearch('');
                setSelectedRecords([]);
                setPage(1);
            }
        }
    };

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => {
                return (
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase()) ||
                    item.presenter.toLowerCase().includes(search.toLowerCase()) ||
                    item.create.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.tooltip.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        {
                            user.position==="Admin"?
                            <>
                                <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                                    <IconTrashLines />
                                    Delete
                                </button>
                            </>:
                            <></>
                        }

                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

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
                                accessor: 'name',
                                sortable: true,
                                render: ({ name, avt }) => (
                                    <div className="flex items-center font-semibold">
                                        <div className="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
                                            <img className="h-8 w-8 rounded-full object-cover" src={avt} alt="" />
                                        </div>
                                        <div>{name}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'email',
                                sortable: true,
                            },
                            {
                                accessor: 'phone',
                                sortable: true,
                            },
                            {
                                accessor: 'presenter',
                                sortable: true,
                            },
                            {
                                accessor: 'create',
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
                                        <button type="button" className="flex hover:text-primary">
                                            <IconEye />
                                        </button>
                                        {/* <NavLink to="" className="flex"> */}
                                        {
                                            user.position==="Admin"?
                                            <>
                                                <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
                                                    <IconTrashLines />
                                                </button>
                                            </>:
                                            <></>
                                        }

                                        {/* </NavLink> */}
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
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Collaborators;
