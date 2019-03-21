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

function capitalizeFirstLetter(string) { // from https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { dateToWritenDate, dateToHourMinute, capitalizeFirstLetter };
