'use strict';

const PriorityQueue = require("./PriorityQueue");
const { numToArray } = require('./utils');

/**
 * Weighted graph represented as an adjacency list;
 * 
 * Each node in the adjacency list points to an array of neighboring nodes.
 * In a weighted graph the adjacency list carries another piece of information:
 * the weight of each edge (the cost of getting to that particular node);
 */
class WeightedGraph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = this._initializeList();
  }

  _initializeList() {
    return new Proxy({},
      {
        get: function (target, name) {
          if (name in target) {
            return target[name];
          } else {
            throw new Error(`node '${name}' does not exist`);
          }
        }
      })
  }

  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }

  addEdge(node1, node2, weight = 1) {
    this.adjacencyList[node1].push({ node: node2, weight: weight });
    this.adjacencyList[node2].push({ node: node1, weight: weight });
  }

  generateMesh(rows, cols, allowDiagonals) {
    const rs = numToArray(rows);
    const cs = numToArray(cols);
    rs.forEach((r, r_i) => {
      cs.forEach((c, c_i) => {
        const cell = `${r}-${c}`;
        //Add node;
        this.addNode(cell);

        //Connect with neighbors;
        const currRow = rs[r_i];
        const currCol = cs[c_i];
        const prevRow = rs[r_i - 1];
        const prevCol = cs[c_i - 1];

        if (r_i > 0) { // Add top link
          this.addEdge(cell, `${prevRow}-${currCol}`);
        }
        if (r_i > 0 && c_i > 0 && allowDiagonals) { // Add top left link
          this.addEdge(cell, `${prevRow}-${prevCol}`);
        }
        if (c_i > 0) {
          this.addEdge(cell, `${currRow}-${prevCol}`); // Add left link
        }
      });
    });
  };

  deleteNode(node) {
    const neighbours = this.getNeighbours(node);
    this.nodes.splice(this.nodes.indexOf(node), 1); //remove node;
    delete this.adjacencyList[node]; // remove conections from node;
    neighbours.forEach(n => {
      const deleteNodeIdx = this.adjacencyList[n].findIndex(x => x.node == node);
      this.adjacencyList[n].splice(deleteNodeIdx, 1);
    });

  }

  getNeighbours(node) {
    return this.adjacencyList[node].map(n => n.node);
  }

  findPath(startNode, endNode) {
    const times = {};
    const backtrace = {};
    const pq = new PriorityQueue();

    this._initializeNodes(startNode, times);

    pq.enqueue([startNode, 0]);

    while (!pq.isEmpty()) {
      const shortestStep = pq.dequeue();
      const currentNode = shortestStep[0];

      this.adjacencyList[currentNode].forEach(neighbor => {
        const time = times[currentNode] + neighbor.weight;

        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          pq.enqueue([neighbor.node, time]);
        }
      });
    }

    const path = [endNode];
    let lastStep = endNode;

    while (lastStep !== startNode) {
      path.unshift(backtrace[lastStep]);
      lastStep = backtrace[lastStep];
    }

    return {
      path,
      distance: times[endNode],
    }
  }

  _initializeNodes(startNode, times) {
    this.nodes.forEach(node => {
      times[node] = (node == startNode) ? 0 : Infinity
    });
  }
}




module.exports = WeightedGraph;
