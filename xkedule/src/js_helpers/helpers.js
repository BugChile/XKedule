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


// decreasingFunctionCompare and increasingFunctionCompare are to be used inside
// the array's sort method. They definition follows the following definition:
//              https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function decreasingFunctionCompare(a, b){
    return b - a
}

function increasingFunctionCompare(a, b){
    return a - b
}

export { stringRange, decreasingFunctionCompare, increasingFunctionCompare };
