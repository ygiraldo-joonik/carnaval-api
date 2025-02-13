import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DefaultPageProps } from "@/types/page.d";
import { Parade, ParadeControlDataType } from "@/types/parade.d";
import Tabs from "../../../Components/Tabs";
import ParadeControlTable from "../components/ParadeControlTable";
import IndicatorLabel from "@/modules/elements/components/IndicatorLabel";
import { MdOutlinePerson } from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { fromMinutesToHours } from "@/utils/transformers/fromMinutesToHours";
import { LuTimer } from "react-icons/lu";
import ImportParadeElements from "../components/ImportParadeElemetsPassed";
import useImportParadeElements from "../hooks/useImportParadeElements";
export type ParadeControlViewProps = {
    parade: Parade;
    distance: ParadeControlDataType;
} & DefaultPageProps;

export default function ManageParadesView(props: ParadeControlViewProps) {
    const { loading, importElements } = useImportParadeElements(props.parade);
    return (
        <AuthenticatedLayout
            auth={props.auth}
            header={
                <div className="flex justify-between items-start">
                    <div
                        style={{
                            display: "grid",
                            gap: 30,
                            gridTemplateColumns: "max-content 1fr",
                            transition: "all 0.3s",
                        }}
                    >
                        <section>
                            <h3 className="select-none font-semibold text-l text-primary leading-tight">
                                Control de desfile
                            </h3>
                            <h2 className="select-none font-semibold text-xl text-primary leading-tight">
                                {props.parade.name}
                            </h2>
                        </section>
                    </div>
                    <div className="flex gap-6">
                        <IndicatorLabel
                            value={props.parade.people_count}
                            Icon={MdOutlinePerson}
                        />
                        <IndicatorLabel
                            value={`${props.parade.elements_length}m`}
                            Icon={AiOutlineColumnWidth}
                        />

                        <IndicatorLabel
                            value={fromMinutesToHours(
                                props.parade.total_duration
                            )}
                            Icon={LuTimer}
                            background="accent2"
                            color="white"
                            fixedWidth={false}
                        />
                    </div>
                </div>
            }
        >
            <Head title="Control de desfile" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                <div className="text-gray-900 ">
                    {props.distance.isThereData ? (
                        <div className=" relative sm:rounded-lg">
                            <Tabs
                                right={
                                    <ImportParadeElements
                                        loading={loading}
                                        onFileUpload={importElements}
                                    />
                                }
                                tabs={{
                                    "Distancia al primero": (
                                        <ParadeControlTable
                                            dataset={
                                                props.distance.distanceFromFirst
                                            }
                                            entities={props.distance.entities}
                                        />
                                    ),
                                    "Distancia al anterior": (
                                        <ParadeControlTable
                                            dataset={
                                                props.distance
                                                    .distanceFromPrevious
                                            }
                                            entities={props.distance.entities}
                                        />
                                    ),
                                }}
                            />
                        </div>
                    ) : (
                        <div className="p-4 text-center">
                            No se encontraron resultados
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
