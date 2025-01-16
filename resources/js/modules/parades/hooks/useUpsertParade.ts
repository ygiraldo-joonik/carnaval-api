import { ParadeFormData, Parade } from "@/types/parade";
import { useState } from "react";
import updateParadeService from "../services/updateParadeService";
import createParadeService from "../services/createParadeService";
import toast from "react-hot-toast";

const useUpsertParade = (onSuccess: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);

    const upsertParade = async (parade: ParadeFormData) => {
        setLoading(true);
        try {
            let promise: Promise<Parade>;
            if (parade.id) {
                promise = updateParadeService(parade);
            } else {
                promise = createParadeService(parade);
            }

            toast
                .promise(
                    promise,
                    {
                        loading: `${parade.id ? "Editando" : "Creando"}...`,
                        success: () =>
                            `Se ${
                                parade.id ? "edito" : "creo"
                            } el tipo de elemento ${parade.name}`,
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
        } catch (error) {
            setLoading(false);
            console.error({ error });
        }
    };

    return { upsertParade, loading };
};

export default useUpsertParade;
