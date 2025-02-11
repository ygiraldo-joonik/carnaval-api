import { useEffect, useState } from "react";
import { ManageParadesViewProps } from "../views/ManageParadesView";
import { defaultParade, Parade } from "@/types/parade.d";
import { router } from "@inertiajs/react";
import useUpsertParade from "./useUpsertParade";
import useDeleteParade from "./useDeleteParade";

const useManageParades = (props: ManageParadesViewProps) => {
    const [parades, setParades] = useState<Parade[]>(props.parades);

    const [openParadeModal, setOpenParadeModal] = useState<boolean>(false);

    const [openDeleteParadeModal, setOpenDeleteParadeModal] =
        useState<boolean>(false);

    const [parade, setParade] = useState<Parade>(defaultParade);

    const filterParades = (search: string) => {
        if (search === "") {
            setParades(props.parades);
        } else {
            setParades(
                props.parades.filter(
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
        setOpenParadeModal(false);
        setTimeout(() => setParade(defaultParade), 500);
    };

    const handleDeleteModalClose = () => {
        setOpenDeleteParadeModal(false);
        // setTimeout(() => setParade(defaultParade), 500);
    };

    const onEditParade = (selectedParade: Parade) => {
        setParade(selectedParade);
        setOpenParadeModal(true);
    };

    const onDeleteParade = (selectedParade: Parade) => {
        setParade(selectedParade);
        setOpenDeleteParadeModal(true);
    };

    const onCreateParade = () => {
        setParade(defaultParade);
        setOpenParadeModal(true);
    };

    const onManageParadeElements = (id: number) =>
        router.get(route("parades.elements", { id }));

    const onControlParade = (id: number) =>
        router.get(route("parades.control", { id }));

    const refreshParades = () =>
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
        refreshParades();
    };

    const onDeleteSuccess = () => {
        handleDeleteModalClose();
        refreshParades();
        handleUpserModalClose();
    };

    const { loading: loadingForm, upsertParade } =
        useUpsertParade(onUpsertSuccess);

    const { loading: loadingDelete, deleteParade } =
        useDeleteParade(onDeleteSuccess);

    useEffect(() => {
        setParades(props.parades);
    }, [props.parades]);

    return {
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
        onManageParadeElements,
        onControlParade,
        onUpsertSuccess,
        onDeleteSuccess,
        loadingForm,
        upsertParade,
        loadingDelete,
        deleteParade,
    };
};

export default useManageParades;
