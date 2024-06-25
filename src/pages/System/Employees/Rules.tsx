import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, Fragment, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconPlus from '../../../components/Icon/IconPlus';
import IconEdit from '../../../components/Icon/IconEdit';
import { Rule } from '../../../interface/Employee';
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
import axios from '../../../context/axios';

const Rules = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Rules List'));
    }, [dispatch]);

    const [modalRule, setModalRule] = useState(false);


    const [items, setItems] = useState<Rule[]>([]);
    const [rule, setRule] = useState("");
    const [title, setTitle] = useState("Thêm");
    const [idF,setIdF] = useState<number|undefined>(undefined)

    async function deleteRule (ids: number[]){
        try {
            const response = await axios.delete("/rule/delete", {
                data: {
                    id_rule: ids
                }
            });
            console.log("Delete rule successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Delete error:", error);
            throw error;
        }
    };

    const deleteRow = async (id: number | null = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            try {
                let ids = [];
                if (id) {
                    ids = [id];
                    console.log(ids)
                } else {
                    let selectedRows = selectedRecords || [];
                    ids = selectedRows.map((d) => d.id);
                    console.log(ids)
                }
                await deleteRule(ids);
                setLoad(false);
                setSearch('');
                setSelectedRecords([]);
                setPage(1);
            } catch (error) {
                console.error("Delete row error:", error);

            }
        }
    };

    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'id'));
    const [records, setRecords] = useState<Rule[]>(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<Rule[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const convertJsonArrayToRule = (jsonArray: any[]): Rule[] => {
        return jsonArray.map(json => ({
                id: json.id_rule,
                rule: json.rule
        }));
    };

    const getRules = async () =>{
        try {
            const response = await axios.get("/rule/get-all");
            setItems(convertJsonArrayToRule(response.data));
        } catch (error) {
            console.error("Repass error:", error);
        }
    }

    function openModal(id:number|undefined){
        if(id===undefined){
            setModalRule(true);
            setIdF(undefined);
            setTitle("Thêm");
        }else{
            const foundRule = items.find((item) => item.id === id);
            setModalRule(true);
            setIdF(id);
            setRule(foundRule?foundRule.rule:"");
            setTitle("Sửa");
        }
    }
    function closeModal(){
        setIdF(undefined);
        setRule("");
        setLoad(false);
        setModalRule(false);
    }

    async function editRule(id: number) {
        try {
            const response = await axios.put("/rule/update",{
                id_rule:id,
                rule: rule,
            });

        } catch (error) {
            console.error("Repass error:", error);
        }
    }
    const createRule = async () =>{
        try {
            const response = await axios.post("/rule/create",{
                rule: rule,
            });
        } catch (error) {
            console.error("Repass error:", error);
        }
    }

    async function handleSubmit(id: number|undefined){
        if(id===undefined){
            await createRule();

        } else{
            await editRule(id);
        }
        closeModal();
    }

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const sortedRecords = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? sortedRecords.reverse() : sortedRecords);
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(sortedRecords.slice(from, to));
    }, [sortStatus]);

    useEffect(() => {
        const filteredRecords = items.filter((item) => item.rule.toLowerCase().includes(search.toLowerCase()));
        setInitialRecords(filteredRecords);
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(filteredRecords.slice(from, to));
    }, [search, items]);

    useEffect(() => {
        getRules();
        setLoad(true);
    }, [load]);

    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                            <IconTrashLines />
                            Delete
                        </button>
                        <button type='button' onClick={() => openModal(undefined)} className="btn btn-primary gap-2">
                            <IconPlus />
                            Add New
                        </button>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <Transition appear show={modalRule} as={Fragment}>
                    <Dialog as="div" open={modalRule} onClose={() => setModalRule(false)}>
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
                                            <h5>{title} quyền tài khoản</h5>
                                            <button type="button" onClick={() => closeModal()} className="text-white-dark hover:text-dark">
                                                <IconX className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="p-2">
                                            <form>
                                                <div className="relative mb-4">
                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                        <IconUser className="w-5 h-5" />
                                                    </span>
                                                    <input type="text" placeholder="Tên quyền" className="form-input ltr:pl-10 rtl:pr-10" id="rule" value={rule} onChange={(e)=>setRule(e.target.value)} />
                                                </div>

                                                <button type="button" onClick={()=>handleSubmit(idF)} className="btn btn-primary w-full mt-4">
                                                    Tạo
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
                                accessor: 'rule',
                                sortable: true,
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <button onClick={()=>openModal(id)} className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </button>
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

export default Rules;
