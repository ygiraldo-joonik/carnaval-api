import { Block, Element, ElementFormData } from "@/types/element.d";
import updateElementService from "../../services/elements/updateElementService";
import createElementService from "../../services/elements/createElementService";
import { useState } from "react";
import toast from "react-hot-toast";

const useUpsertElement = (block: Block, onSuccess: () => void) => {
    const [loading, setLoading] = useState(false);

    const upsertElement = (elementData: ElementFormData) => {
        setLoading(true);

        let promise: Promise<Element>;

        if (elementData.id) {
            promise = updateElementService(elementData);
        } else {
            promise = createElementService({
                ...elementData,
                block_id: block.id,
            });
        }

        toast
            .promise(
                promise,
                {
                    loading: `${elementData.id ? "Editando" : "Creando"}...`,
                    success: () =>
                        `Se ${elementData.id ? "edito" : "creo"} el elemento ${
                            elementData.name
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

    return { loading, upsertElement };
};

export default useUpsertElement;
