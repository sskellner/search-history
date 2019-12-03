class Concordance {
  constructor() {
    this.dict = {};
    this.keys = [];
    this.indices = [];
  }

// creates dict for all results that contain your search word
  newProcess(txt, all, dates) {
    var token = txt.toLowerCase();
    for (let i = 0; i < all.length; i++) {
      let str = all[i];
      if (str.includes(token)) {
        this.dict[str] = dates[i];
        this.keys.push(str);
        this.indices.push(i);
      }
    }
  }

  // An array of keys
  getKeys() {
    return this.keys;
  }

  // Where each word is found in reference to the entire dataset
  getIndices() {
    return this.indices;
  }

  // Get the date for a word
  getDate(word) {
    return this.dict[word];
  }

  // Sort array of keys by date
  sortByDate() {
    var concordance = this;

    function sorter(a, b) {
      let dateObjectA = new Date(concordance.getDate(a));
      let dateObjectB = new Date(concordance.getDate(b));
      var diff = dateObjectB.getTime() - dateObjectA.getTime();
      return diff;
    }
    this.keys.sort(sorter);
  }
}
