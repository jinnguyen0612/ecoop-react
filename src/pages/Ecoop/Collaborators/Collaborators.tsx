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
import { Collaborator } from '../../../interface/Employee';
import axios from '../../../context/axios';

const Collaborators = () => {
    const { user } = useAuth();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    }, [dispatch]);

    const [items, setItems] = useState<Collaborator[]>([]);
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<Collaborator[]>([]);
    const [records, setRecords] = useState<Collaborator[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name',
        direction: 'asc',
    });

    const convertJsonArrayToCollaboratorArray = (jsonArray: any[]): Collaborator[] => {
        return jsonArray.map(json => ({
            id: json.id_collaborator,
            name: json.name_collaborator,
            avt: json.avatar,
            email: json.email_collaborator,
            phone: json.phone,
            presenter: json.presenter_phone,
            create: json.time_create.substring(0, 10),
            status: {
                tooltip: json.status_account === 1 ? 'Kích hoạt' : 'Vô hiệu hóa',
                color: json.status_account === 1 ? "success" : "danger"
            }
        }));
    };

    const getCollaborators = async () => {
        try {
            const response = await axios.get("/collaborator/get-all");
            const collaborators = convertJsonArrayToCollaboratorArray(response.data);
            setLoad(true);
            setItems(collaborators);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                setItems(items.filter((user) => user.id !== id));
                setSearch('');
                setSelectedRecords([]);
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                const result = items.filter((d) => !ids.includes(d.id as never));
                setItems(result);
                setSearch('');
                setSelectedRecords([]);
                setPage(1);
            }
        }
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
    }, [search, items]);

    useEffect(() => {
        const sortedRecords = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? sortedRecords.reverse() : sortedRecords);
    }, [sortStatus, initialRecords]);

    useEffect(() => {
        getCollaborators();
    }, []);
    useEffect(() => {
        getCollaborators();
        setLoad(false);
    }, [load]);

    useEffect(() => {
        if (items.length > 0) {
            setInitialRecords(sortBy(items, sortStatus.columnAccessor));
        }
    }, [items, sortStatus]);

    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        {user.position === "Admin" && (
                            <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                                <IconTrashLines />
                                Delete
                            </button>
                        )}
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
                                            <img className="h-8 w-8 rounded-full object-cover" src={avt ? avt : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWUem1ykMgZrm7P2GNRhID1fnipTWf1kQ1dA&s"} alt="" />
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
                                        {user.position === "Admin" && (
                                            <button type="button" className="flex hover:text-danger" onClick={() => deleteRow(id)}>
                                                <IconTrashLines />
                                            </button>
                                        )}
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

export default Collaborators;
