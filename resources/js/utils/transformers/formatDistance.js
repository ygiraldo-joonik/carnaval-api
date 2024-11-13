export default function formatDistanceOrLocation(value) {
    // If value is null, return '-'
    if(value == null) {
        return '-';
    }

    // If value is 0, return 0
    if(value == 0) {
        return 0;
    }

    // If value is a string and contains a comma, return value
    if(`${value}`.indexOf(',') > -1) 
        return value;

    // return distance value in meters or kilometers
    const distance = parseFloat(value);

    if (distance < 1000) {
        return `${distance.toFixed(2)} mt`;
    }

    return `${(distance / 1000).toFixed(2)} km`;
}