import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconPlus from '../../../components/Icon/IconPlus';
import IconEdit from '../../../components/Icon/IconEdit';
import IconEye from '../../../components/Icon/IconEye';
import IconClock from '../../../components/Icon/IconClock';
import IconLock from '../../../components/Icon/IconLock';

const OrderActions = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Orders Actions'));
    }, [dispatch]);

    const [items, setItems] = useState([
        {
            id: 1,
            order_id: 13618133,
            action: 'Đã tạo đơn hàng từ đơn hàng nháp #D4',
            date: '15 Dec 2020',
            time: '10:31 PM',
            from: 'long hoang',
            action_type: { tooltip: 'Tạo', color: 'secondary' },
        },
        {
            id: 2,
            order_id: 13618133,
            action: 'Đã xác nhận đơn hàng mới #1001 từ khoa dang',
            date: '15 Dec 2020',
            time: '10:32 PM',
            from: 'sapo',
            action_type: { tooltip: 'Xác nhận', color: 'info' },
        },
        {
            id: 3,
            order_id: 13618133,
            action: 'Khoản thanh toán 150,000 VND đang chờ xử lý',
            date: '15 Dec 2020',
            time: '10:32 PM',
            from: 'sapo',
            action_type: { tooltip: 'Xử lý', color: 'warning' },
        },
        {
            id: 4,
            order_id: 13618133,
            action: 'Đã xác nhận khoản thanh toán 150,000 VND thông qua Tiền mặt',
            date: '15 Dec 2020',
            time: '10:32 PM',
            from: 'sapo',
            action_type: { tooltip: 'Đã thanh toán', color: 'success' },
        },
        {
            id: 5,
            order_id: 13618133,
            action: 'Khoản thanh toán 150,000 VND đang chờ xử lý',
            date: '15 Dec 2020',
            time: '10:32 PM',
            from: 'sapo',
            action_type: { tooltip: 'Hoàn tất', color: 'success' },
        },

    ]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'id'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'desc',
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
        let data2 = [];
        if (sortStatus.columnAccessor === 'action_type') {
            data2 = sortBy(initialRecords, (item) => item.action_type.tooltip);
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
                    item.date.toLowerCase().includes(search.toLowerCase()) ||
                    item.time.toLowerCase().includes(search.toLowerCase())
);
            });
        });
    }, [search, items]);

    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">

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
                                accessor: 'action',
                                sortable: false,
                            },
                            {
                                accessor: 'from',
                                sortable: false,
                            },
                            {
                                accessor: 'date',
                                sortable: true,
                            },
                            {
                                accessor: 'time',
                                sortable: true,
                            },
                            {
                                accessor: 'action_type',
                                sortable: true,
                                render: ({ action_type }) => <span className={`badge badge-outline-${action_type.color} `}>{action_type.tooltip}</span>,
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

export default OrderActions;
