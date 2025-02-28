import { Parade } from "@/types/parade.d";
import ParadeCard from "./ParadeCard";

export type ParadesListProps = {
    parades: Parade[];
    onDelete: (parade: Parade) => void;
    onEdit: (parade: Parade) => void;
    onManageElements: (id: number) => void;
    onControlParade: (id: number) => void;
    onAnalisysParade: (id: number) => void;
};

export default function ParadesList(props: ParadesListProps) {
    const {
        parades,
        onControlParade,
        onAnalisysParade,
        onEdit,
        onManageElements,
    } = props;

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-4 w-full">
            <div className="text-gray-900  shadow-sm sm:rounded-lg">
                <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(335px,1fr))]">
                    {parades.length === 0 && (
                        <div className="px-4 py-4 text-center w-full">
                            No se encontraron desfiles
                        </div>
                    )}
                    {parades.map((parade, i) => (
                        <ParadeCard
                            key={i}
                            parade={parade}
                            onControlParade={onControlParade}
                            onAnalisysParade={onAnalisysParade}
                            onEdit={onEdit}
                            onManageElements={onManageElements}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
