export default function reduceParticipantsDistanceData(timeDistanceData = {}) {

    const timeKeys = Object.keys(timeDistanceData);
    return timeKeys.reduce((data,timeKey) => 
         [
            ...data,
            {
                time:timeKey,
                ...timeDistanceData[timeKey]
            }
        ],
        []
    );
}