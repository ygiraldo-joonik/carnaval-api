import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DefaultPageProps } from "@/types/page.d";
import { Parade } from "@/types/parade.d";
import BlocksSection from "../components/blocks/BlocksSection";
import { useManageElementsContext } from "../context/ManageElementsContext";
import SearchHeader from "@/Components/SearchHeader";
import ManageElementsActionsDialog from "../components/ManageElementsActionsDialog";
import { ElementType } from "@/types/element-type.d";
import { countParadePeople } from "../transformers/countPeople";
import { calcParadeLength } from "../transformers/calcLength";
import { calcParadeSpeed } from "../transformers/calcSpeed";
import IndicatorLabel from "../components/IndicatorLabel";
import { MdOutlinePerson } from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { LuTimer } from "react-icons/lu";

export type ManageElementsViewProps = {
    parade: Parade;
    elementTypes: ElementType[];
};

export type ManageElementsPageProps = ManageElementsViewProps &
    DefaultPageProps;

export default function ManageElementsView(props: ManageElementsPageProps) {
    const { parade, filterBlocks, onCreateBlock } = useManageElementsContext();
    return (
        <AuthenticatedLayout
            auth={props.auth}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold text-l text-gray-800 leading-tight">
                            Administrar elementos
                        </h3>
                        <h2 className="font-semibold text-xl text-gray-500 leading-tight">
                            {parade.name}
                        </h2>
                    </div>
                    <div className="flex gap-6">
                        <IndicatorLabel
                            value={countParadePeople(parade)}
                            Icon={MdOutlinePerson}
                        />
                        <IndicatorLabel
                            value={`${calcParadeLength(parade)}m`}
                            Icon={AiOutlineColumnWidth}
                        />

                        <IndicatorLabel
                            value={`${parade.distance}m - ${calcParadeSpeed(
                                parade,
                                true
                            )}
                            km/h`}
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
