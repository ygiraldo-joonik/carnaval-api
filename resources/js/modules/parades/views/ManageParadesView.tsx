import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DefaultPageProps } from "@/types/page";
import SearchHeader from "@/Components/SearchHeader";
import { Parade } from "@/types/parade";
import useManageParades from "../hooks/useManageParades";
import ParadesTable from "../components/ParadesTable";
import ParadeFormModal from "../components/ParadeFormModal";
import DeleteParadeDialog from "../components/DeleteParadeDailog";

export type ManageParadesViewProps = {
    parades: Parade[];
} & DefaultPageProps;

export default function ManageParadesView(props: ManageParadesViewProps) {
    const {
        parades,
        parade,
        openParadeModal,
        openDeleteParadeModal,
        filterParades,
        handleUpserModalClose,
        handleDeleteModalClose,
        onEditParade,
        onDeleteParade,
        onCreateParade,
        loadingForm,
        upsertParade,
        loadingDelete,
        deleteParade,
    } = useManageParades(props);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Desfiles
                </h2>
            }
        >
            <Head title="Administrar desfiles" />

            {/* Edit Or Create Element Type Modal */}
            <ParadeFormModal
                show={openParadeModal}
                onClose={() => handleUpserModalClose()}
                parade={parade}
                loading={loadingForm}
                upsertParade={upsertParade}
            />

            {/* Delete Element Type Modal */}
            <DeleteParadeDialog
                show={openDeleteParadeModal}
                parade={parade}
                onClose={handleDeleteModalClose}
                loading={loadingDelete}
                deleteParade={deleteParade}
            />

            <div className="py-12">
                <SearchHeader
                    onSearch={filterParades}
                    rightContent={
                        <button
                            onClick={() => onCreateParade()}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Crear desfile
                        </button>
                    }
                />
                <ParadesTable
                    parades={parades}
                    onEdit={(selectedParade) => onEditParade(selectedParade)}
                    onDelete={(selectedParade) =>
                        onDeleteParade(selectedParade)
                    }
                />
            </div>
        </AuthenticatedLayout>
    );
}
