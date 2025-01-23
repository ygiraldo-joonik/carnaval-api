import { Block, BlockFormData } from "@/types/element.d";
import updateBlockService from "../../services/blocks/updateBlockService";
import createBlockService from "../../services/blocks/createBlockService";
import { useState } from "react";
import { Parade } from "@/types/parade.d";
import toast from "react-hot-toast";
import updateBlocksOrderService, {
    BlockOrder,
} from "../../services/blocks/updateBlocksOrderService";

const useUpdateBlocksOrder = (parade: Parade, onSuccess: () => void) => {
    const [loading, setLoading] = useState(false);

    const updateBlocksOrder = (blocks: Block[]): void => {
        setLoading(true);

        const [firstBlock, secondBlock] = blocks;

        const promise = updateBlocksOrderService({
            parade_id: parade.id!,
            blocks: [
                { id: firstBlock.id, order: secondBlock.order },
                { id: secondBlock.id, order: firstBlock.order },
            ],
        });

        toast
            .promise(
                promise,
                {
                    loading: "Editando",
                    success: () => `Se edito el orden de los bloques`,
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

    return { loading, updateBlocksOrder };
};

export default useUpdateBlocksOrder;
