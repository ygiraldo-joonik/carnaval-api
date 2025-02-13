import { ParadeControlDataSet, ParadeControlEntities } from "@/types/parade";
import { formatSeconds } from "@/utils/transformers/fromMinutesToHours";
import truncateText from "@/utils/transformers/truncateText";
import { TbClockX, TbClockExclamation, TbClockCheck } from "react-icons/tb";

type ParadeControlTableProps = {
    dataset: ParadeControlDataSet;
    entities: ParadeControlEntities;
    acummulated?: boolean;
};
const ParadeControlTable = ({
    entities,
    dataset,
    acummulated = false,
}: ParadeControlTableProps) => {
    return (
        <div className="overflow-hidden rounded-lg">
            <div className="sticky-header-table-container control overflow-x-auto relative">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th
                                rowSpan={2}
                                className="px-4 text-left font-medium text-gray-700 bg-accent"
                            >
                                <p className="min-w-[180px]">Elemento</p>
                            </th>
                            <th
                                rowSpan={2}
                                className="px-4 text-center font-medium text-gray-700 bg-accent"
                            >
                                <p className="max-w-[100px]">
                                    Duración Estimada
                                </p>
                            </th>
                            <th
                                colSpan={Object.values(entities.users).length}
                                className="px-4 text-center font-medium text-gray-700 bg-accent"
                            >
                                Postes
                            </th>
                        </tr>
                        <tr>
                            {Object.values(entities.users).map(
                                (UserName, i) => (
                                    <th
                                        key={i}
                                        className="px-4 text-center font-medium text-gray-700 bg-accent"
                                    >
                                        {UserName}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(entities.elements)
                            .sort()
                            .map(
                                (elementId) =>
                                    dataset[+elementId] !== undefined && (
                                        <tr
                                            className="border-t"
                                            key={elementId}
                                        >
                                            <td className="px-4 bg-white">
                                                <small className="text-gray-500">
                                                    {truncateText(
                                                        entities.elements[
                                                            +elementId
                                                        ].block,
                                                        30
                                                    )}
                                                </small>
                                                <p className="min-w-[180px] -mt-1.5">
                                                    {
                                                        entities.elements[
                                                            +elementId
                                                        ].name
                                                    }
                                                </p>
                                            </td>
                                            <td className="px-4 text-center bg-white">
                                                <p className="max-w-[100px]">
                                                    {formatSeconds(
                                                        acummulated
                                                            ? entities.elements[
                                                                  +elementId
                                                              ]
                                                                  .accumulated_duration
                                                            : entities.elements[
                                                                  +elementId
                                                              ].duration
                                                    )}
                                                </p>
                                            </td>
                                            {Object.keys(entities.users).map(
                                                (userId) => {
                                                    return dataset[+elementId][
                                                        +userId
                                                    ] != null ? (
                                                        <td className="px-4 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}{" "}
                                                            /{" "}
                                                            <small
                                                                className={`${
                                                                    dataset[
                                                                        +elementId
                                                                    ][+userId]!
                                                                        .on_time
                                                                        ? "text-green-600"
                                                                        : "text-red-600"
                                                                } inline-flex gap-2 items-center`}
                                                            >
                                                                {dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .on_time ? (
                                                                    <TbClockCheck className="inline-block" />
                                                                ) : (
                                                                    <TbClockX className="inline-block" />
                                                                )}{" "}
                                                                {formatSeconds(
                                                                    dataset[
                                                                        +elementId
                                                                    ][+userId]!
                                                                        .delay
                                                                )}
                                                            </small>
                                                        </td>
                                                    ) : (
                                                        <td className=" px-4 text-center">
                                                            -
                                                        </td>
                                                    );
                                                }
                                            )}
                                        </tr>
                                    )
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ParadeControlTable;
