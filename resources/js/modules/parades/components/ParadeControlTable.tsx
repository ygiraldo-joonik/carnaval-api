import { ParadeControlDataSet, ParadeControlEntities } from "@/types/parade";
import { fromMinutesToHours } from "@/utils/transformers/fromMinutesToHours";

type ParadeControlTableProps = {
    dataset: ParadeControlDataSet;
    entities: ParadeControlEntities;
};
const ParadeControlTable = ({ entities, dataset }: ParadeControlTableProps) => {
    return (
        <table className="min-w-full bg-white sm:rounded-lg">
            <thead>
                <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 bg-accent"></th>
                    {Object.values(entities.users).map((UserName) => (
                        <th className="px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                            {UserName}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.keys(entities.elements)
                    .sort()
                    .map(
                        (elementId) =>
                            dataset[+elementId] !== undefined && (
                                <tr className="border-t" key={elementId}>
                                    <td className="px-4 py-2 bg-white">
                                        {entities.elements[+elementId]}
                                    </td>
                                    {Object.keys(entities.users).map(
                                        (userId) => {
                                            return (
                                                <td className="px-4 py-2 text-center">
                                                    {dataset[+elementId][
                                                        +userId
                                                    ] != null
                                                        ? `${fromMinutesToHours(
                                                              dataset[
                                                                  +elementId
                                                              ][+userId]!
                                                          )}`
                                                        : "NA"}
                                                </td>
                                            );
                                        }
                                    )}
                                </tr>
                            )
                    )}
            </tbody>
        </table>
    );
};

export default ParadeControlTable;
