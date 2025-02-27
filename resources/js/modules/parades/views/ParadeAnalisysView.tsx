import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DefaultPageProps } from "@/types/page.d";
import { Parade, ParadeAnalisysElement } from "@/types/parade.d";
import IndicatorLabel from "@/modules/elements/components/IndicatorLabel";
import { MdOutlinePerson } from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { fromMinutesToHours } from "@/utils/transformers/fromMinutesToHours";
import { LuTimer } from "react-icons/lu";
import ParadeElementCard from "../components/elements/ParadeElementCard";
import useManageParadeAnalisys from "../hooks/useManageParadeAnalisys";

export type ParadeAnalisysViewProps = {
    parade: Parade;
    elements: ParadeAnalisysElement[];
} & DefaultPageProps;

export default function ParadeAnalisysView(props: ParadeAnalisysViewProps) {
    // useManageParadeAnalisys
    const {
        selectedElement,
        setElement,
        loadingPoles,
        elementsContainerRef,
        scrollToElement,
        onCloseElement,
    } = useManageParadeAnalisys(props.parade);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            header={
                <div className="flex justify-between items-center  md:flex-row flex-col max-w-full truncate">
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
                                Analisys de desfile
                            </h3>
                            <h2 className="select-none font-semibold text-xl text-primary leading-tight">
                                {props.parade.name}
                            </h2>
                        </section>
                    </div>
                    <div className="flex gap-6 justify-end items-center w-full mt-3">
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
            <Head title="Analisys de desfile" />
            <div className="max-w-[97%] mx-auto sm:px-6 lg:px-8 mt-6 relative flex gap-4">
                <div
                    className={`${
                        selectedElement != null ? "hidden" : "flex"
                    } text-gray-900 sm:flex flex-col gap-4 w-full sm:w-[50%] with-controled-scroll overflow-y-auto`}
                    ref={elementsContainerRef}
                >
                    {props.elements
                        .sort((a, b) => {
                            if (a.order < b.order) return 1;
                            if (a.order > b.order) return -1;
                            return 0;
                        })
                        .map((element, i) => (
                            <ParadeElementCard
                                key={i}
                                isSelected={selectedElement?.id === element.id}
                                element={element}
                                onClick={setElement}
                            />
                        ))}
                </div>
                <div
                    className={` ${
                        selectedElement != null ? "flex" : "hidden"
                    } sm:flex text-gray-900 flex-col w-full sm:w-[50%] gap-4`}
                >
                    {selectedElement && (
                        <ParadeElementCard
                            onClose={onCloseElement}
                            isSelected
                            element={selectedElement}
                            poles
                            loadingPoles={loadingPoles}
                            onClick={(element) => scrollToElement(element.id)}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
