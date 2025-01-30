import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ElementType } from "@/types/element-type.d";
import { DefaultPageProps } from "@/types/page.d";
import SearchHeader from "@/Components/SearchHeader";
import ElementTypesTable from "../components/ElementTypesTable";
import useManageElementTypes from "../hooks/useManageElementTypes";
import ElementTypeFormModal from "../components/ElementTypeFormModal";
import DeleteElementTypeDialog from "../components/DeleteElementTypeDialog";

export type ManageElementTypesViewProps = {
    elementTypes: ElementType[];
} & DefaultPageProps;

export default function ManageElementTypesView(
    props: ManageElementTypesViewProps
) {
    const {
        elementTypes,
        elementType,
        openElementTypeModal,
        openDeleteElementTypeModal,
        filterElementTypes,
        handleUpserModalClose,
        handleDeleteModalClose,
        onEditElementType,
        onDeleteElementType,
        onCreateElementType,
        upsertElementType,
        deleteElementType,
        loadingDelete,
        loadingForm,
    } = useManageElementTypes(props);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tipos de elemento
                </h2>
            }
        >
            <Head title="Administrar tipos de elemento" />

            {/* Edit Or Create Element Type Modal */}
            <ElementTypeFormModal
                show={openElementTypeModal}
                onClose={() => handleUpserModalClose()}
                elementType={elementType}
                loading={loadingForm}
                upsertElementType={upsertElementType}
            />

            {/* Delete Element Type Modal */}
            <DeleteElementTypeDialog
                show={openDeleteElementTypeModal}
                elementType={elementType}
                onClose={handleDeleteModalClose}
                loading={loadingDelete}
                deleteElementType={deleteElementType}
            />

            <div className="py-6">
                <SearchHeader
                    onSearch={filterElementTypes}
                    rightContent={
                        <button
                            onClick={() => onCreateElementType()}
                            className="btn-primary font-bold py-2 px-4 rounded"
                        >
                            Crear tipo de elemento
                        </button>
                    }
                />
                <ElementTypesTable
                    elementTypes={elementTypes}
                    onEdit={(selectedElementType) =>
                        onEditElementType(selectedElementType)
                    }
                    onDelete={(selectedElementType) =>
                        onDeleteElementType(selectedElementType)
                    }
                />
            </div>
        </AuthenticatedLayout>
    );
}
