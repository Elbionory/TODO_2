 export default function getCurrentDateTimeString() {
    const currentDate = new Date();

    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' }); // Abbreviated day of the week
    const month = currentDate.toLocaleDateString('en-US', { month: 'short' }); // Abbreviated month
    const dateOfMonth = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hour = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    return `${hour}h:${minutes}m:${seconds}s on ${dayOfWeek}, ${month} ${dateOfMonth}, ${year}`;
}


