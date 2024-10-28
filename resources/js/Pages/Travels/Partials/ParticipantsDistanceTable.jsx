import formatDistanceOrLocation from "@/utils/transformers/formatDistance";
import reduceParticipantsDistanceData from "@/utils/transformers/reduceParticipantsDistanceData";

export default function ParticipantsDistanceTable({ data = {}, headers = [] }) {

    const distanceData = reduceParticipantsDistanceData(data);

    const locationHeadersLength = headers.filter((header) => `${header}`.indexOf('-') == -1).length;
    const distanceHeadersLength = headers.length - locationHeadersLength;

    return (
        <table className="min-w-full  divide-y divide-gray-200 table-fixed text-center">
            <thead className="bg-indigo-500">
                <tr>
                    <th scope="col" rowSpan="2" className="py-1 text-xs font-semibold tracking-wider text-center text-white uppercase">
                        Time
                    </th>
                    <th scope="col" colSpan={locationHeadersLength} className="py-1 text-xs font-semibold tracking-wider text-center text-white uppercase">
                        Locations
                    </th>
                    <th scope="col" colSpan={distanceHeadersLength} className="py-1 text-xs font-semibold tracking-wider text-center text-white uppercase bg-indigo-400">
                        Distance
                    </th>
                </tr>
                <tr>

                    {headers && headers.map((header, i) => (
                        <th key={header} scope="col" className={`text-xs font-semibold tracking-wider text-center text-white uppercase ${(i + 1) > locationHeadersLength && 'bg-indigo-400'}`}>
                            {header}
                        </th>
                    ))}

                </tr>

            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {distanceData && distanceData.map((timeDistance, i) => (
                    <tr key={i}>
                        <td scope="col" className="py-2 text-xs font-semibold tracking-wider text-center">
                            {timeDistance.time}
                        </td>

                        {headers && headers.map((header, i) => (
                            <td key={i} scope="col" className="py-2 text-xs font-semibold tracking-wider text-center">
                                {formatDistanceOrLocation(timeDistance[header])}
                            </td>
                        ))}

                    </tr>
                ))}
            </tbody>
        </table>

    );
}

