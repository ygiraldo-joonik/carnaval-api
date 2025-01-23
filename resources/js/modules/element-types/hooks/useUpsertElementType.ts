import { ElementTypeFormData, ElementType } from "@/types/element-type.d";
import { useState } from "react";
import updateElementTypeService from "../services/updateElementTypeService";
import createElementTypeService from "../services/createElementTypeService";
import toast from "react-hot-toast";

const useUpsertElementType = (onSuccess: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);

    const upsertElementType = async (elementType: ElementTypeFormData) => {
        setLoading(true);
        let promise: Promise<ElementType>;

        if (elementType.id) {
            promise = updateElementTypeService(elementType);
        } else {
            promise = createElementTypeService(elementType);
        }

        toast
            .promise(
                promise,
                {
                    loading: `${elementType.id ? "Editando" : "Creando"}...`,
                    success: () =>
                        `Se ${elementType.id ? "edito" : "creo"} el desfile ${
                            elementType.name
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

    return { upsertElementType, loading };
};

export default useUpsertElementType;
