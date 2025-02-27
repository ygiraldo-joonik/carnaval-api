import { Parade, ParadeAnalisysElement } from "@/types/parade";
import { useRef, useState } from "react";
import getElementPolesService from "../services/getElementPolesService";
import { calcBlockLength } from "../../elements/transformers/calcLength";

const useManageParadeAnalisys = (parade: Parade) => {
    const elementsContainerRef = useRef<HTMLDivElement | null>(null);
    const [loadingPoles, setLoadingPoles] = useState<boolean>(false);
    const [selectedElement, setSelectedElement] =
        useState<ParadeAnalisysElement | null>(null);

    const setElement = async (element: ParadeAnalisysElement) => {
        if (loadingPoles) {
            return;
        }

        setSelectedElement({ ...element, poles: [] });

        setLoadingPoles(true);

        getElementPolesService(parade.id!, element.id)
            .then(({ poles, elementId }) => {
                if (element?.id !== elementId) return;

                setSelectedElement({ ...element, poles });
                setLoadingPoles(false);
            })
            .catch((error) => {
                setLoadingPoles(false);
                console.error(error);
            })
            .finally(() => {
                setLoadingPoles(false);
            });
    };

    const onCloseElement = () => {
        setSelectedElement(null);
    };

    const scrollToElement = (elementId: number) => {
        if (elementsContainerRef.current) {
            const element = document.getElementById(`element-${elementId}`);
            if (element) {
                elementsContainerRef.current.scrollTo({
                    top: element.offsetTop - 50,
                    behavior: "smooth",
                });
            }
        }
    };

    return {
        selectedElement,
        setElement,
        loadingPoles,
        elementsContainerRef,
        scrollToElement,
        onCloseElement,
    };
};

export default useManageParadeAnalisys;
