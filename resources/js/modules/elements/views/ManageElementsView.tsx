import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DefaultPageProps } from "@/types/page.d";
import { Parade } from "@/types/parade.d";
import BlocksSection from "../components/blocks/BlocksSection";
import { useManageElementsContext } from "../context/ManageElementsContext";
import SearchHeader from "@/Components/SearchHeader";
import ManageElementsActionsDialog from "../components/ManageElementsActionsDialog";
import { ElementType } from "@/types/element-type.d";

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
                <div>
                    <h3 className="font-semibold text-l text-gray-500 leading-tight">
                        {parade.name}
                    </h3>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Administrar elementos
                    </h2>
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
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
