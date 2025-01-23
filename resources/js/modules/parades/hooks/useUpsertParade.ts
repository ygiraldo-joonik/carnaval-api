import { ParadeFormData, Parade } from "@/types/parade.d";
import { useState } from "react";
import updateParadeService from "../services/updateParadeService";
import createParadeService from "../services/createParadeService";
import toast from "react-hot-toast";

const useUpsertParade = (onSuccess: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);

    const upsertParade = async (parade: ParadeFormData) => {
        setLoading(true);

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
                        `Se ${parade.id ? "edito" : "creo"} el desfile ${
                            parade.name
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

    return { upsertParade, loading };
};

export default useUpsertParade;
