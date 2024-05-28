import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconEdit from '../../components/Icon/IconEdit';
import IconPlus from '../../components/Icon/IconPlus';
import IconEye from '../../components/Icon/IconEye';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { IRootState } from '../../store';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconDownload from '../../components/Icon/IconDownload';


const StatisticOrders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
    const [items, setItems] = useState([
        {
            id: 1,
            create_by: 'Laurie Fox',
            order: '32919',
            avt: 'https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg',
            commission:300000,
            total_bill:100000,
            status: { tooltip: 'Đang xử lý', color: 'primary' },

        },
        {
            id: 2,
            create_by: 'Hoa',
            order: '32910',
            avt: 'https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg',
            commission:90000 ,
            total_bill:9000 ,
            status: { tooltip: 'Thành công', color: 'success' },

        },
        {
            id: 3,
            create_by: 'Lan',
            order: '31912',
            avt: 'https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg',
            commission:920000,
            total_bill:20000,
            status: { tooltip: 'Đang xử lý', color: 'primary' },

        },
        {
            id: 4,
            create_by: 'Long',
            order: '40891',
            avt: 'https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg',
            commission:900000,
            total_bill:200000,
            status: { tooltip: 'Thành công', color: 'success' },

        },
        {
            id: 5,
            create_by: 'Thiện',
            order: '12301',
            avt: 'https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg',
            commission:9000,
            total_bill:90000,
            status: { tooltip: 'Đã hủy', color: 'danger' },
        },
    ]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [datePick, setDatePick] = useState<any>('05-07-2024 to 07-10-2024');


    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;


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
                    item.create_by.toLowerCase().includes(search.toLowerCase())||
                    item.order.toLowerCase().includes(search.toLowerCase())
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
                        <Flatpickr
                            options={{
                                mode: 'range',
                                dateFormat: 'd-m-Y',
                                position: isRtl ? 'auto right' : 'auto left',
                            }}
                            value={datePick}
                            className="form-input w-56"
                            onChange={(datePick) => setDatePick(datePick)}
                        />
                        <button type='button' className="btn btn-primary gap-2">
                            <FontAwesomeIcon icon={faFilter} />
                        </button>

                        <button type="button" className="btn btn-success gap-2">
                            <IconDownload />
                            Export PDF
                        </button>
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
                                accessor: 'order',
                                sortable: true,
                                render: ({ order }) => (
                                    <div className="text-primary underline hover:no-underline font-semibold">{`#${order}`}</div>
                                ),
                            },
                            {
                                accessor: 'create_by',
                                sortable: true,
                                render: ({ create_by, avt }) => (
                                    <div className="flex items-center font-semibold">
                                        <div className="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
                                            <img className="h-8 w-8 rounded-full object-cover" src={avt} alt="" />
                                        </div>
                                        <div>{create_by}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'total_bill',
                                sortable: true,
                            },
                            {
                                accessor: 'commission',
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

export default StatisticOrders;
