function dateToWritenDate(date) {
    const day = date.toLocaleDateString('en-GB', {day: 'numeric'});
    const month = date.toLocaleDateString('en-GB', {month: 'long'});
    const year = date.toLocaleDateString('en-GB', {year: 'numeric'});
    return `${month} ${day}, ${year}`;
}

function dateToHourMinute(date) {
    var hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`
    }
    var minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`
    }
    return `${hour}:${minute}`;
}

export { dateToWritenDate, dateToHourMinute };
