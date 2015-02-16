'use strict';

module.exports = {

  // @param  {Number} page
  // @param  {Array}  documents
  // @param  {Number} n
  // @return {Array}
  paginate: function paginate (page, documents, n) {
    var startIndex, endIndex, result = [];

    startIndex = (page - 1) * n;
    endIndex = startIndex + n;

    for (var i = startIndex; i < endIndex; i++) {
      if (!documents[i]) break;
      result.push(documents[i]);
    }

    return result;
  }

};
