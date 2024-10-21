export default function TravelsRawData({ travels }) {
    return (
        <table className="min-w-full divide-y divide-gray-200 table-fixed text-center">
            <thead className="bg-indigo-500">
                <tr>
                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-center text-white uppercase">
                        Travel ID
                    </th>
                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-center text-white uppercase">
                        User
                    </th>
                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-center text-white uppercase">
                        <span className="inline-flex py-3 px-6 w-full justify-between">
                            Latitude
                        </span>
                    </th>
                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-center text-white uppercase">
                        Longitude
                    </th>
                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-center text-white uppercase">
                        Start Date
                    </th>
                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-center text-white uppercase">
                        End Date
                    </th>
                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-center text-white uppercase">
                        Location At
                    </th>
                    <th scope="col" className="w-3/12 text-xs font-semibold tracking-wider text-center text-white uppercase">
                        Duration
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {travels && travels.map((travel) => (
                    <tr key={travel.location_id}>
                        <td className="py-4 px-6 whitespace-nowrap">
                            {travel.id}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                            {travel.user_name}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                            {travel.latitude}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                            {travel.longitude}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                            {travel.started_at}
                        </td>
                        <td className={`py-4 px-6 whitespace-nowrap ${!travel.minutes_difference && 'text-gray-500'}`}>
                            {travel.finished_at ?? 'Active'}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                            {travel.location_at}
                        </td>
                        <td className={`py-4 px-6 whitespace-nowrap ${!travel.minutes_difference && 'text-gray-500'}`}>
                            {travel.minutes_difference ? `${travel.minutes_difference} Min` : 'Active'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    );
}

