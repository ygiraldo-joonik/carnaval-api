import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { ManageElementTypesViewProps } from "../views/ManageElementTypesView";
import useUpsertElementType from "./useUpsertElementType";
import useDeleteElementType from "./useDeleteElementType";
import { ElementType, defaultElementType } from "@/types/element-type.d";

export default function useManageElementTypes(
    props: ManageElementTypesViewProps
) {
    const [elementTypes, setElementTypes] = useState<ElementType[]>(
        props.elementTypes
    );

    const [openElementTypeModal, setOpenElementTypeModal] =
        useState<boolean>(false);

    const [openDeleteElementTypeModal, setOpenDeleteElementTypeModal] =
        useState<boolean>(false);

    const [elementType, setElementType] =
        useState<ElementType>(defaultElementType);

    const filterElementTypes = (search: string) => {
        if (search === "") {
            setElementTypes(props.elementTypes);
        } else {
            setElementTypes(
                props.elementTypes.filter(
                    (item) =>
                        item.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.description
                            ?.toLowerCase()
                            .includes(search.toLowerCase())
                )
            );
        }
    };

    const handleUpserModalClose = () => {
        setOpenElementTypeModal(false);
        setTimeout(() => setElementType(defaultElementType), 500);
    };

    const handleDeleteModalClose = () => {
        setOpenDeleteElementTypeModal(false);
        setTimeout(() => setElementType(defaultElementType), 500);
    };

    const onEditElementType = (selectedElementType: ElementType) => {
        setElementType(selectedElementType);
        setOpenElementTypeModal(true);
    };

    const onDeleteElementType = (selectedElementType: ElementType) => {
        setElementType(selectedElementType);
        setOpenDeleteElementTypeModal(true);
    };

    const onCreateElementType = () => {
        setElementType(defaultElementType);
        setOpenElementTypeModal(true);
    };

    const refreshElementTypes = () =>
        router.get(
            route(route().current()),
            {},
            {
                preserveState: true,
                replace: true,
            }
        );

    const onUpsertSuccess = () => {
        handleUpserModalClose();

        refreshElementTypes();
    };

    const onDeleteSuccess = () => {
        handleDeleteModalClose();
        refreshElementTypes();
    };

    const { loading: loadingForm, upsertElementType } =
        useUpsertElementType(onUpsertSuccess);

    const { loading: loadingDelete, deleteElementType } =
        useDeleteElementType(onDeleteSuccess);

    useEffect(() => {
        setElementTypes(props.elementTypes);
    }, [props.elementTypes]);

    return {
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
    };
}
