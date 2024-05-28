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


const StatisticTax = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Laurie Fox',
            order: 20,
            avt: 'https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg',
            commission:300000,
            tax:30000,
            withdraw: 270000,
        },
        {
            id: 2,
            name: 'Hoa',
            order: 2,
            avt: 'https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg',
            commission:90000,
            tax:9000,
            withdraw: 81000,
        },
        {
            id: 3,
            name: 'Lan',
            order: 30,
            avt: 'https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg',
            commission:920000,
            tax:92000,
            withdraw: 808000,
        },
        {
            id: 4,
            name: 'Long',
            order: 40,
            avt: 'https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg',
            commission:900000,
            tax:90000 ,
            withdraw: 810000,
        },
        {
            id: 5,
            name: 'Thiện',
            order: 1,
            avt: 'https://i.pinimg.com/236x/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg',
            commission:90000,
            tax:9000,
            withdraw: 81000 ,
        },
    ]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [datePick, setDatePick] = useState<any>('05-07-2024 to 07-10-2024');
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
                    item.name.toLowerCase().includes(search.toLowerCase())
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
                            Excel
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
                                accessor: 'order',
                                sortable: true,
                            },
                            {
                                accessor: 'commission',
                                sortable: true,
                            },
                            {
                                accessor: 'tax',
                                sortable: true,
                            },
                            {
                                accessor: 'withdraw',
                                sortable: true,
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

export default StatisticTax;
