import { Block, BlockFormData } from "@/types/element.d";
import updateBlockService from "../../services/blocks/updateBlockService";
import createBlockService from "../../services/blocks/createBlockService";
import { useState } from "react";
import { Parade } from "@/types/parade.d";
import toast from "react-hot-toast";

const useUpsertBlock = (parade: Parade, onSuccess: () => void) => {
    const [loading, setLoading] = useState(false);

    const upsertBlock = (blockData: BlockFormData): void => {
        setLoading(true);

        let promise: Promise<Block>;

        if (blockData.id) {
            promise = updateBlockService(blockData);
        } else {
            promise = createBlockService({
                ...blockData,
                parade_id: parade.id,
            });
        }

        toast
            .promise(
                promise,
                {
                    loading: `${blockData.id ? "Editando" : "Creando"}...`,
                    success: () =>
                        `Se ${blockData.id ? "edito" : "creo"} el bloque ${
                            blockData.name
                        }`,
                    error: (err: any) => `hubo un error: ${err.toString()}`,
                },
                {
                    success: {
                        icon: "🔥",
                    },
                }
            )
            .then(() => {
                onSuccess();
            })
            .catch((error) => {
                console.error({ error });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { loading, upsertBlock };
};

export default useUpsertBlock;
