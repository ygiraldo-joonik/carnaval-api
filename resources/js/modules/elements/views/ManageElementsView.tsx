import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaChevronDown } from "react-icons/fa6";
import { HiOutlineLocationMarker, HiLocationMarker } from "react-icons/hi";
import { DefaultPageProps } from "@/types/page.d";
import { Parade } from "@/types/parade.d";
import BlocksSection from "../components/blocks/BlocksSection";
import { useManageElementsContext } from "../context/ManageElementsContext";
import SearchHeader from "@/Components/SearchHeader";
import ManageElementsActionsDialog from "../components/ManageElementsActionsDialog";
import { ElementType } from "@/types/element-type.d";
import IndicatorLabel from "../components/IndicatorLabel";
import { MdOutlinePerson } from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { LuTimer } from "react-icons/lu";
import { fromMinutesToHours } from "@/utils/transformers/fromMinutesToHours";

export type ManageElementsViewProps = {
    parade: Parade;
    elementTypes: ElementType[];
};

export type ManageElementsPageProps = ManageElementsViewProps &
    DefaultPageProps;

export default function ManageElementsView(props: ManageElementsPageProps) {
    console.log({ props });
    const { parade, filterBlocks, onCreateBlock } = useManageElementsContext();

    const handleToggleDescription = () => {
        const description = document.querySelector(
            ".description p"
        ) as HTMLElement;
        const chevron = document.querySelector(".chevron") as HTMLElement;
        if (description.classList.contains("line-clamp-1")) {
            description.classList.remove("line-clamp-1");
            chevron.style.transform = "rotate(180deg)";
        } else {
            description.classList.add("line-clamp-1");
            chevron.style.transform = "rotate(0deg)";
        }
    };
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
                        <div
                            onClick={handleToggleDescription}
                            className="rounded-full bg-white hover:bg-gray-200 text-black cursor-pointer flex items-center justify-center"
                            style={{ width: 30, height: 30 }}
                        >
                            <FaChevronDown className="chevron" />
                        </div>
                        <section>
                            <h3 className="select-none font-semibold text-l text-primary leading-tight">
                                Administrar elementos
                            </h3>
                            <h2 className="select-none font-semibold text-xl text-primary leading-tight">
                                {parade.name}
                            </h2>

                            <div className="flex gap-4 items-center my-3 text-primary">
                                <div className="flex items-center gap-1">
                                    <HiOutlineLocationMarker className="mr-1" />{" "}
                                    <strong>Inicio: </strong>{" "}
                                    {parade.start_location}{" "}
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <div className="flex items-center gap-1">
                                    <HiLocationMarker className="mr-1" />{" "}
                                    <strong>Final: </strong>{" "}
                                    {parade.end_location}
                                </div>
                            </div>

                            <div className="text-primary description">
                                <strong>Descripción</strong>
                                <p className="line-clamp-1">
                                    {parade.description}
                                </p>
                            </div>
                        </section>
                    </div>
                    <div className="flex gap-6">
                        <IndicatorLabel
                            value={parade.people_count}
                            Icon={MdOutlinePerson}
                        />
                        <IndicatorLabel
                            value={`${parade.elements_length}m`}
                            Icon={AiOutlineColumnWidth}
                        />

                        <IndicatorLabel
                            // value={`${parade.distance}m - ${calcParadeSpeed(
                            //     parade,
                            //     true
                            // )}
                            // km/h`}
                            value={fromMinutesToHours(parade.total_duration)}
                            Icon={LuTimer}
                            background="accent2"
                            color="white"
                            fixedWidth={false}
                        />
                    </div>
                </div>
            }
        >
            <Head title={`Administrar elementos: ${parade.name}`} />

            <ManageElementsActionsDialog />

            <div className="py-6">
                <SearchHeader
                    onSearch={filterBlocks}
                    rightContent={
                        <button
                            onClick={() => onCreateBlock()}
                            className="btn-primary text-white font-bold py-2 px-4 rounded"
                        >
                            Crear Bloque
                        </button>
                    }
                />

                {parade.blocks && <BlocksSection />}
            </div>
        </AuthenticatedLayout>
    );
}
