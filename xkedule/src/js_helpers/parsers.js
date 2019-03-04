function dateToWritenDate(date) {
    const day = date.toLocaleDateString('en-GB', {day: 'numeric'});
    const month = date.toLocaleDateString('en-GB', {month: 'long'});
    const year = date.toLocaleDateString('en-GB', {year: 'numeric'});
    return `${month} ${day}, ${year}`;
}

function dateToHourMinute(date) {
    var hour = date.getHours();
    hour = hour.toString().padStart(2, "0");
    var minute = date.getMinutes();
    minute = minute.toString().padStart(2, "0");
    return `${hour}\xa0:\xa0${minute}`;
}

export { dateToWritenDate, dateToHourMinute };
