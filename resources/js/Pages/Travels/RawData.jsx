
import { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import Flatpickr from "react-flatpickr";
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DownloadIcon from '@/Components/Icons/DownloadIcon';
import TravelsRawData from './Partials/TravelsRawDataTable';
import CloseIcon from '@/Components/Icons/CloseIcon';
import axios from 'axios';
import download from 'downloadjs';
import NoDataFound from '@/Components/NoDataFound';

export default function RawData(props) {
    const { travels_paginated, date: d = null } = props;
    const { data: travels, current_page, last_page } = travels_paginated;

    const [date, setDate] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [downloading, setDownloading] = useState(false);

    const pickerRef = useRef(null);

    const onPageChange = (page, d) =>
        router.get(
            route(route().current()),
            {
                page,
                ...d && { date: dayjs(d).format('YYYY-MM-DD') }
            },
            {
                preserveState: true,
                replace: true,
            }
        );

    const onClearDate = () => {
        setDate(null);

        onPageChange(current_page, null)

        if (pickerRef?.current?.flatpickr)
            pickerRef.current.flatpickr.clear();
    }

    const onDownload = () => {
        setProgress(0)
        setDownloading(true);

        axios.get(
            route(
                'travels.raw-data.download',
                {
                    ...date && { date: dayjs(date).format('YYYY-MM-DD') }

                }
            ),
            {
                responseType: 'blob',
                onDownloadProgress: (progressEvent) => {
                    let percentCompleted = Math.round(progressEvent.loaded * 100 /
                        progressEvent.total);
                    setProgress(percentCompleted); // Update progress state
                },
            }
        ).then(response => {
            const fileName = date ? `travels-${dayjs(date).format('YYYY-MM-DD')}.csv` : 'travels.csv';

            download(response.data, fileName, 'text/csv');
        }).finally(() => {
            setDownloading(false);
            setProgress(0);
        });


    }

    useEffect(() => {
        if (date !== undefined)
            onPageChange(current_page, date)
    }, [date])

    useEffect(() => {
        if (d) {
            pickerRef.current.flatpickr.setDate(d);
            setDate(dayjs(d).toDate());
        }
    }, [d])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Raw Data</h2>}
        >
            <Head title="Raw Data" />

            <div className="py-12">

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="pb-5 flex justify-between w-full">
                        <div className="flex">
                            <Flatpickr
                                ref={pickerRef}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={([date]) => {
                                    setDate(date);
                                }}
                                placeholder="Select Date"
                            />

                            {date && <button
                                type="button"
                                onClick={onClearDate}
                                className="-ml-8"
                            >
                                <CloseIcon />
                            </button>}

                        </div>

                        <button
                            disabled={downloading}
                            className="flex justify-center items-center p-2 bg-blue-500 text-white sm:rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onClick={onDownload}
                        >
                            Download &nbsp; <DownloadIcon />
                        </button>
                    </div>

                    <div className="relative overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">

                                <div className="inline-block py-2 min-w-full align-middle sm:px-6 lg:px-8">

                                    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                                        {
                                            travels.length ?
                                                <TravelsRawData travels={travels} />
                                                : <NoDataFound />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute z-10 bg-red-300 h-1 top-0 transition-all" style={{ with: `${progress}%` }}></div>

                    </div>
                </div>
            </div>


            <Pagination currentPage={current_page} totalPages={last_page} onPageChange={(page) => onPageChange(page, date)} />
        </AuthenticatedLayout>
    );
}

