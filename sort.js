export default function sort(arr, ref) {
    console.log(arr)
    if (ref === 'Latest') {
        let sortedLatestToOld = arr.slice().sort((a, b) => sortByDate(b, a));
        return sortedLatestToOld;
    } else if (ref === 'Oldest') {
        let sortedOldToLatest = arr.slice().sort((a, b) => sortByDate(a, b));
        return sortedOldToLatest;
    } else if (ref == 'Alphapatic') {
        let sortAlapha = arr.slice().sort()
        return sortAlapha;
    }
}

function sortByDate(a, b) {
    console.log(a, b)
    const dateA = new Date(parseDateString(a));
    const dateB = new Date(parseDateString(b));
    console.log(dateA, dateB);
    console.log(dateA - dateB)
    return dateA - dateB;
}

function parseDateString(dateStr) {
    const regex = /(\d{1,2})h:(\d{1,2})m:(\d{1,2})s on (\w{3}), (\w{3}) (\d{1,2}), (\d{4})/;
    const match = regex.exec(dateStr);
    console.log(match)
    const [, hours, minutes, seconds, monthName, day, year] = match;
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(monthName);
    console.log(`${monthIndex + 1} ${day}, ${year} ${hours}:${minutes}:${seconds} UTC`)
    return `${monthIndex + 1} ${day}, ${year} ${hours}:${minutes}:${seconds} UTC`;
}
