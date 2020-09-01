'use strict';

/**
 * Queue ordered by weight;
 */
class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      this._place(element);
    }
  }

  _place([value, weight]) {
    let low = 0;
    let high = this.collection.length;

    while (low < high) {
      const mid = (low + high) >>> 1;
      if (this.collection[mid] < weight) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    this.collection.splice(low, 0, [value, weight]);
  }

  dequeue() {
    return this.collection.shift();
  }

  isEmpty() {
    return this.collection.length === 0;
  }
}


module.exports = PriorityQueue;