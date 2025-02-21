import { ParadeFormData, Parade } from "@/types/parade.d";
import { useState } from "react";
import toast from "react-hot-toast";
import { Block, ImportElement } from "@/types/element";
import { router } from "@inertiajs/react";
import bulkCreateElementsService from "../../services/elements/bulkCreateElementsService";

const useBulkCreateElements = (block: Block, onSuccess: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);

    const refreshData = () =>
        router.get(
            route(route().current(), { id: block.parade_id }),
            {},
            {
                replace: true,
                preserveState: true,
                preserveScroll: true,
            }
        );

    const bulkCreateElements = async (file: File) => {
        setLoading(true);

        const promise = bulkCreateElementsService(block.id!, file);

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
                onSuccess();
            })
            .catch((error) => {
                console.error({ error });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { bulkCreateElements, loading };
};

export default useBulkCreateElements;
