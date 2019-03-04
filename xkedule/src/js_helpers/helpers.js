function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function stringRange(start, end, digits){
    var range = [];
    for (var i = start; i < end; i++) {
        range.push(i.toString().padStart(digits, "0"));
    }
    return range;
}

export { stringRange };
