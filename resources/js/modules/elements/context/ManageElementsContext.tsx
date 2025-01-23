import { createContext, FC, PropsWithChildren, useContext } from "react";
import useManageBlocks, {
    defaultUseManageBlocks,
} from "../hooks/blocks/useManageBlocks";
import useManageElements, {
    defaultUseManageElements,
} from "../hooks/elements/useManageElements";
import { defaultParade, Parade } from "@/types/parade.d";
import { ManageElementsViewProps } from "../views/ManageElementsView";

type ManageElementContextType = ReturnType<typeof useManageElements> &
    ReturnType<typeof useManageBlocks> &
    ManageElementsViewProps;

const ManageElementsContext = createContext<ManageElementContextType>({
    ...defaultUseManageBlocks,
    ...defaultUseManageElements,
    parade: defaultParade,
    elementTypes: [],
});

export type ReorderType = "down" | "up";

type ManageElementsProviderProps = PropsWithChildren<ManageElementsViewProps>;

export const ManageElementsProvider: FC<ManageElementsProviderProps> = ({
    children,
    parade,
    elementTypes,
}) => {
    const manageBlocks = useManageBlocks(parade);
    const manageElements = useManageElements({ ...manageBlocks, parade });

    return (
        <ManageElementsContext.Provider
            value={{ ...manageBlocks, ...manageElements, parade, elementTypes }}
        >
            {children}
        </ManageElementsContext.Provider>
    );
};

export const useManageElementsContext = () => useContext(ManageElementsContext);
