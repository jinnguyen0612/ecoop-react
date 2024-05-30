import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '../components/Dropdown';
import { setPageTitle } from '../store/themeConfigSlice';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import { ApexOptions } from 'apexcharts';
import IconShoppingCart from '../components/Icon/IconShoppingCart';
import IconArrowLeft from '../components/Icon/IconArrowLeft';
import IconMenuInvoice from '../components/Icon/Menu/IconMenuInvoice';

const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Sales Admin'));
    }, [dispatch]);

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [loading] = useState(false);

    // totalVisitOptions
    const totalVisit = {
        series: [{ data: [21, 9, 36, 12, 44, 25, 59, 41, 66, 25] }],
        options: {
            chart: {
                height: 58,
                type: 'line' as 'line', // Explicitly define type as 'line'
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#009688',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth' as 'smooth',
                width: 2,
            },
            colors: ['#009688'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };

    // paidVisitOptions
    const paidVisit = {
        series: [{ data: [22, 19, 30, 47, 32, 44, 34, 55, 41, 69] }],
        options: {
            chart: {
                height: 58,
                type: 'line' as 'line', // Explicitly define type as 'line'
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#e2a03f',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth' as 'smooth',
                width: 2,
            },
            colors: ['#e2a03f'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };

    // uniqueVisitorSeriesOptions
const uniqueVisitorSeries: {
    series: {
        name: string;
        data: number[];
        type: string;
    }[];
    options: ApexOptions;
} = {
    series: [
        {
            name: 'Cộng tác viên',
            data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
            type: 'bar',
        },
        {
            name: 'Hoa hồng',
            data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70],
            type: 'bar',
        },
    ],
    options: {
        chart: {
            height: 360,
            type: 'bar',
            fontFamily: 'Nunito, sans-serif',
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#515365',
                opacity: 0.4,
            },
        },
        stroke: {
            width: 2,
            colors: ['transparent'],
        },
        colors: ['#5c1ac3', '#ffbb44'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 8,
                borderRadiusApplication: 'end',
            },
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            itemMargin: {
                horizontal: 8,
                vertical: 8,
            },
        },
        grid: {
            borderColor: isDark ? '#191e3a' : '#e0e6ed',
            padding: {
                left: 20,
                right: 20,
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: {
                show: true,
                color: isDark ? '#3b3f5c' : '#e0e6ed',
            },
        },
        yaxis: [
            {
                title: {
                    text: 'Cộng tác viên',
                },
                opposite: isRtl,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            {
                title: {
                    text: 'Hoa hồng',
                },
                opposite: !isRtl,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
        ],
        fill: {
            type: 'gradient',
            gradient: {
                shade: isDark ? 'dark' : 'light',
                type: 'vertical',
                shadeIntensity: 0.3,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.8,
                stops: [0, 100],
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            marker: {
                show: true,
            },
        },
    },
};


    //Revenue Chart
    const revenueChart = {
        series: [
            {
                name: 'Income',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: 'Expenses',
                data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area' as 'area', // Explicitly define type as 'area'
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth' as 'smooth',
                width: 2,
                lineCap: 'square' as 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#1B55E2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };


const salesByCategory: {
    series: number[];
    options: ApexOptions;
} = {
    series: [985, 737, 270],
    options: {
        chart: {
            type: 'donut' as 'donut', // Chú thích kiểu rõ ràng cho loại biểu đồ
            height: 460,
            fontFamily: 'Nunito, sans-serif',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 25,
            colors: isDark ? ['#0e1726'] : ['#fff'],
        },
        colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            markers: {
                width: 10,
                height: 10,
                offsetX: -2,
            },
            height: 50,
            offsetY: 20,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    background: 'transparent',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '29px',
                            offsetY: -10,
                        },
                        value: {
                            show: true,
                            fontSize: '26px',
                            color: isDark ? '#bfc9d4' : undefined,
                            offsetY: 16,
                            formatter: (val: any) => {
                                return val;
                            },
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: '#888ea8',
                            fontSize: '29px',
                            formatter: (w: any) => {
                                return w.globals.seriesTotals.reduce((a: any, b: any) => {
                                    return a + b;
                                }, 0);
                            },
                        },
                    },
                },
            },
        },
        labels: ['Apparel', 'Sports', 'Others'],
        states: {
            hover: {
                filter: {
                    type: 'none',
                    value: 0.15,
                },
            },
            active: {
                filter: {
                    type: 'none',
                    value: 0.15,
                },
            },
        },
    },
};


    //Daily Sales
    const dailySales = {
        series: [
            {
                name: 'Sales',
                data: [44, 55, 41, 67, 22, 43, 21],
            },
            {
                name: 'Last Week',
                data: [13, 23, 20, 8, 13, 27, 33],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'bar' as 'bar', // Explicitly define type as 'bar'
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: '100%' as '100%', // Explicitly define type as '100%'
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#e2a03f', '#e0e6ed'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: false,
                },
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '25%',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 10,
                    right: -20,
                    bottom: -20,
                    left: -20,
                },
            },
        },
    };

    //Total Orders
    const totalOrders = {
        series: [
            {
                name: 'Sales',
                data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
            },
        ],
        options: {
            chart: {
                height: 290,
                type: 'area' as 'area', // Explicitly define type as 'area'
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth' as 'smooth',
                width: 2,
            },
            colors: isDark ? ['#00ab55'] : ['#00ab55'],
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            yaxis: {
                min: 0,
                show: false,
            },
            grid: {
                padding: {
                    top: 125,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    type: 'vertical' as 'vertical', // Explicitly define type as 'vertical'
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.3,
                    opacityTo: 0.05,
                    stops: [100, 100],
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
            },
        },
    };

    return (
        <div>
            <div className="pt-5">
                <div className="grid xl:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full xl:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6 text-white">
                            <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                                <div className="flex justify-between">
                                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Tổng hoa hồng</div>
                                    <div className="dropdown">
                                        <Dropdown
                                            offset={[0, 5]}
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="hover:opacity-80"
                                            button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                        >
                                            <ul className="text-black dark:text-white-dark">
                                                <li>
                                                    <button type="button">View Report</button>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="flex items-center mt-5">
                                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> $170.46 </div>
                                    <div className="badge bg-white/30">+ 2.35% </div>
                                </div>
                                <div className="flex items-center font-semibold mt-5">
                                    <IconMenuInvoice className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Last Week 44,700
                                </div>
                            </div>

                            {/* Sessions */}
                            <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                                <div className="flex justify-between">
                                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Tổng số tiền đã được rút</div>
                                    <div className="dropdown">
                                        <Dropdown
                                            offset={[0, 5]}
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="hover:opacity-80"
                                            button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                        >
                                            <ul className="text-black dark:text-white-dark">
                                                <li>
                                                    <button type="button">View Report</button>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="flex items-center mt-5">
                                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 74,137 </div>
                                    <div className="badge bg-white/30">- 2.35% </div>
                                </div>
                                <div className="flex items-center font-semibold mt-5">
                                    <IconMenuInvoice className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Last Week 84,709
                                </div>
                            </div>

                            {/*  Time On-Site */}
                            <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                                <div className="flex justify-between">
                                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Tổng số thuế đã trả</div>
                                    <div className="dropdown">
                                        <Dropdown
                                            offset={[0, 5]}
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="hover:opacity-80"
                                            button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                        >
                                            <ul className="text-black dark:text-white-dark">
                                                <li>
                                                    <button type="button">View Report</button>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="flex items-center mt-5">
                                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 38,085 </div>
                                    <div className="badge bg-white/30">+ 1.35% </div>
                                </div>
                                <div className="flex items-center font-semibold mt-5">
                                    <IconMenuInvoice className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Last Week 37,894
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 text-white">
                            <div className="panel h-full p-0">
                                <div className="flex items-center justify-between w-full p-5 absolute">
                                    <div className="relative">
                                        <div className="text-success dark:text-success-light bg-success-light dark:bg-success w-11 h-11 rounded-lg flex items-center justify-center">
                                            <IconShoppingCart />
                                        </div>
                                    </div>
                                    <h5 className="font-semibold text-2xl ltr:text-right rtl:text-left text-black dark:text-white-light">
                                        3,192
                                        <span className="block text-sm font-normal">Tổng số cộng tác viên</span>
                                    </h5>
                                </div>
                                <div className="bg-transparent rounded-lg overflow-hidden">
                                    {/* loader */}
                                    {loading ? (
                                        <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                            <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                        </div>
                                    ) : (
                                        <ReactApexChart series={totalOrders.series} options={totalOrders.options} type="area" height={290} />
                                    )}
                                </div>
                            </div>

                            <div className="panel h-full p-0">
                                <div className="flex items-center justify-between w-full p-5 absolute">
                                    <div className="relative">
                                        <div className="text-success dark:text-success-light bg-success-light dark:bg-success w-11 h-11 rounded-lg flex items-center justify-center">
                                            <IconShoppingCart />
                                        </div>
                                    </div>
                                    <h5 className="font-semibold text-2xl ltr:text-right rtl:text-left text-black dark:text-white-light">
                                        3,192
                                        <span className="block text-sm font-normal">Tổng số đơn thành công</span>
                                    </h5>
                                </div>
                                <div className="bg-transparent rounded-lg overflow-hidden">
                                    {/* loader */}
                                    {loading ? (
                                        <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                            <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                        </div>
                                    ) : (
                                        <ReactApexChart series={totalOrders.series} options={totalOrders.options} type="area" height={290} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel h-full">
                        <div className="flex items-center mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Đơn hàng theo loại sản phẩm</h5>
                        </div>
                        <div>
                            <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                                {loading ? (
                                    <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                    </div>
                                ) : (
                                    <ReactApexChart series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full p-0 lg:col-span-2">
                        <div className="flex items-start justify-between dark:text-white-light mb-5 p-5 border-b  border-white-light dark:border-[#1b2e4b]">
                            <h5 className="font-semibold text-lg ">Tổng số cộng tác viên và hoa hồng trong tháng</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">View</button>
                                        </li>
                                        <li>
                                            <button type="button">Update</button>
                                        </li>
                                        <li>
                                            <button type="button">Delete</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>

                        <ReactApexChart options={uniqueVisitorSeries.options} series={uniqueVisitorSeries.series} type="bar" height={360} className="overflow-hidden" />
                    </div>

                    <div className="panel h-full sm:col-span-2 xl:col-span-1 pb-0">
                        <h5 className="font-semibold text-lg dark:text-white-light mb-5">Nhật ký hoạt động của hệ thống</h5>
                        <PerfectScrollbar className="relative h-[320px] ltr:pr-3 rtl:pl-3 ltr:-mr-3 rtl:-ml-3 mb-4">
                            <div className="text-sm cursor-pointer">
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-primary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Updated Server Logs</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">Just Now</div>

                                    <span className="badge badge-outline-primary absolute ltr:right-0 rtl:left-0 text-xs bg-primary-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Pending
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-success w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Send Mail to HR and Admin</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">2 min ago</div>

                                    <span className="badge badge-outline-success absolute ltr:right-0 rtl:left-0 text-xs bg-success-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Completed
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-danger w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Backup Files EOD</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">14:00</div>

                                    <span className="badge badge-outline-danger absolute ltr:right-0 rtl:left-0 text-xs bg-danger-light dark:bg-black opacity-0 group-hover:opacity-100">Pending</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Collect documents from Sara</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">16:00</div>

                                    <span className="badge badge-outline-dark absolute ltr:right-0 rtl:left-0 text-xs bg-dark-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-warning w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Conference call with Marketing Manager.</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                    <span className="badge badge-outline-warning absolute ltr:right-0 rtl:left-0 text-xs bg-warning-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        In progress
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-info w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Rebooted Server</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                    <span className="badge badge-outline-info absolute ltr:right-0 rtl:left-0 text-xs bg-info-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-secondary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Send contract details to Freelancer</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">18:00</div>

                                    <span className="badge badge-outline-secondary absolute ltr:right-0 rtl:left-0 text-xs bg-secondary-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Pending
                                    </span>
                                </div>
                            </div>
                        </PerfectScrollbar>
                        <div className="border-t border-white-light dark:border-white/10">
                            <Link to="/" className=" font-semibold group hover:text-primary p-4 flex items-center justify-center group">
                                Xem tất cả hoạt động
                                <IconArrowLeft className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1" />
                            </Link>
                        </div>
                    </div>
                </div>


                <div className="grid xl:grid-cols-3 gap-6 mb-6">

                    <div className="panel h-full xl:col-span-2">
                        {/* statistics */}
                        <div className="flex justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg ">Statistics</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">This Week</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Week</button>
                                        </li>
                                        <li>
                                            <button type="button">This Month</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Month</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-8 text-sm text-[#515365] font-bold">
                            <div>
                                <div>
                                    <div>Total Visits</div>
                                    <div className="text-[#f8538d] text-lg">423,964</div>
                                </div>

                                <ReactApexChart series={totalVisit.series} options={totalVisit.options} type="line" height={100} className="overflow-hidden" />
                            </div>

                            <div>
                                <div>
                                    <div>Paid Visits</div>
                                    <div className="text-[#f8538d] text-lg">7,929</div>
                                </div>

                                <ReactApexChart series={paidVisit.series} options={paidVisit.options} type="line" height={100} className="overflow-hidden" />
                            </div>
                        </div>
                    </div>

                    <div className="panel h-full sm:col-span-2 xl:col-span-1 pb-0">
                        <h5 className="font-semibold text-lg dark:text-white-light mb-5">Cộng tác viên có hoa hồng cao nhất tháng</h5>
                        <PerfectScrollbar className="relative h-[160px] ltr:pr-3 rtl:pl-3 ltr:-mr-3 rtl:-ml-3 mb-4">
                            <div className="text-sm cursor-pointer">
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-primary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Updated Server Logs</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">Just Now</div>

                                    <span className="badge badge-outline-primary absolute ltr:right-0 rtl:left-0 text-xs bg-primary-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Pending
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-success w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Send Mail to HR and Admin</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">2 min ago</div>

                                    <span className="badge badge-outline-success absolute ltr:right-0 rtl:left-0 text-xs bg-success-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Completed
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-danger w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Backup Files EOD</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">14:00</div>

                                    <span className="badge badge-outline-danger absolute ltr:right-0 rtl:left-0 text-xs bg-danger-light dark:bg-black opacity-0 group-hover:opacity-100">Pending</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Collect documents from Sara</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">16:00</div>

                                    <span className="badge badge-outline-dark absolute ltr:right-0 rtl:left-0 text-xs bg-dark-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-warning w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Conference call with Marketing Manager.</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                    <span className="badge badge-outline-warning absolute ltr:right-0 rtl:left-0 text-xs bg-warning-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        In progress
                                    </span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-info w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Rebooted Server</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                    <span className="badge badge-outline-info absolute ltr:right-0 rtl:left-0 text-xs bg-info-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                                </div>
                                <div className="flex items-center py-1.5 relative group">
                                    <div className="bg-secondary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                    <div className="flex-1">Send contract details to Freelancer</div>
                                    <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">18:00</div>

                                    <span className="badge badge-outline-secondary absolute ltr:right-0 rtl:left-0 text-xs bg-secondary-light dark:bg-black opacity-0 group-hover:opacity-100">
                                        Pending
                                    </span>
                                </div>
                            </div>
                        </PerfectScrollbar>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Index;
