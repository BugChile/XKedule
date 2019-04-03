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

function toLinkDataModel(links_from_event_form){
    var links = {};
    var index = 0;
    var link_object;
    Object.keys(links_from_event_form).forEach((key) => {
        link_object = links_from_event_form[key];
        link_object.id = index;
        links[index] = link_object;
    });
    return links;
}

function toTagIds(tags_from_event_form){
    var tag_ids = [];
    Object.keys(tags_from_event_form).forEach((key) => {
        tag_ids.push(tags_from_event_form[key].id);
    });
    return tag_ids;
}

function toDataDate(date, hour){
    var data_date = date;
    data_date.setHours(hour.getHours());
    data_date.setMinutes(hour.getMinutes());
    return data_date.getTime();
}

export { dateToWritenDate,
         dateToHourMinute,
         capitalizeFirstLetter,
         toLinkDataModel,
         toTagIds,
         toDataDate};
