import { ParadeFormData, Parade } from "@/types/parade.d";
import { useState } from "react";
import updateParadeService from "../services/updateParadeService";
import createParadeService from "../services/createParadeService";
import toast from "react-hot-toast";
import importParadeElementsService from "../services/importParadeElementsService";
import { ImportElement } from "@/types/element";
import { router } from "@inertiajs/react";

const useImportParadeElements = (parade: Parade) => {
    const [loading, setLoading] = useState<boolean>(false);

    const refreshData = () =>
        router.get(
            route(route().current(), { id: parade.id }),
            {},
            {
                replace: true,
                preserveState: true,
                preserveScroll: true,
            }
        );

    const importElements = async (file: File) => {
        setLoading(true);

        const promise = importParadeElementsService(parade.id!, file);

        toast
            .promise(
                promise,
                {
                    loading: `Importando datos...`,
                    success: (data: ImportElement[]) =>
                        `Se crearon o actualizaron ${data.length} registros correctamente`,
                    error: (err: any) => `hubo un error: ${err.toString()}`,
                },
                {
                    success: {
                        icon: "🔥",
                    },
                }
            )
            .then(() => {
                refreshData();
            })
            .catch((error) => {
                console.error({ error });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { importElements, loading };
};

export default useImportParadeElements;
