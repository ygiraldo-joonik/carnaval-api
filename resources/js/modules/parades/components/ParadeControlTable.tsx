import { ParadeControlDataSet, ParadeControlEntities } from "@/types/parade";
import { formatSeconds } from "@/utils/transformers/fromMinutesToHours";
import { Fragment } from "react/jsx-runtime";

type ParadeControlTableProps = {
    dataset: ParadeControlDataSet;
    entities: ParadeControlEntities;
};
const ParadeControlTable = ({ entities, dataset }: ParadeControlTableProps) => {
    return (
        <div className="overflow-hidden rounded-lg">
        <div className="sticky-header-table-container control overflow-x-auto relative">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-700 bg-accent"></th>
                        {Object.values(entities.users).map((UserName, i) => (
                            <th
                                key={i}
                                colSpan={3}
                                className="px-4 border-r-2 py-2 text-center font-medium text-gray-700 bg-accent"
                            >
                                {UserName}
                            </th>
                        ))}
                        {Object.values(entities.users).map((UserName, i) => (
                            <th
                                key={i}
                                colSpan={3}
                                className="px-4 border-r-2 py-2 text-center font-medium text-gray-700 bg-accent"
                            >
                                {UserName}
                            </th>
                        ))}
                        {Object.values(entities.users).map((UserName, i) => (
                            <th
                                key={i}
                                colSpan={3}
                                className="px-4 border-r-2 py-2 text-center font-medium text-gray-700 bg-accent"
                            >
                                {UserName}
                            </th>
                        ))}
                        {Object.values(entities.users).map((UserName, i) => (
                            <th
                                key={i}
                                colSpan={3}
                                className="px-4 border-r-2 py-2 text-center font-medium text-gray-700 bg-accent"
                            >
                                {UserName}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-700 bg-accent"></th>
                        {Object.values(entities.users).map((UserName, i) => (
                            <Fragment key={i}>
                                <th className="px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Dur
                                </th>
                                <th className="px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Est
                                </th>
                                <th className="border-r-2 px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Dem
                                </th>
                            </Fragment>
                        ))}
                        {Object.values(entities.users).map((UserName, i) => (
                            <Fragment key={i}>
                                <th className="px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Dur
                                </th>
                                <th className="px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Est
                                </th>
                                <th className="border-r-2 px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Dem
                                </th>
                            </Fragment>
                        ))}
                        {Object.values(entities.users).map((UserName, i) => (
                            <Fragment key={i}>
                                <th className="px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Dur
                                </th>
                                <th className="px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Est
                                </th>
                                <th className="border-r-2 px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Dem
                                </th>
                            </Fragment>
                        ))}
                        {Object.values(entities.users).map((UserName, i) => (
                            <Fragment key={i}>
                                <th className="px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Dur
                                </th>
                                <th className="px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Est
                                </th>
                                <th className="border-r-2 px-4 py-2 text-center font-medium text-gray-700 bg-accent">
                                    Dem
                                </th>
                            </Fragment>
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
                                            <p className="min-w-[180px]">{entities.elements[+elementId]}</p>
                                        </td>
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                    </tr>
                                )
                        )}
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
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                    </tr>
                                )
                        )}
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
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                    </tr>
                                )
                        )}
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
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
                                                        -
                                                    </td>
                                                );
                                            }
                                        )}
                                        {Object.keys(entities.users).map(
                                            (userId) => {
                                                return dataset[+elementId][
                                                    +userId
                                                ] != null ? (
                                                    <>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .duration
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .expected
                                                            )}
                                                        </td>
                                                        <td className="border-r-2 px-4 py-2 text-center">
                                                            {formatSeconds(
                                                                dataset[
                                                                    +elementId
                                                                ][+userId]!
                                                                    .delay
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td
                                                        colSpan={3}
                                                        className="border-r-2 px-4 py-2 text-center"
                                                    >
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
