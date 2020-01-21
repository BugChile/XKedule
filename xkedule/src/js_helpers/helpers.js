// function preventDefault(e) {
//   e = e || window.event;
//   if (e.preventDefault) e.preventDefault();
//   e.returnValue = false;
// }

// from https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function stringRange(start, end, digits) {
  var range = [];
  for (var i = start; i < end; i++) {
    range.push(i.toString().padStart(digits, '0'));
  }
  return range;
}

// decreasingFunctionCompare and increasingFunctionCompare are to be used inside
// the array's sort method. They definition follows the following definition:
//              https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function decreasingFunctionCompare(a, b) {
  return b - a;
}

function increasingFunctionCompare(a, b) {
  return a - b;
}
function checkTodayFunction(current_time, aux_view_time) {
  var day_aux = aux_view_time.getDate();
  var month_aux = aux_view_time.getMonth();
  var year_aux = aux_view_time.getFullYear();
  var day = current_time.getDate();
  var month = current_time.getMonth();
  var year = current_time.getFullYear();
  if (day_aux === day && month_aux === month && year_aux === year) {
    return true;
  }
  return false;
}
// this function returns true if two date ranges overlap
function checkDateOverlap(a_start, a_end, b_start, b_end) {
  a_start.setSeconds(0);
  a_start.setMilliseconds(0);
  a_end.setSeconds(0);
  a_end.setMilliseconds(0);

  b_start.setSeconds(0);
  b_start.setMilliseconds(0);
  b_end.setSeconds(0);
  b_end.setMilliseconds(0);

  // a and b start at the same time
  if (a_start.getTime() === b_start.getTime()) return true;

  // case when a starts first and b starts before a ends
  if (a_start < b_start && b_start < a_end) return true;

  // case when b starts first and a starts before b ends
  if (b_start < a_start && a_start < b_end) return true;
  return false;
}

function onlyUnique(value, index, self) {
  // from https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  return self.indexOf(value) === index;
}

function multiplyReducer(accumulator, currentValue) {
  return accumulator * currentValue;
}

function eventsFromHashed(events, hashed, date) {
  const ids = hashed[date];
  if (ids) {
    return ids.map(id => events[id]);
  }
  return [];
}

function groupOverlaps(events) {
  var grouped = [];
  var already_found = false;
  events.forEach(_event => {
    // look for already grouped events colliding
    grouped.forEach(group => {
      if (
        !already_found &&
        checkDateOverlap(
          _event.date_start,
          _event.date_end,
          group.overlap_start,
          group.overlap_end,
        )
      ) {
        already_found = true;
        if (_event.date_start < group.events[group.compare_index].date_end) {
          group.length += 1;
        } else {
          group.compare_index += 1;
        }

        if (_event.date_start < group.overlap_start) {
          group.overlap_start = _event.date_start;
        }

        if (_event.date_end > group.overlap_end) {
          group.overlap_end = _event.date_end;
        }

        group.events.push(_event);
      }
    });

    // no colliding, new group
    if (!already_found) {
      grouped.push({
        overlap_start: _event.date_start,
        overlap_end: _event.date_end,
        compare_index: 0,
        length: 1,
        events: [_event],
      });
    }
    already_found = false;
  });
  return grouped;
}

function clone(obj) {
  let temp;
  if (obj === null || typeof obj !== 'object' || 'isActiveClone' in obj)
    return obj;

  if (obj instanceof Date) temp = new obj.constructor();
  //or new Date(obj);
  else temp = obj.constructor();

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj['isActiveClone'] = null;
      temp[key] = clone(obj[key]);
      delete obj['isActiveClone'];
    }
  }
  return temp;
}

export {
  stringRange,
  decreasingFunctionCompare,
  increasingFunctionCompare,
  checkDateOverlap,
  groupOverlaps,
  onlyUnique,
  multiplyReducer,
  isEmpty,
  checkTodayFunction,
  eventsFromHashed,
  clone,
};
